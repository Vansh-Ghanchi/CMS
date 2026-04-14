import React, { useState } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { BookPlus, RefreshCcw, CheckCircle, AlertCircle } from 'lucide-react';

export default function CourseActions() {
   const { courses, setCourses } = useAdminData();

   // ➕ ADD STATE
   const [addData, setAddData] = useState({
      id: '',
      name: '',
      duration: '',
      fee: '',
      institute: 'GIT',
      faculty: '',
      status: 'Active'
   });

   // 🔄 UPDATE STATE
   const [updateData, setUpdateData] = useState({
      id: '',
      name: '',
      duration: '',
      fee: '',
      institute: 'GIT',
      faculty: '',
      status: 'Active'
   });

   const [message, setMessage] = useState('');

   // ================= CHANGE HANDLERS =================
   const handleAddChange = (e) => {
      setAddData({ ...addData, [e.target.name]: e.target.value });
   };

   const handleUpdateChange = (e) => {
      setUpdateData({ ...updateData, [e.target.name]: e.target.value });
   };

   // ================= ADD COURSE =================
   const handleAddSubmit = (e) => {
      e.preventDefault();

      if (!addData.id || !addData.name || !addData.duration || !addData.fee || !addData.faculty) {
         setMessage('error');
         return;
      }

      const newCourse = {
         ...addData,
         fee: parseFloat(addData.fee),
         students: 0
      };

      setCourses(prev => [...prev, newCourse]);
      setMessage('added');

      setAddData({
         id: '',
         name: '',
         duration: '',
         fee: '',
         institute: 'GIT',
         faculty: '',
         status: 'Active'
      });

      setTimeout(() => setMessage(''), 3000);
   };

   // ================= FETCH COURSE =================
   const handleFetchCourse = () => {
      if (!updateData.id) {
         setMessage('no-id');
         return;
      }

      const course = courses.find(c => c.id === updateData.id);

      if (!course) {
         setMessage('not-found');
         return;
      }

      setUpdateData({
         id: course.id,
         name: course.name || '',
         duration: course.duration || '',
         fee: course.fee || '',
         institute: course.institute || 'GIT',
         faculty: course.faculty || '',
         status: course.status || 'Active'
      });

      setMessage('fetched');
      setTimeout(() => setMessage(''), 3000);
   };

   // ================= UPDATE COURSE =================
   const handleUpdateSubmit = (e) => {
      e.preventDefault();

      if (!updateData.id) {
         setMessage('no-id');
         return;
      }

      setCourses(prev =>
         prev.map(c =>
            c.id === updateData.id
               ? { ...c, ...updateData, fee: parseFloat(updateData.fee) }
               : c
         )
      );

      setMessage('updated');
      setTimeout(() => setMessage(''), 3000);
   };

   return (
      <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

         {/* HEADER */}
         <div>
            <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">
               Course Actions
            </h1>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
               Create and modify academic programs
            </p>
         </div>

         {/* ================= ADD COURSE ================= */}
         <div className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookPlus className="w-6 h-6" />
               </div>
               <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">
                  Add New Program
               </h4>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <Input label="Course ID *" name="id" value={addData.id} onChange={handleAddChange} placeholder="e.g. CRS-101" />
                  <Input label="Course Name *" name="name" value={addData.name} onChange={handleAddChange} placeholder="e.g. B.Tech Computer Science" />
                  <Input label="Duration *" name="duration" value={addData.duration} onChange={handleAddChange} placeholder="e.g. 4 Years" />
                  <Input label="Course Fee *" name="fee" value={addData.fee} onChange={handleAddChange} placeholder="e.g. 4.5 (Lakhs)" />
                  <Input label="Faculty Name *" name="faculty" value={addData.faculty} onChange={handleAddChange} placeholder="e.g. Dr. Sharma" />

                  <Select label="Institute" name="institute" value={addData.institute} onChange={handleAddChange} options={["GIT", "GICSA"]} />
                  <Select label="Program Status" name="status" value={addData.status} onChange={handleAddChange} options={["Active", "Inactive"]} />

               </div>

               <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">
                  Publish Program
               </button>
            </form>
         </div>

         {/* ================= UPDATE COURSE ================= */}
         <div className="bg-white rounded-[32px] border border-slate-100 p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <RefreshCcw className="w-6 h-6" />
               </div>
               <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">
                  Update Program
               </h4>
            </div>

            {/* FETCH */}
            <div className="flex gap-4 mb-6">
               <input
                  name="id"
                  value={updateData.id}
                  onChange={handleUpdateChange}
                  placeholder="Enter Course ID (e.g. CRS-101)"
                  className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold"
               />
               <button
                  type="button"
                  onClick={handleFetchCourse}
                  className="px-6 bg-indigo-600 text-white rounded-2xl font-bold"
               >
                  Fetch
               </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <Input label="Course Name" name="name" value={updateData.name} onChange={handleUpdateChange} placeholder="Edit course name" />
                  <Input label="Duration" name="duration" value={updateData.duration} onChange={handleUpdateChange} placeholder="Edit duration" />
                  <Input label="Course Fee" name="fee" value={updateData.fee} onChange={handleUpdateChange} placeholder="Edit fee" />
                  <Input label="Faculty Name" name="faculty" value={updateData.faculty} onChange={handleUpdateChange} placeholder="Edit faculty name" />

                  <Select label="Institute" name="institute" value={updateData.institute} onChange={handleUpdateChange} options={["GIT", "GICSA"]} />
                  <Select label="Program Status" name="status" value={updateData.status} onChange={handleUpdateChange} options={["Active", "Inactive"]} />

               </div>

               <button className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg">
                  Update Program
               </button>
            </form>
         </div>

         {/* ================= MESSAGE ================= */}
         {message && (
            <div className="fixed bottom-6 right-6 px-6 py-3 rounded-xl text-white font-bold shadow-lg bg-indigo-600">
               {message === 'added' && "Course Added ✅"}
               {message === 'updated' && "Course Updated 🔄"}
               {message === 'fetched' && "Data Loaded ✅"}
               {message === 'not-found' && "Course Not Found ❌"}
               {message === 'no-id' && "Enter Course ID ❌"}
               {message === 'error' && "Fill all fields ❌"}
            </div>
         )}
      </div>
   );
}

/* REUSABLE INPUT */
const Input = ({ label, ...props }) => (
   <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">{label}</label>
      <input {...props} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold" />
   </div>
);

/* REUSABLE SELECT */
const Select = ({ label, options, ...props }) => (
   <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">{label}</label>
      <select {...props} className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold">
         {options.map(o => <option key={o}>{o}</option>)}
      </select>
   </div>
);