import { useState, useEffect, useCallback } from "react";
import { searchEnrollment, fetchStudentById } from "../api/students/studentApi";
import { fetchAllStreams } from "../api/courses/streamApi";
import { fetchSubjectsByStream } from "../api/courses/subjectApi";
import { useCourseRules } from "./useCourseRules";
import { createAdmitCard, fetchAdmitCards } from "../api/students/admitCardApi";

export function useAdmitCardLogic(setValue) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [streamId, setStreamId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [admitCards, setAdmitCards] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentId, setStudentId] = useState(null);

  const {
    durationOptions,
    courseType,
    loading: fetchingRules,
    getRulesByCourseName,
  } = useCourseRules();

  // 1. Search Debounce Logic
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
        console.error("Search Error:", err);
      } finally {
        setIsSearching(false);
        setIsTyping(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, isTyping]);

  // 2. Load Generated History
  const loadHistory = async () => {
    try {
      const records = await fetchAdmitCards();
      console.log(records);
      setAdmitCards(records);
    } catch (err) {
      console.error("History Load Error:", err);
    }
  };

  // 3. Select Student & Auto-fill (Session is left empty for user input)
  const selectStudent = async (student) => {
    setIsTyping(false);
    setSearchTerm(student.enrollment_no);
    setValue("enrollmentNo", student.enrollment_no);
    setStudentId(student.id);
    setShowResults(false);
    setSubjects([]);

    try {
      const response = await fetchStudentById(student.id);
      const details = response.data || response;
      if (details) {
        setValue("course", details.course || "");
        setValue("stream", details.stream || "");
        setValue("rollNo", ""); // Clear for new entry
        setValue("session", ""); // Allow manual entry as requested

        const streams = await fetchAllStreams();
        const sMatch = streams.find(
          (s) => s.name.toLowerCase() === details.stream?.toLowerCase(),
        );
        if (sMatch) setStreamId(sMatch.id);
        getRulesByCourseName(details.course);
      }
    } catch (err) {
      console.error("Details Fetch Error:", err);
    }
  };

  // 4. Fetch Subjects based on Selected Year/Semester
  const loadSubjectsForPart = useCallback(
    async (selectedPart) => {
      if (!streamId || !selectedPart) {
        setSubjects([]);
        return;
      }
      setLoadingSubjects(true);
      try {
        const allSubjects = await fetchSubjectsByStream(streamId);
        const filtered = allSubjects.filter(
          (sub) => String(sub.duration) === String(selectedPart),
        );
        setSubjects(filtered);
      } catch (err) {
        console.error("Subject Fetch Error:", err);
      } finally {
        setLoadingSubjects(false);
      }
    },
    [streamId],
  );

  // 5. Create Admit Card Payload
  // Inside src/hooks/useAdmitCardLogic.js

  const submitAdmitCard = async (formData, studentSubjects) => {
    setIsSubmitting(true);
    try {
      // 🔥 DEBUG: Log exactly what is being prepared
      console.log("Preparing Payload with:", { formData, studentSubjects });

      const payload = {
        // Ensure IDs and Duration are Numbers
        student_id: Number(studentId),
        roll_number: String(formData.rollNo),
        session: String(formData.session),
        duration: Number(formData.selectedDuration),
        duration_type: String(courseType),
        stream_id: Number(streamId),

        // Map subjects and ensure time has seconds :00
        subjects: studentSubjects.map((sub) => {
          const schedule = formData.schedule?.[sub.id];
          return {
            subject_id: Number(sub.id),
            exam_date: schedule?.date || "",
            // Backend expects H:i:s (e.g., 10:00:00)
            start_time: schedule?.start_time
              ? `${schedule.start_time}:00`
              : "10:00:00",
            end_time: schedule?.end_time
              ? `${schedule.end_time}:00`
              : "12:00:00",
          };
        }),
      };

      console.log("🚀 Final Payload sending to API:", payload);

      const result = await createAdmitCard(payload);
      await loadHistory();
      return result;
    } catch (err) {
      // If it's a 422, the backend might send specific validation errors in the message
      console.error("❌ Submission Failed:", err.message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showResults,
    setShowResults,
    setIsTyping,
    selectStudent,
    subjects,
    loadingSubjects,
    loadSubjectsForPart,
    durationOptions,
    courseType,
    fetchingRules,
    admitCards,
    isSubmitting,
    submitAdmitCard,
    loadHistory,
    studentId,
    streamId,
  };
}
