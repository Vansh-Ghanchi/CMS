import { useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { CreditCard, TrendingUp, AlertTriangle, FileText, Mail, User, ShieldCheck, PieChart, Plus, Search, Filter, ChevronLeft, ChevronRight, X, Calendar, DollarSign, ArrowUpRight, History, ArrowUpDown, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useAdminData } from "../../../context/AdminDataContext";

export default function FeesManagement() {
  const { fees: students, setFees: setStudents } = useAdminData();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({ 
    search: "", 
    status: "All Status", 
    institute: "",
    course: "" 
  });
  const itemsPerPage = 8;

  const handleReset = () => {
    setFilters({
      search: "",
      institute: "",
      course: "",
      status: "All Status"
    });
    setCurrentPage(1);
    setSorting([]);
  };

  const filteredStudents = useMemo(() => {
    if (!filters.institute || !filters.course) return [];

    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                           s.id.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === "All Status" || s.status === filters.status;
      const matchesInstitute = s.institute === filters.institute;
      const matchesCourse = s.course === filters.course;
      return matchesSearch && matchesStatus && matchesInstitute && matchesCourse;
    });
  }, [students, filters]);

  // Main Table Columns
  const mainColumns = useMemo(() => [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <div className="flex items-center justify-center gap-2 cursor-pointer select-none" onClick={() => column.toggleSorting()}>
          STUDENT ID
          <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      cell: ({ row }) => <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "name",
      header: "NAME",
      cell: ({ row }) => <span className="text-sm font-black text-[#1E293B] tracking-tight">{row.getValue("name")}</span>,
    },
    {
      accessorKey: "course",
      header: "COURSE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("course")}</span>,
    },
    {
      accessorKey: "totalFees",
      header: () => <div className="text-right">TOTAL FEES</div>,
      cell: ({ row }) => <div className="text-sm font-black text-[#1E293B] text-right">₹{row.getValue("totalFees").toLocaleString()}</div>,
    },
    {
      accessorKey: "paid",
      header: () => <div className="text-right">PAID AMOUNT</div>,
      cell: ({ row }) => <div className="text-sm font-black text-emerald-600 text-right">₹{row.getValue("paid").toLocaleString()}</div>,
    },
    {
      accessorKey: "remaining",
      header: () => <div className="text-right">REMAINING</div>,
      cell: ({ row }) => <div className="text-sm font-black text-rose-600 text-right">₹{row.getValue("remaining").toLocaleString()}</div>,
    },
    {
      accessorKey: "dueDate",
      header: "DUE DATE",
      cell: ({ row }) => <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{row.getValue("dueDate")}</span>,
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div className="text-center">
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
              status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
              status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {status}
            </span>
          </div>
        );
      },
    },
  ], []);

  const table = useReactTable({
    data: filteredStudents,
    columns: mainColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Sub-table Columns
  const semesterColumns = useMemo(() => [
    { accessorKey: "sem", header: "SEMESTER", cell: ({ row }) => <span className="text-xs font-black text-[#1E293B]">{row.getValue("sem")}</span> },
    { accessorKey: "fees", header: () => <div className="text-right">FEES</div>, cell: ({ row }) => <div className="text-xs font-bold text-slate-600 text-right">₹{row.getValue("fees").toLocaleString()}</div> },
    { accessorKey: "paid", header: () => <div className="text-right">PAID</div>, cell: ({ row }) => <div className="text-xs font-bold text-emerald-600 text-right">₹{row.getValue("paid").toLocaleString()}</div> },
    { accessorKey: "remaining", header: () => <div className="text-right">REMAINING</div>, cell: ({ row }) => <div className="text-xs font-bold text-rose-600 text-right">₹{row.getValue("remaining").toLocaleString()}</div> },
    { accessorKey: "status", header: () => <div className="text-center">STATUS</div>, cell: ({ row }) => (
      <div className="text-center">
        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
          row.getValue("status") === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
        }`}>{row.getValue("status")}</span>
      </div>
    )},
  ], []);

  const historyColumns = useMemo(() => [
    { accessorKey: "date", header: "TRANSACTION DATE", cell: ({ row }) => <span className="text-[11px] font-bold text-slate-500">{row.getValue("date")}</span> },
    { accessorKey: "amount", header: () => <div className="text-right">AMOUNT</div>, cell: ({ row }) => <div className="text-xs font-black text-indigo-600 text-right">₹{row.getValue("amount").toLocaleString()}</div> },
    { accessorKey: "method", header: () => <div className="text-center">METHOD</div>, cell: ({ row }) => <div className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{row.getValue("method")}</div> },
    { accessorKey: "status", header: () => <div className="text-right">STATUS</div>, cell: ({ row }) => (
      <div className="text-right">
        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{row.getValue("status")}</span>
      </div>
    )},
  ], []);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const rows = table.getRowModel().rows;
  const currentRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    const totalCollection = students.reduce((acc, curr) => acc + (curr.paid || 0), 0);
    const pendingFees = students.reduce((acc, curr) => acc + (curr.remaining || 0), 0);
    
    return [
      { 
        label: "Total Collection", 
        val: `₹${(totalCollection / 100000).toFixed(2)}L`, // Showing in Lakhs for M-like feel but accurate
        subVal: `₹${totalCollection.toLocaleString()}`, 
        icon: TrendingUp, 
        color: "bg-emerald-50 text-emerald-600" 
      },
      { 
        label: "Pending Fees", 
        val: `₹${(pendingFees / 1000).toFixed(1)}k`, 
        subVal: `₹${pendingFees.toLocaleString()}`,
        icon: AlertTriangle, 
        color: "bg-amber-50 text-amber-600" 
      },
    ];
  }, [students]);

  const courseOptions = [...new Set(INITIAL_FEE_STUDENTS.map(s => s.course))];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-black text-[#1E293B] tracking-tight">Fees Management</h2>
          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Track student payments and financial records</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-5 shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                 <h4 className="text-3xl font-black text-[#1E293B] tracking-tighter">{stat.val}</h4>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[24px] border border-slate-200 p-6 shadow-sm flex flex-wrap lg:flex-nowrap gap-4 items-end text-slate-200">
           <div className="flex-[2] min-w-[250px]">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Search Students</label>
              <div className="relative">
                 <input 
                   type="text" 
                   placeholder="Name or Student ID..." 
                   value={filters.search}
                   onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                   className="w-full h-11 bg-slate-50 border-none rounded-xl pl-10 pr-4 text-xs font-black text-black placeholder:text-black placeholder:font-black outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                 />
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
           </div>
           <Dropdown 
             label="Institute" 
             value={filters.institute} 
             options={["GIT", "GICSA"]} 
             placeholder="Select Institute"
             onChange={(v) => {
               setFilters(prev => ({ ...prev, institute: v, course: "" }));
             }} 
           />
           <Dropdown 
             label="Course" 
             value={filters.course} 
             options={filters.institute === "GIT" ? ["B-Tech (CS)", "B-Tech (CSE)", "B-Tech (AI)"] : 
                      filters.institute === "GICSA" ? ["BSC (IT)", "MSC (IT) INT", "BCA"] : []} 
             disabled={!filters.institute}
             placeholder="Select Course"
             onChange={(v) => setFilters(prev => ({ ...prev, course: v }))} 
           />
           <Dropdown 
             label="Payment Status" 
             value={filters.status} 
             options={["All Status", "Paid", "Pending", "Overdue"]} 
             disabled={!filters.institute}
             onChange={(v) => setFilters(prev => ({ ...prev, status: v }))} 
           />
           <button 
             onClick={handleReset} 
             className="h-11 px-5 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0 border border-slate-100"
           >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
           </button>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
           <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
              <h3 className="text-xl font-black text-[#1E293B] tracking-tight shrink-0">Student Fees Records</h3>
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
                    {currentRows.map((row) => (
                      <tr key={row.id} onClick={() => setSelectedStudent(row.original)} className={`group hover:bg-slate-50 transition-all cursor-pointer ${selectedStudent?.id === row.original.id ? 'bg-primary/5' : ''}`}>
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

           <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
              </span>
              <div className="flex items-center gap-2">
                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-all"><ChevronLeft className="w-4 h-4" /></button>
                 {[...Array(totalPages)].map((_, i) => (
                   <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl text-[11px] font-black transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'border border-slate-100 text-slate-400 hover:text-primary hover:bg-white'}`}>
                     {i + 1}
                   </button>
                 ))}
                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white transition-all"><ChevronRight className="w-4 h-4" /></button>
              </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedStudent && (
             <motion.div key={selectedStudent.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-10 flex flex-col gap-12 relative">
                <button onClick={() => setSelectedStudent(null)} className="absolute top-8 right-8 p-2 hover:bg-slate-50 rounded-full transition-all text-slate-300">
                   <X className="w-5 h-5" />
                </button>

                <div className="w-full">
                   <h3 className="text-xl font-black text-[#1E293B] tracking-tight mb-8">Detailed Fees Breakdown</h3>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                      <DetailItem label="Full Name" val={selectedStudent.name} />
                      <DetailItem label="Student ID" val={selectedStudent.id} />
                      <DetailItem label="Course" val={selectedStudent.course} />
                      <DetailItem label="Total Due" val={`₹${selectedStudent.remaining.toLocaleString()}`} color="text-rose-600" />
                   </div>

                   <div className="flex items-center gap-3 mb-6">
                      <PieChart className="w-5 h-5 text-primary" />
                      <h4 className="text-lg font-black text-[#1E293B] tracking-tight">Semester-wise Breakdown</h4>
                   </div>
                   <div className="overflow-x-auto bg-slate-50/50 rounded-[28px] border border-slate-100 p-2">
                       <SubTable data={selectedStudent.semesters} columns={semesterColumns} />
                   </div>
                </div>

                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-indigo-500" />
                      <h4 className="text-xl font-black text-[#1E293B] tracking-tight">Recent Payment History</h4>
                   </div>
                   <div className="bg-[#F8FAFC] rounded-[24px] border border-slate-50 overflow-hidden">
                       <SubTable data={selectedStudent.history} columns={historyColumns} />
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
        <div className="h-20" />
      </div>
    </AdminLayout>
  );
}

function SubTable({ data, columns }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <table className="w-full text-left">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
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
        {table.getRowModel().rows.map(row => (
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
  );
}

function Dropdown({ label, value, options, onChange, disabled, placeholder }) {
  return (
    <div className={`flex-1 min-w-[150px] ${disabled ? 'opacity-50' : ''}`}>
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">{label}</label>
       <div className="relative">
          <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            disabled={disabled}
            className="w-full h-11 bg-slate-50 border-none rounded-xl px-4 text-xs font-black text-[#1E293B] outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer pr-10 disabled:cursor-not-allowed"
          >
             {placeholder && <option value="" hidden>{placeholder}</option>}
             {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
       </div>
    </div>
  );
}

function DetailItem({ label, val, color }) {
  return (
    <div>
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
       <p className={`text-sm font-black tracking-tight ${color || 'text-[#1E293B]'}`}>{val}</p>
    </div>
  );
}

function ChevronDown(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  );
}
