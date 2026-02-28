import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { useAdmitCardLogic } from "../../../hooks/useAdmitCardLogic";
import { useToast } from "../../../hooks/useToast";
import Toast from "../../../components/ui/Toast";
import Button from "../../../components/ui/Button";
import AdmitCardForm from "../../../components/admin/students/admit-card/AdmitCardForm";
import ScheduleTable from "../../../components/admin/students/admit-card/ScheduleTable";
import Table from "../../../components/table/Table";
import Modal from "../../../components/ui/Modal";
import { fetchAdmitCardById } from "../../../api/students/admitCardApi";
import AdmitCardDetails from "../../../components/admin/students/admit-card/AdmitCardDetails";

export default function GenerateAdmitCardPage() {
  const [viewData, setViewData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const { toast, show, clear } = useToast();
  const { register, setValue, handleSubmit, watch, reset } = useForm();
  const selectedPart = watch("selectedDuration");
  const searchContainerRef = useRef(null);

  const logic = useAdmitCardLogic(setValue);

  // Load history on mount
  useEffect(() => {
    logic.loadHistory();
  }, []);

  // Load subjects when duration changes
  useEffect(() => {
    logic.loadSubjectsForPart(selectedPart);
  }, [selectedPart]);

  const handleViewCard = async (id) => {
    setLoadingDetails(true);
    try {
      const data = await fetchAdmitCardById(id);
      setViewData(data);
    } catch (err) {
      console.error("View Error:", err.message);
      show("error", "Failed to load admit card details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const onGenerate = async (data) => {
    if (logic.subjects.length === 0) {
      show("error", "No subjects found to generate schedule.");
      return;
    }

    try {
      await logic.submitAdmitCard(data, logic.subjects);
      show("success", "Admit Card generated and saved successfully!");
      reset();
      logic.setSearchTerm("");
    } catch (err) {
      show("error", err.message || "Failed to generate admit card.");
    }
  };

  const columns = [
    {
      key: "enrollment_no",
      label: "Enrollment",
      render: (r) => r.enrollment_no || "—",
    },
    {
      key: "candidate_name",
      label: "Student Name",
      render: (r) => r.candidate_name || "N/A",
    },
    { key: "roll_number", label: "Roll No." },
    {
      key: "exam",
      label: "Exam For",
      render: (r) => `${r.duration_type} ${r.duration}`,
    },
    { key: "session", label: "Session" },
    {
      key: "actions",
      label: "View",
      render: (row) => (
        <button
          onClick={() => handleViewCard(row.id)}
          className="text-primary hover:underline font-medium text-xs"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-text">Generate Admit Card</h1>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit(onGenerate)}>
          <AdmitCardForm
            register={register}
            logic={logic}
            searchRef={searchContainerRef}
          />

          {selectedPart && (
            <ScheduleTable
              register={register}
              subjects={logic.subjects}
              loading={logic.loadingSubjects}
              courseType={logic.courseType}
              selectedPart={selectedPart}
            />
          )}

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={logic.isSubmitting}>
              {logic.isSubmitting ? "Generating..." : "Generate Admit Card"}
            </Button>
          </div>
        </form>
      </div>

      <Table
        title="Admit Card History"
        columns={columns}
        data={logic.admitCards}
      />

      {/* View Modal */}
      <Modal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Admit Card Preview"
        size="full"
      >
        {loadingDetails ? (
          <div className="py-20 text-center animate-pulse text-muted">
            Loading Details...
          </div>
        ) : (
          <AdmitCardDetails data={viewData} />
        )}
      </Modal>

      {toast && <Toast toast={toast} onClose={clear} />}
    </div>
  );
}
