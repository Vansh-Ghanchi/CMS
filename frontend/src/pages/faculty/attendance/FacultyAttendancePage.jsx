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
  <tr className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all cursor-pointer group">
    <td className="py-5">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F1F5F9] border-none shrink-0 overflow-hidden flex items-center justify-center text-primary font-black text-xs uppercase">
           {name[0]}
        </div>
        <span className="text-[13px] font-black text-[#1E293B]">{name}</span>
      </div>
    </td>
    <td className="py-5">
       <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
         status === 'PRESENT' ? 'bg-[#ECFDF5] text-[#10B981]' : 
         status === 'ABSENT' ? 'bg-[#FEF2F2] text-[#EF4444]' : 
         'bg-[#FFFBEB] text-[#F59E0B]'
       }`}>
          {status}
       </span>
    </td>
    <td className="py-5">
       <span className="text-[11px] font-bold text-[#64748B] opacity-60 uppercase tracking-tight">{date}</span>
    </td>
    <td className="py-5 text-right">
       <div className="flex items-center justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
          <X className="w-4 h-4 text-[#EF4444] cursor-pointer hover:scale-125 transition-transform" />
          <Clock className="w-4 h-4 text-[#F59E0B] cursor-pointer hover:scale-125 transition-transform" />
          <Check className="w-4 h-4 text-[#10B981] cursor-pointer hover:scale-125 transition-transform" />
       </div>
    </td>
  </tr>
);

export default function FacultyAttendancePage() {
  return (
    <FacultyLayout>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start z-10">
                <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80">Today's Attendance %</span>
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                   <BarChart2 className="w-5 h-5 text-primary" />
                </div>
             </div>
             <div className="z-10">
                <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none mb-3">94.2%</h3>
                <p className="text-[10px] font-black text-[#10B981] uppercase tracking-widest flex items-center gap-1.5">
                   <CheckCircle className="w-3.5 h-3.5" /> 2.1% from yesterday
                </p>
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start">
                <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80">Total Records</span>
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                   <Database className="w-5 h-5 text-primary" />
                </div>
             </div>
             <div>
                <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none mb-3">1,248</h3>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest opacity-60">This academic semester</p>
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start">
                <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80">Missing Entries</span>
                <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
                   <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
             </div>
             <div>
                <h3 className="text-4xl font-black text-[#EF4444] tracking-tighter leading-none mb-3">12</h3>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest opacity-60">Requiring immediate action</p>
             </div>
          </div>
       </div>

       <div className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm p-10 flex flex-col gap-10">
          <div className="flex justify-between items-end">
             <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#1E293B] tracking-tight leading-none uppercase tracking-tighter">Mark Attendance</h3>
                <p className="text-[12px] font-bold text-[#64748B] opacity-60">Update student status for the selected lecture and date.</p>
             </div>
             <div className="flex items-center gap-6">
                <div className="space-y-1.5">
                   <p className="text-[10px] font-black text-secondary uppercase tracking-widest opacity-60 px-1">Lecture Date</p>
                   <div className="flex items-center gap-3 bg-[#F1F5F9] px-4 py-2.5 rounded-xl text-[11px] font-black text-[#1E293B]">
                      <Calendar className="w-4 h-4 text-primary" />
                      24 - 10 - 2023
                   </div>
                </div>
                <div className="space-y-1.5">
                   <p className="text-[10px] font-black text-secondary uppercase tracking-widest opacity-60 px-1">Select Course</p>
                   <div className="flex items-center gap-3 bg-[#F1F5F9] px-4 py-2.5 rounded-xl text-[11px] font-black text-[#1E293B] min-w-[280px] justify-between">
                      CS-402: Quantum Computing Basics
                      <ChevronDown className="w-4 h-4 opacity-40" />
                   </div>
                </div>
                <button className="h-[46px] bg-primary text-white px-8 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 self-end">
                   <CheckCircle className="w-4 h-4" />
                   Mark All Present
                </button>
             </div>
          </div>

          <table className="w-full">
             <thead>
                <tr className="text-left">
                   <th className="pb-6 text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Student Name</th>
                   <th className="pb-6 text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Status</th>
                   <th className="pb-6 text-[10px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Date</th>
                   <th className="pb-6 text-right text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Quick Action</th>
                </tr>
             </thead>
             <tbody>
                <AttendanceRow name="Alexander Jenkins" status="PRESENT" date="Oct 24, 2023" />
                <AttendanceRow name="Sarah Lawrence" status="ABSENT" date="Oct 24, 2023" />
                <AttendanceRow name="Marcus Peterson" status="LATE" date="Oct 24, 2023" />
                <AttendanceRow name="Elena Rodriguez" status="PRESENT" date="Oct 24, 2023" />
             </tbody>
          </table>

          <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9]">
             <p className="text-[12px] font-bold text-[#64748B] opacity-60">Showing 4 of 32 students in Quantum Computing Basics</p>
             <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center opacity-40"><ChevronDown className="w-4 h-4 rotate-90" /></button>
                <button className="w-8 h-8 rounded-lg bg-primary text-white text-[11px] font-black">1</button>
                <button className="w-8 h-8 rounded-lg border border-[#F1F5F9] text-[11px] font-black text-[#64748B]">2</button>
                <button className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div className="bg-primary rounded-[28px] p-10 flex flex-col justify-between overflow-hidden relative group">
             <div className="z-10">
                <h3 className="text-2xl font-black text-white tracking-tight mb-4">Automated Reports</h3>
                <p className="text-white/60 text-[12px] font-bold leading-relaxed max-w-sm">
                   Generate weekly attendance summaries for faculty review with one click. Compliant with institutional standards.
                </p>
             </div>
             <button className="w-fit mt-10 bg-white/20 hover:bg-white/30 text-white rounded-xl px-8 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all z-10 backdrop-blur-sm">
                Download Last Week
             </button>
             <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          </div>

          <div className="bg-[#F1F5F9]/30 rounded-[28px] p-10 flex flex-col gap-6">
             <h3 className="text-xl font-black text-[#1E293B] tracking-tight">Quick Attendance Tips</h3>
             <ul className="space-y-4">
                <li className="flex items-start gap-4 text-[#64748B] text-[12px] font-bold leading-relaxed">
                   <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5"><Info className="w-3.5 h-3.5 text-primary" /></div>
                   Attendance marked after 15 minutes of lecture start is automatically flagged as "Late".
                </li>
                <li className="flex items-start gap-4 text-[#64748B] text-[12px] font-bold leading-relaxed">
                   <div className="w-6 h-6 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0 mt-0.5"><Info className="w-3.5 h-3.5 text-primary" /></div>
                   Records are immutable after 24 hours of the lecture date. Contact IT for corrections.
                </li>
             </ul>
          </div>
       </div>
    </FacultyLayout>
  );
}
