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
  <tr className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-all cursor-pointer group">
    <td className="py-6 pl-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center text-primary font-black text-[11px] uppercase tracking-tighter">
           {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex flex-col">
           <span className="text-[14px] font-black text-[#1E293B] leading-none mb-1.5">{name}</span>
        </div>
      </div>
    </td>
    <td className="py-6">
       <span className="text-[12px] font-bold text-[#64748B] tracking-tight uppercase opacity-60">{id}</span>
    </td>
    <td className="py-6">
       <span className="text-[12px] font-bold text-[#64748B] opacity-60">{date}</span>
    </td>
    <td className="py-6">
       <span className="text-[14px] font-black text-[#1E293B]">{amount}</span>
    </td>
    <td className="py-6">
       <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest leading-none flex items-center gap-1.5 w-fit ${
         status === 'Paid' ? 'bg-[#ECFDF5] text-[#10B981]' : 
         status === 'Pending' ? 'bg-[#FFFBEB] text-[#F59E0B]' : 
         'bg-[#FEF2F2] text-[#EF4444]'
       }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'Paid' ? 'bg-[#10B981]' : 
            status === 'Pending' ? 'bg-[#F59E0B]' : 
            'bg-[#EF4444]'
          }`} />
          {status}
       </span>
    </td>
    <td className="py-6 pr-0 text-right text-outline opacity-40 group-hover:opacity-100 transition-opacity">
       <MoreHorizontal className="w-5 h-5 cursor-pointer inline-block" />
    </td>
  </tr>
);

export default function FacultyFeesPage() {
  return (
    <FacultyLayout>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80 mb-2">Total Collected</span>
                   <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none">$1,248,500</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] flex items-center justify-center">
                   <CreditCard className="w-5 h-5 text-primary" />
                </div>
             </div>
             <p className="text-[10px] font-black text-[#10B981] uppercase tracking-widest flex items-center gap-1.5 z-10">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.5% from last month
             </p>
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-12">
                <Wallet className="w-32 h-32" />
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#F1F5F9] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80 mb-2">Pending Amount</span>
                   <h3 className="text-4xl font-black text-[#1E293B] tracking-tighter leading-none">$84,200</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#FFFBEB] flex items-center justify-center">
                   <Clock className="w-5 h-5 text-[#F59E0B]" />
                </div>
             </div>
             <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest opacity-60 z-10">
                <Info className="w-3.5 h-3.5 inline mr-1" /> 142 students awaiting payment
             </p>
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-[-12deg]">
                <Clock className="w-32 h-32" />
             </div>
          </div>

          <div className="bg-white rounded-[24px] p-8 border border-[#FEF2F2] shadow-sm flex flex-col gap-8 relative overflow-hidden group hover:shadow-lg transition-all">
             <div className="flex justify-between items-start z-10">
                <div className="flex flex-col">
                   <span className="text-[11px] font-black text-[#64748B] uppercase tracking-[0.2em] opacity-80 mb-2">Overdue Total</span>
                   <h3 className="text-4xl font-black text-[#EF4444] tracking-tighter leading-none">$12,400</h3>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
                   <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                </div>
             </div>
             <p className="text-[10px] font-black text-[#EF4444] uppercase tracking-widest flex items-center gap-1.5 z-10">
                ! Action required for 18 accounts
             </p>
             <div className="absolute -right-4 -bottom-4 opacity-[0.03] rotate-45">
                <AlertCircle className="w-32 h-32 text-[#EF4444]" />
             </div>
          </div>
       </div>

       <div className="bg-white rounded-[32px] border border-[#F1F5F9] shadow-sm p-10 flex flex-col gap-10">
          <div className="flex justify-between items-end">
             <div className="flex items-center gap-6">
                <h3 className="text-3xl font-black text-[#1E293B] tracking-tight leading-none uppercase tracking-tighter">Fee Transactions</h3>
                <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-[10px] font-black rounded-md uppercase tracking-widest">Session 2023/24</span>
             </div>
             <button className="h-[52px] bg-primary text-white px-10 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all border-none flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Payment
             </button>
          </div>

          <table className="w-full">
             <thead>
                <tr className="text-left border-b-2 border-[#F1F5F9]">
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Student Name</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Student ID</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Date</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Amount</th>
                   <th className="pb-8 text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Status</th>
                   <th className="pb-8 text-right text-[11px] font-black text-[#64748B] uppercase tracking-[0.25em] opacity-40">Actions</th>
                </tr>
             </thead>
             <tbody>
                <TransactionRow name="Julianne Smith" id="UG-2023-0142" date="Oct 12, 2023" amount="$2,400.00" status="Paid" />
                <TransactionRow name="Marcus Kane" id="PG-2023-0089" date="Oct 15, 2023" amount="$1,850.00" status="Pending" />
                <TransactionRow name="Aria Lopez" id="UG-2023-1120" date="Oct 01, 2023" amount="$3,200.00" status="Overdue" />
                <TransactionRow name="David Chen" id="UG-2023-0955" date="Oct 18, 2023" amount="$2,400.00" status="Paid" />
                <TransactionRow name="Elena Moretti" id="PG-2023-0041" date="Oct 20, 2023" amount="$4,100.00" status="Pending" />
             </tbody>
          </table>

          <div className="flex items-center justify-between pt-8 border-t border-[#F1F5F9]">
             <p className="text-[12px] font-black text-secondary uppercase tracking-widest opacity-60">Showing <span className="text-[#1E293B]">5 of 1,240</span> students</p>
             <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center opacity-40 hover:bg-slate-200 transition-all"><ChevronRight className="w-4 h-4 rotate-180" /></button>
                <button className="w-9 h-9 rounded-lg bg-primary text-white text-[11px] font-black shadow-lg shadow-primary/20">1</button>
                <button className="w-9 h-9 rounded-lg border border-[#F1F5F9] text-[11px] font-black text-[#64748B] hover:bg-slate-50 transition-all">2</button>
                <button className="w-9 h-9 rounded-lg border border-[#F1F5F9] text-[11px] font-black text-[#64748B] hover:bg-slate-50 transition-all">3</button>
                <button className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center hover:bg-slate-200 transition-all"><ChevronRight className="w-4 h-4" /></button>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10">
          <div className="lg:col-span-3 bg-primary rounded-[32px] p-10 flex flex-col justify-between overflow-hidden relative group">
             <div className="z-10 relative">
                <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-4">Automate Reminders</h3>
                <p className="text-white/60 text-[13px] font-bold leading-relaxed max-w-sm">
                   Enable smart email and SMS notifications for students with overdue balances to improve collection efficiency.
                </p>
                <button className="mt-10 bg-white text-primary px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:opacity-90 transition-all border-none">
                   Configure Automation
                </button>
             </div>
             <div className="absolute -right-8 -bottom-8 opacity-20">
                <BellRing className="w-48 h-48 text-white rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700" />
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-primary opacity-50" />
          </div>

          <div className="lg:col-span-2 bg-[#F1F5F9]/30 rounded-[32px] border border-[#F1F5F9] p-10 flex flex-col gap-10">
              <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#F1F5F9] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-[#1E293B] mb-1">Financial Support Hub</h4>
                    <p className="text-[12px] font-bold text-[#64748B] opacity-60 leading-relaxed">
                       Need help with fee processing or bank reconciliation?
                    </p>
                 </div>
              </div>
              <div className="space-y-4">
                 <button className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-[#F1F5F9] rounded-xl text-[11px] font-black text-[#1E293B] uppercase tracking-widest transition-all border border-[#F1F5F9] group">
                    Transaction Reversal Guide
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-[#F1F5F9] rounded-xl text-[11px] font-black text-[#1E293B] uppercase tracking-widest transition-all border border-[#F1F5F9] group">
                    Bulk Export Settings
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
          </div>
       </div>
    </FacultyLayout>
  );
}
