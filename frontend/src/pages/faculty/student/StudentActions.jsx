import React, { useState } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

export default function StudentActions() {
  const { setStudents, courses } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    status: 'Active'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.course) {
      setMessage('error');
      return;
    }

    const newStudent = {
      ...formData,
      studentId: `STU-${new Date().getFullYear().toString().slice(-2)}-${Date.now().toString().slice(-4)}`,
      admissionDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      institute: courses.find(c => c.name === formData.course)?.institute || 'GIT',
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };

    setStudents(prev => [newStudent, ...prev]);
    setMessage('success');
    setFormData({ name: '', email: '', phone: '', course: '', status: 'Active' });
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Student Actions</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Execute administrative operations on students</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-10 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
               <UserPlus className="w-6 h-6" />
           </div>
           <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Register New Student</h4>
        </div>

        {message === 'success' && (
           <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-bold border border-emerald-100">
              <CheckCircle className="w-5 h-5" /> Student officially registered to the system.
           </div>
        )}
        {message === 'error' && (
           <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-2xl flex items-center gap-3 text-sm font-bold border border-rose-100">
              <AlertCircle className="w-5 h-5" /> Please fill out all required fields.
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="John Doe" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="john@example.com" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Phone Number</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="+91 98765 43210" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Course Enrollment *</label>
                <select name="course" value={formData.course} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer">
                   <option value="">Select a course...</option>
                   {courses?.map(c => (
                     <option key={c.name} value={c.name}>{c.name}</option>
                   ))}
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Initial Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer">
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
                </select>
             </div>
          </div>
          
          <div className="pt-6">
             <button type="submit" className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Append Record to Database
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
