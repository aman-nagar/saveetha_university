// src/hooks/useAcademicFlow.js
import { useState, useEffect, useCallback, useMemo } from "react";
import { searchEnrollment, fetchStudentById } from "../api/students/studentApi";
import { fetchAllStreams } from "../api/courses/streamApi";
import { fetchSubjectsByStream } from "../api/courses/subjectApi";
import { useCourseRules } from "./useCourseRules";

export function useAcademicFlow(setValue) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [studentId, setStudentId] = useState(null);
  const [streamId, setStreamId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const {
    durationOptions,
    courseType,
    loading: fetchingRules,
    getRulesByCourseName,
  } = useCourseRules();

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
          // Shared form filling
          setValue("course", details.course || "");
          setValue("stream", details.stream || "");
          setValue("rollNo", "");
          setValue("session", "");

          // Map Stream to ID for subject fetching
          const streams = await fetchAllStreams();
          const sMatch = streams.find(
            (s) => s.name.toLowerCase() === details.stream?.toLowerCase(),
          );
          if (sMatch) setStreamId(sMatch.id);

          // Sync Course Rules (Semesters/Years)
          getRulesByCourseName(details.course);
        }
      } catch (err) {
        console.error("Details Fetch Error:", err);
      }
    },
    [setValue, getRulesByCourseName],
  );

  // 3. Subject Fetcher
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
      subjects,
      loadingSubjects,
      selectStudent,
      loadSubjectsForPart,
      durationOptions,
      courseType,
      fetchingRules,
    }),
    [
      searchTerm,
      searchResults,
      isSearching,
      showResults,
      isTyping,
      studentId,
      streamId,
      subjects,
      loadingSubjects,
      selectStudent,
      loadSubjectsForPart,
      durationOptions,
      courseType,
      fetchingRules,
    ],
  );
}
