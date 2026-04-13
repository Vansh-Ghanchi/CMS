import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  GraduationCap, 
  CheckCircle, 
  BookOpen, 
  CreditCard, 
  DollarSign, 
  Settings, 
  LogOut,
  Users,
  X,
  HelpCircle as SupportIcon
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ProfileModal from "./ProfileModal";

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  if (!user) return null;

  const role = user.role;
  const isFacultyStudent = role === 'faculty-1';
  const isFacultyAttendance = role === 'faculty-2';
  const isFacultyCourse = role === 'faculty-3';
  const isFacultyFees = role === 'faculty-4';

  const getNavItems = () => {
    if (isFacultyStudent) {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/faculty/dashboard' },
        { label: 'Student Module', icon: GraduationCap, path: '/faculty/student-module' },
      ];
    }
    if (isFacultyAttendance) {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/faculty/dashboard' },
        { label: 'Attendance Module', icon: CheckCircle, path: '/faculty/attendance-module' },
      ];
    }
    if (isFacultyCourse) {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/faculty/dashboard' },
        { label: 'Course Module', icon: BookOpen, path: '/faculty/course-module' },
      ];
    }
    if (isFacultyFees) {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/faculty/dashboard' },
        { label: 'Fees Module', icon: CreditCard, path: '/faculty/fees-module' },
      ];
    }
    // Admin
    return [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/admin', tag: 'CENTRAL MANAGEMENT' },
      { label: 'Student Management', icon: GraduationCap, path: '/admin/students', tag: 'MANAGED BY FACULTY 1' },
      { label: 'Attendance Management', icon: CheckCircle, path: '/admin/attendance', tag: 'MANAGED BY FACULTY 2' },
      { label: 'Course Management', icon: BookOpen, path: '/admin/courses', tag: 'MANAGED BY FACULTY 3' },
      { label: 'Fees Management', icon: CreditCard, path: '/admin/fees', tag: 'MANAGED BY FACULTY 4' },
      { label: 'Faculty Management', icon: Users, path: '/admin/faculty', tag: 'SYSTEM AUTHORITY' },
    ];
  };

  const navItems = getNavItems();

  const handleNavClick = (path) => {
    if (path !== '#') {
      navigate(path);
      if (window.innerWidth < 1024) onClose(); // Close drawer on mobile after nav
    }
  };

  return (
    <aside className="w-[280px] md:w-[300px] bg-[#F1F5F9] border-r border-[#E2E8F0] flex flex-col h-screen shrink-0 overflow-y-auto">
      <div className="p-6 md:p-8">
         <div className="flex items-center justify-between mb-10 md:mb-12">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-[12px] flex items-center justify-center text-white shadow-lg shrink-0">
                  <GraduationCap className="w-6 h-6 md:w-7 md:h-7" />
               </div>
               <div className="whitespace-nowrap">
                  <h1 className="text-xs md:text-sm font-black text-[#1E293B] tracking-tight leading-tight uppercase">Campus Admin</h1>
                  <p className="text-[9px] md:text-[10px] font-bold text-secondary uppercase tracking-widest mt-0.5 md:mt-1 opacity-60">CENTRAL MANAGEMENT</p>
               </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-white rounded-xl transition-all text-slate-400"
            >
               <X className="w-5 h-5" />
            </button>
         </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.path !== '#' && (location.pathname === item.path || (item.path === '/faculty/dashboard' && location.pathname.includes('/faculty/dashboard')));
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs transition-all whitespace-nowrap ${
                  isActive 
                  ? 'bg-white text-primary font-black shadow-sm' 
                  : 'text-[#64748B] hover:bg-white/50 hover:text-on-surface font-bold'
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'opacity-60'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 md:p-8 space-y-4">
         {isFacultyCourse ? (
         <>
         <button 
         onClick={() => setIsSettingsOpen(true)}
         className="w-full flex items-center justify-center gap-3 py-3.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all border-none mb-2"
         >
            <Settings className="w-4 h-4" />
         System Settings
         </button>
         <button className="w-full flex items-center gap-4 px-4 py-2 rounded-lg text-xs font-bold text-[#64748B] hover:bg-white/50">
            <SupportIcon className="w-5 h-5 opacity-40 shrink-0" />
          Support
         </button>
         <button 
         onClick={() => { logout(); navigate('/login'); }}
         className="w-full flex items-center gap-4 px-4 py-2 rounded-lg text-xs font-bold text-[#64748B] hover:bg-white/50"
         >
              <LogOut className="w-5 h-5 opacity-40 shrink-0" />
                Logout
           </button>
         </>
         ) : (
         <>
         {!role.startsWith('faculty') && (
         <button 
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-bold text-[#64748B] hover:bg-white/50"
          >
             <Settings className="w-5 h-5 opacity-60 shrink-0" />
               Settings
         </button>
         )}
         <button 
             onClick={() => { logout(); navigate('/login'); }}
               className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-bold text-[#64748B] hover:bg-white/50"
                >
                     <LogOut className="w-5 h-5 opacity-60 shrink-0" />
                Logout
             </button>
           </>
         )}
      </div>
      <ProfileModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </aside>
  );
}
