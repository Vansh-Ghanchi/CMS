import FacultyLayout from "../../../layouts/FacultyLayout";
import { 
  BookOpen, 
  PlayCircle, 
  Filter, 
  Plus, 
  FileText, 
  Download, 
  Clock, 
  PlusCircle, 
  FileUp,
  History,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const CourseRow = ({ name, id, level, duration, fees, enrollment, maxEnrollment, status, progress }) => (
  <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-all cursor-pointer group">
    <td className="py-5 px-8">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
             <BookOpen className="w-5 h-5 text-[#0284c7]" />
          </div>
          <div className="flex flex-col">
             <span className="text-[14px] font-bold text-[#0f172a] leading-none mb-1.5">{name}</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">{id} • {level}</span>
          </div>
       </div>
    </td>
    <td className="py-5 px-8">
       <span className="text-[12px] font-bold text-[#0f172a] uppercase tracking-tight">{duration}</span>
    </td>
    <td className="py-5 px-8">
       <span className="text-[12px] font-bold text-[#0f172a]">{fees}</span>
    </td>
    <td className="py-5 px-8 min-w-[180px]">
       <div className="flex flex-col gap-2">
          <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
             <div 
               className={`h-full rounded-full ${status === 'FULL' ? 'bg-rose-500' : 'bg-[#0284c7]'}`} 
               style={{ width: `${progress}%` }} 
             />
          </div>
          <p className="text-[10px] font-bold text-[#0f172a] tracking-tight">{enrollment} / <span className="text-slate-400 opacity-60">{maxEnrollment}</span></p>
       </div>
    </td>
    <td className="py-5 px-8 text-right">
       <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] leading-none ${
         status === 'ONGOING' ? 'bg-emerald-50 text-emerald-600' : 
         status === 'ENROLLING' ? 'bg-indigo-50 text-[#0284c7]' : 
         'bg-rose-50 text-rose-600'
       }`}>
          {status}
       </span>
    </td>
  </tr>
);

export default function FacultyCoursePage() {
  return (
    <div className="animate-in fade-in duration-500">
      <CourseManagement noLayout={true} hideStats={true} />
    </div>
  );
}
