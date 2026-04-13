import React, { useMemo } from 'react';
import { BookOpen, CheckCircle, Users } from 'lucide-react';
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

export default function FacultyCourseDashboard() {
  const { courses } = useAdminData();

  const stats = useMemo(() => {
    const total = courses.length;
    const active = courses.filter(c => c.status === 'Active').length;
    
    // Aggregating capacity across all courses
    const totalCapacity = courses.reduce((sum, curr) => sum + (curr.students || 0), 0);
    
    return { total, active, totalCapacity };
  }, [courses]);

  const courseData = useMemo(() => {
    return courses.map(c => ({
      name: c.name,
      students: c.students || 0,
    })).sort((a,b) => b.students - a.students);
  }, [courses]);

  const colors = ['#4F46E5', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Course Dashboard</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Academic program oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Courses" value={stats.total} icon={BookOpen} color="bg-indigo-600" />
        <StatCard title="Active Courses" value={stats.active} icon={CheckCircle} color="bg-emerald-600" />
        <StatCard title="Total Capacity" value={stats.totalCapacity.toLocaleString()} icon={Users} color="bg-blue-600" />
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <h4 className="text-lg font-black text-[#1E293B] mb-6 uppercase tracking-tight">Program Enrollment Capacities</h4>
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
             <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm tracking-widest uppercase">No programs found</div>
          )}
        </div>
      </div>
    </div>
  );
}
