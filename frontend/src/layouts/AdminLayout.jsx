import { useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const getHeaderInfo = () => {
    const path = location.pathname;
    const savedFaculties = localStorage.getItem('admin_faculty_overview');
    const faculties = savedFaculties ? JSON.parse(savedFaculties) : [];
    
    const getFacultyName = (title) => {
      const f = faculties.find(fac => fac.title === title);
      return f ? f.name : "FACULTY";
    };

    if (path === '/admin') return { title: "Dashboard", sub: "CENTRAL MANAGEMENT" };
    if (path === '/admin/students') return { title: "Student Management", sub: `MANAGED BY ${getFacultyName("STUDENT MANAGEMENT")}` };
    if (path === '/admin/attendance') return { title: "Attendance Management", sub: `MANAGED BY ${getFacultyName("ATTENDANCE MANAGEMENT")}` };
    if (path === '/admin/courses') return { title: "Course Management", sub: `MANAGED BY ${getFacultyName("COURSE MANAGEMENT")}` };
    if (path === '/admin/fees') return { title: "Fees Management", sub: `MANAGED BY ${getFacultyName("FEES MANAGEMENT")}` };
    if (path === '/admin/faculty') return { title: "Faculty Management", sub: "SYSTEM AUTHORITY & USER PERMISSIONS" };
    if (path === '/admin/financials') return { title: "Financials", sub: "SYSTEM OVERVIEW" };
    return { title: "Admin Portal", sub: "Welcome back to Academic Authority." };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header title={headerInfo.title} sub={headerInfo.sub} showSearch={false} />
        <main className="flex-1 bg-white">
          <div className="p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
