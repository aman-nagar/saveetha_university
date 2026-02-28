// src/hooks/useAdmitCardLogic.js
import { useState, useEffect, useCallback } from "react";
import { searchEnrollment, fetchStudentById } from "../api/students/studentApi";
import { fetchAllStreams } from "../api/courses/streamApi";
import { fetchSubjectsByStream } from "../api/courses/subjectApi";
import { useCourseRules } from "./useCourseRules";

export function useAdmitCardLogic(setValue) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [streamId, setStreamId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);

  const {
    durationOptions,
    courseType,
    loading: fetchingRules,
    getRulesByCourseName,
  } = useCourseRules();

  // Search Debounce
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
        setValue("stream", details.stream || "");
        // setValue("session", details.session || "");
        // setValue("duration", details.duration || "");

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
  };
}
