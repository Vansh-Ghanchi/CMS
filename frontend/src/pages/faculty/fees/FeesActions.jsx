import React, { useState, useMemo } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { CreditCard, CheckCircle, AlertCircle, Search, User } from 'lucide-react';

export default function FeesActions() {
  const { fees, setFees } = useAdminData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return fees.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.id.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [fees, searchTerm]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchTerm('');
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!selectedStudent || !paymentAmount || parseFloat(paymentAmount) <= 0) {
      setMessage('error');
      return;
    }

    const amount = parseFloat(paymentAmount);
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    setFees(prev => prev.map(f => {
      if (f.id === selectedStudent.id) {
        const newPaid = (f.paid || 0) + amount;
        const newRemaining = Math.max(0, f.totalFees - newPaid);
        const newHistory = [
          {
            date,
            amount,
            method: 'Counter Payment',
            status: 'Success'
          },
          ...(f.history || [])
        ];

        return {
          ...f,
          paid: newPaid,
          remaining: newRemaining,
          status: newRemaining <= 0 ? 'Paid' : 'Pending',
          history: newHistory
        };
      }
      return f;
    }));

    setMessage('success');
    setPaymentAmount('');
    setSelectedStudent(null);
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Fees Actions</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Process financial transactions and record payments</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-10 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Record Direct Payment</h4>
        </div>

        {message === 'success' && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-bold border border-emerald-100">
            <CheckCircle className="w-5 h-5" /> Payment recorded successfully in student ledger.
          </div>
        )}
        {message === 'error' && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-2xl flex items-center gap-3 text-sm font-bold border border-rose-100">
            <AlertCircle className="w-5 h-5" /> Please select a student and enter a valid positive amount.
          </div>
        )}

        <div className="space-y-6">
          {/* Student Search */}
          {!selectedStudent ? (
            <div className="relative">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Search Student (ID or Name)</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-12 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" 
                  placeholder="e.g. STU-25-1001 or Arjun..." 
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  {searchResults.map(s => (
                    <button 
                      key={s.id} 
                      onClick={() => handleSelectStudent(s)}
                      className="w-full px-5 py-4 text-left hover:bg-slate-50 flex items-center gap-4 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-700">{s.name}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.id} • {s.course}</div>
                      </div>
                      <div className="ml-auto text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Due: ₹{s.remaining.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Selected Student Card */
            <div className="p-6 bg-slate-50 rounded-[28px] border border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h5 className="text-lg font-black text-[#1E293B] leading-tight">{selectedStudent.name}</h5>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedStudent.id}</p>
                </div>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Fees</p>
                  <p className="text-sm font-black text-slate-600">₹{selectedStudent.totalFees.toLocaleString()}</p>
                </div>
                <div className="text-center border-l border-slate-200 pl-8">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Remaining Due</p>
                  <p className="text-sm font-black text-rose-600">₹{selectedStudent.remaining.toLocaleString()}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="text-xs font-black text-indigo-600 underline tracking-widest uppercase hover:text-indigo-800 transition-colors"
              >
                Change Student
              </button>
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handleRecordPayment} className="space-y-6 pt-4 border-t border-slate-50">
            <div className="max-w-md">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Payment Amount (INR) *</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={paymentAmount} 
                  onChange={(e) => setPaymentAmount(e.target.value)} 
                  disabled={!selectedStudent}
                  className="w-full h-14 bg-[#F8FAFC] border-none rounded-2xl px-6 text-xl font-black text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all disabled:opacity-50" 
                  placeholder="0.00" 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={!selectedStudent}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              Verify & Record Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
