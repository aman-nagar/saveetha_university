import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash, FaSearch, FaSpinner } from "react-icons/fa";
import {
  FetchCertificate,
  createCertificate,
  DeleteCertificate,
} from "../../../api/certificate/certificate";
import { fetchResults } from "../../../api/results/resultApi";

// UI Components
import Toast from "../../../components/ui/Toast";
import { useToast } from "../../../context/ToastContext";
import FormSection from "../../../components/form/FormSection";
import FormInput from "../../../components/form/FormInput";
import Button from "../../../components/ui/Button";
import Table from "../../../components/table/Table";
import DataTableLayout from "../../../components/table/DataTableLayout";

export default function CreateCertificatePage() {
  const { toast, show, clear } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // --- States ---
  const [certificates, setCertificates] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // ✅ ADDED THIS STATE

  // --- 1. Load Certificates on Mount ---
  const loadCertificates = async () => {
    try {
      setLoadingList(true);
      const res = await FetchCertificate();
      console.log(res);
      setCertificates(Array.isArray(res) ? res : res?.data || []);
    } catch (error) {
      show("error", "Failed to load certificates");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // --- 2. Debounced Search ---
  useEffect(() => {
    if (selectedEnrollment && searchTerm === selectedEnrollment) {
      setShowDropdown(false);
      return;
    }

    if (searchTerm.length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetchResults(1, searchTerm);
        const data = response.data || [];
        setSearchResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedEnrollment]);

  const handleSelectStudent = (resultRecord) => {
    setSelectedEnrollment(resultRecord.enrollment_no);
    setSelectedStudentId(resultRecord.student_id);
    setSearchTerm(resultRecord.enrollment_no);
    setShowDropdown(false);
  };

  const clearSelection = () => {
    setSelectedEnrollment(null);
    setSelectedStudentId(null);
    setSearchTerm("");
  };

  // --- 3. Submit Handler ---
  const onSubmit = async (data) => {
    if (!selectedStudentId) {
      return show(
        "error",
        "Please search and select an Enrollment Number first.",
      );
    }

    setIsSubmitting(true);
    try {
      const payload = {
        student_id: selectedStudentId,
        issue_date: data.issue_date,
        final_year: data.final_year,
      };

      await createCertificate(payload);
      show("success", "Certificate created successfully!");

      reset();
      clearSelection();
      loadCertificates();
    } catch (error) {
      show("error", error.message || "Failed to create certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 4. Delete Handler ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;

    try {
      await DeleteCertificate(id);
      show("success", "Certificate deleted");
      loadCertificates();
    } catch (error) {
      show("error", error.message || "Failed to delete");
    }
  };

  // --- Table Columns ---
  const columns = [
    { key: "serial", label: "#", render: (_, i) => i + 1 },
    { key: "enrollment_no", label: "Enrollment no." },
    { key: "final_year", label: "Passing Year" },
    { key: "issue_date", label: "Issue Date" },
    { key: "course_name", label: "Course name" },
  ];

  const actions = [
    {
      icon: <FaTrash />,
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm transition-colors",
      title: "Delete Certificate",
      onClick: (row) => handleDelete(row.id),
    },
  ];

  return (
    <div className="w-full space-y-6">
      {toast && <Toast {...toast} onClose={clear} />}

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-text mb-6">
          Generate Certificate
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SEARCH BOX SECTION */}
          <div className="space-y-1.5 sm:space-y-2 relative">
            <label className="text-xs sm:text-sm font-medium text-text">
              Search Enrollment No. (Must have a result){" "}
              <span className="text-danger">*</span>
            </label>

            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (selectedEnrollment) clearSelection();
                }}
                placeholder="Type to search..."
                className={`w-full border rounded-lg pl-9 pr-3 py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                  selectedEnrollment
                    ? "border-success ring-1 ring-success"
                    : "border-border"
                }`}
                autoComplete="off"
              />
              {isSearching && (
                <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 text-primary animate-spin" />
              )}
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-surface border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {searchResults.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleSelectStudent(res)}
                    className="px-4 py-3 hover:bg-bg cursor-pointer border-b border-border last:border-0"
                  >
                    <p className="text-sm font-bold text-text">
                      {res.enrollment_no}
                    </p>
                    <p className="text-xs text-muted">
                      Roll: {res.roll_no} | Session: {res.session}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {showDropdown && searchResults.length === 0 && !isSearching && (
              <div className="absolute z-50 w-full mt-1 bg-surface border border-border rounded-lg shadow-xl p-4 text-center text-sm text-muted">
                No published results found for this enrollment number.
              </div>
            )}

            {selectedEnrollment && (
              <p className="text-xs text-success font-semibold mt-1">
                ✓ Enrollment selected
              </p>
            )}
          </div>

          <FormSection columns={2}>
            <FormInput
              type="date"
              label="Issue Date"
              name="issue_date"
              register={register}
              required="Issue date is required"
              error={errors.issue_date?.message}
            />
            <FormInput
              type="text"
              label="Passing Year"
              name="final_year"
              placeholder="e.g., 2024"
              register={register}
              required="Passing year is required"
              error={errors.final_year?.message}
            />
          </FormSection>

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isSubmitting || !selectedStudentId}>
              {isSubmitting ? "Creating..." : "Create Certificate"}
            </Button>
          </div>
        </form>
      </div>

      <DataTableLayout title="Generated Certificates">
        <Table
          columns={columns}
          data={certificates}
          actions={actions}
          loading={loadingList}
          emptyMessage="No certificates found."
        />
      </DataTableLayout>
    </div>
  );
}
