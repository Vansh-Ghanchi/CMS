import React, { useMemo } from 'react';
import { DollarSign, CreditCard, Clock, PieChart as PieChartIcon } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function FacultyFeesDashboard() {
  const { fees } = useAdminData();

  const financeStats = useMemo(() => {
    const totalCollected = fees.reduce((sum, f) => sum + (f.paid || 0), 0);
    const totalPending = fees.reduce((sum, f) => sum + (f.remaining || 0), 0);
    const recentTransactions = fees.reduce((sum, f) => sum + (f.history?.length || 0), 0);
    
    return {
      collected: `₹${(totalCollected / 100000).toFixed(1)}L`,
      pending: `₹${(totalPending / 100000).toFixed(1)}L`,
      transactions: recentTransactions
    };
  }, [fees]);

  const chartData = useMemo(() => {
    const paid = fees.reduce((sum, f) => sum + (f.paid || 0), 0);
    const due = fees.reduce((sum, f) => sum + (f.remaining || 0), 0);
    return [
      { name: 'Paid', value: paid, color: '#10B981' },
      { name: 'Due', value: due, color: '#F59E0B' }
    ];
  }, [fees]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Fees Dashboard</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Financial collections and revenue oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Collected" value={financeStats.collected} icon={DollarSign} color="bg-emerald-600" />
        <StatCard title="Pending Dues" value={financeStats.pending} icon={Clock} color="bg-amber-600" />
        <StatCard title="Total Payments" value={financeStats.transactions} icon={CreditCard} color="bg-indigo-600" />
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <PieChartIcon className="w-5 h-5" />
          </div>
          <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">Revenue Distribution (Paid vs Due)</h4>
        </div>
        <div className="h-80 w-full">
          {fees.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm uppercase tracking-widest">No financial data found</div>
          )}
        </div>
      </div>
    </div>
  );
}
