import React, { useMemo } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';

export default function FeesReports() {
  const { fees, feeTrends } = useAdminData();

  const pendingStudents = useMemo(() => {
    return fees
      .filter(f => f.remaining > 0)
      .sort((a, b) => b.remaining - a.remaining)
      .slice(0, 10);
  }, [fees]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Fees Reports</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Financial analytics and debt tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fee Collection Trend */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Collection Trends</h4>
          </div>
          <div className="h-72 w-full">
            {feeTrends && feeTrends.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#F1F5F9', radius: 10 }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '11px' }}
                  />
                  <Bar dataKey="actual" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm uppercase tracking-widest">No trend data available</div>
            )}
          </div>
        </div>

        {/* Pending Dues List */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm overflow-hidden flex flex-col h-[420px]">
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Top Pending Dues</h4>
          </div>
          <div className="overflow-auto scrollbar-thin scrollbar-thumb-slate-200 pr-2">
            <table className="w-full text-left min-w-[350px]">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</th>
                  <th className="py-3 px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Due Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pendingStudents.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2 text-xs font-black text-slate-700">
                      <div>{row.name}</div>
                      <div className="text-[9px] text-slate-400">{row.id}</div>
                    </td>
                    <td className="py-4 px-2 text-[10px] font-bold text-slate-500">{row.course}</td>
                    <td className="py-4 px-2 text-right">
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black tracking-widest">
                        ₹{row.remaining.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
                {pendingStudents.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-400 font-bold text-xs uppercase tracking-widest">No pending dues</td>
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
