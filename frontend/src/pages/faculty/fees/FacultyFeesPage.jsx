import FacultyLayout from "../../../layouts/FacultyLayout";
import { 
  CreditCard, 
  Wallet, 
  AlertCircle, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Search, 
  ChevronRight,
  Info,
  Clock,
  ArrowUpRight,
  BellRing,
  HelpCircle
} from "lucide-react";

const TransactionRow = ({ name, id, date, amount, status }) => (
  <tr className="border-b border-[#f1f5f9] hover:bg-[#f8fafc] transition-all duration-200 cursor-pointer group">
    <td className="py-5 px-8">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#0284c7] font-bold text-[11px] uppercase tracking-tighter transition-transform duration-200 group-hover:scale-110">
           {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex flex-col">
           <span className="text-[14px] font-bold text-[#0f172a] leading-none mb-1.5">{name}</span>
        </div>
      </div>
    </td>
    <td className="py-5 px-8">
       <span className="text-[12px] font-bold text-slate-400 tracking-tight uppercase opacity-60">{id}</span>
    </td>
    <td className="py-5 px-8">
       <span className="text-[12px] font-bold text-slate-400 opacity-60">{date}</span>
    </td>
    <td className="py-5 px-8">
       <span className="text-[14px] font-bold text-[#0f172a]">{amount}</span>
    </td>
    <td className="py-5 px-8">
       <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] leading-none flex items-center gap-1.5 w-fit ${
         status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
         status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
         'bg-rose-50 text-rose-600'
       }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'Paid' ? 'bg-emerald-500' : 
            status === 'Pending' ? 'bg-amber-500' : 
            'bg-rose-500'
          }`} />
          {status}
       </span>
    </td>
    <td className="py-5 px-8 text-right text-slate-400 opacity-40 group-hover:opacity-100 transition-opacity">
       <MoreHorizontal className="w-5 h-5 cursor-pointer inline-block" />
    </td>
  </tr>
);

export default function FacultyFeesPage() {
  return (
    <FacultyLayout>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer">
             <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80 mb-2">Total Collected</span>
                   <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none">$1,248,500</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                   <CreditCard className="w-5 h-5 text-[#0284c7]" />
                </div>
             </div>
             <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 z-10">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.5% from last month
             </p>
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-0">
                <Wallet className="w-32 h-32" />
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#f1f5f9] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer">
             <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80 mb-2">Pending Amount</span>
                   <h3 className="text-4xl font-bold text-[#0f172a] tracking-tighter leading-none">$84,200</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                   <Clock className="w-5 h-5 text-amber-500" />
                </div>
             </div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60 z-10">
                <Info className="w-3.5 h-3.5 inline mr-1" /> 142 students awaiting payment
             </p>
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-[-12deg] transition-transform duration-700 group-hover:scale-150 group-hover:rotate-0">
                <Clock className="w-32 h-32" />
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-rose-100 shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer">
             <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[0.2em] opacity-80 mb-2">Overdue Total</span>
                   <h3 className="text-4xl font-bold text-rose-500 tracking-tighter leading-none">$12,400</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                   <AlertCircle className="w-5 h-5 text-rose-500" />
                </div>
             </div>
             <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1.5 z-10">
                ! Action required for 18 accounts
             </p>
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-45 transition-transform duration-700 group-hover:scale-150 group-hover:rotate-0">
                <AlertCircle className="w-32 h-32 text-rose-500" />
             </div>
          </div>
       </div>

       <div className="bg-white rounded-[32px] border border-[#f1f5f9] shadow-sm p-10 flex flex-col gap-10">
          <div className="flex justify-between items-end">
             <div className="flex items-center gap-6">
                <h3 className="text-3xl font-bold text-[#0f172a] tracking-tight leading-none">Fee Transactions</h3>
                <span className="px-3 py-1 bg-[#f1f5f9] text-slate-400 text-[10px] font-bold rounded-md uppercase tracking-widest">Session 2023/24</span>
             </div>
             <button className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium rounded-xl px-4 py-2.5 transition-all duration-200 active:scale-95 flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                <Plus className="w-5 h-5" />
                Add Payment
             </button>
          </div>

          <div className="bg-white rounded-[24px] border border-[#e2e8f0] overflow-hidden shadow-sm">
             <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
                <table className="w-full text-left min-w-[1000px]">
                   <thead>
                      <tr className="bg-[#f8fafc]">
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Student Name</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Student ID</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Date</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Amount</th>
                         <th className="py-5 px-8 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Status</th>
                         <th className="py-5 px-8 text-right text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-[#f1f5f9]">
                      <TransactionRow name="Julianne Smith" id="UG-2023-0142" date="Oct 12, 2023" amount="$2,400.00" status="Paid" />
                      <TransactionRow name="Marcus Kane" id="PG-2023-0089" date="Oct 15, 2023" amount="$1,850.00" status="Pending" />
                      <TransactionRow name="Aria Lopez" id="UG-2023-1120" date="Oct 01, 2023" amount="$3,200.00" status="Overdue" />
                      <TransactionRow name="David Chen" id="UG-2023-0955" date="Oct 18, 2023" amount="$2,400.00" status="Paid" />
                      <TransactionRow name="Elena Moretti" id="PG-2023-0041" date="Oct 20, 2023" amount="$4,100.00" status="Pending" />
                   </tbody>
                </table>
             </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-[#f1f5f9]">
             <p className="text-[12px] font-bold text-slate-400 opacity-60">Showing <span className="text-[#0f172a]">5 of 1,240</span> students</p>
             <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center opacity-40 hover:bg-slate-200 transition-all duration-200"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <button className="w-9 h-9 rounded-lg bg-[#0284c7] text-white text-[11px] font-bold transition-all duration-200 active:scale-95">1</button>
                <button className="w-9 h-9 rounded-lg border border-[#f1f5f9] text-[11px] font-bold text-slate-400 hover:bg-slate-50 transition-all duration-200 active:scale-95">2</button>
                <button className="w-9 h-9 rounded-lg border border-[#f1f5f9] text-[11px] font-bold text-slate-400 hover:bg-slate-50 transition-all duration-200 active:scale-95">3</button>
                <button className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center hover:bg-slate-200 transition-all duration-200 active:scale-95"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
          <div className="lg:col-span-3 bg-[#0284c7] rounded-[32px] p-10 flex flex-col justify-between overflow-hidden relative group">
             <div className="z-10 relative">
                <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">Automate Reminders</h3>
                <p className="text-white/60 text-[13px] font-bold leading-relaxed max-w-sm">
                   Enable smart email and SMS notifications for students with overdue balances to improve collection efficiency.
                </p>
                <button className="mt-10 bg-white hover:bg-slate-50 text-[#0284c7] font-medium rounded-xl px-4 py-2.5 transition-all active:scale-95 border-none w-fit">
                   Configure Automation
                </button>
             </div>
             <div className="absolute -right-8 -bottom-8 opacity-20">
                <BellRing className="w-48 h-48 text-white rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-[#0284c7] via-indigo-600 to-[#0284c7] opacity-50" />
          </div>

          <div className="lg:col-span-2 bg-slate-50 rounded-[32px] border border-[#f1f5f9] p-10 flex flex-col gap-10">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#f1f5f9] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-6 h-6 text-[#0284c7]" />
                 </div>
                 <div>
                    <h4 className="text-lg font-bold text-[#0f172a] mb-1">Financial Support Hub</h4>
                    <p className="text-[12px] font-bold text-slate-400 opacity-60 leading-relaxed">
                       Need help with fee processing or bank reconciliation?
                    </p>
                 </div>
              </div>
              <div className="space-y-4">
                 <button className="w-full bg-white hover:bg-slate-50 text-[#0f172a] font-medium text-[13px] rounded-xl px-4 py-3 border border-[#e2e8f0] shadow-sm transition-all active:scale-95 flex items-center justify-between group">
                    Transaction Reversal Guide
                    <ChevronRight className="w-4 h-4 text-[#0284c7] group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="w-full bg-white hover:bg-slate-50 text-[#0f172a] font-medium text-[13px] rounded-xl px-4 py-3 border border-[#e2e8f0] shadow-sm transition-all active:scale-95 flex items-center justify-between group">
                    Bulk Export Settings
                    <ChevronRight className="w-4 h-4 text-[#0284c7] group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
          </div>
       </div>
    </FacultyLayout>
  );
}
