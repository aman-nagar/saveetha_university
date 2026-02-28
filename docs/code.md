import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import FormInput from "../../../components/form/FormInput";
import Table from "../../../components/table/Table";
import Button from "../../../components/ui/Button";
import {
  searchEnrollment,
  fetchStudentById,
} from "../../../api/students/studentApi";
// Removed unnecessary courseApi imports as they are handled inside the hook
import { useCourseRules } from "../../../hooks/useCourseRules";

export default function GenerateAdmitCard() {
  const { register, setValue, handleSubmit, watch } = useForm();

  // Search & UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // --- FIX: Use the Hook properly (Removed local useState duplicates) ---
  const {
    durationOptions,
    courseType, // This replaces your local 'durationType'
    loading: fetchingRules,
    getRulesByCourseName,
  } = useCourseRules();

  const [admitCards, setAdmitCards] = useState([]);
  const searchContainerRef = useRef(null);

  // --- 1. Debounced Search Logic ---
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

  // --- 2. Selection & Auto-Fill Logic ---
  const selectStudent = async (student) => {
    setIsTyping(false);
    setSearchTerm(student.enrollment_no);
    setValue("enrollmentNo", student.enrollment_no);
    setShowResults(false);

    try {
      const response = await fetchStudentById(student.id);
      const details = response.data || response;

      if (details) {
        setValue("course", details.course || "");
        setValue("session", details.session || "");
        setValue("duration", details.duration || "");
        setValue("stream", details.stream || "");

        // ✅ Simply call the hook function
        getRulesByCourseName(details.course);
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
    const newEntry = {
      id: Date.now(),
      enrollmentNo: data.enrollmentNo,
      rollNo: data.rollNo,
      courseName: data.course,
      // ✅ Use courseType from hook
      selectedPart: `${courseType} ${data.selectedDuration}`,
    };
    setAdmitCards([newEntry, ...admitCards]);
  };

  // ... (JSX continues below)