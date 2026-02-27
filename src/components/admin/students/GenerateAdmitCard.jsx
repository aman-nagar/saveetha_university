import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import Table from "../../../components/table/Table";
import Button from "../../../components/ui/Button";
import {
  searchEnrollment,
  fetchStudentById,
} from "../../../api/students/studentApi";

export default function GenerateAdmitCard() {
  const { register, setValue, handleSubmit, watch } = useForm();

  // Search & UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Guard for selection

  // Table State
  const [admitCards, setAdmitCards] = useState([]);
  const searchContainerRef = useRef(null);

  // --- 1. Debounced Search Logic ---
  useEffect(() => {
    // Prevent API calls if not typing or query too short
    if (!isTyping || searchTerm.length < 2) {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        setShowResults(false);
      }
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      setShowResults(true);
      try {
        const response = await searchEnrollment(searchTerm);
        // Map to student array based on your logged client.js behavior
        const data = response.students || response;
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search API Error:", err);
      } finally {
        setIsSearching(false);
        setIsTyping(false); // Reset typing state after API call
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isTyping]);

  // --- 2. Selection & Auto-Fill Logic ---
  const selectStudent = async (student) => {
    console.log("🚀 Selecting Student ID:", student.id);

    // Stop the search effect from firing again
    setIsTyping(false);
    setSearchTerm(student.enrollment_no);
    setValue("enrollmentNo", student.enrollment_no);
    setShowResults(false);

    try {
      const details = await fetchStudentById(student.id);
      console.log("📥 Mapping Details:", details);

      // Map the specific JSON keys from your backend logs
      if (details && details.id) {
        // setValue("rollNo", details.id);
        setValue("course", details.course || "");
        setValue("session", details.session || "");
        setValue("duration", details.duration || "");
        setValue("examCenter", details.center_id || ""); // Adjust if center name is available
      }
    } catch (err) {
      console.error("Details Fetch Error:", err);
    }
  };

  // --- 3. Close Results on Outside Click ---
  useEffect(() => {
    const handleClick = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const onGenerate = (data) => {
    console.log("Generate Data:", data);
    // Add to dummy table for now
    const newEntry = {
      id: Date.now(),
      enrollmentNo: data.enrollmentNo,
      rollNo: data.rollNo,
      courseName: data.course,
    };
    setAdmitCards([newEntry, ...admitCards]);
  };

  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-text">Generate Admit Card</h1>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit(onGenerate)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enrollment Search Input */}
            <div className="relative" ref={searchContainerRef}>
              <label className="text-sm font-medium text-text mb-2 block">
                Enrollment No.
              </label>
              <input
                type="text"
                value={searchTerm}
                autoComplete="off"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsTyping(true); // Enable debounce search
                  setShowResults(true);
                }}
                placeholder="Type to search (e.g. ABC/000013)"
                className="w-full border border-border rounded-lg px-3 py-2 bg-surface focus:ring-2 focus:ring-accent outline-none"
              />

              {showResults && (
                <div className="absolute z-[100] w-full bg-surface border border-border rounded-lg mt-1 shadow-2xl max-h-60 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-3 text-sm text-muted animate-pulse">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => selectStudent(s)}
                        className="p-3 hover:bg-accent/10 cursor-pointer border-b border-border last:border-0"
                      >
                        <div className="font-bold text-sm text-text">
                          {s.enrollment_no}
                        </div>
                        <div className="text-xs text-muted">
                          Click to select
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-muted text-center">
                      No students found
                    </div>
                  )}
                </div>
              )}
            </div>

            <FormInput
              label="Roll No."
              name="rollNo"
              register={register}
              placeholder="Enter roll number"
            />

            <FormInput
              label="Course"
              name="course"
              register={register}
              readOnly
              placeholder="Auto-filled"
            />

            <FormInput
              label="Duration"
              name="duration"
              register={register}
              placeholder="Enter/Auto-filled"
            />

            <FormInput
              label="Exam Center"
              name="examCenter"
              register={register}
              placeholder="Center Name"
            />

            <FormInput
              label="Session"
              name="session"
              register={register}
              placeholder="Enter Session"
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </div>

      <Table
        title="Admit Card History"
        columns={[
          { key: "enrollmentNo", label: "Enrollment No." },
          { key: "rollNo", label: "Roll No." },
          { key: "courseName", label: "Course" },
        ]}
        data={admitCards}
        emptyMessage="Generate a card to see history here"
      />
    </div>
  );
}
