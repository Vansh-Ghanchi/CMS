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
    <FacultyLayout>
       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-10">
          <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 relative group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                   <BookOpen className="w-5 h-5 text-[#0284c7]" />
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-bold rounded-md uppercase tracking-widest">+4 this month</span>
             </div>
             <div>
                <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80 block mb-2">Total Courses</span>
                <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none">42</h3>
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center">
                   <PlayCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest opacity-60">92% Engagement</span>
             </div>
             <div>
                <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80 block mb-2">Active Courses</span>
                <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none">38</h3>
             </div>
          </div>

          <div className="lg:col-span-2 bg-[#0284c7] rounded-[28px] p-10 flex items-center justify-between relative overflow-hidden group">
             <div className="z-10 relative">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">Faculty Spotlight</h3>
                <p className="text-white/60 text-[12px] font-bold leading-relaxed max-w-sm mb-6">
                   Advanced Quantum Mechanics module has seen a 25% increase in enrollment this semester.
                </p>
                <button className="bg-white/20 hover:bg-white/30 text-white rounded-xl px-4 py-2.5 font-medium transition-all backdrop-blur-sm active:scale-95 border-none">
                   Review Analytics
                </button>
             </div>
             <div className="z-10 absolute -right-4 -bottom-4 opacity-20">
                <GraduationCap className="w-48 h-48 text-white rotate-[-15deg]" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-[#0284c7] via-indigo-600 to-[#0284c7] opacity-50" />
          </div>
       </div>

       <div className="bg-white rounded-[32px] border border-[#f1f5f9] shadow-sm p-10 flex flex-col gap-10">
          <div className="flex justify-between items-end">
             <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#0f172a] tracking-tight leading-none">Course Catalog</h3>
                <p className="text-[12px] font-bold text-slate-400 opacity-60">Managing the central curriculum and enrollment distribution.</p>
             </div>
             <div className="flex items-center gap-4">
                <button className="bg-slate-50 text-[#0f172a] border border-[#e2e8f0] rounded-xl px-4 py-2.5 font-medium hover:bg-slate-100 transition-all flex items-center gap-3 active:scale-95">
                   <Filter className="w-5 h-5" />
                   Filter
                </button>
                <button className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium rounded-xl px-4 py-2.5 transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                   <Plus className="w-5 h-5" />
                   Add Course
                </button>
             </div>
          </div>

          <div className="bg-white rounded-[24px] border border-[#e2e8f0] overflow-hidden shadow-sm">
             <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                <table className="w-full text-left min-w-[1000px]">
                   <thead>
                      <tr className="bg-[#f8fafc]">
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Course Name</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Duration</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Fees</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Student Enrollment</th>
                         <th className="py-5 px-8 text-right text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#f1f5f9]">
                      <CourseRow name="Advanced Artificial Intelligence" id="CS-402" level="Graduate Level" duration="16 Weeks" fees="$1,250.00" enrollment={124} maxEnrollment={150} status="ONGOING" progress={82} />
                      <CourseRow name="Foundations of Modern Ethics" id="PHI-101" level="Undergraduate" duration="12 Weeks" fees="$850.00" enrollment={210} maxEnrollment={500} status="ENROLLING" progress={42} />
                      <CourseRow name="Organic Chemistry Lab" id="CHM-205" level="Major Core" duration="18 Weeks" fees="$1,450.00" enrollment={45} maxEnrollment={45} status="FULL" progress={100} />
                      <CourseRow name="Macroeconomic Theory II" id="ECO-310" level="Honors" duration="14 Weeks" fees="$1,100.00" enrollment={54} maxEnrollment={75} status="ONGOING" progress={72} />
                   </tbody>
                </table>
             </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-[#f1f5f9]">
             <p className="text-[12px] font-bold text-slate-400 opacity-60">Showing <span className="text-[#0f172a]">4 of 42</span> academic courses</p>
             <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center opacity-40 hover:bg-slate-200 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                <button className="w-9 h-9 rounded-lg bg-[#0284c7] text-white text-[11px] font-bold">1</button>
                <button className="w-9 h-9 rounded-lg border border-[#f1f5f9] text-[11px] font-bold text-slate-400 hover:bg-slate-100">2</button>
                <button className="w-9 h-9 rounded-lg border border-[#f1f5f9] text-[11px] font-bold text-slate-400 hover:bg-slate-100">3</button>
                <button className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center hover:bg-slate-200 transition-all"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
           <div className="lg:col-span-2 bg-slate-50 rounded-[32px] border border-[#f1f5f9] p-10 flex items-center gap-10 group cursor-pointer hover:bg-white transition-all">
              <div className="w-24 h-24 bg-white border border-[#f1f5f9] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                 <FileUp className="w-10 h-10 text-[#0284c7]" />
              </div>
              <div className="flex-1">
                 <h4 className="text-xl font-bold text-[#0f172a] mb-2">Bulk Course Import</h4>
                 <p className="text-[12px] font-bold text-slate-400 leading-relaxed mb-4 max-w-md">
                    Update the entire catalog via CSV or Excel mapping. Ensure column alignment follows the Academic Authority standard.
                 </p>
                 <button className="flex items-center gap-2 text-[11px] font-bold text-[#0284c7] uppercase tracking-widest hover:underline">
                    <Download className="w-4 h-4" /> Download Template
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-[32px] border border-[#f1f5f9] p-10 flex flex-col gap-8 shadow-sm">
              <div className="flex justify-between items-center">
                 <h4 className="text-lg font-bold text-[#0f172a]">Recent Activity</h4>
                 <History className="w-5 h-5 text-slate-300" />
              </div>
              <div className="space-y-8">
                 <div className="flex gap-4 group">
                    <div className="w-1 h-12 bg-[#0284c7] rounded-full shrink-0" />
                    <div className="flex flex-col gap-1.5">
                       <span className="text-[12px] font-bold text-[#0f172a] leading-none">Module Updated</span>
                       <span className="text-[11px] font-bold text-slate-400">Quantum Mechanics II fees revised by Admin.</span>
                       <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest opacity-60">2 hours ago</span>
                    </div>
                 </div>
                 <div className="flex gap-4 group">
                    <div className="w-1 h-12 bg-emerald-500 rounded-full shrink-0" />
                    <div className="flex flex-col gap-1.5">
                       <span className="text-[12px] font-bold text-[#0f172a] leading-none">New Course Added</span>
                       <span className="text-[11px] font-bold text-slate-400">Introduction to Digital Curating.</span>
                       <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest opacity-60">Yesterday, 4:30 PM</span>
                    </div>
                 </div>
              </div>
               <button className="w-full bg-slate-50 text-[#0f172a] border border-[#e2e8f0] rounded-xl px-4 py-2.5 font-bold text-[12px] hover:bg-slate-100 transition-all active:scale-95 mt-auto shadow-sm">
                  View System Log
               </button>
           </div>
       </div>
    </FacultyLayout>
  );
}
