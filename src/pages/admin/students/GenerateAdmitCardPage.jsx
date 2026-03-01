// src/pages/admin/students/GenerateAdmitCardPage.jsx
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { useAcademicFlow } from "../../../hooks/useAcademicFlow"; // ✅ New Shared Hook
import { useToast } from "../../../hooks/useToast";
import Toast from "../../../components/ui/Toast";
import Button from "../../../components/ui/Button";
import AdmitCardForm from "../../../components/admin/students/admit-card/AdmitCardForm";
import ScheduleTable from "../../../components/admin/students/admit-card/ScheduleTable";
import Table from "../../../components/table/Table";
import Modal from "../../../components/ui/Modal";
import {
  fetchAdmitCardById,
  createAdmitCard,
  fetchAdmitCards,
} from "../../../api/students/admitCardApi";
import AdmitCardDetails from "../../../components/admin/students/admit-card/AdmitCardDetails";

export default function GenerateAdmitCardPage() {
  const [viewData, setViewData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [admitCards, setAdmitCards] = useState([]); // Moved from old logic hook
  const [isSubmitting, setIsSubmitting] = useState(false); // Moved from old logic hook

  const { toast, show, clear } = useToast();
  const { register, setValue, handleSubmit, watch, reset } = useForm();
  const selectedPart = watch("selectedDuration");
  const searchContainerRef = useRef(null);

  // ✅ Instantiate the shared academic flow
  const academicFlow = useAcademicFlow(setValue);

  // ✅ 1. Load history locally
  const loadHistory = async () => {
    try {
      const records = await fetchAdmitCards();
      setAdmitCards(records || []);
    } catch (err) {
      console.error("History Load Error:", err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (selectedPart) {
      academicFlow.loadSubjectsForPart(selectedPart);
    }
  }, [selectedPart, academicFlow.loadSubjectsForPart]);

  const handleViewCard = async (id) => {
    setLoadingDetails(true);
    try {
      const data = await fetchAdmitCardById(id);
      setViewData(data);
    } catch (err) {
      show("error", "Failed to load admit card details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  // ✅ 3. Re-implemented Submission Logic inside the page
  const onGenerate = async (formData) => {
    if (academicFlow.subjects.length === 0) {
      show("error", "No subjects found to generate schedule.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        student_id: Number(academicFlow.studentId),
        roll_number: String(formData.rollNo),
        session: String(formData.session),
        duration: Number(formData.selectedDuration),
        duration_type: String(academicFlow.courseType),
        stream_id: Number(academicFlow.streamId),
        subjects: academicFlow.subjects.map((sub) => {
          const schedule = formData.schedule?.[sub.id];
          return {
            subject_id: Number(sub.id),
            exam_date: schedule?.date || "",
            start_time: schedule?.start_time
              ? `${schedule.start_time}:00`
              : "10:00:00",
            end_time: schedule?.end_time
              ? `${schedule.end_time}:00`
              : "12:00:00",
          };
        }),
      };

      await createAdmitCard(payload);
      show("success", "Admit Card generated and saved successfully!");
      reset();
      academicFlow.setSearchTerm("");
      loadHistory();
    } catch (err) {
      show("error", err.message || "Failed to generate admit card.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Logic Object Wrapper (To keep AdmitCardForm.jsx working without changes) ──
  const logic = {
    ...academicFlow,
    admitCards,
    isSubmitting,
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
              subjects={academicFlow.subjects}
              loading={academicFlow.loadingSubjects}
              courseType={academicFlow.courseType}
              selectedPart={selectedPart}
            />
          )}
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Generating..." : "Generate Admit Card"}
            </Button>
          </div>
        </form>
      </div>
      <Table title="Admit Card History" columns={columns} data={admitCards} />
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
