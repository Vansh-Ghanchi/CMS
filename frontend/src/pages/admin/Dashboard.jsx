import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { Users, CheckCircle, BookOpen, CreditCard, User, X, Mail, Save, Edit2, ChevronDown } from "lucide-react";
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend, Label
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../../context/SearchContext";

const feeData = [
  { name: 'JAN 25', actual: 450000 },
  { name: 'FEB 25', actual: 480000 },
  { name: 'MAR 25', actual: 520000 },
  { name: 'APR 25', actual: 500000 },
  { name: 'MAY 25', actual: 550000 },
  { name: 'JUN 25', actual: 600000 },
  { name: 'JUL 25', actual: 580000 },
  { name: 'AUG 25', actual: 620000 },
  { name: 'SEP 25', actual: 650000 },
  { name: 'OCT 25', actual: 700000 },
  { name: 'NOV 25', actual: 750000 },
  { name: 'DEC 25', actual: 800000 },
  { name: 'JAN 26', actual: 850000 },
  { name: 'FEB 26', actual: 920000 },
  { name: 'MAR 26', actual: 950000 },
  { name: 'APR 26', actual: 980000 },
];

const ENROLLMENT_CATEGORIES = [
  { name: 'B-Tech (CS)', color: '#4F46E5' },
  { name: 'B-Tech (CSE)', color: '#7C3AED' },
  { name: 'B-Tech (AI)', color: '#3B82F6' },
  { name: 'BSC (IT)', color: '#10B981' },
  { name: 'MSC (IT) INT', color: '#F59E0B' },
  { name: 'BCA', color: '#EF4444' },
];

const enrollmentStatsByMonth = {
  "2025-0": [35, 25, 15, 10, 8, 7], // JAN 25
  "2025-1": [34, 26, 14, 11, 8, 7],
  "2025-2": [33, 27, 13, 12, 8, 7],
  "2025-3": [36, 24, 16, 9, 8, 7],
  "2025-4": [32, 28, 12, 13, 8, 7],
  "2025-5": [38, 22, 18, 7, 8, 7],
  "2025-6": [30, 30, 10, 15, 8, 7],
  "2025-7": [40, 20, 20, 5, 8, 7],
  "2025-8": [37, 23, 17, 8, 8, 7],
  "2025-9": [35, 25, 15, 10, 8, 7],
  "2025-10": [34, 26, 14, 11, 8, 7],
  "2025-11": [33, 27, 13, 12, 8, 7], // DEC 25
  "2026-0": [42, 18, 22, 3, 9, 6],   // JAN 26
  "2026-1": [40, 20, 20, 5, 10, 5],
  "2026-2": [38, 22, 18, 7, 11, 4],
  "2026-3": [45, 15, 25, 2, 8, 5],   // APR 26
};

const enrollmentDataMapping = (year, month) => {
  const key = `${year}-${month}`;
  const values = enrollmentStatsByMonth[key] || [45, 15, 25, 2, 8, 5];
  return ENROLLMENT_CATEGORIES.map((cat, i) => ({
    ...cat,
    value: values[i]
  }));
};

const attendanceData = [
  { name: 'SEP', value: 85 },
  { name: 'OCT', value: 92 },
  { name: 'NOV', value: 88 },
  { name: 'DEC', value: 95 },
  { name: 'JAN', value: 94 },
  { name: 'FEB', value: 96 },
];

const initialFaculties = [
  { id: 'f1', name: "Sarah Gilbert", title: "STUDENT MANAGEMENT", status: "Active", courses: "24", email: "Student@gmail.com", color: "bg-indigo-600", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 'f2', name: "Mark Zuckerberg", title: "ATTENDANCE MANAGEMENT", status: "Active", courses: "12", email: "Attendance@gmail.com", color: "bg-emerald-600", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 'f3', name: "Elena Salvatore", title: "COURSE MANAGEMENT", status: "Active", courses: "8", email: "Course@gmail.com", color: "bg-rose-600", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  { id: 'f4', name: "Bruce Wayne", title: "FEES MANAGEMENT", status: "Active", courses: "15", email: "Fees@gmail.com", color: "bg-amber-600", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
];

const StatCard = ({ icon: Icon, title, value, badge, color }) => (
  <div className="bg-white rounded-[32px] p-10 flex flex-col gap-6 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-slate-200 relative group hover:shadow-2xl hover:shadow-black/5 active:scale-[0.98] transition-all cursor-pointer">
    <div className="flex justify-between items-start">
      <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center`}>
         <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
        badge === 'Optimal' || badge === 'Target Met' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-primary'
      }`}>
        {badge}
      </div>
    </div>
    
    <div>
      <p className="text-[10px] font-black text-secondary uppercase tracking-[0.25em] mb-2 opacity-60 leading-none">{title}</p>
      <h3 className="text-4xl font-black text-on-surface tracking-tighter leading-none">{value}</h3>
    </div>
  </div>
);

const FacultyCard = ({ name, title, status, courses, color, avatar, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-[24px] p-6 pr-10 flex items-center gap-6 shadow-sm border border-slate-200 shadow-black/5 hover:shadow-lg transition-all cursor-pointer group"
  >
     <div className={`w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-100`}>
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary font-bold">{name?.[0]}</div>
        )}
     </div>
     <div className="flex flex-col gap-1.5">
        <h4 className="text-base font-black text-on-surface leading-none tracking-tight">{name}</h4>
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest opacity-60 leading-none">{title}</p>
        <div className="flex items-center gap-4 mt-1">
           <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest leading-none ${
             status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-primary'
           }`}>{status}</span>
           <span className="text-[9px] font-bold text-secondary">{courses} Courses</span>
        </div>
     </div>
  </div>
);

const FacultyModal = ({ isOpen, onClose, faculty, onSave }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    title: ""
  });

  useEffect(() => {
    if (faculty) {
      setFormData({
        name: faculty.name || "",
        email: faculty.email || "",
        avatar: faculty.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        title: faculty.title || ""
      });
    }
  }, [faculty, isOpen]);

  if (!isOpen || !faculty) return null;

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-black text-[#1E293B] tracking-tight">Faculty Details</h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-10 space-y-8">
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/10 shadow-lg bg-slate-100">
                  <img src={formData.avatar} alt="Faculty" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-all border-2 border-white"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-black text-[#1E293B] tracking-tight">{formData.name}</h4>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1 opacity-60">{formData.title}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Module / Role</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all text-on-surface"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-3"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AdminHome() {
  const { searchQuery } = useSearch();
  const [faculties, setFaculties] = useState(() => {
    const saved = localStorage.getItem('admin_faculty_overview');
    return saved ? JSON.parse(saved) : initialFaculties;
  });
  const navigate = useNavigate();
  const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());
  
  // Student Enrollment filters
  const [enrollmentYear, setEnrollmentYear] = useState(new Date().getFullYear());
  const [enrollmentMonth, setEnrollmentMonth] = useState(new Date().getMonth());

  const currentEnrollmentData = useMemo(() => {
    return enrollmentDataMapping(enrollmentYear, enrollmentMonth);
  }, [enrollmentYear, enrollmentMonth]);

  const attendanceChartData = useMemo(() => {
    const baseData = [
      { name: 'JUL', value: 82 },
      { name: 'AUG', value: 88 },
      { name: 'SEP', value: 85 },
      { name: 'OCT', value: 92 },
      { name: 'NOV', value: 88 },
      { name: 'DEC', value: 95 },
      { name: 'JAN', value: 94 },
      { name: 'FEB', value: 96 },
      { name: 'MAR', value: 91 },
      { name: 'APR', value: 87 },
      { name: 'MAY', value: 83 },
      { name: 'JUN', value: 89 },
    ];
    // Dynamic seed based on year relative to 2024
    const seed = academicYear === '2026' ? 1.1 : (academicYear === '2025' ? 1.05 : 1);
    return baseData.map(item => ({
      ...item,
      value: Math.min(100, Math.round(item.value * seed))
    }));
  }, [academicYear]);

  useEffect(() => {
    try {
      localStorage.setItem('admin_faculty_overview', JSON.stringify(faculties));
    } catch (e) {
      console.warn('Storage quota exceeded. Changes might not persist across reloads.');
    }
  }, [faculties]);

  const filteredFaculty = useMemo(() => {
    return faculties.filter(f => 
       f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       f.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [faculties, searchQuery]);


  return (
    <AdminLayout>
      {/* Page Title & Actions */}
      <div className="mb-14 flex items-end justify-between">
        <div>
           <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">MANAGEMENT PORTAL</p>
           <h2 className="text-6xl font-black text-[#0B1C30] tracking-tighter leading-none">System Overview</h2>
        </div>
        <div className="flex gap-4">
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
        <StatCard title="Total Students" value="2,450" badge="+12.5%" icon={Users} color="bg-indigo-600" />
        <StatCard title="Attendance %" value="92%" badge="Optimal" icon={CheckCircle} color="bg-emerald-600" />
        <StatCard title="Total Courses" value="48" badge="8 Active" icon={BookOpen} color="bg-amber-600" />
        <StatCard title="Fees Collected" value="$1.2M" badge="Target Met" icon={CreditCard} color="bg-indigo-600" />
      </div>

      {/* Middle Grid: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
        {/* Fees Collection Trend */}
        <div className="lg:col-span-2 bg-white rounded-[40px] p-12 border border-slate-200 shadow-sm shadow-black/5 min-h-[500px]">
           <div className="flex justify-between items-start mb-14">
              <div>
                 <h3 className="text-2xl font-black text-on-surface tracking-tight mb-2">Fee Collection Trends</h3>
                 <p className="text-xs font-bold text-secondary opacity-60">Projection vs Actual Collection for FY {academicYear}</p>
              </div>
           </div>
           
           <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="h-80 min-w-[1200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={feeData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                       <defs>
                         <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                       <XAxis 
                          dataKey="name" 
                          fontSize={10} 
                          fontWeight={900} 
                          axisLine={false} 
                          tickLine={false} 
                          dy={10}
                       >
                          <Label value="Time (Months / Year)" offset={-15} position="insideBottom" fontSize={9} fontWeight={900} fill="#94A3B8" />
                       </XAxis>
                       <YAxis 
                          fontSize={10} 
                          fontWeight={900} 
                          axisLine={false} 
                          tickLine={false} 
                          tickFormatter={(value) => {
                              if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
                              if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
                              return `₹${value}`;
                           }}
                       >
                          <Label value="Amount Collected (₹)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={10} fontSize={9} fontWeight={900} fill="#94A3B8" />
                       </YAxis>
                       <Tooltip 
                          cursor={{ stroke: '#4F46E5', strokeWidth: 1 }} 
                          contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', padding: '12px' }}
                          itemStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}
                          labelStyle={{ fontSize: '10px', fontWeight: 900, marginBottom: '4px', color: '#64748B' }}
                          formatter={(value) => [`₹${value.toLocaleString()}`, "Collection Amount"]}
                       />
                       <Legend 
                          verticalAlign="top" 
                          align="right" 
                          iconType="circle"
                          content={({ payload }) => (
                             <div className="flex gap-4 mb-8">
                                {payload.map((entry, index) => (
                                   <div key={`item-${index}`} className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Collection Amount</span>
                                   </div>
                                ))}
                             </div>
                          )}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="actual" 
                          stroke="#4F46E5" 
                          strokeWidth={4} 
                          fillOpacity={1} 
                          fill="url(#colorWave)" 
                          dot={{ r: 4, fill: '#FFFFFF', stroke: '#4F46E5', strokeWidth: 2 }}
                          activeDot={{ r: 6, fill: '#4F46E5', stroke: '#FFFFFF', strokeWidth: 2 }}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Student Enrollment Donut */}
        <div className="bg-[#EFF4FF] rounded-[40px] p-12 border border-blue-100 shadow-sm shadow-black/5 flex flex-col min-h-[500px]">
           <div className="flex justify-between items-start mb-10 w-full">
              <h3 className="text-2xl font-black text-[#0B1C30] tracking-tight">Student Enrollment</h3>
              <div className="flex gap-2">
                 <select 
                   value={enrollmentYear} 
                   onChange={(e) => setEnrollmentYear(Number(e.target.value))}
                   className="bg-white/50 border-none outline-none text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg cursor-pointer appearance-none"
                 >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                 </select>
                 <select 
                   value={enrollmentMonth} 
                   onChange={(e) => setEnrollmentMonth(Number(e.target.value))}
                   className="bg-white/50 border-none outline-none text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg cursor-pointer appearance-none"
                 >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i}>{m}</option>
                    ))}
                 </select>
              </div>
           </div>
           
           <div className="relative w-full h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', padding: '12px' }}
                        itemStyle={{ color: '#1E293B', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}
                        formatter={(value, name) => [`${value}%`, name]}
                     />
                    <Pie
                      data={currentEnrollmentData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {currentEnrollmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-4xl font-black text-on-surface tracking-tighter leading-none">
                    {currentEnrollmentData.reduce((acc, curr) => acc + curr.value, 0)}%
                 </span>
                 <span className="text-[10px] font-black text-secondary uppercase tracking-widest mt-2">Distribution</span>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-10 w-full">
              <div className="space-y-4">
                 {currentEnrollmentData.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                       <span className="text-[10px] font-black text-secondary uppercase tracking-tight truncate">{item.name}</span>
                    </div>
                 ))}
              </div>
              <div className="space-y-4">
                 {currentEnrollmentData.slice(3, 6).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                       <span className="text-[10px] font-black text-secondary uppercase tracking-tight truncate">{item.name}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Attendance Overview (Long Bar Chart) */}
      <div className="bg-white rounded-[40px] p-12 border border-slate-200 shadow-sm shadow-black/5 mb-14">
        <div className="flex justify-between items-start mb-14">
           <h3 className="text-2xl font-black text-on-surface tracking-tight leading-none uppercase">Monthly Attendance Overview</h3>
           <div className="px-5 py-2 bg-slate-50 flex items-center gap-2 rounded-full cursor-pointer hover:bg-slate-100 transition-colors">
              <select 
                value={academicYear} 
                onChange={(e) => setAcademicYear(e.target.value)}
                className="bg-transparent border-none outline-none text-secondary text-[10px] font-black uppercase tracking-widest cursor-pointer appearance-none"
              >
                <option value="2024">Academic Year 2024</option>
                <option value="2025">Academic Year 2025</option>
                <option value="2026">Academic Year 2026</option>
              </select>
              <ChevronDown className="w-3 h-3 text-secondary" />
           </div>
        </div>
        <div className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
           <div className="h-64 min-w-[1000px]">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={attendanceChartData}>
                    <XAxis dataKey="name" fontSize={10} fontWeight={900} axisLine={false} tickLine={false} dy={20} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', padding: '12px' }}
                       itemStyle={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}
                       labelStyle={{ fontSize: '10px', fontWeight: 900, marginBottom: '4px', color: '#64748B' }}
                       formatter={(value) => [`${value}%`, "Attendance"]}
                    />
                    <Bar dataKey="value" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={32} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Faculty Section */}
      <div className="space-y-10">
         <div className="flex justify-between items-end">
            <h3 className="text-3xl font-black text-[#0B1C30] tracking-tighter leading-none">Faculty Overview</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredFaculty.map((faculty) => (
               <FacultyCard 
                 key={faculty.id} 
                 {...faculty} 
                 onClick={() => navigate('/admin/faculty', { 
                    state: { 
                        selectedFacultyId: faculty.id, 
                        facultyName: faculty.name,
                        facultyRole: faculty.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
                    } 
                 })}
               />
            ))}
         </div>
      </div>
    </AdminLayout>
  );
}
