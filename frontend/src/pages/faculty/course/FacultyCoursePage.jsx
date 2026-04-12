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
  <tr className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all cursor-pointer group">
    <td className="py-7 pl-0">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9] shadow-sm flex items-center justify-center overflow-hidden shrink-0">
             <div className="w-full h-full bg-slate-200 animate-pulse" />
          </div>
          <div className="flex flex-col">
             <span className="text-[14px] font-black text-[#1E293B] leading-none mb-1.5">{name}</span>
             <span className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60">{id} • {level}</span>
          </div>
       </div>
    </td>
    <td className="py-7 text-[12px] font-bold text-[#1E293B] uppercase tracking-tight">{duration}</td>
    <td className="py-7 text-[12px] font-black text-[#1E293B]">{fees}</td>
    <td className="py-7 min-w-[180px]">
       <div className="flex flex-col gap-2">
          <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
             <div 
               className={`h-full rounded-full ${status === 'FULL' ? 'bg-[#EF4444]' : 'bg-primary'}`} 
               style={{ width: `${progress}%` }} 
             />
          </div>
          <p className="text-[10px] font-black text-[#1E293B] tracking-tight">{enrollment} / <span className="opacity-40">{maxEnrollment}</span></p>
       </div>
    </td>
    <td className="py-7 pr-0 text-right">
       <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest leading-none ${
         status === 'ONGOING' ? 'bg-[#ECFDF5] text-[#10B981]' : 
         status === 'ENROLLING' ? 'bg-[#EEF2FF] text-[#6366F1]' : 
         'bg-[#FEF2F2] text-[#EF4444]'
       }`}>
          {status}
       </span>
    </td>
  </tr>
);

export default function FacultyCoursePage() {
  return (
    <FacultyLayout>
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 relative group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start">
               <div className="w-11 h-11 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
               </div>
               <span className="px-3 py-1 bg-[#ECFDF5] text-[#10B981] text-[9px] font-black rounded-md uppercase tracking-widest">+4 this month</span>
             </div>
             <div>
                <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80 block mb-2">Total Courses</span>
                <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none">42</h3>
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start">
               <div className="w-11 h-11 bg-[#F0FDF4] rounded-xl flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-[#10B981]" />
               </div>
               <span className="text-[9px] font-black text-[#64748B] uppercase tracking-widest opacity-60">92% Engagement</span>
             </div>
             <div>
                <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80 block mb-2">Active Courses</span>
                <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none">38</h3>
             </div>
          </div>

          <div className="lg:col-span-2 bg-primary rounded-[28px] p-10 flex items-center justify-between relative overflow-hidden group">
             <div className="z-10 relative">
                <h3 className="text-2xl font-black text-white tracking-tight mb-3">Faculty Spotlight</h3>
                <p className="text-white/60 text-[12px] font-bold leading-relaxed max-w-sm mb-6">
                   Advanced Quantum Mechanics module has seen a 25% increase in enrollment this semester.
                </p>
                <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all backdrop-blur-sm border-none">
                   Review Analytics
                </button>
             </div>
             <div className="z-10 absolute -right-4 -bottom-4 opacity-20">
                <GraduationCap className="w-48 h-48 text-white rotate-[-15deg]" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-primary opacity-50" />
          </div>
       </div>

       <div className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm p-10 flex flex-col gap-10">
          <div className="flex justify-between items-end">
             <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#1E293B] tracking-tight leading-none uppercase tracking-tighter">Course Catalog</h3>
                <p className="text-[12px] font-bold text-[#64748B] opacity-60">Managing the central curriculum and enrollment distribution.</p>
             </div>
             <div className="flex items-center gap-4">
                <button className="flex items-center gap-3 px-6 py-4 bg-[#F1F5F9] text-[#64748B] rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#E2E8F0] transition-all border-none">
                   <Filter className="w-4 h-4" />
                   Filter
                </button>
                <button className="h-[52px] bg-primary text-white px-10 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all border-none flex items-center gap-2">
                   <Plus className="w-5 h-5" />
                   Add Course
                </button>
             </div>
          </div>

          <table className="w-full">
             <thead>
                <tr className="text-left border-b-2 border-[#F1F5F9]">
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Course Name</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Duration</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Fees</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Student Enrollment</th>
                   <th className="pb-8 text-right text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-40">Status</th>
                </tr>
             </thead>
             <tbody>
                <CourseRow name="Advanced Artificial Intelligence" id="CS-402" level="Graduate Level" duration="16 Weeks" fees="$1,250.00" enrollment={124} maxEnrollment={150} status="ONGOING" progress={82} />
                <CourseRow name="Foundations of Modern Ethics" id="PHI-101" level="Undergraduate" duration="12 Weeks" fees="$850.00" enrollment={210} maxEnrollment={500} status="ENROLLING" progress={42} />
                <CourseRow name="Organic Chemistry Lab" id="CHM-205" level="Major Core" duration="18 Weeks" fees="$1,450.00" enrollment={45} maxEnrollment={45} status="FULL" progress={100} />
                <CourseRow name="Macroeconomic Theory II" id="ECO-310" level="Honors" duration="14 Weeks" fees="$1,100.00" enrollment={54} maxEnrollment={75} status="ONGOING" progress={72} />
             </tbody>
          </table>

          <div className="flex items-center justify-between pt-8 border-t border-[#F1F5F9]">
             <p className="text-[12px] font-bold text-[#64748B] opacity-60">Showing <span className="text-[#1E293B]">4 of 42</span> academic courses</p>
             <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center opacity-40 hover:bg-slate-200 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-9 h-9 rounded-lg bg-primary text-white text-[11px] font-black">1</button>
                <button className="w-9 h-9 rounded-lg border border-[#F1F5F9] text-[11px] font-black text-[#64748B]">2</button>
                <button className="w-9 h-9 rounded-lg border border-[#F1F5F9] text-[11px] font-black text-[#64748B]">3</button>
                <button className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center hover:bg-slate-200 transition-all"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
           <div className="lg:col-span-2 bg-[#F1F5F9]/30 rounded-[32px] border border-[#F1F5F9] p-10 flex items-center gap-10 group cursor-pointer hover:bg-white transition-all">
              <div className="w-24 h-24 bg-[#EEF2FF] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                 <FileUp className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                 <h4 className="text-xl font-black text-[#1E293B] mb-2">Bulk Course Import</h4>
                 <p className="text-[12px] font-bold text-[#64748B] leading-relaxed mb-4 max-w-md">
                    Update the entire catalog via CSV or Excel mapping. Ensure column alignment follows the Academic Authority standard.
                 </p>
                 <button className="flex items-center gap-2 text-[11px] font-black text-primary uppercase tracking-widest hover:underline">
                    <Download className="w-4 h-4" /> Download Template
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[32px] border border-[#F1F5F9] p-10 flex flex-col gap-8 shadow-sm">
              <div className="flex justify-between items-center">
                 <h4 className="text-lg font-black text-[#1E293B]">Recent Activity</h4>
                 <History className="w-5 h-5 opacity-40" />
              </div>
              <div className="space-y-8">
                 <div className="flex gap-4 group">
                    <div className="w-1 h-12 bg-primary rounded-full shrink-0" />
                    <div className="flex flex-col gap-1.5">
                       <span className="text-[12px] font-black text-[#1E293B] leading-none">Module Updated</span>
                       <span className="text-[11px] font-bold text-[#64748B]">Quantum Mechanics II fees revised by Admin.</span>
                       <span className="text-[10px] font-bold text-[#64748B] opacity-40">2 hours ago</span>
                    </div>
                 </div>
                 <div className="flex gap-4 group">
                    <div className="w-1 h-12 bg-[#10B981] rounded-full shrink-0" />
                    <div className="flex flex-col gap-1.5">
                       <span className="text-[12px] font-black text-[#1E293B] leading-none">New Course Added</span>
                       <span className="text-[11px] font-bold text-[#64748B]">Introduction to Digital Curating.</span>
                       <span className="text-[10px] font-bold text-[#64748B] opacity-40">Yesterday, 4:30 PM</span>
                    </div>
                 </div>
              </div>
              <button className="w-full py-4 mt-auto bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[11px] font-black text-[#1E293B] uppercase tracking-widest rounded-xl transition-all border-none">
                 View System Log
              </button>
           </div>
       </div>
    </FacultyLayout>
  );
}
