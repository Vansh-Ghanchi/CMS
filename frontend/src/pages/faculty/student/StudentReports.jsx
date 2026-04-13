import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAdminData } from '../../../context/AdminDataContext';
import { PieChart as PieChartIcon, Activity } from 'lucide-react';

export default function StudentReports() {
  const { students } = useAdminData();

  const statusData = useMemo(() => {
    const active = students.filter(s => s.status === 'Active').length;
    const inactive = students.filter(s => s.status === 'Inactive').length;
    return [
      { name: 'Active', value: active, color: '#10B981' },
      { name: 'Inactive', value: inactive, color: '#F43F5E' }
    ];
  }, [students]);

  const courseBreakdown = useMemo(() => {
    const map = {};
    students.forEach(s => {
      if (!map[s.course]) map[s.course] = { total: 0, active: 0, inactive: 0 };
      map[s.course].total++;
      if (s.status === 'Active') map[s.course].active++;
      else map[s.course].inactive++;
    });
    return Object.keys(map).map(k => ({ name: k, ...map[k] })).sort((a,b) => b.total - a.total);
  }, [students]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Student Reports</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Analytical insights on student base</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                 <PieChartIcon className="w-5 h-5" />
             </div>
             <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Status Distribution</h4>
          </div>
          <div className="h-64 w-full">
            {students.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm tracking-widest uppercase">No Data Available</div>
            )}
          </div>
        </div>

        {/* Detailed Table Section */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                 <Activity className="w-5 h-5" />
             </div>
             <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Course Breakdown</h4>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
             <table className="w-full text-left min-w-[300px]">
                <thead>
                   <tr className="border-b border-slate-100">
                      <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
                      <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Total</th>
                      <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Active</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {courseBreakdown.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="py-4 px-2 text-xs font-black text-slate-700">{row.name}</td>
                         <td className="py-4 px-2 text-xs font-black text-slate-600 text-center">{row.total}</td>
                         <td className="py-4 px-2 text-center">
                             <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black tracking-widest">{row.active}</span>
                         </td>
                      </tr>
                   ))}
                   {courseBreakdown.length === 0 && (
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
