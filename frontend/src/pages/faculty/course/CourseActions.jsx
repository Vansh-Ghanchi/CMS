import React, { useState } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { BookPlus, CheckCircle, AlertCircle } from 'lucide-react';

export default function CourseActions() {
  const { setCourses } = useAdminData();
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    fee: '',
    institute: 'GIT',
    status: 'Active',
    description: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.duration || !formData.fee) {
      setMessage('error');
      return;
    }

    const newCourse = {
      ...formData,
      id: `CRS-${Date.now().toString().slice(-4)}`,
      fee: parseFloat(formData.fee),
      students: 0,
      faculty: "To be assigned",
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      endDate: "TBD"
    };

    setCourses(prev => [...prev, newCourse]);
    setMessage('success');
    setFormData({ name: '', duration: '', fee: '', institute: 'GIT', status: 'Active', description: '' });
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Course Actions</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Create and modify academic programs</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-10 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
               <BookPlus className="w-6 h-6" />
           </div>
           <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Add New Program</h4>
        </div>

        {message === 'success' && (
           <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-bold border border-emerald-100">
              <CheckCircle className="w-5 h-5" /> Course successfully added to the curriculum.
           </div>
        )}
        {message === 'error' && (
           <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-2xl flex items-center gap-3 text-sm font-bold border border-rose-100">
              <AlertCircle className="w-5 h-5" /> All fields marked with * are mandatory.
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Course Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="e.g. M-Tech (Data Science)" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Duration *</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="e.g. 2 Years" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Course Fee (Lakhs) *</label>
                <input type="number" step="0.01" name="fee" value={formData.fee} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="e.g. 4.50" />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Institute</label>
                <select name="institute" value={formData.institute} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer">
                   <option value="GIT">GIT</option>
                   <option value="GICSA">GICSA</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Program Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer">
                   <option value="Active">Active</option>
                   <option value="Inactive">Inactive</option>
                </select>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Program Description</label>
             <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-[#F8FAFC] border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none" placeholder="Brief details about the course curriculum..."></textarea>
          </div>
          
          <div className="pt-4">
             <button type="submit" className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Publish Program
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
