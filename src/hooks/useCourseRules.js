// src/hooks/useCourseRules.js
import { useState, useCallback } from "react";
import { fetchCoursesById, fetchAllCourses } from "../api/courses/courseApi";
import { fetchStreamsById } from "../api/courses/streamApi";
import { generateDurationOptions } from "../utils/formatters";

export function useCourseRules() {
  const [durationOptions, setDurationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseType, setCourseType] = useState("");

  // Helper to process course data into options
  const processCourse = (course) => {
    const count = Number(course.duration);
    const type = course.duration_type;
    setCourseType(type);
    const options = generateDurationOptions(course.duration, type);
    setDurationOptions(options);
  };

  // NEW: Used by GenerateAdmitCard (finds ID by name first)
  const getRulesByCourseName = useCallback(async (courseName) => {
    if (!courseName) return;
    setLoading(true);
    try {
      const allRes = await fetchAllCourses();
      const all = allRes.data || allRes;
      const match = all.find(
        (c) => c.name.toLowerCase() === courseName.toLowerCase(),
      );

      if (match) {
        const response = await fetchCoursesById(match.id);
        return processCourse(response.data || response);
      }
    } catch (err) {
      console.error("getRulesByCourseName Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // USED BY: SubjectForm (uses Stream ID)
  const getRulesByStreamId = useCallback(async (streamId) => {
    if (!streamId) {
      setDurationOptions([]);
      return;
    }
    setLoading(true);
    try {
      const streamData = await fetchStreamsById(streamId);
      const courseRes = await fetchCoursesById(streamData.course_id);
      return processCourse(courseRes.data || courseRes);
    } catch (err) {
      console.error("getRulesByStreamId Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    durationOptions,
    courseType,
    loading,
    getRulesByCourseName,
    getRulesByStreamId,
  };
}
