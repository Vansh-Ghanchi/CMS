import { Route, Routes, Navigate } from "react-router-dom";
import { SearchProvider } from "../context/SearchContext";
import { AdminDataProvider } from "../context/AdminDataContext";

// Student Faculty
import FacultyStudentDashboard from "../pages/faculty/student/FacultyStudentDashboard";
import FacultyStudentPage from "../pages/faculty/student/FacultyStudentPage";
import StudentActions from "../pages/faculty/student/StudentActions";

// Attendance Faculty
import FacultyAttendanceDashboard from "../pages/faculty/attendance/FacultyAttendanceDashboard";
import FacultyAttendancePage from "../pages/faculty/attendance/FacultyAttendancePage";
import AttendanceActions from "../pages/faculty/attendance/AttendanceActions";

// Course Faculty
import FacultyCourseDashboard from "../pages/faculty/course/FacultyCourseDashboard";
import FacultyCoursePage from "../pages/faculty/course/FacultyCoursePage";
import CourseActions from "../pages/faculty/course/CourseActions";

// Fees Faculty
import FacultyFeesDashboard from "../pages/faculty/fees/FacultyFeesDashboard";
import FacultyFeesPage from "../pages/faculty/fees/FacultyFeesPage";
import FeesActions from "../pages/faculty/fees/FeesActions";

import FacultyLayout from "../layouts/FacultyLayout";

export default function FacultyRoutes() {
  return (
    <AdminDataProvider>
      <SearchProvider>
        <FacultyLayout>
        <Routes>
          {/* Student Routes */}
          <Route path="/student-dashboard" element={<FacultyStudentDashboard />} />
          <Route path="/student-module" element={<FacultyStudentPage />} />
          <Route path="/student-actions" element={<StudentActions />} />

          {/* Attendance Routes */}
          <Route path="/attendance-dashboard" element={<FacultyAttendanceDashboard />} />
          <Route path="/attendance-module" element={<FacultyAttendancePage />} />
          <Route path="/attendance-actions" element={<AttendanceActions />} />

          {/* Course Routes */}
          <Route path="/course-dashboard" element={<FacultyCourseDashboard />} />
          <Route path="/course-module" element={<FacultyCoursePage />} />
          <Route path="/course-actions" element={<CourseActions />} />

          {/* Fees Routes */}
          <Route path="/fees-dashboard" element={<FacultyFeesDashboard />} />
          <Route path="/fees-module" element={<FacultyFeesPage />} />
          <Route path="/fees-actions" element={<FeesActions />} />

          {/* Fallback to something default if path doesn't match */}
          {/* We'll let App.js handle high level, but here a catch-all to student dashboard or just nothing as each uses different links */}
          <Route path="*" element={<Navigate to="/faculty/student-dashboard" replace />} />
        </Routes>
      </FacultyLayout>
    </SearchProvider>
    </AdminDataProvider>
  );
}
