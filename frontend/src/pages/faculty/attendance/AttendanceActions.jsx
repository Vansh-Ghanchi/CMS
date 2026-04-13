import React, { useState, useMemo } from 'react';
import { useAdminData } from '../../../context/AdminDataContext';
import { Save, CheckCircle, Search } from 'lucide-react';

export default function AttendanceActions() {
  const { students, courses, setAttendanceLogs } = useAdminData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');
  
  // Local state to track toggles
  const [attendance, setAttendance] = useState({});

  const filteredStudents = useMemo(() => {
    if (!selectedCourse) return [];
    const _students = students.filter(s => s.course === selectedCourse);
    // Initialize toggles as Present
    const initial = {};
    _students.forEach(s => initial[s.studentId] = 'Present');
    setAttendance(initial);
    return _students;
  }, [students, selectedCourse]);

  const toggleStatus = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleSave = () => {
    if (!selectedCourse || !selectedDate) return;

    // Constructed payload conforming strictly to backend structures requested
    const records = filteredStudents.map(s => ({
       studentId: s.studentId,
       status: attendance[s.studentId]
    }));
    
    // API Mapping wrapper
    const apiPayload = {
       date: selectedDate,
       course: selectedCourse,
       records
    };

    // Flattening mapped payload to seamlessly integrate with pre-existing Admin Context Logic without duplication
    const flatLogsToAppend = apiPayload.records.map(rec => ({
       date: apiPayload.date,
       studentId: rec.studentId,
       status: rec.status,
       checkIn: rec.status === 'Present' ? "09:00 AM" : "-",
       remarks: "-"
    }));

    setAttendanceLogs(prev => [...prev, ...flatLogsToAppend]);
    
    setMessage('success');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Attendance Marker</h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Post real-time attendance directly</p>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-end gap-4 mb-8 pb-8 border-b border-slate-100">
           <div className="flex-1 w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Select Date</label>
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none" 
              />
           </div>
           <div className="flex-1 w-full">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block mb-2">Target Course</label>
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)} 
                className="w-full h-12 bg-[#F8FAFC] border-none rounded-2xl px-5 text-sm font-bold text-slate-700 outline-none cursor-pointer"
              >
                 <option value="">Choose a course...</option>
                 {courses?.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
           </div>
           
           <div className="w-full md:w-auto">
              {message === 'success' ? (
                 <div className="h-12 px-6 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 font-bold text-sm tracking-tight rounded-2xl border border-emerald-100">
                    <CheckCircle className="w-5 h-5" /> Saved
                 </div>
              ) : (
                 <button onClick={handleSave} disabled={filteredStudents.length === 0} className="w-full md:w-auto h-12 px-8 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100">
                    Save Roster
                 </button>
              )}
           </div>
        </div>

        <div>
           {filteredStudents.length > 0 ? (
              <div className="overflow-x-auto">
                 <table className="w-full text-left min-w-[500px]">
                    <thead>
                       <tr className="border-b border-slate-100 bg-slate-50/50">
                          <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-tl-xl">ID</th>
                          <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                          <th className="py-4 px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right rounded-tr-xl">Toggle</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredStudents.map(student => (
                          <tr key={student.studentId} className="hover:bg-slate-50">
                             <td className="py-4 px-6 text-[11px] font-black text-slate-400 tracking-widest">{student.studentId}</td>
                             <td className="py-4 px-6 text-sm font-black text-[#1E293B]">{student.name}</td>
                             <td className="py-4 px-6 text-right flex justify-end">
                                <button 
                                  onClick={() => toggleStatus(student.studentId)}
                                  className={`w-[120px] h-10 rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest transition-all ${attendance[student.studentId] === 'Present' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}
                                >
                                   {attendance[student.studentId]}
                                </button>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           ) : (
              <div className="py-20 flex flex-col items-center justify-center text-slate-300">
                 <Search className="w-12 h-12 mb-4 opacity-20" />
                 <p className="font-bold text-sm tracking-tight capitalize">Select a course to load roster</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}
