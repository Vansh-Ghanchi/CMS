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
import AttendanceManagement from "../../admin/attendance/AttendanceManagement";
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
    <div className="animate-in fade-in duration-500">
      <AttendanceManagement noLayout={true} hideStats={true} />
    </div>
  );
}
