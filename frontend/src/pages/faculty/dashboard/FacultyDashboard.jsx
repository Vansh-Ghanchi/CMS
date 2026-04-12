import FacultyLayout from "../../../layouts/FacultyLayout";
import { useAuth } from "../../../context/AuthContext";
import FacultyStudentPage from "../student/FacultyStudentPage";
import FacultyAttendancePage from "../attendance/FacultyAttendancePage";
import FacultyCoursePage from "../course/FacultyCoursePage";
import FacultyFeesPage from "../fees/FacultyFeesPage";

export default function FacultyDashboard() {
  const { user } = useAuth();

  if (user?.role === 'faculty-1') {
    return <FacultyStudentPage />;
  }

  if (user?.role === 'faculty-2') {
    return <FacultyAttendancePage />;
  }

  if (user?.role === 'faculty-3') {
    return <FacultyCoursePage />;
  }

  if (user?.role === 'faculty-4') {
    return <FacultyFeesPage />;
  }

  // Fallback for other faculties (to be implemented)
  return (
    <FacultyLayout>
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <h2 className="text-3xl font-black text-[#1E293B] mb-4">Faculty Dashboard</h2>
        <p className="text-[#64748B] font-bold">Welcome back, {user?.name}. Select a module from the sidebar to get started.</p>
      </div>
    </FacultyLayout>
  );
}
