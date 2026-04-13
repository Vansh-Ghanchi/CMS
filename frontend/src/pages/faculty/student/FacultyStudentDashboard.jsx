import React, { useMemo } from 'react';
import { Users, UserCheck, UserMinus, Clock } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex items-center gap-5 transition-all hover:shadow-md hover:border-slate-200">
    <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center ${color} bg-opacity-10 shrink-0`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{title}</p>
      <h3 className="text-3xl font-black text-[#1E293B] leading-none">{value}</h3>
    </div>
  </div>
);

export default function FacultyStudentDashboard() {
  const { students, getEnrollmentStats } = useAdminData();

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;
    const inactive = students.filter(s => s.status === 'Inactive').length;
    // Mock recent additions as a baseline
    const recent = Math.max(0, Math.floor(total * 0.1));
    return { total, active, inactive, recent };
  }, [students]);

  const courseData = useMemo(() => {
    const dataMap = {};
    students.forEach(s => {
      dataMap[s.course] = (dataMap[s.course] || 0) + 1;
    });
    return Object.keys(dataMap).map(key => ({
      name: key,
      students: dataMap[key]
    })).sort((a, b) => b.students - a.students);
  }, [students]);

  const colors = ['#4F46E5', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Student Dashboard</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Enrollment statistics and overviews</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={stats.total} icon={Users} color="bg-blue-600" />
        <StatCard title="Active Status" value={stats.active} icon={UserCheck} color="bg-emerald-600" />
        <StatCard title="Inactive Status" value={stats.inactive} icon={UserMinus} color="bg-rose-600" />
        <StatCard title="Recently Added" value={stats.recent} icon={Clock} color="bg-amber-600" />
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <h4 className="text-lg font-black text-[#1E293B] mb-6 uppercase tracking-tight">Students per Course Alignment</h4>
        <div className="h-80 w-full">
          {courseData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#F1F5F9', radius: 10 }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Bar dataKey="students" radius={[8, 8, 0, 0]}>
                  {courseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm tracking-widest uppercase">No alignment parameters found</div>
          )}
        </div>
      </div>
    </div>
  );
}
