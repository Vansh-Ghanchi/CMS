import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import { CheckCircle, Clock, Calendar, AlertCircle, Mail, User, ShieldCheck, Download, Filter as FilterIcon, Search, RotateCcw, ChevronLeft, ChevronRight, MoreHorizontal, X, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

const INITIAL_STUDENTS = [
  { id: "STU-1001", name: "Ayesha Khan", institute: "GIT", course: "B-Tech (CS)", status: "Present", phone: "+91 98765 43210", admissionDate: "15 Jan 2024", checkIn: "09:05 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 38, percentage: 84.4 },
  { id: "STU-1002", name: "Muhammad Ali", institute: "GIT", course: "B-Tech (CSE)", status: "Present", phone: "+91 98765 43211", admissionDate: "20 Feb 2024", checkIn: "09:10 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 42, percentage: 93.3 },
  { id: "STU-1003", name: "Zainab Fatima", institute: "GICSA", course: "BSC (IT)", status: "Absent", phone: "+91 98765 43212", admissionDate: "10 Mar 2024", checkIn: "-", remarks: "Sick Leave", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 30, percentage: 66.7 },
  { id: "STU-1004", name: "Hamza Ahmed", institute: "GIT", course: "B-Tech (AI)", status: "Present", phone: "+91 98765 43213", admissionDate: "05 Apr 2024", checkIn: "09:15 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 40, percentage: 88.9 },
  { id: "STU-1005", name: "Sara Siddiqui", institute: "GICSA", course: "MSC (IT) INT", status: "Absent", phone: "+91 98765 43214", admissionDate: "18 Apr 2024", checkIn: "-", remarks: "Not Marked", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 35, percentage: 77.8 },
  { id: "STU-1006", name: "Bilal Hussain", institute: "GICSA", course: "BCA", status: "Present", phone: "+91 98765 43215", admissionDate: "22 Apr 2024", checkIn: "09:00 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 44, percentage: 97.8 },
  { id: "STU-1007", name: "Laiba Noor", institute: "GIT", course: "B-Tech (CS)", status: "Present", phone: "+91 98765 43216", admissionDate: "08 May 2024", checkIn: "09:08 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 39, percentage: 86.7 },
  { id: "STU-1008", name: "Omar Farooq", institute: "GICSA", course: "BSC (IT)", status: "Present", phone: "+91 98765 43217", admissionDate: "12 May 2024", checkIn: "09:12 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 41, percentage: 91.1 },
  { id: "STU-1009", name: "Hina Riaz", institute: "GIT", course: "B-Tech (CSE)", status: "Absent", phone: "+91 98765 43218", admissionDate: "14 May 2024", checkIn: "-", remarks: "Hospitalized", avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 25, percentage: 55.6 },
  { id: "STU-1010", name: "Zaid Ali", institute: "GICSA", course: "BCA", status: "Present", phone: "+91 98765 43219", admissionDate: "18 May 2024", checkIn: "08:58 AM", remarks: "-", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", totalClasses: 45, attended: 43, percentage: 95.6 },
];

export default function AttendanceManagement() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(true);
  const itemsPerPage = 7;

  // Filter States
  const [filters, setFilters] = useState({
    date: new Date().toISOString().split('T')[0],
    institute: "",
    course: "",
    status: "All Status",
    search: ""
  });

  // Automatically apply filters when any field changes
  useEffect(() => {
    const hasInteracted = filters.date !== "" || 
                         filters.course !== "" || 
                         filters.institute !== "" || 
                         filters.status !== "All Status" || 
                         filters.search !== "";
    
    if (hasInteracted) {
      setIsFilterApplied(true);
    }
  }, [filters]);

  const handleReset = () => {
    setFilters({
      date: new Date().toISOString().split('T')[0],
      institute: "",
      course: "",
      status: "All Status",
      search: ""
    });
    setIsFilterApplied(true);
    setSelectedStudent(null);
    setCurrentPage(1);
  };

  const filteredStudents = useMemo(() => {
    if (!filters.institute || !filters.course) return [];

    return students.filter(s => {
      const matchesInstitute = s.institute === filters.institute;
      const matchesCourse = s.course === filters.course;
      const matchesStatus = filters.status === "All Status" || s.status === filters.status;
      const matchesSearch = !filters.search || 
                           s.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           s.id.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesInstitute && matchesCourse && matchesStatus && matchesSearch;
    });
  }, [students, filters]);

  // Column definitions for TanStack Table
  const columns = useMemo(() => [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => column.toggleSorting()}>
          STUDENT ID
          <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      cell: ({ row }) => <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
            <img src={row.original.avatar} alt={row.getValue("name")} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-black text-[#1E293B] tracking-tight whitespace-nowrap">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-max ${
            status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'Present' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "PHONE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("phone")}</span>,
    },
    {
      accessorKey: "admissionDate",
      header: "ADMISSION DATE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("admissionDate")}</span>,
    },
  ], []);

  const table = useReactTable({
    data: filteredStudents,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const rows = table.getRowModel().rows;
  const currentStudentsRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-black text-[#1E293B] tracking-tight">Attendance Management</h2>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Monitor and manage student attendance</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard i={0} label="Today's Attendance" val="85.6%" sub="120 / 140 present" color="blue" icon={CheckCircle} />
          <StatCard i={1} label="This Month's Average" val="78.4%" sub="Average attendance" color="emerald" icon={Calendar} />
          <StatCard i={2} label="Total Students" val="140" sub="Across all courses" color="indigo" icon={User} />
          <StatCard i={3} label="Absent Today" val="20" sub="14.4% of total" color="rose" icon={AlertCircle} />
        </div>

        {/* Filters Bar */}
         <div className="bg-white rounded-[24px] border border-slate-200 p-6 flex items-end gap-3 shadow-sm min-w-0">
           <div className="w-[140px] shrink-0">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Select Date</label>
              <div className="relative">
                 <input 
                   type="date" 
                   value={filters.date}
                   onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                   className="w-full h-11 bg-slate-50 border-none rounded-xl px-4 pr-10 text-[11px] font-black text-black focus:ring-2 focus:ring-primary/20 transition-all outline-none" 
                 />
                 <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
           </div>

           <DropdownFilter 
             label="Institute" 
             val={filters.institute} 
             setVal={(v) => {
               const newCourses = v === "GIT" ? ["B-Tech (CS)", "B-Tech (CSE)", "B-Tech (AI)"] : 
                                  v === "GICSA" ? ["BSC (IT)", "MSC (IT) INT", "BCA"] : [];
               setFilters({ ...filters, institute: v, course: newCourses[0] || "" });
             }} 
             options={["GIT", "GICSA"]} 
             placeholder="Select Institute"
             disabled={!filters.date}
             className="w-[140px] shrink-0"
           />

           <DropdownFilter 
             label="Course" 
             val={filters.course} 
             setVal={(v) => setFilters({ ...filters, course: v })} 
             options={filters.institute === "GIT" ? ["B-Tech (CS)", "B-Tech (CSE)", "B-Tech (AI)"] : 
                      filters.institute === "GICSA" ? ["BSC (IT)", "MSC (IT) INT", "BCA"] : []} 
             disabled={!filters.date || !filters.institute}
             placeholder="Select Course"
             className="w-[140px] shrink-0"
           />

           <DropdownFilter 
             label="Status" 
             val={filters.status} 
             setVal={(v) => setFilters({ ...filters, status: v })} 
             options={["All Status", "Present", "Absent"]} 
             disabled={!filters.date || !filters.institute}
             placeholder="Select Status"
             className="w-[120px] shrink-0"
           />

           <div className="flex-1 min-w-[180px]">
              <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Search student..." 
                   value={filters.search}
                   onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                   className="w-full h-11 bg-[#F8FAFC] border-none rounded-xl pl-10 pr-4 text-[11px] font-black text-black placeholder:text-black placeholder:font-black focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                 />
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
           </div>

           <button onClick={handleReset} className="h-11 px-5 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0">
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
           </button>
        </div>

        {/* Students Table Section */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
              <h3 className="text-xl font-black text-[#1E293B] tracking-tight shrink-0">
                Students List {filters.date ? `- ${new Date(filters.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : ''}
              </h3>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                 <Download className="w-3.5 h-3.5" />
                 Export
              </button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id} className="bg-slate-50/50">
                        {headerGroup.headers.map(header => (
                          <th key={header.id} className="py-5 px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {currentStudentsRows.length > 0 ? (
                      currentStudentsRows.map((row) => (
                        <tr 
                          key={row.id} 
                          onClick={() => setSelectedStudent(row.original)}
                          className={`group hover:bg-slate-50 transition-all cursor-pointer ${selectedStudent?.id === row.original.id ? 'bg-primary/5' : ''}`}
                        >
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="py-6 px-8">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="py-20 text-center">
                           <div className="flex flex-col items-center gap-4 text-slate-300">
                              <Search className="w-12 h-12 opacity-20" />
                              <p className="font-bold text-sm tracking-tight capitalize">
                                {isFilterApplied ? "No students found for this selection" : "Select filters and click 'Filter' to view attendance"}
                              </p>
                           </div>
                        </td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>

           {/* Pagination */}
           <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
              </span>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                   disabled={currentPage === 1}
                   className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                 >
                    <ChevronLeft className="w-4 h-4" />
                 </button>
                 
                 {[...Array(Math.min(5, totalPages))].map((_, i) => (
                   <button 
                     key={i + 1}
                     onClick={() => setCurrentPage(i + 1)}
                     className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black transition-all ${
                       currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'border border-slate-100 text-slate-400 hover:bg-white hover:text-primary'
                     }`}
                   >
                     {i + 1}
                   </button>
                 ))}
                 
                 {totalPages > 5 && (
                   <>
                     <div className="w-10 h-10 flex items-center justify-center text-slate-300">
                        <MoreHorizontal className="w-4 h-4" />
                     </div>
                     <button 
                       onClick={() => setCurrentPage(totalPages)}
                       className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-black transition-all border border-slate-100 text-slate-400 hover:bg-white hover:text-primary ${currentPage === totalPages ? 'bg-primary text-white shadow-lg shadow-primary/20' : ''}`}
                     >
                       {totalPages}
                     </button>
                   </>
                 )}

                 <button 
                   onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                   disabled={currentPage === totalPages}
                   className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-white hover:text-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                 >
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        <StudentModal 
          isOpen={!!selectedStudent} 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />

        <div className="h-20" /> {/* Spacer */}
      </div>
    </AdminLayout>
  );
}

// Subcomponents
function StatCard({ label, val, sub, icon: Icon, color, i }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    rose: "bg-rose-50 text-rose-600"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-all group"
    >
       <div className="flex items-start justify-between mb-8">
          <div className={`p-4 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform`}>
             <Icon className="w-6 h-6" />
          </div>
       </div>
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
       <div className="flex items-baseline gap-3">
          <h4 className="text-3xl font-black text-[#1E293B] tracking-tighter">{val}</h4>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{sub}</span>
       </div>
    </motion.div>
  );
}

function DropdownFilter({ label, val, setVal, options, className, disabled, placeholder }) {
  return (
    <div className={className}>
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block ml-1">{label}</label>
       <div className="relative">
          <select 
            value={val}
            onChange={(e) => setVal(e.target.value)}
            disabled={disabled}
            className={`w-full h-11 bg-slate-50 border-none rounded-xl px-4 text-[11px] font-black text-black appearance-none focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
             {placeholder && <option value="" hidden>{placeholder}</option>}
             {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
       </div>
    </div>
  );
}

function StudentModal({ isOpen, student, onClose }) {
  if (!isOpen || !student) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[40px] w-full max-w-xs overflow-hidden shadow-2xl relative p-10 flex flex-col items-center text-center"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-28 h-28 rounded-[28px] overflow-hidden border-4 border-slate-50 shadow-xl mb-6">
            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
          </div>

          <h3 className="text-lg font-black text-[#1E293B] tracking-tight">{student.name}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{student.id}</p>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

function ChevronDown(props) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
