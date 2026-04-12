import { useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { BookOpen, CheckCircle, GraduationCap, Archive, Mail, User, ShieldCheck, ChevronLeft, ChevronRight, Search, Filter, Edit, Users, Calendar, AlertCircle, Trash2, X, MoreVertical, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useAdminData } from "../../../context/AdminDataContext";

export default function CourseManagement() {
  const { students, courses, setCourses } = useAdminData();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "All Status", faculty: "All Faculty" });
  const itemsPerPage = 6;

  // Filter Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           c.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === "All Status" || c.status === filters.status;
      const matchesFaculty = filters.faculty === "All Faculty" || c.faculty === filters.faculty;
      return matchesSearch && matchesStatus && matchesFaculty;
    });
  }, [courses, filters]);

  const courseColumns = useMemo(() => [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => column.toggleSorting()}>
          COURSE ID
          <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      cell: ({ row }) => <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "COURSE NAME",
      cell: ({ row }) => <span className="text-sm font-black text-[#1E293B] tracking-tight whitespace-nowrap">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "duration",
      header: "DURATION",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("duration")}</span>,
    },
    {
      accessorKey: "faculty",
      header: "FACULTY",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
            {row.getValue("faculty")[0]}
          </div>
          <span className="text-xs font-bold text-slate-600">{row.getValue("faculty")}</span>
        </div>
      ),
    },
    {
      accessorKey: "students",
      header: () => <div className="text-center whitespace-nowrap">ENROLLMENT</div>,
      cell: ({ row }) => <div className="text-sm font-black text-[#1E293B] text-center">{row.getValue("students")}</div>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
          row.getValue("status") === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {row.getValue("status")}
        </span>
      ),
    },
  ], []);

  const table = useReactTable({
    data: filteredCourses,
    columns: courseColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const enrolledColumns = useMemo(() => [
    {
      accessorKey: "name",
      header: "STUDENT NAME",
      cell: ({ row }) => <span className="text-xs font-black text-[#1E293B]">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "studentId",
      header: "ID",
      cell: ({ row }) => <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.getValue("studentId")}</span>,
    },
    {
      accessorKey: "email",
      header: "EMAIL",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500">{row.getValue("email")}</span>,
    },
    {
      accessorKey: "attendance",
      header: () => <div className="text-right">ATTENDANCE</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <span className={`text-xs font-black ${row.getValue("attendance") >= 75 ? 'text-emerald-500' : 'text-rose-500'}`}>{row.getValue("attendance")}%</span>
        </div>
      ),
    },
  ], []);

  const enrolledStudents = useMemo(() => {
    if (!selectedCourse) return [];
    return students.filter(s => s.course === selectedCourse.name).map(s => ({
      ...s,
      attendance: 75 + Math.floor(Math.random() * 20) // Mock attendance for detail view
    }));
  }, [selectedCourse, students]);

  const enrolledTable = useReactTable({
    data: enrolledStudents,
    columns: enrolledColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const tableRows = table.getRowModel().rows;
  const currentCoursesRows = tableRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    const totalEnrolled = courses.reduce((acc, curr) => acc + (curr.students || 0), 0);
    return [
      { label: "Total Courses", val: courses.length, icon: BookOpen, color: "bg-indigo-50 text-indigo-600" },
      { label: "Active Courses", val: courses.filter(c => c.status === "Active").length, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
      { label: "Inactive Courses", val: courses.filter(c => c.status === "Inactive").length, icon: AlertCircle, color: "bg-rose-50 text-rose-600" },
      { label: "Total Enrolled", val: totalEnrolled.toLocaleString(), icon: Users, color: "bg-amber-50 text-amber-600" },
    ];
  }, [courses]);

  const facultyOptions = ["All Faculty", ...new Set(courses.map(c => c.faculty))];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-[#1E293B] tracking-tight">Course Management</h2>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Manage academic programs and faculty assignments</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-5 shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-3xl font-black text-[#1E293B] tracking-tighter">{stat.val}</h4>
            </div>
          ))}
        </div>

        {/* Filters bar */}
        <div className="bg-white rounded-[24px] border border-slate-200 p-6 flex flex-wrap lg:flex-nowrap gap-4 items-end shadow-sm">
          <div className="flex-[2] min-w-[250px]">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Search Courses</label>
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="ID or Course Name..." 
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full h-11 bg-slate-50 border-none rounded-xl pl-10 pr-4 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             </div>
          </div>
          
          <Dropdown label="Status" value={filters.status} options={["All Status", "Active", "Inactive"]} onChange={(v) => setFilters(prev => ({ ...prev, status: v }))} />
          <Dropdown label="Assign Faculty" value={filters.faculty} options={facultyOptions} onChange={(v) => setFilters(prev => ({ ...prev, faculty: v }))} />
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-50 bg-slate-50/10 flex justify-between items-center">
             <h3 className="text-xl font-black text-[#1E293B] tracking-tight">System Courses List</h3>
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
                {currentCoursesRows.map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => setSelectedCourse(row.original)}
                    className={`group hover:bg-slate-50 transition-all cursor-pointer ${selectedCourse?.id === row.original.id ? 'bg-primary/5' : ''}`}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="py-6 px-8">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-6 border-t border-slate-50 bg-slate-50/5 flex justify-between items-center">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length} entries
             </span>
             <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-[11px] font-black transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'border border-slate-100 text-slate-400 hover:text-primary hover:bg-white'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-all"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
        </div>

        {/* Details Section */}
        <AnimatePresence mode="wait">
          {selectedCourse && (
            <motion.div 
              key={selectedCourse.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10 relative overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCourse(null)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-50 rounded-full transition-all text-slate-300"
              >
                 <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-12">
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-[#1E293B] tracking-tighter mb-4">{selectedCourse.name}</h3>
                    <p className="text-sm font-bold text-slate-400 leading-relaxed mb-8 max-w-2xl">{selectedCourse.description}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                       <DetailItem label="Course ID" val={selectedCourse.id} />
                       <DetailItem label="Duration" val={selectedCourse.duration} />
                       <DetailItem label="Start Date" val={selectedCourse.startDate} />
                       <DetailItem label="End Date" val={selectedCourse.endDate} />
                    </div>
                  </div>

                </div>

                {/* Enrolled Students Table */}
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-lg font-black text-[#1E293B] tracking-tight">Currently Enrolled Students</h4>
                   </div>

                   <div className="bg-[#F8FAFC] rounded-[24px] border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                         <thead>
                            {enrolledTable.getHeaderGroups().map(headerGroup => (
                              <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                  <th key={header.id} className="py-4 px-8 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                  </th>
                                ))}
                              </tr>
                            ))}
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {enrolledTable.getRowModel().rows.map((row) => (
                               <tr key={row.id} className="hover:bg-white transition-all">
                                  {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="py-4 px-8">
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                  ))}
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="h-20" /> {/* Spacer */}
      </div>
    </AdminLayout>
  );
}

// Subcomponents
function Dropdown({ label, value, options, onChange }) {
  return (
    <div className="flex-1 min-w-[150px]">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">{label}</label>
       <div className="relative">
          <select 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-11 bg-slate-50 border-none rounded-xl px-4 text-xs font-bold appearance-none outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer pr-10"
          >
             {options.map(opt => <option key={opt}>{opt}</option>)}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
       </div>
    </div>
  );
}

function DetailItem({ label, val }) {
  return (
    <div>
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-sm font-bold text-slate-700 tracking-tight">{val}</p>
    </div>
  );
}

function ChevronDown(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  );
}
