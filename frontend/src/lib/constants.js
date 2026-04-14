// Shared Universal Constants for Administration

// Helper to generate a larger dataset for the timeline
const generateStudents = () => {
  const students = [];
  const courses = [
    { name: "B-Tech (CS)", inst: "GIT" },
    { name: "B-Tech (CSE)", inst: "GIT" },
    { name: "B-Tech (AI)", inst: "GIT" },
    { name: "BSC (IT)", inst: "GICSA" },
    { name: "MSC (IT) INT", inst: "GICSA" },
    { name: "BCA", inst: "GICSA" }
  ];

  const firstNames = ["Arjun", "Aditya", "Ananya", "Ayesha", "Bhavna", "Bilal", "Dev", "Elena", "Esha", "Faizan", "Fatima", "Gauri", "Hamza", "Ishani", "Kabir", "Meera", "Muhammad", "Omar", "Priya", "Rohan", "Sara", "Siddharth", "Tara", "Vikram", "Zainab", "Karan", "Nisha", "Rahul", "Sneha", "Varun"];
  const lastNames = ["Khan", "Ali", "Fatima", "Ahmed", "Siddiqui", "Hussain", "Noor", "Farooq", "Gupta", "Mehra", "Sharma", "Kapoor", "Iyer", "Singh", "Bose", "Das", "Patel", "Rao", "Menon", "Verma", "Joshi", "Batra", "Malik", "Shah", "Choudhury"];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let idCounter = 1001;

  // Generate for 2025
  for (let m = 0; m < 12; m++) {
    // 4-6 students per month to show good distribution
    const count = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const courseObj = courses[(m + i) % courses.length];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const day = 1 + Math.floor(Math.random() * 28);

      students.push({
        studentId: `STU-25-${idCounter++}`,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idCounter}@email.com`,
        phone: `+91 98765 ${Math.floor(10000 + Math.random() * 90000)}`,
        institute: courseObj.inst,
        course: courseObj.name,
        admissionDate: `${day} ${monthNames[m]} 2025`,
        status: Math.random() > 0.1 ? "Active" : "Inactive",
        avatar: `https://i.pravatar.cc/150?u=${idCounter}`
      });
    }
  }

  // Generate for 2026 (Jan to Apr)
  for (let m = 0; m < 4; m++) {
    const count = 5 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const courseObj = courses[(m + i) % courses.length];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const day = 1 + Math.floor(Math.random() * 28);

      students.push({
        studentId: `STU-26-${idCounter++}`,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${idCounter}@email.com`,
        phone: `+91 98765 ${Math.floor(10000 + Math.random() * 90000)}`,
        institute: courseObj.inst,
        course: courseObj.name,
        admissionDate: `${day} ${monthNames[m]} 2026`,
        status: "Active",
        avatar: `https://i.pravatar.cc/150?u=${idCounter}`
      });
    }
  }

  return students;
};

export const STUDENT_RECORDS_DATA = generateStudents();

export const STUDENT_FEES_DATA = STUDENT_RECORDS_DATA.map(s => {
  const [day, month, year] = s.admissionDate.split(' ');
  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonthIndex = monthNamesShort.indexOf(month);
  const startYear = parseInt(year);

  // Generate 4-6 sequential monthly payments starting from admission
  const history = [];
  let currentTotal = 0;

  for (let i = 0; i < 5; i++) {
    let mIdx = (startMonthIndex + i) % 12;
    let y = startYear + Math.floor((startMonthIndex + i) / 12);

    // Don't go past April 2026
    if (y > 2026 || (y === 2026 && mIdx > 3)) break;

    const amount = 5000 + Math.floor(Math.random() * 2000);
    currentTotal += amount;

    history.push({
      date: `${10 + i} ${monthNamesShort[mIdx]} ${y}`,
      amount,
      method: i % 2 === 0 ? "UPI" : "Bank Transfer",
      status: "Success"
    });
  }

  return {
    id: s.studentId,
    name: s.name,
    institute: s.institute,
    course: s.course,
    totalFees: 40000,
    paid: currentTotal,
    remaining: 40000 - currentTotal,
    dueDate: "30 Apr 2026",
    status: (40000 - currentTotal) <= 0 ? "Paid" : "Pending",
    semesters: [
      { sem: "Sem 1", fees: 10000, paid: Math.min(10000, currentTotal), remaining: Math.max(0, 10000 - currentTotal), status: currentTotal >= 10000 ? "Paid" : "Pending" },
      { sem: "Sem 2", fees: 10000, paid: Math.max(0, Math.min(10000, currentTotal - 10000)), remaining: Math.max(0, 10000 - Math.max(0, currentTotal - 10000)), status: currentTotal >= 20000 ? "Paid" : "Pending" },
      { sem: "Sem 3", fees: 10000, paid: Math.max(0, Math.min(10000, currentTotal - 20000)), remaining: Math.max(0, 10000 - Math.max(0, currentTotal - 20000)), status: currentTotal >= 30000 ? "Paid" : "Pending" },
    ],
    history
  };
});

// Helper to get chart data from shared records
export const getEnrollmentDistribution = (year, monthIndex) => {
  const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const targetYear = year.toString();
  const targetMonth = monthNamesShort[monthIndex];

  // Filter students by admission month/year
  const filtered = STUDENT_RECORDS_DATA.filter(s =>
    s.admissionDate.includes(targetMonth) && s.admissionDate.includes(targetYear)
  );

  const courses = ["B-Tech (CS)", "B-Tech (CSE)", "B-Tech (AI)", "BSC (IT)", "MSC (IT) INT", "BCA"];
  const colors = ['#4F46E5', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return courses.map((course, i) => {
    const count = filtered.filter(s => s.course === course).length;
    return {
      name: course,
      value: count,
      color: colors[i]
    };
  });
};

export const getMonthlyFeeTrends = () => {
  const months = [
    "JAN 25", "FEB 25", "MAR 25", "APR 25", "MAY 25", "JUN 25",
    "JUL 25", "AUG 25", "SEP 25", "OCT 25", "NOV 25", "DEC 25",
    "JAN 26", "FEB 26", "MAR 26", "APR 26"
  ];

  return months.map((month, index) => {
    const year = month.includes('25') ? '2025' : '2026';
    const monthName = month.split(' ')[0];

    // Sum all transactions from all students for this month
    const actualCollection = STUDENT_FEES_DATA.reduce((total, student) => {
      const monthTransactions = student.history.filter(h =>
        h.date.includes(monthName) && h.date.includes(year)
      );
      return total + monthTransactions.reduce((sum, t) => sum + t.amount, 0);
    }, 0);

    // Apply scale for visual impact
    const actual = actualCollection * 3.5; // Adjusted scale for more data
    const margin = 0.1 + (Math.sin(index) * 0.05 + 0.05);
    const projected = Math.round(actual * (1 + margin));

    return { name: month, actual, projected };
  });
};

export const INITIAL_COURSES = [
  { id: "CRS-1001", name: "B-Tech (CS)", duration: "4 Years", faculty: "Prof. Wilson", institute: "GIT", students: 450, status: "Active", fee: 6.00, description: "Comprehensive study of computer systems and software development.", startDate: "01 Sep 2023", endDate: "30 Jun 2027" },
  { id: "CRS-1002", name: "B-Tech (CSE)", duration: "4 Years", faculty: "Dr. Chen", institute: "GIT", students: 280, status: "Active", fee: 6.20, description: "Focus on systematic development of large-scale software systems.", startDate: "01 Sep 2023", endDate: "30 Jun 2027" },
  { id: "CRS-1003", name: "B-Tech (AI)", duration: "4 Years", faculty: "Prof. Sarah", institute: "GIT", students: 180, status: "Active", fee: 6.50, description: "Study of cognitive models and artificial intelligence architectures.", startDate: "01 Sep 2023", endDate: "30 Jun 2027" },
  { id: "CRS-1004", name: "BSC (IT)", duration: "3 Years", faculty: "Dr. Gilbert", institute: "GICSA", students: 150, status: "Active", fee: 3.35, description: "Foundational information technology and system studies.", startDate: "15 Jan 2024", endDate: "15 Dec 2026" },
  { id: "CRS-1005", name: "MSC (IT) INT", duration: "5 Years", faculty: "Prof. Harrison", institute: "GICSA", students: 320, status: "Active", fee: 4.50, description: "Integrated master program for information technology.", startDate: "01 Sep 2022", endDate: "30 Jun 2027" },
  { id: "CRS-1006", name: "BCA", duration: "3 Years", faculty: "Prof. James", institute: "GICSA", students: 210, status: "Active", fee: 2.80, description: "Bachelor of Computer Applications - core logic and development.", startDate: "01 Sep 2023", endDate: "30 Jun 2027" },
];

export const generateAttendanceLogs = (students) => {
  const logs = [];
  // Last 5 days for history
  const dates = ["2026-04-08", "2026-04-09", "2026-04-10", "2026-04-11", "2026-04-12"];

  dates.forEach(date => {
    students.forEach((student, index) => {
      // Predictable generation: ~90% attendance
      const isAbsent = (index % 10 === 0);

      logs.push({
        date,
        studentId: student.studentId,
        status: isAbsent ? "Absent" : "Present",
        checkIn: isAbsent ? "-" : "09:00 AM",
        remarks: isAbsent ? "Not Reported" : "-"
      });
    });
  });
  return logs;
};
