// src/components/admin/certificate/CertificateGeneratorForm.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch, FaSpinner } from "react-icons/fa";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import Button from "../../ui/Button";
import { fetchResults } from "../../../api/results/resultApi";
import { createCertificate } from "../../../api/certificate/certificate";

export default function CertificateGeneratorForm({ onSuccess, showToast }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Debounced Search for Students with Results
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
        setSearchResults(response.data || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, selectedEnrollment]);

  const clearSelection = () => {
    setSelectedEnrollment(null);
    setSelectedStudentId(null);
    setSearchTerm("");
  };

  const onSubmit = async (data) => {
    if (!selectedStudentId) {
      return showToast(
        "error",
        "Please search and select an Enrollment Number first.",
      );
    }
    setIsSubmitting(true);
    try {
      await createCertificate({
        student_id: selectedStudentId,
        issue_date: data.issue_date,
        final_year: data.final_year,
      });
      showToast("success", "Certificate created successfully!");
      reset();
      clearSelection();
      if (onSuccess) onSuccess(); // Trigger table reload in parent
    } catch (error) {
      showToast("error", error.message || "Failed to create certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-text mb-6">Generate Certificate</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  onClick={() => {
                    setSelectedEnrollment(res.enrollment_no);
                    setSelectedStudentId(res.student_id);
                    setSearchTerm(res.enrollment_no);
                    setShowDropdown(false);
                  }}
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
              No published results found.
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
  );
}
