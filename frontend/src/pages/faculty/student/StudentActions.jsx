import React, { useState } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { UserPlus, RefreshCcw } from 'lucide-react';

export default function StudentActions() {
  const { students, setStudents, courses } = useAdminData();

  const [addData, setAddData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    course: '',
    status: 'Active'
  });

  const [updateData, setUpdateData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    course: '',
    status: 'Active'
  });

  const [message, setMessage] = useState('');

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // ================= ADD =================
  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!addData.name || !addData.email || !addData.course) {
      return showMessage('error');
    }

    const newStudent = {
      ...addData,
      studentId: `STU-${Date.now().toString().slice(-4)}`,
      admissionDate: new Date().toLocaleDateString(),
      institute: courses.find(c => c.name === addData.course)?.institute || 'GIT',
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    };

    setStudents(prev => [newStudent, ...prev]);
    showMessage('added');

    setAddData({
      name: '',
      email: '',
      phone: '',
      address: '',
      course: '',
      status: 'Active'
    });
  };

  // ================= FETCH =================
  const handleFetchStudent = () => {
    if (!updateData.studentId) return showMessage('no-id');

    const student = students.find(s => s.studentId === updateData.studentId);

    if (!student) return showMessage('not-found');

    setUpdateData({
      studentId: student.studentId,
      name: student.name || '',
      email: student.email || '',
      phone: student.phone || '',
      address: student.address || '',
      course: student.course || '',
      status: student.status || 'Active'
    });

    showMessage('fetched');
  };

  // ================= UPDATE =================
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (!updateData.studentId) return showMessage('no-id');

    setStudents(prev => {
      const index = prev.findIndex(s => s.studentId === updateData.studentId);
      if (index === -1) return prev;

      const updated = [...prev];
      updated[index] = { ...updated[index], ...updateData };

      return updated;
    });

    showMessage('updated');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">
          Student Actions
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
          Manage student registration and updates
        </p>
      </div>

      {/* ADD STUDENT */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <UserPlus className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black uppercase tracking-tight">
            Register New Student
          </h4>
        </div>

        <form onSubmit={handleAddSubmit} className="grid md:grid-cols-2 gap-6">

          <Input label="Full Name" placeholder="Enter full name" value={addData.name} onChange={v => setAddData({ ...addData, name: v })} />
          <Input label="Email" placeholder="Enter email address" value={addData.email} onChange={v => setAddData({ ...addData, email: v })} />
          <Input label="Phone" placeholder="Enter phone number" value={addData.phone} onChange={v => setAddData({ ...addData, phone: v })} />
          <Input label="Address" placeholder="Enter address" value={addData.address} onChange={v => setAddData({ ...addData, address: v })} />

          <Select label="Course" placeholder="Select course" value={addData.course} onChange={v => setAddData({ ...addData, course: v })} options={courses.map(c => c.name)} />
          <Select label="Status" placeholder="Select status" value={addData.status} onChange={v => setAddData({ ...addData, status: v })} options={['Active', 'Inactive']} />

          <button className="col-span-2 px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg">
            Add Student
          </button>
        </form>
      </div>

      {/* UPDATE STUDENT */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <RefreshCcw className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black uppercase tracking-tight">
            Update Student
          </h4>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            value={updateData.studentId}
            onChange={(e) => setUpdateData({ ...updateData, studentId: e.target.value })}
            placeholder="Enter Student ID"
            className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold"
          />
          <button onClick={handleFetchStudent} className="px-6 bg-indigo-600 text-white rounded-2xl font-bold">
            Fetch
          </button>
        </div>

        <form onSubmit={handleUpdateSubmit} className="grid md:grid-cols-2 gap-6">

          <Input label="Name" placeholder="Enter name" value={updateData.name} onChange={v => setUpdateData({ ...updateData, name: v })} />
          <Input label="Email" placeholder="Enter email" value={updateData.email} onChange={v => setUpdateData({ ...updateData, email: v })} />
          <Input label="Phone" placeholder="Enter phone" value={updateData.phone} onChange={v => setUpdateData({ ...updateData, phone: v })} />
          <Input label="Address" placeholder="Enter address" value={updateData.address} onChange={v => setUpdateData({ ...updateData, address: v })} />

          <Select label="Course" placeholder="Select course" value={updateData.course} onChange={v => setUpdateData({ ...updateData, course: v })} options={courses.map(c => c.name)} />
          <Select label="Status" placeholder="Select status" value={updateData.status} onChange={v => setUpdateData({ ...updateData, status: v })} options={['Active', 'Inactive']} />

          <button className="col-span-2 px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg">
            Update Student
          </button>
        </form>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">
          {message === 'added' && "Student Added ✅"}
          {message === 'updated' && "Student Updated 🔄"}
          {message === 'fetched' && "Data Loaded ✅"}
          {message === 'error' && "Fill required fields ❌"}
          {message === 'not-found' && "Student not found ❌"}
          {message === 'no-id' && "Enter Student ID ❌"}
        </div>
      )}
    </div>
  );
}

/* REUSABLE */
const Input = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold placeholder:text-slate-400"
    />
  </div>
);

const Select = ({ label, value, onChange, options = [], placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold text-slate-700"
    >
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);