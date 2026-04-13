import React from 'react';
import FeesManagement from "../../admin/fees/FeesManagement";

export default function FacultyFeesPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <FeesManagement noLayout={true} />
    </div>
  );
}
