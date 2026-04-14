import React from 'react';
import CourseManagement from "../../admin/course/CourseManagement";

export default function FacultyCoursePage() {
  return (
    <div className="animate-in fade-in duration-500">
      <CourseManagement noLayout={true} hideStats={true} />
    </div>
  );
}
