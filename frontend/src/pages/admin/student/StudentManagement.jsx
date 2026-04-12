import { useMemo, useState, useEffect, useRef } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { Users, ShieldCheck, Mail, ArrowRight, User, Phone, Calendar, MapPin, X, Search, Filter, ChevronDown, Trash2, Edit, Eye, UserCheck, UserPlus, Save, Edit2, ArrowUpDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "../../../context/SearchContext";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useAdminData } from "../../../context/AdminDataContext";

const StatCardShort = ({ icon: Icon, title, value, subtext, color }) => (
  <div className="bg-white rounded-[20px] p-6 flex items-center gap-6 border border-slate-200 shadow-sm flex-1">
    <div className={`w-14 h-14 rounded-full ${color} bg-opacity-10 flex items-center justify-center text-primary`}>
       <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
       <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60 mb-1">{title}</p>
       <h3 className="text-2xl font-black text-[#1E293B] tracking-tight">{value}</h3>
       <p className="text-[10px] font-bold text-slate-400 mt-0.5">{subtext}</p>
    </div>
  </div>
);

const EditStudentModal = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    status: "",
    admissionDate: "",
    address: "",
    avatar: ""
  });

  useEffect(() => {
    if (student) {
      setFormData({ ...student });
    }
  }, [student, isOpen]);

  if (!isOpen || !student) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl"
        >
          <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-xl font-black text-[#1E293B] tracking-tight">Edit Student Details</h3>
            <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-all text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
               </div>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Course / Program</label>
                  <input 
                    type="text" 
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Residential Address</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
               </div>
            </div>

            <div className="md:col-span-2 mt-8 flex justify-end gap-4">
               <button onClick={onClose} className="px-8 py-3.5 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
               <button 
                 onClick={() => { onSave(formData); onClose(); }}
                 className="px-10 py-3.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20"
               >
                 Save Student
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl p-10 text-center"
      >
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
           <Trash2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-[#1E293B] tracking-tight mb-4">Delete Record?</h3>
        <p className="text-xs font-bold text-slate-400 leading-relaxed mb-10 px-6">
          You are about to permanently delete the profile of <span className="text-slate-800 font-black">{studentName}</span>. This action cannot be undone.
        </p>
        <div className="flex gap-4">
           <button onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-200">Cancel</button>
           <button 
             onClick={() => { onConfirm(); onClose(); }}
             className="flex-1 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 transition-all hover:bg-rose-600"
           >
             Yes, Delete
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function StudentManagement() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState("");
  const { students, setStudents } = useAdminData();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [instituteFilter, setInstituteFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const handleReset = () => {
    setInstituteFilter("");
    setCourseFilter("");
    setStatusFilter("All Status");
    setLocalSearch("");
    setCurrentPage(1);
    setSorting([]);
  };

  useEffect(() => {
    localStorage.setItem('admin_students_list_v4', JSON.stringify(students));
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!instituteFilter || !courseFilter) {
      console.log('Filters incomplete:', { instituteFilter, courseFilter });
      return [];
    }
    
    const filtered = students.filter(s => {
      const search = localSearch.toLowerCase();
      const matchesSearch = (s.name?.toLowerCase() || "").includes(search) || 
                           (s.email?.toLowerCase() || "").includes(search) ||
                           (s.course?.toLowerCase() || "").includes(search) ||
                           (s.studentId?.toLowerCase() || "").includes(search);
      
      const matchesInstitute = s.institute === instituteFilter;
      const matchesCourse = s.course === courseFilter;
      const matchesStatus = statusFilter === "All Status" || s.status === statusFilter;

      return matchesSearch && matchesInstitute && matchesCourse && matchesStatus;
    });

    console.log('Filtered Results:', {
      instituteSelected: instituteFilter,
      courseSelected: courseFilter,
      count: filtered.length,
      data: filtered
    });

    return filtered;
  }, [students, localSearch, instituteFilter, courseFilter, statusFilter]);

  // Status Badge Component for reusability within columns
  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
      status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
    }`}>
      {status}
    </span>
  );

  // Column definitions for TanStack Table
  const columns = useMemo(() => [
    {
      accessorKey: "studentId",
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => column.toggleSorting()}>
          STUDENT ID
          <ArrowUpDown className="w-3 h-3 text-slate-400" />
        </div>
      ),
      cell: ({ row }) => <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em]">{row.getValue("studentId")}</span>,
    },
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-slate-100">
            <img src={row.original.avatar} alt={row.getValue("name")} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-black text-[#1E293B] tracking-tight whitespace-nowrap">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "EMAIL",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 lowercase">{row.getValue("email")}</span>,
    },
    {
      accessorKey: "phone",
      header: "PHONE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("phone")}</span>,
    },
    {
      accessorKey: "course",
      header: "COURSE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("course")}</span>,
    },
    {
      accessorKey: "admissionDate",
      header: "ADMISSION DATE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("admissionDate")}</span>,
    },
    {
      accessorKey: "date",
      header: "DATE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("date")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      id: "actions",
      header: () => <div className="text-right">ACTIONS</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedStudent(row.original); }}
            className="p-2 hover:bg-white rounded-lg border border-slate-200 shadow-sm transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>
      ),
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

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(prev => prev.filter(s => s.studentId !== studentToDelete.studentId));
      if (selectedStudent?.studentId === studentToDelete.studentId) setSelectedStudent(null);
      setStudentToDelete(null);
    }
  };

  const handleSaveStudent = (updatedData) => {
    setStudents(prev => prev.map(s => s.studentId === updatedData.studentId ? updatedData : s));
    if (selectedStudent?.studentId === updatedData.studentId) setSelectedStudent(updatedData);
  };

  const currentMonthShort = new Date().toLocaleString('en-US', { month: 'short' });
  const currentYearStr = new Date().getFullYear().toString();
  const newAdmissionsCount = students.filter(s => 
    s.admissionDate && 
    s.admissionDate.includes(currentMonthShort) && 
    s.admissionDate.includes(currentYearStr)
  ).length;

  return (
    <AdminLayout>
      {/* 1. Header Stats Row */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <StatCardShort icon={Users} title="Total Students" value={students.filter(s => s.institute === "GIT" || s.institute === "GICSA").length} subtext="All registered students" color="bg-indigo-600" />
        <StatCardShort icon={UserCheck} title="Active Students" value={students.filter(s => s.status === 'Active').length} subtext="Currently active students" color="bg-emerald-600" />
        <StatCardShort icon={Users} title="Inactive Students" value={students.filter(s => s.status === 'Inactive').length} subtext="Currently inactive students" color="bg-rose-600" />
        <StatCardShort icon={UserPlus} title="New Admissions" value={newAdmissionsCount} subtext="This month" color="bg-Yellow" />
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 flex flex-col md:flex-row items-center gap-4 shadow-sm">
        <div className="relative flex-grow h-12">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search by name, email or course..." 
             className="w-full h-full bg-[#F8FAFC] border-none rounded-xl pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none"
             value={localSearch}
             onChange={(e) => setLocalSearch(e.target.value)}
           />
        </div>
        
         <div className="flex flex-col md:flex-row items-end gap-6 shrink-0 w-full md:w-auto">
            <div className="flex-1 md:min-w-[150px] w-full">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Institute</label>
               <div className="relative group">
                  <select 
                    value={instituteFilter}
                    onChange={(e) => {
                      setInstituteFilter(e.target.value);
                      setCourseFilter("");
                    }}
                    className="w-full h-12 bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 text-xs font-black appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-10"
                  >
                    <option value="" hidden>Select Institute</option>
                    <option value="GIT">GIT</option>
                    <option value="GICSA">GICSA</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
               </div>
            </div>

            <div className={`flex-1 md:min-w-[150px] w-full ${!instituteFilter ? 'opacity-50' : ''}`}>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Course</label>
               <div className="relative group">
                  <select 
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    disabled={!instituteFilter}
                    className="w-full h-12 bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 text-xs font-black appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-10 disabled:cursor-not-allowed"
                  >
                    <option value="" hidden>Select Course</option>
                    {instituteFilter === "GIT" ? (
                      <>
                        <option>B-Tech (CS)</option>
                        <option>B-Tech (CSE)</option>
                        <option>B-Tech (AI)</option>
                      </>
                    ) : instituteFilter === "GICSA" ? (
                      <>
                        <option>BSC (IT)</option>
                        <option>MSC (IT) INT</option>
                        <option>BCA</option>
                      </>
                    ) : null}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
               </div>
            </div>

            <div className={`flex-1 md:min-w-[150px] w-full ${!instituteFilter ? 'opacity-50' : ''}`}>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Status</label>
               <div className="relative group">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    disabled={!instituteFilter}
                    className="w-full h-12 bg-[#F8FAFC] border border-slate-100 rounded-xl px-4 text-xs font-black appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-10 disabled:cursor-not-allowed"
                  >
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-primary transition-colors" />
               </div>
            </div>

            <button 
              onClick={handleReset} 
              className="h-12 px-6 bg-slate-50 text-[#1E293B] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0 border border-slate-100"
            >
               <RotateCcw className="w-3.5 h-3.5" />
               Reset
            </button>
         </div>
      </div>

      {/* 3. Main Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden mb-12 shadow-sm">
        <div className="p-8 border-b border-[#F1F5F9] flex justify-between items-center">
            <h3 className="text-xl font-black text-[#1E293B] tracking-tight uppercase">Students List</h3>
            <div className="flex gap-4">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredStudents.length} of {students.length} students</span>
            </div>
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
                {table.getRowModel().rows.map(row => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedStudent(row.original)}
                    className={`group transition-all cursor-pointer ${selectedStudent?.id === row.original.id ? 'bg-primary/5' : 'hover:bg-slate-50'}`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-5 px-8">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      {/* 4. Detailed View (Below Table) */}
      <AnimatePresence mode="wait">
        {selectedStudent && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
          >
            {/* View Student Details Card */}
            <div className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm p-10 relative overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black text-[#1E293B] tracking-tight">View Student Details</h3>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400"
                  >
                    <X className="w-5 h-5" />
                  </button>
               </div>

               <div className="flex flex-col sm:flex-row gap-10">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl shrink-0">
                    <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 flex-grow">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</p>
                        <h4 className="text-base font-black text-[#1E293B] tracking-tight">{selectedStudent.name}</h4>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Course</p>
                        <h4 className="text-base font-black text-[#1E293B] tracking-tight">{selectedStudent.course}</h4>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Student ID</p>
                        <h4 className="text-base font-black text-[#1E293B] tracking-tight">{selectedStudent.id}</h4>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Admission Date</p>
                        <h4 className="text-base font-black text-[#1E293B] tracking-tight">{selectedStudent.admissionDate}</h4>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email</p>
                        <h4 className="text-base font-black text-[#1E293B] tracking-tight truncate">{selectedStudent.email}</h4>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-block mt-1 ${
                          selectedStudent.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>{selectedStudent.status}</span>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                           <Phone className="w-2 h-2" /> Phone
                        </p>
                        <h4 className="text-base font-black text-[#1E293B] tracking-tight">{selectedStudent.phone}</h4>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                           <MapPin className="w-2 h-2" /> Address
                        </p>
                        <h4 className="text-base font-bold text-[#1E293B] tracking-tight leading-relaxed">{selectedStudent.address}</h4>
                     </div>
                  </div>
               </div>

               <div className="mt-12 flex justify-end">
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="px-10 py-4 bg-[#F8FAFC] hover:bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] transition-all shadow-sm border border-slate-100"
                  >
                    Close Profile
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <EditStudentModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        student={editingStudent}
        onSave={handleSaveStudent}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        studentName={studentToDelete?.name}
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}
