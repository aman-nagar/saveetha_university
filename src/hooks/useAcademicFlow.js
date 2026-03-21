// src/hooks/useAcademicFlow.js
import { useState, useEffect, useCallback, useMemo } from "react";
import { searchEnrollment, fetchStudentById } from "../api/students/studentApi";
import { fetchAllStreams, fetchStreamsById } from "../api/courses/streamApi";
import { fetchSubjectsByStream } from "../api/courses/subjectApi";
import { fetchAdmitCards } from "../api/students/admitCardApi"; // ✅ Added for Roll No Lookup
import { useCourseRules } from "./useCourseRules";
import { fetchAllCourses, fetchCoursesById } from "../api/courses/courseApi";

export function useAcademicFlow(setValue) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [studentId, setStudentId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const [streamName, setStreamName] = useState(null); // ✅ Track stream name
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [isFetchingRoll, setIsFetchingRoll] = useState(false); // ✅ Loader for Roll No
  const [courseId, setCourseId] = useState(null);
  const [courseName, setCourseName] = useState(null); // ✅ Track course name
  const { durationOptions, courseType, getRulesByCourseName } =
    useCourseRules();

  // 1. Search Logic
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

  // 2. Select Student & Auto-fill Logic
  const selectStudent = useCallback(
    async (student) => {
      console.log(
        "📌 ENROLLMENT SELECTED:",
        student.enrollment_no,
        "ID:",
        student.id,
      );
      setIsTyping(false);
      setSearchTerm(student.enrollment_no);
      setValue("enrollmentNo", student.enrollment_no);
      setStudentId(student.id);
      setShowResults(false);
      setSubjects([]);

      let selectedStreamId = null; // ✅ Track streamId locally
      let selectedCourseId = null; // ✅ Track courseId locally

      try {
        console.log("🔍 Fetching student details...");
        const response = await fetchStudentById(student.id);
        const details = response.data || response;
        if (details) {
          console.log("✅ Student Details Fetched:", {
            course: details.course,
            stream: details.stream,
          });

          // ✅ Student API returns IDs directly, not names!
          const courseId = details.course; // This is an ID like "6"
          const streamId = details.stream; // This is an ID like "14"

          console.log("🔍 Fetching course and stream names by ID...");

          // Fetch course name by ID
          const courseRes = await fetchCoursesById(courseId);
          const courseName = courseRes.data?.name || courseRes.name || "";
          console.log("✅ Course Fetched - ID:", courseId, "Name:", courseName);

          // Fetch stream name by ID
          const streamRes = await fetchStreamsById(streamId);
          const streamName = streamRes.data?.name || streamRes.name || "";
          console.log("✅ Stream Fetched - ID:", streamId, "Name:", streamName);

          // Set form values with names
          setCourseName(courseName);
          setStreamName(streamName);
          setValue("course", courseName);
          setValue("stream", streamName);
          setValue("rollNo", ""); // ✅ Reset Roll No initially
          setValue("session", "");

          // Set IDs
          setCourseId(courseId);
          setStreamId(streamId);
          selectedStreamId = streamId;
          selectedCourseId = courseId;

          // Fetch duration rules using course name
          console.log("🔍 Fetching course rules for:", courseName);
          await getRulesByCourseName(courseName);
        }
      } catch (err) {
        console.error("❌ [selectStudent] Error:", err.message);
      }
      return selectedStreamId; // ✅ Return streamId for immediate use
    },
    [setValue, getRulesByCourseName],
  );

  // 3. NEW: Sync Roll Number from Admit Card (Specific for Results)
  const syncRollNoFromAdmitCard = useCallback(
    async (selectedPart) => {
      if (!studentId || !selectedPart) return;

      setIsFetchingRoll(true);
      try {
        const response = await fetchAdmitCards();

        // ✅ FIX: Extract the array from the "records" property
        // If response.records exists, use it; otherwise, fallback to response itself.
        const dataList = response?.records || response;

        if (!Array.isArray(dataList)) {
          console.error("❌ Data error: Expected an array but got:", dataList);
          return;
        }

        // Find the admit card matching this student and this specific Year/Semester
        // Note: Using enrollment_no or student_id depending on what your API provides
        const match = dataList.find(
          (r) =>
            (r.student_id === studentId || r.enrollment_no === searchTerm) &&
            String(r.duration) === String(selectedPart),
        );

        if (match) {
          setValue("rollNo", match.roll_number);
          setValue("session", match.session);
        } else {
          setValue("rollNo", "Not Generated");
          console.warn("⚠️ No matching Admit Card found for this Duration.");
        }
      } catch (err) {
        console.error("Roll Fetch Error:", err);
      } finally {
        setIsFetchingRoll(false);
      }
    },
    [studentId, searchTerm, setValue], // Added searchTerm for more robust matching
  );

  // src/hooks/useAcademicFlow.js

  const loadSubjectsForPart = useCallback(
    async (selectedPart, manualStreamId = null) => {
      // ✅ Use manualStreamId if provided (essential for Edit Mode)
      const targetStreamId = manualStreamId || streamId;
      console.log(
        "📌 DURATION SELECTED:",
        selectedPart,
        "| StreamID:",
        targetStreamId,
      );

      if (!targetStreamId || !selectedPart) {
        console.warn(
          "❌ Missing: StreamID:",
          targetStreamId,
          "| Part:",
          selectedPart,
        );
        setSubjects([]);
        return [];
      }
      setLoadingSubjects(true);
      try {
        console.log("🔍 Fetching subjects for StreamID:", targetStreamId);
        const allSubjects = await fetchSubjectsByStream(targetStreamId);
        console.log(
          "✅ All Subjects Fetched:",
          allSubjects.map((s) => ({
            id: s.subject_id || s.id,
            name: s.subject_name || s.name,
            duration: s.duration,
          })),
        );
        const filtered = allSubjects.filter(
          (sub) => String(sub.duration) === String(selectedPart),
        );
        console.log(
          "✅ Filtered Subjects for Part",
          selectedPart,
          ":",
          filtered.map((s) => ({
            id: s.subject_id || s.id,
            name: s.subject_name || s.name,
            duration: s.duration,
          })),
        );
        setSubjects(filtered);
        return filtered; // ✅ Return data so Edit mode can wait for it
      } catch (err) {
        console.error("❌ [loadSubjectsForPart] Error:", err.message);
        return [];
      } finally {
        setLoadingSubjects(false);
      }
    },
    [streamId],
  );

  return useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      searchResults,
      isSearching,
      showResults,
      setShowResults,
      setIsTyping,
      studentId,
      streamId,
      streamName,
      courseName,
      subjects,
      loadingSubjects,
      isFetchingRoll,
      selectStudent,
      loadSubjectsForPart,
      syncRollNoFromAdmitCard,
      durationOptions,
      courseType,
      courseId,
    }),
    [
      searchTerm,
      searchResults,
      isSearching,
      showResults,
      studentId,
      streamId,
      streamName,
      courseName,
      subjects,
      loadingSubjects,
      isFetchingRoll,
      selectStudent,
      loadSubjectsForPart,
      durationOptions,
      courseType,
      courseId,
    ],
  );
}
