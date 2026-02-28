import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import FormInput from "../../../components/form/FormInput";
import Table from "../../../components/table/Table";
import Button from "../../../components/ui/Button";
import {
  searchEnrollment,
  fetchStudentById,
} from "../../../api/students/studentApi";
import { useCourseRules } from "../../../hooks/useCourseRules"; // Single source of truth
import { fetchAllStreams } from "../../../api/courses/streamApi";
import { fetchAllCourses } from "../../../api/courses/courseApi";
import { fetchSubjectsByStream } from "../../../api/courses/subjectApi";

export default function GenerateAdmitCard() {
  const { register, setValue, handleSubmit, watch } = useForm();
  const selectedPart = watch("selectedDuration");

  // 1. Search & UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // 2. Custom Hook for Course Rules (Replaces local states)
  const [streamId, setStreamId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const {
    durationOptions,
    courseType, // This replaces your local durationType
    loading: fetchingRules, // This replaces your local fetchingRules
    getRulesByCourseName,
  } = useCourseRules();

  // 3. Table State
  const [admitCards, setAdmitCards] = useState([]);
  const searchContainerRef = useRef(null);

  // --- Search Logic ---
  useEffect(() => {
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
        const data = response.students || response;
        setSearchResults(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Search API Error:", err);
      } finally {
        setIsSearching(false);
        setIsTyping(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isTyping]);

  // --- Student Selection ---
  const selectStudent = async (student) => {
    setIsTyping(false);
    setSearchTerm(student.enrollment_no);
    setValue("enrollmentNo", student.enrollment_no);
    setShowResults(false);
    setSubjects([]);

    try {
      const response = await fetchStudentById(student.id);
      const details = response.data || response;

      if (details) {
        setValue("course", details.course || "");
        setValue("session", details.session || "");
        setValue("duration", details.duration || "");
        setValue("stream", details.stream || "");

        // Find Stream ID and Course Rules
        const [streams, courses] = await Promise.all([
          fetchAllStreams(),
          fetchAllCourses(),
        ]);

        const sMatch = streams.find(
          (s) => s.name.toLowerCase() === details.stream?.toLowerCase(),
        );
        if (sMatch) setStreamId(sMatch.id);
        // ✅ Call hook logic to fetch and generate options
        getRulesByCourseName(details.course);
      }
    } catch (err) {
      console.error("Details Fetch Error:", err);
    }
  };

  // --- Close Results on Outside Click ---
  useEffect(() => {
    if (!streamId || !selectedPart) {
      setSubjects([]);
      return;
    }

    const loadSubjects = async () => {
      setLoadingSubjects(true);
      try {
        const allSubjects = await fetchSubjectsByStream(streamId);
        // Filter subjects that match the selected Year/Semester number
        const filtered = allSubjects.filter(
          (sub) => String(sub.duration) === String(selectedPart),
        );
        setSubjects(filtered);
      } catch (err) {
        console.error("Subject Fetch Error:", err);
      } finally {
        setLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [streamId, selectedPart]);
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
    const newEntry = {
      id: Date.now(),
      enrollmentNo: data.enrollmentNo,
      rollNo: data.rollNo,
      courseName: data.course,
      selectedPart: `${courseType} ${data.selectedDuration}`,
    };
    setAdmitCards([newEntry, ...admitCards]);
  };

  // --- 3. Table Column Definition ---
  const subjectColumns = [
    {
      key: "subject_code",
      label: "Code",
      render: (row) => (
        <span className="text-muted font-mono text-sm">{row.subject_code}</span>
      ),
    },
    {
      key: "subject_name",
      label: "Subject Name",
      render: (row) => (
        <span className="font-medium text-text text-sm uppercase">
          {row.subject_name}
        </span>
      ),
    },
    {
      key: "exam_date",
      label: "Date",
      render: (row) => (
        <div className="relative max-w-[180px]">
          <input
            type="date"
            {...register(`schedule.${row.id}.date`)}
            className="w-full border border-border rounded-md px-3 py-1.5 text-sm bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all cursor-pointer"
          />
        </div>
      ),
    },
    {
      key: "start_time",
      label: "Start Time",
      render: (row) => (
        <div className="relative max-w-[140px]">
          <input
            type="time"
            defaultValue="10:00"
            {...register(`schedule.${row.id}.start_time`)}
            className="w-full border border-border rounded-md px-3 py-1.5 text-sm bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all cursor-pointer"
          />
        </div>
      ),
    },
    {
      key: "end_time",
      label: "End Time",
      render: (row) => (
        <div className="relative max-w-[140px]">
          <input
            type="time"
            defaultValue="12:00"
            {...register(`schedule.${row.id}.end_time`)}
            className="w-full border border-border rounded-md px-3 py-1.5 text-sm bg-surface focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all cursor-pointer"
          />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-text">Generate Admit Card</h1>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit(onGenerate)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enrollment Search */}
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
                  setIsTyping(true);
                  setShowResults(true);
                }}
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
                        className="p-3 hover:bg-accent/10 cursor-pointer border-b border-border"
                      >
                        <div className="font-bold text-sm text-text">
                          {s.enrollment_no}
                        </div>
                        <div className="text-xs text-muted">
                          Click to select
                        </div>
                      </div>
                    ))
                  ) : null}
                </div>
              )}
            </div>

            <FormInput
              label="Roll No."
              name="rollNo"
              register={register}
              placeholder="Enter roll number"
            />

            {/* Read Only Total Duration */}
            <FormInput
              label="Total Duration"
              name="duration"
              register={register}
              readOnly
              placeholder="Auto-filled"
            />

            {/* Dynamic Dropdown from Hook */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">
                Select course type semester *
              </label>
              <select
                {...register("selectedDuration", { required: true })}
                className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm focus:ring-2 focus:ring-accent outline-none"
              >
                <option value="">
                  {fetchingRules
                    ? "Syncing..."
                    : `Select ${courseType || "Part"}`}
                </option>
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <FormInput
              label="Course"
              name="course"
              register={register}
              readOnly
              placeholder="Auto-filled"
            />
            <FormInput
              label="Stream"
              name="stream"
              register={register}
              readOnly
              placeholder="Auto-filled"
            />
            <FormInput
              label="Session"
              name="session"
              register={register}
              placeholder="Enter Session"
            />
          </div>

          {/* SUBJECT LIST DISPLAY (Screenshot Style) */}
          {selectedPart && (
            <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-text">
                  Exam Schedule: {courseType} {selectedPart}
                </h3>
                {loadingSubjects && (
                  <span className="flex items-center gap-2 text-xs text-primary animate-pulse">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Fetching Subjects...
                  </span>
                )}
              </div>

              <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
                <Table
                  title=""
                  columns={subjectColumns}
                  data={subjects}
                  loading={loadingSubjects}
                  emptyMessage={`No subjects found for ${courseType} ${selectedPart}.`}
                  toolbar={null} // Keep it clean as per screenshot
                />
              </div>
            </div>
          )}

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
          { key: "selectedPart", label: "Exam For" },
        ]}
        data={admitCards}
      />
    </div>
  );
}
