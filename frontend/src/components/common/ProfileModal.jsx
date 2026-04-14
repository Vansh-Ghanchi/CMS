import { X, Mail, User, Save, Edit2, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../context/AuthContext";
import { scaleIn, buttonVariants, fadeIn } from "../../utils/motion";

export default function ProfileModal({ isOpen, onClose }) {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState("profile");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Sync state with user context when modal opens or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "Admin",
        email: user.email || "admin@campus.edu",
        avatar: user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      });
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateUser(formData);
    setSuccessMsg("Profile updated successfully");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSavePassword = () => {
    if (passwordData.current !== "Admin123") {
      alert("Current password is incorrect");
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
        alert("New passwords do not match");
        return;
    }
    if (!passwordData.new) {
        alert("Please enter a new password");
        return;
    }
    
    setSuccessMsg("Password updated successfully");
    setPasswordData({ current: "", new: "", confirm: "" });
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md px-6">
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
            <div>
               <h3 className="text-xl font-bold text-[#1E293B] tracking-tight">Admin Settings</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configure your portal credentials</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
             {/* Tabs Toggle */}
             <div className="flex px-10 pt-8 gap-8 border-b border-slate-50 bg-white sticky top-0 z-10">
                {["profile", "password"].map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`pb-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                      {tab} section
                      {activeTab === tab && (
                        <motion.div 
                          layoutId="tab-active" 
                          className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" 
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                   </button>
                ))}
             </div>

             <div className="p-10">
                <AnimatePresence mode="wait">
                   {activeTab === "profile" ? (
                      <motion.div 
                        key="profile"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-10"
                      >
                         <div className="flex items-center gap-8 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                            <div className="relative shrink-0">
                               <div className="w-24 h-24 rounded-[28px] overflow-hidden ring-4 ring-white shadow-xl bg-slate-100 italic flex items-center justify-center text-slate-300">
                                  {formData.avatar ? <img src={formData.avatar} alt="Admin" className="w-full h-full object-cover" /> : <User className="w-10 h-10" />}
                               </div>
                               <button 
                                 onClick={handleImageClick}
                                 className="absolute -bottom-2 -right-2 p-2.5 bg-primary text-white rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-white"
                               >
                                  <Edit2 className="w-3.5 h-3.5" />
                               </button>
                               <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                            </div>
                            <div className="flex flex-col">
                               <h4 className="text-xl font-bold text-[#1E293B] tracking-tight">Identity & Vision</h4>
                               <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-[200px]">Update your public profile information across the system.</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 gap-6">
                            <InputGroup label="Full Name" placeholder="Enter full name" value={formData.name} onChange={(v) => setFormData(p => ({ ...p, name: v }))} icon={User} />
                            <InputGroup label="Email Address" placeholder="Enter email" value={formData.email} onChange={(v) => setFormData(p => ({ ...p, email: v }))} icon={Mail} type="email" />
                         </div>

                         <motion.button 
                           whileHover="hover"
                           whileTap="tap"
                           variants={buttonVariants}
                           onClick={handleSaveProfile}
                           className="w-full h-14 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                         >
                            <Save className="w-4 h-4" />
                            Save Profile Changes
                         </motion.button>
                      </motion.div>
                   ) : (
                      <motion.div 
                        key="password"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-10"
                      >
                         <div className="flex flex-col gap-2">
                            <h4 className="text-lg font-black text-[#1E293B] tracking-tight">Security Access</h4>
                            <p className="text-xs font-bold text-slate-500">Ensure your account remains private with a strong password.</p>
                         </div>

                         <div className="space-y-6">
                            <InputGroup label="Current Password" placeholder="••••••••" value={passwordData.current} onChange={(v) => setPasswordData(p => ({ ...p, current: v }))} icon={ShieldCheck} type="password" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                               <InputGroup label="New Password" placeholder="••••••••" value={passwordData.new} onChange={(v) => setPasswordData(p => ({ ...p, new: v }))} icon={Lock} type="password" />
                               <InputGroup label="Confirm Password" placeholder="••••••••" value={passwordData.confirm} onChange={(v) => setPasswordData(p => ({ ...p, confirm: v }))} icon={Lock} type="password" />
                            </div>
                         </div>

                         <motion.button 
                           whileHover="hover"
                           whileTap="tap"
                           variants={buttonVariants}
                           onClick={handleSavePassword}
                           className="w-full h-14 bg-on-surface text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-on-surface/10 hover:opacity-90 transition-all flex items-center justify-center gap-3"
                         >
                            <Lock className="w-4 h-4" />
                            Update Security Key
                         </motion.button>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>
          
          {/* Status Message Footer */}
          <AnimatePresence>
             {successMsg && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0 }}
                 className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-2.5 rounded-full flex items-center gap-3 shadow-2xl z-[110]"
               >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{successMsg}</span>
               </motion.div>
             )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function InputGroup({ label, placeholder, value, onChange, icon: Icon, type = "text" }) {
  return (
    <div className="space-y-2 group">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">{label}</label>
       <div className="relative">
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <motion.input 
            whileFocus={{ scale: 1.01 }}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white border border-[#f1f5f9] rounded-xl px-4 py-2.5 pl-10 text-[14px] font-medium outline-none focus:ring-4 focus:ring-[#0284c7]/10 focus:border-[#0284c7] transition-all text-[#1E293B] placeholder:text-[#94a3b8]"
          />
       </div>
    </div>
  );
}
