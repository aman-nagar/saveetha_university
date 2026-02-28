import { useState, useCallback } from "react";
import { fetchCoursesById, fetchAllCourses } from "../api/courses/courseApi";

export function useCourseRules() {
  const [durationOptions, setDurationOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseType, setCourseType] = useState(""); // "Year" or "Semester"

  const getRulesByCourseName = useCallback(async (courseName) => {
    if (!courseName) return;
    setLoading(true);
    try {
      // 1. Get all courses to find the ID
      const all = await fetchAllCourses();
      const list = all.data || all;
      const match = list.find(
        (c) => c.name.toLowerCase() === courseName.toLowerCase(),
      );

      if (match) {
        // 2. Get specific rules for that ID
        const response = await fetchCoursesById(match.id);
        const course = response.data || response;

        const count = Number(course.duration);
        const type = course.duration_type;
        setCourseType(type);

        // 3. Generate Options
        let options = [];
        if (
          type.toLowerCase() === "year" ||
          type.toLowerCase() === "semester"
        ) {
          for (let i = 1; i <= count; i++) {
            options.push({ label: `${type} ${i}`, value: String(i) });
          }
        } else {
          options.push({ label: `${count} ${type}`, value: String(count) });
        }
        setDurationOptions(options);
      }
    } catch (err) {
      console.error("Hook Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { durationOptions, courseType, loading, getRulesByCourseName };
}
