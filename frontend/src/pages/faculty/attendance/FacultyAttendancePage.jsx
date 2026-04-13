import React from 'react';
import AttendanceManagement from "../../admin/attendance/AttendanceManagement";

export default function FacultyAttendancePage() {
  return (
    <div className="animate-in fade-in duration-500">
      <AttendanceManagement noLayout={true} />
    </div>
  );
}
