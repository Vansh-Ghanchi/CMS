import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { UserPlus, ShieldAlert, Mail, Phone, Lock, User, Briefcase, Image as ImageIcon, CheckCircle2, AlertCircle, ChevronDown, UserSquare2 } from "lucide-react";
import { motion } from "framer-motion";

const FACULTY_ROLES = [
  "Student Management",
  "Attendance Management",
  "Course Management",
  "Fees Management"
];

const INITIAL_FACULTIES = [
  { id: 'f1', name: "Sarah Gilbert", email: "student@college.com", role: "Student Management" },
  { id: 'f2', name: "Mark Zuckerberg", email: "attendance@college.com", role: "Attendance Management" },
  { id: 'f3', name: "Elena Salvatore", email: "course@college.com", role: "Course Management" },
  { id: 'f4', name: "Bruce Wayne", email: "fees@college.com", role: "Fees Management" },
];

export default function FacultyManagement() {
  // Registration State
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Student Management",
    employeeId: "",
    password: "",
    confirmPassword: "",
    avatar: ""
  });

  // Password Reset State
  const [resetForm, setResetForm] = useState({
    facultyId: "",
    fullName: "",
    role: "Student Management",
    newPassword: "",
    confirmPassword: ""
  });

  const location = useLocation();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
     if (location.state?.selectedFacultyId) {
        setResetForm(prev => ({
           ...prev,
           facultyId: location.state.selectedFacultyId,
           fullName: location.state.facultyName || "",
           role: location.state.facultyRole || "Student Management"
        }));
     }
  }, [location]);

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegisterForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    if (name === 'facultyId') {
      const selected = INITIAL_FACULTIES.find(f => f.id === value);
      setResetForm(prev => ({ 
        ...prev, 
        [name]: value,
        fullName: selected ? selected.name : "",
        role: selected ? selected.role : "Student Management"
      }));
    } else {
      setResetForm({ ...resetForm, [name]: value });
    }
  };

  const showNotification = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    if (Object.values(registerForm).some((val, i) => i !== 4 && val === "")) {
      showNotification("Please fill all required fields", "error");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }
    showNotification("Faculty account created successfully!");
    setRegisterForm({
      name: "", email: "", phone: "", role: "Student Management", employeeId: "", password: "", confirmPassword: ""
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!resetForm.facultyId || !resetForm.newPassword || !resetForm.confirmPassword) {
      showNotification("Please fill all fields", "error");
      return;
    }
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }
    showNotification("Password updated successfully!");
    setResetForm({ facultyId: "", fullName: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <AdminLayout>
      <div className="mb-2 flex flex-col">
         <h2 className="text-xl font-black text-[#0B1C30] tracking-tighter leading-none">Faculty Management</h2>
         <p className="text-[9px] pt-1 font-bold text-slate-400 uppercase tracking-widest italic leading-none">Control authority and system permissions</p>
      </div>

      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-10 right-10 z-[200] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest ${
            notification.type === "success" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {notification.msg}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        {/* Left Section: Faculty Registration */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-4 shadow-sm shadow-black/5">
           <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                 <UserPlus className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                 <h3 className="text-sm font-black text-on-surface tracking-tight uppercase">Faculty Registration</h3>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Onboard new academic members</p>
              </div>
           </div>

           <form onSubmit={handleCreateFaculty} className="space-y-2" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                       <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <input 
                         type="text" 
                         name="name"
                         value={registerForm.name}
                         onChange={handleRegisterChange}
                         placeholder="Enter faculty name"
                         className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                       />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <input 
                         type="email" 
                         name="email"
                         value={registerForm.email}
                         onChange={handleRegisterChange}
                         autoComplete="off"
                         placeholder="faculty@college.com"
                         className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                       />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                       <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <input 
                         type="tel" 
                         name="phone"
                         value={registerForm.phone}
                         onChange={handleRegisterChange}
                         placeholder="+92 3XX XXXXXXX"
                         className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                       />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Role</label>
                    <div className="relative">
                       <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <select 
                         name="role"
                         value={registerForm.role}
                         onChange={handleRegisterChange}
                         className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-10 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                       >
                         {FACULTY_ROLES.map(role => <option key={role}>{role}</option>)}
                       </select>
                       <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    </div>
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Employee ID</label>
                 <div className="relative">
                    <UserSquare2 className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      name="employeeId"
                      value={registerForm.employeeId}
                      onChange={handleRegisterChange}
                      placeholder="e.g. EMP-2024-001"
                      className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                    />
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Profile Image</label>
                 <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shrink-0 overflow-hidden border border-slate-100">
                       {registerForm.avatar ? (
                         <img src={registerForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                       ) : (
                         <ImageIcon className="w-4 h-4" />
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">
                         {registerForm.avatar ? "Image selected" : "Click to upload image"}
                       </p>
                       <p className="text-[8px] font-bold text-slate-400 uppercase">JPG, PNG or GIF (MAX. 2MB)</p>
                    </div>
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept="image/*" 
                    />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                    <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <input 
                         type="password" 
                         name="password"
                         value={registerForm.password}
                         onChange={handleRegisterChange}
                         autoComplete="new-password"
                         placeholder="••••••••"
                         className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                       />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                    <div className="relative">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                       <input 
                         type="password" 
                         name="confirmPassword"
                         value={registerForm.confirmPassword}
                         onChange={handleRegisterChange}
                         placeholder="••••••••"
                         className="w-full h-11 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                       />
                    </div>
                 </div>
              </div>

              <div className="pt-1">
                 <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <UserPlus className="w-3.5 h-3.5" />
                    Create Account
                 </button>
              </div>
           </form>
        </div>

        {/* Right Section: Faculty Password Reset */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-4 shadow-sm shadow-black/5">
           <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center">
                 <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div>
                 <h3 className="text-sm font-black text-on-surface tracking-tight uppercase">Password Reset</h3>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Manage security credentials</p>
              </div>
           </div>

           <form onSubmit={handleUpdatePassword} className="space-y-2">
              <div className="space-y-0.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Faculty</label>
                 <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      name="facultyId"
                      value={resetForm.facultyId}
                      onChange={handleResetChange}
                      className="w-full h-10 bg-slate-50 border-none rounded-xl border border-slate-100 pl-11 pr-10 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                    >
                      <option value="" hidden>Select a Faculty Member</option>
                      {INITIAL_FACULTIES.map(f => (
                        <option key={f.id} value={f.id}>{f.name} - {f.email}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 </div>
               </div>

               <div className="space-y-0.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <input 
                       type="text" 
                       name="fullName"
                       value={resetForm.fullName}
                       onChange={handleResetChange}
                       readOnly
                       placeholder="Select faculty to autofill"
                       className="w-full h-10 bg-slate-50 border-none rounded-xl border border-slate-100 pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none opacity-80" 
                     />
                  </div>
               </div>

               <div className="space-y-0.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Role</label>
                  <div className="relative">
                     <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <select 
                       name="role"
                       value={resetForm.role}
                       onChange={handleResetChange}
                       disabled
                       className="w-full h-10 bg-slate-50 border-none rounded-xl border border-slate-100 pl-11 pr-10 text-xs font-bold transition-all outline-none appearance-none opacity-80"
                     >
                       {FACULTY_ROLES.map(role => <option key={role}>{role}</option>)}
                     </select>
                     <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
               </div>

              <div className="space-y-0.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      name="newPassword"
                      value={resetForm.newPassword}
                      onChange={handleResetChange}
                      placeholder="••••••••"
                      className="w-full h-10 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                    />
                 </div>
              </div>

              <div className="space-y-0.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                 <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={resetForm.confirmPassword}
                      onChange={handleResetChange}
                      placeholder="••••••••"
                      className="w-full h-10 bg-slate-50 border-none rounded-xl pl-11 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                    />
                 </div>
              </div>

              <div className="pt-1">
                 <button type="submit" className="w-full py-3 bg-[#1E293B] text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Update Password
                 </button>
              </div>
           </form>

           {/* Security Note */}
           <div className="mt-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex gap-2">
                 <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                 <p className="text-[9px] font-bold text-slate-500 leading-tight italic uppercase tracking-wider">
                    Administrative authority warning: Password resets take effect immediately.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
}
