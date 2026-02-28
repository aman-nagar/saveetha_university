import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { searchEnrollment, fetchStudentById } from "../../../api/students/studentApi";
import { fetchAllCourses } from "../../../api/courses/courseApi";
import { fetchAllStreams } from "../../../api/courses/streamApi"; // Added
import { fetchSubjectsByStream } from "../../../api/courses/subjectApi"; // Added
import { useCourseRules } from "../../../hooks/useCourseRules";
import FormInput from "../../../components/form/FormInput";
import Table from "../../../components/table/Table";
import Button from "../../../components/ui/Button";

export default function GenerateAdmitCard() {
  const { register, setValue, handleSubmit, watch } = useForm();
  
  // Watch the dropdown to trigger subject fetching
  const selectedPart = watch("selectedDuration");

  const [streamId, setStreamId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const { durationOptions, courseType, loading: fetchingRules, getRulesByCourseName } = useCourseRules();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [admitCards, setAdmitCards] = useState([]);
  const searchContainerRef = useRef(null);

  // --- 1. Find Stream & Course IDs on Selection ---
  const selectStudent = async (student) => {
    setIsTyping(false);
    setSearchTerm(student.enrollment_no);
    setValue("enrollmentNo", student.enrollment_no);
    setShowResults(false);
    setSubjects([]); // Reset subjects

    try {
      const response = await fetchStudentById(student.id);
      const details = response.data || response;

      if (details) {
        setValue("course", details.course || "");
        setValue("stream", details.stream || "");
        setValue("duration", details.duration || "");
        setValue("session", details.session || "");

        // Find Stream ID and Course Rules
        const [streams, courses] = await Promise.all([fetchAllStreams(), fetchAllCourses()]);
        
        const sMatch = streams.find(s => s.name.toLowerCase() === details.stream?.toLowerCase());
        if (sMatch) setStreamId(sMatch.id);

        getRulesByCourseName(details.course);
      }
    } catch (err) {
      console.error("Selection Error:", err);
    }
  };

  // --- 2. Fetch Subjects when Stream + Part are ready ---
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
          (sub) => String(sub.duration) === String(selectedPart)
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

  // ... (Search logic and Click Handler remain the same) ...

  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-text">Generate Admit Card</h1>

      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enrollment Search */}
            <div className="relative" ref={searchContainerRef}>
               {/* ... same as before ... */}
            </div>

            <FormInput label="Roll No." name="rollNo" register={register} />
            <FormInput label="Total Duration" name="duration" register={register} readOnly />

            {/* Selection Dropdown */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text">Select {courseType || "Part"} *</label>
              <select
                {...register("selectedDuration", { required: true })}
                className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm focus:ring-2 focus:ring-accent outline-none"
              >
                <option value="">{fetchingRules ? "Syncing..." : `Select ${courseType}`}</option>
                {durationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <FormInput label="Course" name="course" register={register} readOnly />
            <FormInput label="Stream" name="stream" register={register} readOnly />
            <FormInput label="Session" name="session" register={register} />
          </div>

          {/* SUBJECT LIST DISPLAY */}
          {selectedPart && (
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-medium text-text flex items-center gap-2">
                Subjects for {courseType} {selectedPart}
                {loadingSubjects && <span className="text-xs text-muted animate-pulse">(Loading...)</span>}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subjects.length > 0 ? (
                  subjects.map((sub) => (
                    <div key={sub.id} className="p-3 bg-bg border border-border rounded-lg flex justify-between items-center shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text">{sub.subject_name}</span>
                        <span className="text-[10px] text-muted uppercase tracking-wider">{sub.subject_code}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] block text-muted">Max Marks</span>
                        <span className="text-xs font-bold text-primary">{sub.max_theory_marks + sub.max_practical_marks}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  !loadingSubjects && <p className="text-sm text-danger col-span-full italic">No subjects found for this {courseType}.</p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={subjects.length === 0}>Generate Admit Card</Button>
          </div>
        </form>
      </div>

      {/* History Table below ... */}
    </div>
  );
}