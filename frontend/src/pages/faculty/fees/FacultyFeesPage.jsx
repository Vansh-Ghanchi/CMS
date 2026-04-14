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
import FeesManagement from "../../admin/fees/FeesManagement";
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
    <div className="animate-in fade-in duration-500">
      <FeesManagement noLayout={true} hideStats={true} />
    </div>
  );
}
