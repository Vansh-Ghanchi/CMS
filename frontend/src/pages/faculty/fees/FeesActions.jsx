import React, { useState } from "react";
import { useAdminData } from "../../../context/AdminDataContext";
import { CreditCard, Calendar } from "lucide-react";

export default function FeesActions() {
  const { fees, setFees, courses } = useAdminData();

  const [studentId, setStudentId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [paymentData, setPaymentData] = useState({
    semester: "",
    amount: "",
    method: "UPI"
  });

  const [dueDateData, setDueDateData] = useState({
    institute: "",
    course: "",
    semester: "",
    dueDate: ""
  });

  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // ================= FETCH =================
  const handleFetchStudent = () => {
    const student = fees.find(s => s.id === studentId.trim());
    if (!student) return showMessage("not-found");
    setSelectedStudent(student);
    showMessage("fetched");
  };

  // ================= PAYMENT =================
  const handlePayment = (e) => {
    e.preventDefault();

    if (!selectedStudent || !paymentData.semester || !paymentData.amount) {
      return showMessage("error");
    }

    const sem = selectedStudent.semesters.find(
      s => s.sem === paymentData.semester
    );

    if (!sem) return showMessage("error");

    if (Number(paymentData.amount) > sem.remaining) {
      return showMessage("overpay");
    }

    setFees(prev =>
      prev.map(s => {
        if (s.id !== selectedStudent.id) return s;

        const updatedSemesters = s.semesters.map(sem => {
          if (sem.sem !== paymentData.semester) return sem;

          const newPaid = sem.paid + Number(paymentData.amount);
          const newRemaining = sem.fees - newPaid;

          return {
            ...sem,
            paid: newPaid,
            remaining: newRemaining,
            status: newRemaining <= 0 ? "Paid" : "Pending"
          };
        });

        return {
          ...s,
          semesters: updatedSemesters,
          paid: updatedSemesters.reduce((a, b) => a + b.paid, 0),
          remaining: updatedSemesters.reduce((a, b) => a + b.remaining, 0),
          status: updatedSemesters.every(s => s.remaining === 0)
            ? "Paid"
            : "Pending",
          history: [
            {
              date: new Date().toLocaleDateString(),
              amount: Number(paymentData.amount),
              method: paymentData.method,
              status: "Success"
            },
            ...s.history
          ]
        };
      })
    );

    showMessage("paid");

    setPaymentData({
      semester: "",
      amount: "",
      method: "UPI"
    });
  };

  // ================= DUE DATE =================
  const handleSetDueDate = (e) => {
    e.preventDefault();

    if (!dueDateData.institute || !dueDateData.course || !dueDateData.dueDate) {
      return showMessage("error");
    }

    setFees(prev =>
      prev.map(s => {
        if (
          s.institute === dueDateData.institute &&
          s.course === dueDateData.course
        ) {
          const updatedSemesters = s.semesters.map(sem => {
            if (!dueDateData.semester || sem.sem === dueDateData.semester) {
              return { ...sem, dueDate: dueDateData.dueDate };
            }
            return sem;
          });

          return {
            ...s,
            dueDate: dueDateData.dueDate,
            semesters: updatedSemesters
          };
        }
        return s;
      })
    );

    showMessage("due-set");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">
          Fees Actions
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
          Manage payments and due schedules
        </p>
      </div>

      {/* ================= DIRECT PAYMENT ================= */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">
            Direct Payment
          </h4>
        </div>

        {/* FETCH */}
        <div className="flex gap-4 mb-6">
          <input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold"
          />
          <button
            onClick={handleFetchStudent}
            className="px-6 bg-indigo-600 text-white rounded-2xl font-bold"
          >
            Fetch
          </button>
        </div>

        {/* STUDENT INFO */}
        {selectedStudent && (
          <div className="mb-6 bg-[#F8FAFC] rounded-2xl p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <Detail label="Name" val={selectedStudent.name} />
              <Detail label="Course" val={selectedStudent.course} />
              <Detail label="Paid" val={`₹${selectedStudent.paid}`} />
              <Detail label="Remaining" val={`₹${selectedStudent.remaining}`} />
            </div>

            <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
              Pending Semesters
            </p>

            <ul className="text-sm font-bold text-slate-600">
              {selectedStudent.semesters
                .filter(s => s.remaining > 0)
                .map(s => (
                  <li key={s.sem}>
                    {s.sem} → ₹{s.remaining} (Due: {s.dueDate || "N/A"})
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* FORM */}
        {selectedStudent && (
          <form onSubmit={handlePayment} className="grid md:grid-cols-2 gap-6">

            <select
              value={paymentData.semester}
              onChange={(e) => setPaymentData({ ...paymentData, semester: e.target.value })}
              className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold"
            >
              <option value="">Select Semester</option>
              {selectedStudent.semesters
                .filter(s => s.remaining > 0)
                .map(s => (
                  <option key={s.sem}>{s.sem}</option>
                ))}
            </select>

            <input
              type="number"
              placeholder="Enter Amount"
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
              className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold"
            />

            <select
              value={paymentData.method}
              onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
              className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold"
            >
              <option>UPI</option>
              <option>Cash</option>
              <option>Card</option>
              <option>Net Banking</option>
            </select>

            <button className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg col-span-2">
              Pay Fees
            </button>
          </form>
        )}
      </div>

      {/* ================= DUE DATE ================= */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-black uppercase tracking-tight">
            Set Due Date
          </h4>
        </div>

        <form onSubmit={handleSetDueDate} className="grid md:grid-cols-2 gap-6">

          <Select label="Institute" value={dueDateData.institute} onChange={(v) => setDueDateData({ ...dueDateData, institute: v })} options={["GIT", "GICSA"]} />
          <Select label="Course" value={dueDateData.course} onChange={(v) => setDueDateData({ ...dueDateData, course: v })} options={courses.map(c => c.name)} />
          <Select label="Semester" value={dueDateData.semester} onChange={(v) => setDueDateData({ ...dueDateData, semester: v })} options={["All", "Sem 1", "Sem 2", "Sem 3", "Sem 4"]} />

          <Input label="Due Date" type="date" value={dueDateData.dueDate} onChange={(v) => setDueDateData({ ...dueDateData, dueDate: v })} />

          <button className="px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg col-span-2">
            Apply Due Date
          </button>
        </form>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="fixed bottom-6 right-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg z-50">
          {message === "fetched" && "Student Loaded ✅"}
          {message === "paid" && "Payment Successful 💳"}
          {message === "due-set" && "Due Date Updated 📅"}
          {message === "not-found" && "Student Not Found ❌"}
          {message === "overpay" && "Amount exceeds remaining ❌"}
          {message === "error" && "Fill all fields ❌"}
        </div>
      )}
    </div>
  );
}

/* REUSABLE */
const Detail = ({ label, val }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-black">{val}</p>
  </div>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold" />
  </div>
);

const Select = ({ label, value, onChange, options = [] }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-12 bg-[#F8FAFC] rounded-2xl px-5 text-sm font-bold">
      <option value="">Select</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);