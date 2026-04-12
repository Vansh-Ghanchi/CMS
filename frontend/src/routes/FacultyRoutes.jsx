import { Route, Routes, Navigate } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import FacultyDashboard from "../pages/faculty/dashboard/FacultyDashboard";
import FacultyStudentPage from "../pages/faculty/student/FacultyStudentPage";
import FacultyAttendancePage from "../pages/faculty/attendance/FacultyAttendancePage";
import FacultyCoursePage from "../pages/faculty/course/FacultyCoursePage";
import FacultyFeesPage from "../pages/faculty/fees/FacultyFeesPage";

export default function FacultyRoutes() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/dashboard" element={<FacultyDashboard />} />
        <Route path="/student-module" element={<FacultyStudentPage />} />
        <Route path="/attendance-module" element={<FacultyAttendancePage />} />
        <Route path="/course-module" element={<FacultyCoursePage />} />
        <Route path="/fees-module" element={<FacultyFeesPage />} />
        <Route path="*" element={<Navigate to="/faculty/dashboard" replace />} />
      </Routes>
    </SearchProvider>
  );
}
