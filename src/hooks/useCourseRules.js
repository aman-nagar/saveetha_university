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
    console.log("📌 COURSE DATA:", {
      duration: course.duration,
      duration_type: type,
      all_course_data: course,
    });
    setCourseType(type);
    const options = generateDurationOptions(course.duration, type);
    console.log(
      "✅ DURATION OPTIONS GENERATED:",
      options.map((opt) => ({
        label: opt.label,
        value: opt.value,
      })),
    );
    setDurationOptions(options);
    return type; // ✅ Return the type
  };

  // NEW: Used by GenerateAdmitCard (finds ID by name first)
  const getRulesByCourseName = useCallback(async (courseName) => {
    console.log("🔍 Fetching course rules for:", courseName);
    if (!courseName) return;
    setLoading(true);
    try {
      console.log("🔍 Fetching all courses...");
      const allRes = await fetchAllCourses();
      const all = allRes.data || allRes;
      console.log(
        "✅ All Courses Retrieved:",
        all.map((c) => ({
          id: c.id,
          name: c.name,
          duration: c.duration,
          duration_type: c.duration_type,
        })),
      );
      const match = all.find(
        (c) => c.name.toLowerCase() === courseName.toLowerCase(),
      );

      if (match) {
        console.log("✅ Course Match Found:", {
          id: match.id,
          name: match.name,
          duration: match.duration,
          duration_type: match.duration_type,
        });
        console.log("🔍 Fetching course details by ID:", match.id);
        const response = await fetchCoursesById(match.id);
        console.log("✅ Course Details Fetched:", response);
        return processCourse(response.data || response);
      } else {
        console.warn("❌ No course found for:", courseName);
      }
    } catch (err) {
      console.error("❌ [getRulesByCourseName] Error:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // USED BY: SubjectForm (uses Stream ID)
  const getRulesByStreamId = useCallback(async (streamId) => {
    if (!streamId) {
      setDurationOptions([]);
      return "";
    }
    setLoading(true);
    try {
      const streamData = await fetchStreamsById(streamId);
      const courseRes = await fetchCoursesById(streamData.course_id);
      const type = processCourse(courseRes.data || courseRes);
      return type; // ✅ Return the type
    } catch (err) {
      console.error("getRulesByStreamId Error:", err);
      return "";
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
