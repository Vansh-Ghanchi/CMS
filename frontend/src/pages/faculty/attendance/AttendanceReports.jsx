import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { useAdminData } from '../../../context/AdminDataContext';
import { Activity, Users } from 'lucide-react';

export default function AttendanceReports() {
  const { students, attendanceLogs, attendanceTrends } = useAdminData();

  const studentAttendance = useMemo(() => {
    // group by student id
    const map = {};
    attendanceLogs.forEach(log => {
      if (!map[log.studentId]) map[log.studentId] = { present: 0, total: 0 };
      map[log.studentId].total += 1;
      if (log.status === 'Present') map[log.studentId].present += 1;
    });

    return students.map(s => {
      const stats = map[s.studentId] || { present: 0, total: 0 };
      const percentage = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0;
      return {
        ...s,
        percentage: parseFloat(percentage),
        attended: stats.present,
        totalClasses: stats.total
      };
    }).sort((a,b) => b.percentage - a.percentage);
  }, [students, attendanceLogs]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Attendance Reports</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Macro and micro attendance analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Attendance Chart Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                 <Activity className="w-5 h-5" />
             </div>
             <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Monthly Averages</h4>
          </div>
          <div className="h-64 w-full">
            {attendanceTrends && attendanceTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: '#F1F5F9', radius: 10 }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {attendanceTrends.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value < 75 ? '#F43F5E' : '#4F46E5'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm tracking-widest uppercase">No Trend Data Found</div>
            )}
          </div>
        </div>

        {/* Student-wise Percentage Table */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="flex items-center gap-3 mb-6 shrink-0">
             <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <Users className="w-5 h-5" />
             </div>
             <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Student Consolidations</h4>
          </div>
          <div className="overflow-auto scrollbar-thin scrollbar-thumb-slate-200 pr-2">
             <table className="w-full text-left min-w-[400px]">
                <thead className="sticky top-0 bg-white">
                   <tr className="border-b border-slate-100">
                      <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                      <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
                      <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Score</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {studentAttendance.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="py-4 px-2 text-xs font-black text-slate-700">
                             <div>{row.name}</div>
                             <div className="text-[9px] text-slate-400">{row.studentId}</div>
                         </td>
                         <td className="py-4 px-2 text-[10px] font-bold text-slate-500">{row.course}</td>
                         <td className="py-4 px-2 text-center">
                             <span className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-widest ${row.percentage >= 75 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {row.percentage}%
                             </span>
                         </td>
                      </tr>
                   ))}
                   {studentAttendance.length === 0 && (
                      <tr>
                         <td colSpan={3} className="py-8 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">No Records Found</td>
                      </tr>
                   )}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}
