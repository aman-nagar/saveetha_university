// src/components/admin/courses/MasterAcademicImport.jsx
import { useState } from "react";
import * as XLSX from "xlsx";
import { FaDatabase, FaSpinner, FaLayerGroup, FaFileDownload } from "react-icons/fa";
import { downloadSampleExcel } from "./downloadSampleExcel";

// APIs
import { fetchCourseCategories, createCourseCategory } from "../../../api/courses/courseTypeApi";
import { fetchAllFaculty, createFaculty } from "../../../api/courses/facultyApi";
import { fetchAllCourses, createCourse } from "../../../api/courses/courseApi";
import { fetchAllStreams, createStream } from "../../../api/courses/streamApi";
import { createSubject } from "../../../api/courses/subjectApi";

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
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

      setProgress({ current: 0, total: rows.length });

      try {
        let categories = await fetchCourseCategories();
        let faculties = await fetchAllFaculty();
        let courses = await fetchAllCourses();
        let streams = await fetchAllStreams();

        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];

          // STEP 1: Category
          let category = categories.find(c => c.name.toLowerCase() === row.Category?.toLowerCase());
          if (!category) {
            const newCat = await createCourseCategory(row.Category);
            category = { id: newCat.id || newCat, name: row.Category };
            categories.push(category);
          }

          // STEP 2: Faculty
          let faculty = faculties.find(f => f.name.toLowerCase() === row.Faculty?.toLowerCase() && f.course_type_id == category.id);
          if (!faculty) {
            const newFac = await createFaculty(category.id, row.Faculty);
            faculty = { id: newFac.id || newFac, name: row.Faculty, course_type_id: category.id };
            faculties.push(faculty);
          }

          // STEP 3: Course
          let course = courses.find(c => c.name.toLowerCase() === row.Course?.toLowerCase() && c.faculty_id == faculty.id);
          if (!course) {
            const newCourse = await createCourse({
              facultyId: faculty.id,
              name: row.Course,
              duration: row.Duration,
              durationType: row.DurationType?.toLowerCase()
            });
            course = { id: newCourse.id || newCourse, name: row.Course, faculty_id: faculty.id };
            courses.push(course);
          }

          // STEP 4: Stream
          let stream = streams.find(s => s.name.toLowerCase() === row.Stream?.toLowerCase() && s.course_id == course.id);
          if (!stream) {
            const newStream = await createStream(course.id, row.Stream);
            stream = { id: newStream.id || newStream, name: row.Stream, course_id: course.id };
            streams.push(stream);
          }

          // STEP 5: Subject
          await createSubject({
            stream_id: stream.id,
            subject_name: row.SubjectName,
            subject_code: row.SubjectCode || "",
            max_theory_marks: row.MaxTheory || 100,
            max_practical_marks: row.MaxPractical || 0,
            duration: row.DurationPart || 1,
            duration_type: row.DurationType?.toLowerCase(),
            status: 1,
          });

          setProgress(prev => ({ ...prev, current: i + 1 }));
        }

        showToast("success", "Full Academic Hierarchy Imported Successfully!");
        if (onComplete) onComplete();
      } catch (err) {
        showToast("error", `Import failed at row ${progress.current + 1}: ${err.message}`);
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
            <h2 className="text-lg font-bold">Full Academic Import</h2>
            <p className="text-xs text-text-muted">Bulk create Categories, Faculties, Courses, Streams, and Subjects.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={downloadSampleExcel}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold border border-border text-text rounded-lg hover:bg-bg transition"
          >
            <FaFileDownload /> Template
          </button>

          <div className="relative">
            <input type="file" id="master-import" className="hidden" accept=".xlsx" onChange={processImport} disabled={isProcessing} />
            <label
              htmlFor="master-import"
              className={`flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition shadow-md font-bold text-sm ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
            >
              {isProcessing ? <FaSpinner className="animate-spin" /> : <FaDatabase />}
              {isProcessing ? `Processing (${progress.current}/${progress.total})` : "Upload Master Excel"}
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