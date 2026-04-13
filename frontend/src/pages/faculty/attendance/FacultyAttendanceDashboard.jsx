import React, { useMemo } from 'react';
import { Calendar, UserCheck, AlertCircle, Users } from 'lucide-react';
import { useAdminData } from '../../../context/AdminDataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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

export default function FacultyAttendanceDashboard() {
  const { students, attendanceLogs, attendanceTrends } = useAdminData();

  const stats = useMemo(() => {
    const totalStudents = students.length;
    // Derive dates from logs
    const uniqueDates = [...new Set(attendanceLogs.map(l => l.date))];
    const totalClasses = uniqueDates.length;
    
    let presentToday = 0;
    let absentToday = 0;
    let todayPercentage = "0.0";
    
    if (uniqueDates.length > 0) {
      // Find the most recent date as "Today"
      const sortedDates = uniqueDates.sort((a,b) => new Date(b) - new Date(a));
      const latestDate = sortedDates[0];
      
      const todayLogs = attendanceLogs.filter(l => l.date === latestDate);
      presentToday = todayLogs.filter(l => l.status === "Present").length;
      absentToday = todayLogs.length - presentToday;
      // Note: Using todayLogs.length instead of totalStudents in case some were not marked
      todayPercentage = todayLogs.length > 0 ? ((presentToday / todayLogs.length) * 100).toFixed(1) : "0.0";
    }

    return { totalClasses, todayPercentage, presentToday, absentToday };
  }, [students, attendanceLogs]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Attendance Dashboard</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Real-time engagement tracking</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Classes" value={stats.totalClasses} icon={Calendar} color="bg-indigo-600" />
        <StatCard title="Today's Agg %" value={`${stats.todayPercentage}%`} icon={Activity} color="bg-blue-600" />
        <StatCard title="Present Today" value={stats.presentToday} icon={UserCheck} color="bg-emerald-600" />
        <StatCard title="Absent Today" value={stats.absentToday} icon={AlertCircle} color="bg-rose-600" />
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <h4 className="text-lg font-black text-[#1E293B] mb-6 uppercase tracking-tight">Historical Attendance Trends</h4>
        <div className="h-80 w-full">
          {attendanceTrends && attendanceTrends.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fontWeight: 900, fill: '#94A3B8' }} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ stroke: '#E2E8F0', strokeWidth: 2 }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={4} dot={{ r: 4, fill: '#4F46E5', strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-400 font-bold text-sm tracking-widest uppercase">Insufficient Logs</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Activity(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  );
}
