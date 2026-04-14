import FacultyLayout from "../../../layouts/FacultyLayout";
import { 
  CheckCircle, 
  Calendar, 
  ChevronDown, 
  X, 
  Clock, 
  Check, 
  Download, 
  Info,
  Database,
  BarChart2,
  AlertCircle
} from "lucide-react";

const AttendanceRow = ({ name, status, date }) => (
  <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer group">
    <td className="py-5 px-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#f1f5f9] border-none shrink-0 overflow-hidden flex items-center justify-center text-[#0284c7] font-bold text-xs uppercase transition-transform duration-200 group-hover:scale-110">
           {name[0]}
        </div>
        <span className="text-[13px] font-bold text-[#0f172a]">{name}</span>
      </div>
    </td>
    <td className="py-5 px-8">
       <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] ${
         status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600' : 
         status === 'ABSENT' ? 'bg-rose-50 text-rose-600' : 
         'bg-amber-50 text-amber-600'
       }`}>
          {status}
       </span>
    </td>
    <td className="py-5 px-8">
       <span className="text-[11px] font-bold text-slate-400 opacity-60 uppercase tracking-tight">{date}</span>
    </td>
    <td className="py-5 px-8 text-right">
       <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
          <X className="w-4 h-4 text-rose-500 cursor-pointer hover:scale-125 transition-transform" />
          <Clock className="w-4 h-4 text-amber-500 cursor-pointer hover:scale-125 transition-transform" />
          <Check className="w-4 h-4 text-emerald-500 cursor-pointer hover:scale-125 transition-transform" />
       </div>
    </td>
  </tr>
);

export default function FacultyAttendancePage() {
  return (
    <FacultyLayout>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer">
             <div className="flex justify-between items-start z-10">
                <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80">Today's Attendance %</span>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                   <BarChart2 className="w-5 h-5 text-[#0284c7]" />
                </div>
             </div>
             <div className="z-10">
                <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none mb-3">94.2%</h3>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                   <CheckCircle className="w-3.5 h-3.5" /> 2.1% from yesterday
                </p>
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 group hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer relative overflow-hidden">
             <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80">Total Records</span>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                   <Database className="w-5 h-5 text-[#0284c7]" />
                </div>
             </div>
             <div>
                <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none mb-3">1,248</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">This academic semester</p>
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-rose-50 shadow-sm flex flex-col gap-8 group hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer relative overflow-hidden text-rose-500 border-rose-100">
             <div className="flex justify-between items-start">
                <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80">Missing Entries</span>
                <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                   <AlertCircle className="w-5 h-5 text-rose-500" />
                </div>
             </div>
             <div>
                <h3 className="text-4xl font-bold text-rose-500 tracking-tighter leading-none mb-3">12</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Requiring immediate action</p>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-[32px] border border-[#f1f5f9] shadow-sm p-10 flex flex-col gap-10">
          <div className="flex justify-between items-end">
             <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#0f172a] tracking-tight leading-none uppercase tracking-tighter">Mark Attendance</h3>
                <p className="text-[12px] font-bold text-slate-400 opacity-60">Update student status for the selected lecture and date.</p>
             </div>
             <div className="flex items-center gap-6">
                 <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-[#475569] ml-1">Lecture Date</p>
                   <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl text-[11px] font-bold text-[#0f172a]">
                      <Calendar className="w-4 h-4 text-[#0284c7]" />
                      24 - 10 - 2023
                   </div>
                </div>
                 <div className="flex flex-col gap-1">
                   <label className="text-[13px] font-medium text-[#475569] mb-1 block px-1">Select Course</label>
                   <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl text-[11px] font-bold text-[#0f172a] min-w-[250px] justify-between cursor-pointer border border-transparent hover:border-slate-200 transition-all duration-200 active:scale-95">
                      CS-402: Quantum Computing Basics
                      <ChevronDown className="w-4 h-4 text-[#0284c7]" />
                   </div>
                </div>
                 <button className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium rounded-xl px-4 py-2.5 transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-500/20 self-end">
                    <CheckCircle className="w-4 h-4" />
                    Mark All Present
                 </button>
             </div>
          </div>

          <div className="bg-white rounded-[24px] border border-[#e2e8f0] overflow-hidden shadow-sm">
             <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                <table className="w-full text-left min-w-[800px]">
                   <thead>
                      <tr className="bg-[#f8fafc]">
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Student Name</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Status</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Date</th>
                         <th className="py-5 px-8 text-right text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Quick Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#f1f5f9]">
                      <AttendanceRow name="Alexander Jenkins" status="PRESENT" date="Oct 24, 2023" />
                      <AttendanceRow name="Sarah Lawrence" status="ABSENT" date="Oct 24, 2023" />
                      <AttendanceRow name="Marcus Peterson" status="LATE" date="Oct 24, 2023" />
                      <AttendanceRow name="Elena Rodriguez" status="PRESENT" date="Oct 24, 2023" />
                   </tbody>
                </table>
             </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-[#f1f5f9]">
             <p className="text-[12px] font-bold text-slate-400 opacity-60">Showing 4 of 32 students in Quantum Computing Basics</p>
             <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center opacity-40 hover:bg-slate-200 transition-all duration-200"><ChevronDown className="w-4 h-4 rotate-90" /></button>
                <button className="w-8 h-8 rounded-lg bg-[#0284c7] text-white text-[11px] font-bold transition-all duration-200 active:scale-95">1</button>
                <button className="w-8 h-8 rounded-lg border border-[#f1f5f9] text-[11px] font-bold text-slate-400 hover:bg-slate-50 transition-all duration-200 active:scale-95">2</button>
                <button className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-200 transition-all duration-200 active:scale-95"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-[#0284c7] rounded-[28px] p-10 flex flex-col justify-between overflow-hidden relative group">
             <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-4">Automated Reports</h3>
                <p className="text-white/60 text-[12px] font-bold leading-relaxed max-w-sm">
                   Generate weekly attendance summaries for faculty review with one click. Compliant with institutional standards.
                </p>
             </div>
             <button className="w-fit mt-10 bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2.5 font-medium transition-all backdrop-blur-sm active:scale-95 z-10 border-none">
                Download Last Week
             </button>
             <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-br from-[#0284c7] via-indigo-600 to-[#0284c7] opacity-50" />
          </div>

          <div className="bg-slate-50 rounded-[28px] border border-[#f1f5f9] p-10 flex flex-col gap-6">
             <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">Quick Attendance Tips</h3>
             <ul className="space-y-4">
                <li className="flex items-start gap-4 text-slate-400 text-[12px] font-bold leading-relaxed">
                   <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5"><Info className="w-3.5 h-3.5 text-[#0284c7]" /></div>
                   <span>Attendance marked after 15 minutes of lecture start is automatically flagged as "Late".</span>
                </li>
                <li className="flex items-start gap-4 text-slate-400 text-[12px] font-bold leading-relaxed">
                   <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5"><Info className="w-3.5 h-3.5 text-[#0284c7]" /></div>
                   <span>Records are immutable after 24 hours of the lecture date. Contact IT for corrections.</span>
                </li>
             </ul>
          </div>
       </div>
    </FacultyLayout>
  );
}
