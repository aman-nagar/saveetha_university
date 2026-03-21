import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { useAcademicFlow } from "../../../hooks/useAcademicFlow";
import { useToast } from "../../../context/ToastContext";

import Button from "../../../components/ui/Button";
import AdmitCardForm from "../../../components/admin/students/admit-card/AdmitCardForm";
import ScheduleTable from "../../../components/admin/students/admit-card/ScheduleTable";
import Table from "../../../components/table/Table";
import Modal from "../../../components/ui/Modal";
import {
  FaRegEye,
  FaTrashAlt,
  FaEdit,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  fetchAdmitCardById,
  createAdmitCard,
  updateAdmitCard,
  fetchAdmitCards,
  hardDeleteAdmitCard,
} from "../../../api/students/admitCardApi";
import AdmitCardDetails from "../../../components/admin/students/admit-card/AdmitCardDetails";

export default function GenerateAdmitCardPage() {
  const [viewData, setViewData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [admitCards, setAdmitCards] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { show } = useToast();
  const { register, setValue, handleSubmit, watch, reset } = useForm();
  const selectedPart = watch("selectedDuration");
  const searchContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const academicFlow = useAcademicFlow(setValue);
  const loadHistory = async (page = 1) => {
    setLoadingHistory(true);
    try {
      const response = await fetchAdmitCards(page);

      // console.log("History API Structured Response:", response);

      setAdmitCards(response.records || []);
      setCurrentPage(response.page || 1);

      const total = Number(response.total || 0);
      const limit = Number(response.limit || 10);

      setTotalPages(Math.ceil(total / limit));
    } catch (err) {
      // console.error("History Load Error:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to table top if needed
  };

  useEffect(() => {
    if (selectedPart) {
      // Pass streamId if available, otherwise loadSubjectsForPart will use the hook's streamId
      academicFlow.loadSubjectsForPart(selectedPart, academicFlow.streamId);
    }
  }, [selectedPart, academicFlow.streamId, academicFlow]);

  // ✅ 1. Improved Edit Logic: Fetches full details to get the missing Student ID
  const handleEdit = async (record) => {
    setLoadingDetails(true);
    try {
      const fullDetailRes = await fetchAdmitCardById(record.id);
      const details = fullDetailRes.data || fullDetailRes;

      if (!details.student_id) {
        throw new Error("Student ID not found in record details.");
      }

      setEditingId(details.id);
      academicFlow.setSearchTerm(details.enrollment_no);

      // Select student using the ID from full details to avoid 'undefined' errors
      const returnedStreamId = await academicFlow.selectStudent({
        id: details.student_id,
        enrollment_no: details.enrollment_no,
      });

      // Populate form fields
      setValue("rollNo", details.roll_number);
      setValue("session", details.session);
      setValue("selectedDuration", String(details.duration));

      // Load subjects and set schedule (use returnedStreamId for immediate access)
      await academicFlow.loadSubjectsForPart(
        details.duration,
        returnedStreamId,
      );

      details.subjects?.forEach((sub) => {
        setValue(`schedule.${sub.subject_id}.date`, sub.exam_date);
        setValue(
          `schedule.${sub.subject_id}.start_time`,
          sub.start_time?.substring(0, 5),
        );
        setValue(
          `schedule.${sub.subject_id}.end_time`,
          sub.end_time?.substring(0, 5),
        );
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoadingDetails(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
    academicFlow.setSearchTerm("");
  };

  // ✅ 2. Modal-based Delete Logic
  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsSubmitting(true);
    try {
      await hardDeleteAdmitCard(deleteId);
      show("success", "Admit card permanently deleted.");
      setDeleteId(null);
      loadHistory();
    } catch (err) {
      show("error", err.message || "Failed to delete admit card.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        id: editingId,
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
            start_time: `${schedule?.start_time || "10:00"}:00`,
            end_time: `${schedule?.end_time || "12:00"}:00`,
          };
        }),
      };

      if (editingId) {
        await updateAdmitCard(payload);
        show("success", "Admit Card updated successfully!");
      } else {
        await createAdmitCard(payload);
        show("success", "Admit Card generated successfully!");
      }

      cancelEdit();
      loadHistory();
    } catch (err) {
      show("error", err.message || "Action failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewCard = async (id) => {
    setLoadingDetails(true);
    try {
      const data = await fetchAdmitCardById(id);
      setViewData(data);
    } catch (err) {
      show("error", "Failed to load details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const logic = { ...academicFlow, admitCards, isSubmitting };

  const columns = [
    { key: "enrollment_no", label: "Enrollment" },
    { key: "candidate_name", label: "Student" },
    { key: "roll_number", label: "Roll No." },
    {
      key: "exam",
      label: "Exam",
      render: (r) => `${r.duration_type} ${r.duration}`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleViewCard(row.id)}
            className="text-primary cursor-pointer hover:opacity-80 transition"
          >
            <FaRegEye size="18" />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-accent cursor-pointer hover:opacity-80 transition"
          >
            <FaEdit size="18" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="text-danger cursor-pointer hover:opacity-80 transition"
          >
            <FaTrashAlt size="16" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">
          {editingId ? "Update Admit Card" : "Generate Admit Card"}
        </h1>
        {editingId && (
          <button
            onClick={cancelEdit}
            className="flex items-center gap-2 text-danger text-sm font-bold border border-danger/20 px-3 py-1 rounded-lg bg-danger/5 hover:bg-danger/10 cursor-pointer transition-colors"
          >
            <FaTimes /> Cancel Edit
          </button>
        )}
      </div>

      <div
        className={`bg-surface border rounded-xl p-6 shadow-sm transition-all ${editingId ? "border-accent ring-1 ring-accent/20" : "border-border"}`}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <AdmitCardForm
            register={register}
            logic={logic}
            searchRef={searchContainerRef}
          />
          {selectedPart && (
            <ScheduleTable
              register={register}
              watch={watch}
              setValue={setValue}
              subjects={academicFlow.subjects}
              loading={academicFlow.loadingSubjects}
              courseType={academicFlow.courseType}
              selectedPart={selectedPart}
            />
          )}
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Processing..."
                : editingId
                  ? "Update Admit Card"
                  : "Generate Admit Card"}
            </Button>
          </div>
        </form>
      </div>

      <Table
        title="History"
        columns={columns}
        data={admitCards}
        loading={loadingHistory}
      />

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 pb-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`min-w-[34px] sm:min-w-[38px] px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition ${
                page === currentPage
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-surface hover:bg-bg/50"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* ✅ 3. RESTORED: Custom Deletion Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto">
            <FaExclamationTriangle size="32" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text">Are you sure?</h3>
            <p className="text-sm text-muted">
              This will permanently delete the admit card from the database.
              This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setDeleteId(null)}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-bg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-danger text-white rounded-lg hover:opacity-90 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Deleting..." : "Delete Permanently"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!viewData}
        onClose={() => setViewData(null)}
        title="Admit Card Preview"
        size="full"
      >
        {loadingDetails ? (
          <div className="py-20 text-center animate-pulse">
            Loading Details...
          </div>
        ) : (
          <AdmitCardDetails data={viewData} />
        )}
      </Modal>
    </div>
  );
}
