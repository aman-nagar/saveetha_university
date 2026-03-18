// src/components/admin/students/admission/StudentFormStepper.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../../../../context/ToastContext";
import Toast from "../../../ui/Toast";

import StepPersonal from "./steps/StepPersonal";
import StepCommunication from "./steps/StepCommunication";
import StepQualification from "./steps/StepQualification";
import StepProgram from "./steps/StepProgram";
import AdmissionStepper from "./AdmissionStepper";

import { fetchCourseCategories } from "../../../../api/courses/courseTypeApi";
import { fetchFaculty } from "../../../../api/courses/facultyApi";
import { fetchCourses } from "../../../../api/courses/courseApi";
import { fetchStreams } from "../../../../api/courses/streamApi";

import {
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiLoader,
} from "react-icons/fi";

const QUAL_KEYS = [
  "secondary",
  "sr_secondary",
  "graduation",
  "post_graduation",
  "other",
];

function buildDefaultValues(student) {
  if (!student) return {};

  const qualDefaults = {};
  QUAL_KEYS.forEach((key) => {
    const q = Array.isArray(student.qualifications)
      ? student.qualifications.find((x) => x.examination === key)
      : null;
    qualDefaults[`${key}_year`] = q?.year_of_passing || "";
    qualDefaults[`${key}_board`] = q?.board_university || "";
    qualDefaults[`${key}_percentage`] = q?.percentage_cgpa || "";
  });

  return {
    // Personal
    candidate_name: student.candidate_name || "",
    father_name: student.father_name || "",
    mother_name: student.mother_name || "",
    dob: student.dob || "",
    gender: student.gender || "",
    category: student.category || "",
    id_proof_type: student.id_proof_type || "",
    id_proof_no: student.id_proof_no || "",
    employed:
      student.employed === 1 || student.employed === "yes" ? "yes" : "no",
    employer_name: student.employer_name || "",
    designation: student.designation || "",

    // Communication
    contact_number: student.contact_number || "",
    email: student.email || "",
    father_contact_number: student.father_contact_number || "",
    mother_contact_number: student.mother_contact_number || "",
    country: student.country || "",
    nationality: student.nationality || "",
    state: student.state || "",
    city: student.city || "",
    address: student.address || "",
    pincode: student.pincode || "",

    // Qualification (flat)
    ...qualDefaults,

    // Programme — store names (not IDs)
    course_type: student.course_type || "",
    faculty: student.faculty || "",
    course: student.course || "",
    stream: student.stream || "",
    year: student.year || "",
    month_session: student.month_session || "",
    session: student.session || "",
    mode_of_study: student.mode_of_study || "",
    hostel_facility: student.hostel_facility ?? "",
    application_fee: student.application_fee || "",
    duration: student.duration || "",
  };
}

export default function StudentFormStepper({
  mode = "create",
  student = null,
  onSubmit: onSubmitProp,
  submitLabel = "Submit",
}) {
  const isEdit = mode === "edit";

  const { toast, show, clear } = useToast();

  const [courseTypes, setCourseTypes] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [qualificationFiles, setQualificationFiles] = useState({});
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cascadeReady, setCascadeReady] = useState(!isEdit);

  // Separate ID state for cascade API calls (form values store names)
  const [selectedIds, setSelectedIds] = useState({
    courseTypeId: null,
    facultyId: null,
    courseId: null,
  });

  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? buildDefaultValues(student) : { year: currentYear },
  });

  // Watch the dropdown fields to detect user changes
  const watchedCourseType = watch("course_type");
  const watchedFaculty = watch("faculty");
  const watchedCourse = watch("course");

  // ── Load Course Types + Init cascade (handles both create & edit) ──
  useEffect(() => {
    const init = async () => {
      try {
        // 1. Always load course types
        const ctList = await fetchCourseCategories();
        setCourseTypes(ctList);

        if (!isEdit || !student) {
          setCascadeReady(true);
          return;
        }

        // 2. Edit mode: find course type by name match → get its ID
        const ctMatch = ctList.find((ct) => ct.name === student.course_type);
        const ctId = ctMatch?.id ?? null;

        let fList = [],
          cList = [],
          sList = [];
        let fId = null,
          cId = null;

        if (ctId) {
          fList = await fetchFaculty(ctId);
          setFaculties(fList);

          // 3. Find faculty by name → get its ID
          const fMatch = fList.find((f) => f.name === student.faculty);
          fId = fMatch?.id ?? null;
        }

        if (fId) {
          cList = await fetchCourses(fId);
          setCourses(cList);

          // 4. Find course by name → get its ID
          const cMatch = cList.find((c) => c.name === student.course);
          cId = cMatch?.id ?? null;
        }

        if (cId) {
          sList = await fetchStreams(cId);
          setStreams(sList);
        }

        // Store resolved IDs so future user-changes trigger correct cascades
        setSelectedIds({ courseTypeId: ctId, facultyId: fId, courseId: cId });

        // Populate form fields now that all dropdowns are loaded
        reset(buildDefaultValues(student));
        setCascadeReady(true);
      } catch (err) {
        show("error", "Failed to load programme data: " + err.message);
        setCascadeReady(true);
      }
    };

    init();
  }, []);

  // ── User-triggered: Course Type changed → reload Faculty list ──
  useEffect(() => {
    if (!cascadeReady) return;
    if (!watchedCourseType) {
      setFaculties([]);
      setCourses([]);
      setStreams([]);
      setValue("faculty", "");
      setValue("course", "");
      setValue("stream", "");
      setSelectedIds({ courseTypeId: null, facultyId: null, courseId: null });
      return;
    }

    const ctMatch = courseTypes.find((ct) => ct.name === watchedCourseType);
    const ctId = ctMatch?.id ?? null;

    if (!ctId) return;
    if (selectedIds.courseTypeId === ctId) return;

    const load = async () => {
      try {
        const data = await fetchFaculty(ctId);
        setFaculties(data);
        setCourses([]);
        setStreams([]);
        setValue("faculty", "");
        setValue("course", "");
        setValue("stream", "");
        setSelectedIds({ courseTypeId: ctId, facultyId: null, courseId: null });
      } catch (err) {
        show("error", err.message);
      }
    };
    load();
  }, [watchedCourseType, courseTypes, cascadeReady]);

  // ── User-triggered: Faculty changed → reload Course list ──
  useEffect(() => {
    if (!cascadeReady) return;
    if (!watchedFaculty) {
      setCourses([]);
      setStreams([]);
      setValue("course", "");
      setValue("stream", "");
      setSelectedIds((prev) => ({ ...prev, facultyId: null, courseId: null }));
      return;
    }

    const fMatch = faculties.find((f) => f.name === watchedFaculty);
    const fId = fMatch?.id ?? null;

    if (!fId) return;
    if (selectedIds.facultyId === fId) return;

    const load = async () => {
      try {
        const data = await fetchCourses(fId);
        setCourses(data);
        setStreams([]);
        setValue("course", "");
        setValue("stream", "");
        setSelectedIds((prev) => ({ ...prev, facultyId: fId, courseId: null }));
      } catch (err) {
        show("error", err.message);
      }
    };
    load();
  }, [watchedFaculty, faculties, cascadeReady]);

  // ── User-triggered: Course changed → reload Stream list ──
  useEffect(() => {
    if (!cascadeReady) return;
    if (!watchedCourse) {
      setStreams([]);
      setValue("stream", "");
      setSelectedIds((prev) => ({ ...prev, courseId: null }));
      return;
    }

    const cMatch = courses.find((c) => c.name === watchedCourse);
    const cId = cMatch?.id ?? null;

    if (!cId) return;
    if (selectedIds.courseId === cId) return;

    const load = async () => {
      try {
        const data = await fetchStreams(cId);
        setStreams(data);
        setValue("stream", "");
        setSelectedIds((prev) => ({ ...prev, courseId: cId }));
      } catch (err) {
        show("error", err.message);
      }
    };
    load();
  }, [watchedCourse, courses, cascadeReady]);

  // ── Step validation fields ──
  const stepFields = {
    1: ["candidate_name", "dob", "gender"],
    2: ["email"],
    3: [],
    4: [],
  };

  const next = async () => {
    const valid = await trigger(stepFields[step] || []);
    if (!valid) {
      show("error", "Please fill all required fields");
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  // ── Build FormData and call parent onSubmit ──
  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      if (isEdit && student?.id) {
        formData.append("id", student.id);
      }

      const qualKeys = new Set(
        QUAL_KEYS.flatMap((k) => [
          `${k}_year`,
          `${k}_board`,
          `${k}_percentage`,
        ]),
      );

      Object.entries(data).forEach(([key, value]) => {
        if (qualKeys.has(key)) return;
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else {
          formData.append(key, value ?? "");
        }
      });

      let qi = 0;
      QUAL_KEYS.forEach((key) => {
        const year = data[`${key}_year`];
        const board = data[`${key}_board`];
        const percentage = data[`${key}_percentage`];
        const file = qualificationFiles[key];

        // ===== DEBUG START =====
        console.log(`--- Qual [${key}] ---`);
        console.log("  year:", year, "board:", board, "pct:", percentage);
        console.log("  file from state:", file);
        console.log("  has data?", !!(year || board || percentage));
        // ===== DEBUG END =====

        if (!year && !board && !percentage) return;

        formData.append(`qualifications[${qi}][examination]`, key);
        formData.append(`qualifications[${qi}][year_of_passing]`, year || "");
        formData.append(`qualifications[${qi}][board_university]`, board || "");
        formData.append(
          `qualifications[${qi}][percentage_cgpa]`,
          percentage || "",
        );

        if (file) {
          formData.append(`qualifications[${qi}][document]`, file);
        } else if (isEdit) {
          const existingDoc = (student?.qualifications || []).find(
            (q) => q.examination === key,
          )?.document;
          if (existingDoc) {
            formData.append(
              `qualifications[${qi}][existing_document]`,
              existingDoc,
            );
          }
        }

        // ===== DEBUG START =====
        console.log(
          `  → Appended as qualifications[${qi}], file appended:`,
          !!file,
        );
        // ===== DEBUG END =====

        qi++;
      });

      // ===== DEBUG: Log full FormData contents =====
      console.log("=== FULL FORMDATA ===");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
      console.log("=== END FORMDATA ===");

      await onSubmitProp(formData);

      show(
        "success",
        isEdit
          ? "Student updated successfully!"
          : "Student created successfully!",
      );

      if (!isEdit) {
        reset();
        setStep(1);
        setQualificationFiles({});
        setSelectedIds({ courseTypeId: null, facultyId: null, courseId: null });
      }
    } catch (err) {
      show("error", err.message);
      console.error("Student Creation Failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Loading Skeleton ──
  if (isEdit && !cascadeReady) {
    return (
      <div className="w-full max-w-7xl space-y-6">
        {/* Stepper Skeleton */}
        <div className="flex items-center justify-between px-2 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted/20" />
                <div className="mt-2 h-3 bg-muted/20 rounded w-12 sm:w-16" />
              </div>
              {i < 3 && (
                <div className="flex-1 h-0.5 bg-muted/20 mx-2 sm:mx-4" />
              )}
            </div>
          ))}
        </div>

        {/* Form Section Skeleton */}
        <div className="bg-surface border border-border rounded-xl p-4 sm:p-6 animate-pulse">
          <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-muted/20 rounded" />
            <div className="h-5 sm:h-6 bg-muted/20 rounded w-40" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted/20 rounded w-24" />
                <div className="h-9 sm:h-10 bg-muted/20 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl px-2 sm:px-0">
      {toast && <Toast {...toast} onClose={clear} />}

      <AdmissionStepper step={step} />

      <form>
        {step === 1 && (
          <StepPersonal
            register={register}
            errors={errors}
            watch={watch}
            existingUrls={isEdit ? student : {}}
          />
        )}

        {step === 2 && (
          <StepCommunication
            register={register}
            errors={errors}
            watch={watch}
          />
        )}

        {step === 3 && (
          <StepQualification
            register={register}
            errors={errors}
            setQualificationFiles={setQualificationFiles}
            existingQualifications={isEdit ? student?.qualifications : []}
          />
        )}

        {step === 4 && (
          <StepProgram
            register={register}
            errors={errors}
            courseTypes={courseTypes}
            faculties={faculties}
            courses={courses}
            streams={streams}
            watch={watch}
            setValue={setValue}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-between mt-6 sm:mt-8 gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={prev}
              disabled={loading}
              className="w-full sm:w-auto px-4 py-2.5 border border-border rounded-lg text-text hover:bg-bg disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FiChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiCheck className="w-4 h-4" />
                  {submitLabel}
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
