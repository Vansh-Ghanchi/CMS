import { useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

export default function FacultyLayout({ children }) {
  const location = useLocation();

  const getHeaderInfo = () => {
    const path = location.pathname;
    if (path.includes('student-module')) return { title: "Student Management", sub: "Student overview for the current academic session." };
    if (path.includes('attendance-module')) return { title: "Attendance Management", sub: "Attendance overview for the current academic session." };
    if (path.includes('course-module')) return { title: "Course Management", sub: "Curriculum overview for the current academic session." };
    if (path.includes('fees-module')) return { title: "Fees Management", sub: "Financial overview for the current academic session." };
    return { title: "Faculty Dashboard", sub: "Welcome back to Academic Authority." };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header title={headerInfo.title} sub={headerInfo.sub} />
        <main className="flex-1 bg-white">
          <div className="p-10 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
