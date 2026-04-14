import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { STUDENT_RECORDS_DATA, STUDENT_FEES_DATA, getEnrollmentDistribution, getMonthlyFeeTrends, INITIAL_COURSES, generateAttendanceLogs } from '../lib/constants';

const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
  // Initialize from LocalStorage if available, otherwise use Constants
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('admin_master_students_v3');
    return saved ? JSON.parse(saved) : STUDENT_RECORDS_DATA;
  });

  const [fees, setFees] = useState(() => {
    const saved = localStorage.getItem('admin_master_fees_v3');
    return saved ? JSON.parse(saved) : STUDENT_FEES_DATA;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('admin_master_courses_v5');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [attendanceLogs, setAttendanceLogs] = useState(() => {
    const saved = localStorage.getItem('admin_master_attendance_v3');
    return saved ? JSON.parse(saved) : generateAttendanceLogs(students);
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('admin_master_students_v3', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('admin_master_fees_v3', JSON.stringify(fees));
  }, [fees]);

  useEffect(() => {
    localStorage.setItem('admin_master_courses_v5', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('admin_master_attendance_v3', JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  // Dynamic Chart Helpers using current state
  const getEnrollmentStats = (year, monthIndex) => {
    const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const targetYear = year.toString();
    const targetMonth = monthNamesShort[monthIndex];

    const filtered = students.filter(s => 
      s.admissionDate.includes(targetMonth) && s.admissionDate.includes(targetYear)
    );

    const courses = ["B-Tech (CS)", "B-Tech (CSE)", "B-Tech (AI)", "BSC (IT)", "MSC (IT) INT", "BCA"];
    const colors = ['#4F46E5', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    return courses.map((course, i) => {
      const count = filtered.filter(s => s.course === course).length;
      return { name: course, value: count, color: colors[i] };
    });
  };

  const currentFeeTrends = useMemo(() => {
    const months = [
      "JAN 25", "FEB 25", "MAR 25", "APR 25", "MAY 25", "JUN 25", 
      "JUL 25", "AUG 25", "SEP 25", "OCT 25", "NOV 25", "DEC 25",
      "JAN 26", "FEB 26", "MAR 26", "APR 26"
    ];

    return months.map((month, index) => {
      const year = month.includes('25') ? '2025' : '2026';
      const monthName = month.split(' ')[0];
      
      const actualCollection = fees.reduce((total, student) => {
        const monthTransactions = student.history.filter(h => 
          h.date.toUpperCase().includes(monthName.toUpperCase()) && h.date.includes(year)
        );
        return total + monthTransactions.reduce((sum, t) => sum + t.amount, 0);
      }, 0);

      const actual = actualCollection * 35; 
      const margin = 0.1 + (Math.sin(index) * 0.05 + 0.05);
      return { 
        name: month, 
        actual, 
        projected: Math.round(actual * (1 + margin)) 
      };
    });
  }, [fees]);

  const currentAttendanceTrends = useMemo(() => {
    const months = [
        "JAN 25", "FEB 25", "MAR 25", "APR 25", "MAY 25", "JUN 25", 
        "JUL 25", "AUG 25", "SEP 25", "OCT 25", "NOV 25", "DEC 25",
        "JAN 26", "FEB 26", "MAR 26", "APR 26"
    ];

    const monthFullNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return months.map((monthStr, index) => {
        const [mShort, yShort] = monthStr.split(' ');
        const year = yShort === '25' ? '2025' : '2026';
        const monthName = monthFullNames.find(m => m.toUpperCase().startsWith(mShort));
        
        // Find logs for this month/year
        const monthLogs = attendanceLogs.filter(l => 
            l.date.includes(`${year}-${(monthFullNames.indexOf(monthName) + 1).toString().padStart(2, '0')}`) ||
            l.date.includes(monthName) && l.date.includes(year)
        );

        let value;
        if (monthLogs.length > 0) {
            const present = monthLogs.filter(l => l.status === "Present").length;
            value = Math.round((present / monthLogs.length) * 100);
        } else {
            // Mock historical trend (85-95%) for display consistency
            const seed = (index * 7) % 10;
            value = 85 + seed;
        }

        return { name: monthStr, value };
    });
  }, [attendanceLogs]);

  const value = {
    students,
    setStudents,
    fees,
    setFees,
    courses,
    setCourses,
    attendanceLogs,
    setAttendanceLogs,
    getEnrollmentStats,
    feeTrends: currentFeeTrends,
    attendanceTrends: currentAttendanceTrends
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error('useAdminData must be used within AdminDataProvider');
  return context;
};
