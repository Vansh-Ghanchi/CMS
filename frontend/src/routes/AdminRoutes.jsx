import { Route, Routes, Navigate } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import Dashboard from "../pages/admin/Dashboard";
import StudentManagement from "../pages/admin/student/StudentManagement";
import AttendanceManagement from "../pages/admin/attendance/AttendanceManagement";
import CourseManagement from "../pages/admin/course/CourseManagement";
import FeesManagement from "../pages/admin/fees/FeesManagement";
import FacultyManagement from "../pages/admin/FacultyManagement";

export default function AdminRoutes() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/attendance" element={<AttendanceManagement />} />
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/fees" element={<FeesManagement />} />
        <Route path="/faculty" element={<FacultyManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </SearchProvider>
  );
}
