import FacultyLayout from "../../../layouts/FacultyLayout";
import { Users, UserPlus, Filter, Download, User, MoreVertical, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

const StudentRow = ({ name, id, email, phone, course, year, status }) => (
  <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer group">
    <td className="py-5 px-8">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#f1f5f9] border-none shadow-sm shrink-0">
           <div className="w-full h-full bg-[#e2e8f0] flex items-center justify-center text-[#0284c7] font-bold uppercase text-xs transition-transform duration-200 group-hover:scale-110">
              {name[0]}
           </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-[#0f172a] leading-none mb-1.5">{name}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 leading-none">ID: {id}</span>
        </div>
      </div>
    </td>
    <td className="py-5 px-8">
       <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#0f172a]">{email}</span>
          <span className="text-[10px] font-bold text-slate-400 opacity-60">{phone}</span>
       </div>
    </td>
    <td className="py-5 px-8">
       <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#0284c7] leading-none uppercase tracking-tight">{course}</span>
          <span className="text-[10px] font-bold text-slate-400 opacity-60 uppercase tracking-widest">{year}</span>
       </div>
    </td>
    <td className="py-5 px-8">
       <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] leading-none ${
         status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
       }`}>
          {status}
       </span>
    </td>
    <td className="py-5 px-8 text-right">
       <MoreVertical className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer inline-block" />
    </td>
  </tr>
);

export default function FacultyStudentPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <StudentManagement noLayout={true} hideStats={true} />
    </div>
  );
}
