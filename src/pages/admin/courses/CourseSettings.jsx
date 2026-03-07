// src/pages/admin/courses/SettingsPage.jsx
import MasterAcademicImport from "../../../components/admin/courses/MasterAcademicImport";
import { useToast } from "../../../context/ToastContext";

export default function CourseSettings() {
  const { show } = useToast();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Configuration</h1>
      <MasterAcademicImport
        showToast={show}
        onComplete={() => console.log("Refresh required or navigation")}
      />
    </div>
  );
}
