import React from 'react';
import StudentManagement from "../../admin/student/StudentManagement";

export default function FacultyStudentPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <StudentManagement noLayout={true} />
    </div>
  );
}
