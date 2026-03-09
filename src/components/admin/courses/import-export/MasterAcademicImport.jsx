// src/components/admin/courses/MasterAcademicImport.jsx
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  FaDatabase,
  FaSpinner,
  FaLayerGroup,
  FaFileDownload,
} from "react-icons/fa";
import { downloadSampleExcel } from "./downloadSampleExcel";

// APIs
import {
  fetchCourseCategories,
  createCourseCategory,
} from "../../../../api/courses/courseTypeApi";
import {
  fetchAllFaculty,
  createFaculty,
} from "../../../../api/courses/facultyApi";
import {
  fetchAllCourses,
  createCourse,
} from "../../../../api/courses/courseApi";
import {
  fetchAllStreams,
  createStream,
} from "../../../../api/courses/streamApi";
import { createSubject } from "../../../../api/courses/subjectApi";
import Button from "../../../ui/Button";

export default function MasterAcademicImport({ onComplete, showToast }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const processImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const rows = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]],
      );
      setProgress({ current: 0, total: rows.length });

      try {
        let categories = await fetchCourseCategories();
        let faculties = await fetchAllFaculty();
        let courses = await fetchAllCourses();
        let streams = await fetchAllStreams();

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];

          // 1. Resolve Category (Required)
          if (!row.Category) continue;
          let category = categories.find(
            (c) =>
              c.name.toLowerCase() === row.Category?.toString().toLowerCase(),
          );
          if (!category) {
            const newCat = await createCourseCategory(row.Category);
            category = { id: newCat.id || newCat, name: row.Category };
            categories.push(category);
          }

          // 2. Resolve Faculty (Auto-Adjust: Stop if empty)
          if (!row.Faculty) {
            setProgress((p) => ({ ...p, current: i + 1 }));
            continue;
          }
          let faculty = faculties.find(
            (f) =>
              f.name.toLowerCase() === row.Faculty?.toString().toLowerCase() &&
              f.course_type_id == category.id,
          );
          if (!faculty) {
            const newFac = await createFaculty(category.id, row.Faculty);
            faculty = {
              id: newFac.id || newFac,
              name: row.Faculty,
              course_type_id: category.id,
            };
            faculties.push(faculty);
          }

          // 3. Resolve Course (Auto-Adjust)
          if (!row.Course) {
            setProgress((p) => ({ ...p, current: i + 1 }));
            continue;
          }
          let course = courses.find(
            (c) =>
              c.name.toLowerCase() === row.Course?.toString().toLowerCase() &&
              c.faculty_id == faculty.id,
          );
          if (!course) {
            const newCourse = await createCourse({
              facultyId: faculty.id,
              name: row.Course,
              duration: row.Duration || 1,
              durationType: row.DurationType?.toLowerCase() || "year",
            });
            course = {
              id: newCourse.id || newCourse,
              name: row.Course,
              faculty_id: faculty.id,
            };
            courses.push(course);
          }

          // 4. Resolve Stream (Auto-Adjust)
          if (!row.Stream) {
            setProgress((p) => ({ ...p, current: i + 1 }));
            continue;
          }
          let stream = streams.find(
            (s) =>
              s.name.toLowerCase() === row.Stream?.toString().toLowerCase() &&
              s.course_id == course.id,
          );
          if (!stream) {
            const newStream = await createStream(course.id, row.Stream);
            stream = {
              id: newStream.id || newStream,
              name: row.Stream,
              course_id: course.id,
            };
            streams.push(stream);
          }

          // 5. Resolve Subject (Auto-Adjust)
          if (!row.SubjectName) {
            setProgress((p) => ({ ...p, current: i + 1 }));
            continue;
          }
          await createSubject({
            stream_id: stream.id,
            subject_name: row.SubjectName,
            subject_code: row.SubjectCode || "",
            short_name: row.ShortName || "",
            max_theory_marks: row.MaxTheory || 100,
            max_practical_marks: row.MaxPractical || 0,
            duration: row.DurationPart || 1,
            duration_type: row.DurationType?.toLowerCase() || "year",
            status: 1,
          });

          setProgress((prev) => ({ ...prev, current: i + 1 }));
        }

        showToast("success", "Import processing completed!");
        if (onComplete) onComplete();
      } catch (err) {
        showToast(
          "error",
          `Error at row ${progress.current + 1}: ${err.message}`,
        );
      } finally {
        setIsProcessing(false);
        e.target.value = null;
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6 bg-surface border border-border rounded-xl shadow-sm mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <FaLayerGroup size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Master Academic Import</h2>
            <p className="text-xs text-text-muted">
              Upload all fields for full setup, or just Category/Faculty to
              auto-adjust.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={downloadSampleExcel}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold border border-border text-text rounded-lg hover:bg-bg transition"
          >
            <FaFileDownload /> Get Template
          </Button>

          <div className="relative">
            <input
              type="file"
              id="master-import"
              className="hidden"
              accept=".xlsx"
              onChange={processImport}
              disabled={isProcessing}
            />
            <label
              htmlFor="master-import"
              className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition shadow-md font-bold text-sm ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
            >
              {isProcessing ? (
                <FaSpinner className="animate-spin text-accent" />
              ) : (
                <FaDatabase />
              )}
              {isProcessing ? `Importing...` : "Import Excel"}
            </label>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="mt-4 w-full bg-bg h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
