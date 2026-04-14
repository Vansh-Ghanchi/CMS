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
    <FacultyLayout>
      <div className="mb-10">
         <h1 className="text-[20px] font-black text-[#0284c7] tracking-tight leading-none mb-10">Academic Authority</h1>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 relative group hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer">
               <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80">Total Enrollment</span>
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                     <Users className="w-5 h-5 text-[#0284c7]" />
                  </div>
               </div>
               <div>
                  <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none mb-3">1,284</h3>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest"><span className="text-sm">+4.2%</span> vs last semester</p>
               </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 relative group hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer">
               <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80">New Registrations</span>
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                     <UserPlus className="w-5 h-5 text-[#0284c7]" />
                  </div>
               </div>
               <div>
                  <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none mb-3">42</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">last 30 days</p>
               </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-6 relative group hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer">
               <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80">Distribution</span>
                  <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                     <div className="flex -space-x-1 items-end">
                        <div className="w-1 h-3 bg-[#0284c7]" />
                        <div className="w-1 h-5 bg-[#0284c7]" />
                        <div className="w-1 h-4 bg-[#0284c7]" />
                     </div>
                  </div>
               </div>
               <div>
                  <div className="flex items-center gap-8 mb-4">
                     <div>
                        <h4 className="text-xl font-bold text-[#0f172a] leading-none mb-1">1,120</h4>
                        <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ACTIVE
                        </p>
                     </div>
                     <div>
                        <h4 className="text-xl font-bold text-[#0f172a] leading-none mb-1">164</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none flex items-center gap-1.5 opacity-60">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-200" /> INACTIVE
                        </p>
                     </div>
                  </div>
                  <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                     <div className="w-[88%] h-full bg-[#0284c7] rounded-full shadow-sm" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#f1f5f9] shadow-sm p-10 flex flex-col gap-10">
         <div className="flex justify-between items-start">
            <div>
               <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight mb-2 leading-none">Student Directory</h3>
               <p className="text-[12px] font-bold text-slate-400 opacity-60">Manage enrollment, contact information, and academic status.</p>
            </div>
            <button className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium rounded-xl px-4 py-2.5 transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-500/20 self-end">
               <Plus className="w-5 h-5" />
               Add Student
            </button>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex-1 relative group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 opacity-40 group-focus-within:text-[#0284c7]" />
               <input 
                  type="text" 
                  placeholder="Search by name, email or student ID..."
                  className="w-full bg-white border border-[#f1f5f9] rounded-xl px-4 py-2.5 pl-12 text-[14px] font-medium outline-none focus:ring-4 focus:ring-[#0284c7]/10 focus:border-[#0284c7] transition-all duration-200 placeholder:text-[#94a3b8] text-[#0f172a]"
               />
            </div>
            <button className="bg-slate-50 text-[#0f172a] border border-[#e2e8f0] rounded-xl px-4 py-2.5 font-medium hover:bg-slate-100 transition-all duration-200 active:scale-95 flex items-center gap-3">
               <Filter className="w-4 h-4" />
               Filters
            </button>
            <button className="bg-slate-50 text-[#0f172a] border border-[#e2e8f0] rounded-xl px-4 py-2.5 font-medium hover:bg-slate-100 transition-all duration-200 active:scale-95 flex items-center gap-3">
               <Download className="w-4 h-4" />
               Export
            </button>
         </div>

         <div className="bg-white rounded-[24px] border border-[#e2e8f0] overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
               <table className="w-full text-left min-w-[800px]">
                  <thead>
                     <tr className="bg-[#f8fafc]">
                        <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">NAME</th>
                        <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">CONTACT INFO</th>
                        <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">COURSE</th>
                        <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">STATUS</th>
                        <th className="py-5 px-8 text-right text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                     <StudentRow name="Elena Rodriguez" id="#AA-88421" email="elena.r@university.edu" phone="+1 (555) 012-3456" course="Biomedical Engineering" year="Year 3 • Semester 2" status="ACTIVE" />
                     <StudentRow name="Marcus Thorne" id="#AA-88492" email="m.thorne@university.edu" phone="+1 (555) 098-7654" course="Computer Science" year="Year 2 • Semester 1" status="ACTIVE" />
                     <StudentRow name="Sarah Jenkins" id="#AA-88501" email="s.jenkins@university.edu" phone="+1 (555) 123-9876" course="Political Science" year="Year 4 • Graduating" status="INACTIVE" />
                     <StudentRow name="David Chen" id="#AA-88515" email="d.chen@university.edu" phone="+1 (555) 345-6789" course="Theoretical Physics" year="Year 1 • Semester 1" status="ACTIVE" />
                  </tbody>
               </table>
            </div>
         </div>

         <div className="flex items-center justify-between pt-10 border-t border-[#f1f5f9]">
              <p className="text-[12px] font-bold text-slate-400 opacity-60">Showing <span className="text-[#0f172a]">1 to 4</span> of <span className="text-[#0f172a]">1,284</span> students</p>
              <div className="flex items-center gap-2">
                 <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#f1f5f9] text-slate-400 transition-all duration-200 opacity-40 cursor-not-allowed">
                    <Filter className="w-4 h-4 rotate-90" />
                 </button>
                 <button className="w-9 h-9 rounded-lg bg-[#0284c7] text-white text-[11px] font-bold transition-all duration-200 active:scale-95">1</button>
                 <button className="w-9 h-9 rounded-lg bg-white border border-[#f1f5f9] text-[#0f172a] text-[11px] font-bold hover:bg-[#f8fafc] transition-all duration-200 active:scale-95">2</button>
                 <button className="w-9 h-9 rounded-lg bg-white border border-[#f1f5f9] text-[#0f172a] text-[11px] font-bold hover:bg-[#f8fafc] transition-all duration-200 active:scale-95">3</button>
                 <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#f1f5f9] text-slate-400 hover:bg-slate-200 transition-all duration-200 active:scale-95">
                    <Filter className="w-4 h-4 -rotate-90" />
                 </button>
              </div>
         </div>
      </div>
    </FacultyLayout>
  );
}
