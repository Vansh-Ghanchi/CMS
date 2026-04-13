import React, { useMemo } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { BookOpen, Users } from 'lucide-react';

export default function CourseReports() {
  const { courses } = useAdminData();

  const enrollmentData = useMemo(() => {
    return courses.map(c => ({
      name: c.name,
      students: c.students || 0,
      fee: c.fee || 0
    })).sort((a, b) => b.students - a.students);
  }, [courses]);

  const colors = ['#4F46E5', '#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Course Reports</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Enrollment and program analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrollment Bar Chart */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Enrollment per Course</h4>
          </div>
          <div className="h-72 w-full">
            {enrollmentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#F1F5F9', radius: 10 }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                  />
                  <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm uppercase tracking-widest">No data available</div>
            )}
          </div>
        </div>

        {/* Course Summary Table */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Program Summary</h4>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
            <table className="w-full text-left min-w-[350px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Fee (L)</th>
                  <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {enrollmentData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 text-xs font-black text-slate-700">{row.name}</td>
                    <td className="py-4 px-2 text-xs font-black text-slate-600 text-center">₹{row.fee.toFixed(2)}</td>
                    <td className="py-4 px-2 text-center">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black tracking-widest">{row.students}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
