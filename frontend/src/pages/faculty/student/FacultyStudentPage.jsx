import FacultyLayout from "../../../layouts/FacultyLayout";
import { Users, UserPlus, Filter, Download, User, MoreVertical, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

const StudentRow = ({ name, id, email, phone, course, year, status }) => (
  <tr className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all cursor-pointer group">
    <td className="py-6 pl-0">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#F1F5F9] border-none shadow-sm shrink-0">
           <div className="w-full h-full bg-[#E2E8F0] flex items-center justify-center text-primary font-black uppercase text-xs">
              {name[0]}
           </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-black text-[#1E293B] leading-none mb-1.5">{name}</span>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 leading-none">ID: {id}</span>
        </div>
      </div>
    </td>
    <td className="py-6">
       <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#1E293B]">{email}</span>
          <span className="text-[10px] font-bold text-secondary opacity-60">{phone}</span>
       </div>
    </td>
    <td className="py-6">
       <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-black text-primary leading-none uppercase tracking-tight">{course}</span>
          <span className="text-[10px] font-bold text-secondary opacity-60 uppercase tracking-widest">{year}</span>
       </div>
    </td>
    <td className="py-6">
       <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest leading-none ${
         status === 'ACTIVE' ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FEF2F2] text-[#EF4444]'
       }`}>
          {status}
       </span>
    </td>
    <td className="py-6 pr-0 text-right">
       <MoreVertical className="w-5 h-5 text-outline opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer inline-block" />
    </td>
  </tr>
);

export default function FacultyStudentPage() {
  return (
    <FacultyLayout>
      <div className="mb-10">
         <h1 className="text-[20px] font-black text-primary tracking-tight leading-none mb-10">Academic Authority</h1>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Enrollment */}
            <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 relative group hover:shadow-lg transition-all cursor-pointer">
               <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80">Total Enrollment</span>
                  <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                     <Users className="w-5 h-5 text-primary" />
                  </div>
               </div>
               <div>
                  <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none mb-3">1,284</h3>
                  <p className="text-[10px] font-black text-[#10B981] uppercase tracking-widest"><span className="text-sm">+4.2%</span> vs last semester</p>
               </div>
            </div>

            {/* New Registrations */}
            <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 relative group hover:shadow-lg transition-all cursor-pointer">
               <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80">New Registrations</span>
                  <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                     <UserPlus className="w-5 h-5 text-primary" />
                  </div>
               </div>
               <div>
                  <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none mb-3">42</h3>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60"><span className="px-2 py-0.5 bg-[#EEF2FF] text-primary rounded mr-2 font-black">Recent</span> last 30 days</p>
               </div>
            </div>

            {/* Student Status Distribution */}
            <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-6 relative group hover:shadow-lg transition-all cursor-pointer">
               <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80">Student Status Distribution</span>
                  <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center opacity-40">
                     <div className="flex -space-x-1 items-end">
                        <div className="w-1 h-3 bg-primary" />
                        <div className="w-1 h-5 bg-primary" />
                        <div className="w-1 h-4 bg-primary" />
                     </div>
                  </div>
               </div>
               <div>
                  <div className="flex items-center gap-8 mb-4">
                     <div>
                        <h4 className="text-xl font-black text-[#1E293B] leading-none mb-1">1,120</h4>
                        <p className="text-[9px] font-black text-[#10B981] uppercase tracking-widest leading-none flex items-center gap-1.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" /> ACTIVE STUDENTS
                        </p>
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-[#1E293B] leading-none mb-1">164</h4>
                        <p className="text-[9px] font-black text-[#64748B] uppercase tracking-widest leading-none flex items-center gap-1.5 opacity-60">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#E2E8F0]" /> ON LEAVE / INACTIVE
                        </p>
                     </div>
                  </div>
                  <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                     <div className="w-[88%] h-full bg-primary rounded-full shadow-sm" />
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Student Directory Table Container */}
      <div className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm p-10 flex flex-col gap-10">
         <div className="flex justify-between items-start">
            <div>
               <h3 className="text-2xl font-black text-[#1E293B] tracking-tight mb-2 leading-none uppercase tracking-tighter">Student Directory</h3>
               <p className="text-[12px] font-bold text-[#64748B] opacity-60">Manage enrollment, contact information, and academic status.</p>
            </div>
            <button className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all border-none">
               <Plus className="w-4 h-4" />
               Add Student
            </button>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex-1 relative group">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-outline opacity-40 group-focus-within:text-primary" />
               <input 
                  type="text" 
                  placeholder="Search by name, email or student ID..."
                  className="w-full bg-[#F8FAFC] border-none rounded-xl py-4 pl-14 pr-6 text-[12px] font-bold outline-none focus:ring-4 focus:ring-primary/5 transition-all"
               />
            </div>
            <button className="flex items-center gap-3 px-6 py-4 bg-[#F8FAFC] text-[#64748B] rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#F1F5F9] transition-all border-none">
               <Filter className="w-4 h-4" />
               Filters
            </button>
            <button className="flex items-center gap-3 px-6 py-4 bg-[#F8FAFC] text-[#64748B] rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#F1F5F9] transition-all border-none">
               <Download className="w-4 h-4" />
               Export
            </button>
         </div>

         <table className="w-full text-left">
            <thead>
               <tr className="border-b-2 border-[#F1F5F9]">
                  <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">NAME</th>
                  <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">CONTACT INFO</th>
                  <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">COURSE</th>
                  <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">STATUS</th>
                  <th className="pb-8 text-right text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">ACTIONS</th>
               </tr>
            </thead>
            <tbody>
               <StudentRow name="Elena Rodriguez" id="#AA-88421" email="elena.r@university.edu" phone="+1 (555) 012-3456" course="Biomedical Engineering" year="Year 3 • Semester 2" status="ACTIVE" />
               <StudentRow name="Marcus Thorne" id="#AA-88492" email="m.thorne@university.edu" phone="+1 (555) 098-7654" course="Computer Science" year="Year 2 • Semester 1" status="ACTIVE" />
               <StudentRow name="Sarah Jenkins" id="#AA-88501" email="s.jenkins@university.edu" phone="+1 (555) 123-9876" course="Political Science" year="Year 4 • Graduating" status="INACTIVE" />
               <StudentRow name="David Chen" id="#AA-88515" email="d.chen@university.edu" phone="+1 (555) 345-6789" course="Theoretical Physics" year="Year 1 • Semester 1" status="ACTIVE" />
            </tbody>
         </table>

         <div className="flex items-center justify-between pt-10 border-t border-[#F1F5F9]">
             <p className="text-[12px] font-black text-secondary  opacity-60">Showing <span className="text-[#1E293B]">1 to 4</span> of <span className="text-[#1E293B]">1,284</span> students</p>
             <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#F1F5F9] text-[#64748B] hover:bg-slate-200 transition-all opacity-40 cursor-not-allowed">
                   <Filter className="w-4 h-4 rotate-90" />
                </button>
                <button className="w-9 h-9 rounded-lg bg-primary text-white text-[11px] font-black shadow-lg shadow-primary/20">1</button>
                <button className="w-9 h-9 rounded-lg bg-white border border-[#F1F5F9] text-[#64748B] text-[11px] font-black hover:bg-[#F8FAFC]">2</button>
                <button className="w-9 h-9 rounded-lg bg-white border border-[#F1F5F9] text-[#64748B] text-[11px] font-black hover:bg-[#F8FAFC]">3</button>
                <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#F1F5F9] text-[#64748B] hover:bg-slate-200 transition-all">
                   <Filter className="w-4 h-4 -rotate-90" />
                </button>
             </div>
          </div>
      </div>
    </FacultyLayout>
  );
}
