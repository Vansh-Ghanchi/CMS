import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";
import ProfileModal from "./ProfileModal";

export default function Header({ title, sub, showSearch = true, onMenuClick }) {
  const { searchQuery, setSearchQuery } = useSearch();
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="h-[70px] md:h-[90px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 md:px-10 sticky top-0 z-40 shrink-0">
         <div className="flex items-center gap-4">
            <button 
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-all text-slate-500"
            >
               <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
               <h2 className="text-xl md:text-2xl font-bold text-[#1E293B] tracking-normal leading-tight mb-0.5 md:mb-1">
                  {title}
               </h2>
               <p className="text-[13px] font-medium text-[#64748B] opacity-60 truncate max-w-[120px] md:max-w-none">
                  {sub}
               </p>
            </div>
         </div>
         
         <div className="flex items-center gap-8">
            {showSearch && (
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline opacity-40 group-focus-within:text-[#0284c7]" />
                 <input 
                    type="text" 
                    placeholder="Search records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 bg-white border border-[#f1f5f9] rounded-xl px-4 py-2.5 pl-10 text-[14px] font-medium focus:ring-4 focus:ring-[#0284c7]/10 focus:border-[#0284c7] outline-none placeholder:text-[#94a3b8] transition-all text-on-surface"
                 />
              </div>
            )}
            
            <div className="flex items-center gap-6">
               <button className="relative p-2 rounded-full hover:bg-[#F1F5F9] transition-all">
                  <Bell className="w-[20px] h-[20px] text-[#1E293B]" />
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full border border-white" />
               </button>
             <div 
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 rounded-full overflow-hidden border-none shadow-sm cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all ml-2"
              >
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
             </div>
            </div>
         </div>
      </header>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        user={user}
      />
    </>
  );
}
