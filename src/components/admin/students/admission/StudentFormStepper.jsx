// src/components/admin/students/admission/StudentFormStepper.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../../../../hooks/useToast";
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

const QUAL_KEYS = [
  "secondary",
  "sr_secondary",
  "graduation",
  "post_graduation",
  "other",
];

/* ─────────────────────────────────────────────────────────────
  Build react-hook-form defaultValues from a fetched student object.
  Flattens qualifications[] array into per-row fields.
───────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────
  Main shared component
  Props:
    mode         – "create" | "edit"
    student      – full student object (edit mode only)
    onSubmit     – async (formData: FormData) => void
    submitLabel  – button text
───────────────────────────────────────────────────────────── */
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
  const [cascadeReady, setCascadeReady] = useState(!isEdit); // edit waits for cascade

  // Separate ID state for cascade API calls (form values store names)
  const [selectedIds, setSelectedIds] = useState({
    courseTypeId: null,
    facultyId: null,
    courseId: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? buildDefaultValues(student) : {},
  });

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
        const ctMatch = ctList.find(
          (ct) => ct.name === student.course_type,
        );
        const ctId = ctMatch?.id ?? null;

        let fList = [], cList = [], sList = [];
        let fId = null, cId = null;

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
        setCascadeReady(true); // unblock form so admin can still use other steps
      }
    };

    init();
  }, []); // run once on mount

  // ── User-triggered: Course Type changed → reload Faculty list ──
  useEffect(() => {
    // Skip the mount-time set (cascadeReady is false during init)
    if (!cascadeReady) return;
    if (!selectedIds.courseTypeId) return;
    const load = async () => {
      try {
        const data = await fetchFaculty(selectedIds.courseTypeId);
        setFaculties(data);
        setCourses([]);
        setStreams([]);
        setValue("faculty", "");
        setValue("course", "");
        setValue("stream", "");
        setSelectedIds((prev) => ({ ...prev, facultyId: null, courseId: null }));
      } catch (err) {
        show("error", err.message);
      }
    };
    load();
  }, [selectedIds.courseTypeId]);

  // ── User-triggered: Faculty changed → reload Course list ──
  useEffect(() => {
    if (!cascadeReady) return;
    if (!selectedIds.facultyId) return;
    const load = async () => {
      try {
        const data = await fetchCourses(selectedIds.facultyId);
        setCourses(data);
        setStreams([]);
        setValue("course", "");
        setValue("stream", "");
        setSelectedIds((prev) => ({ ...prev, courseId: null }));
      } catch (err) {
        show("error", err.message);
      }
    };
    load();
  }, [selectedIds.facultyId]);

  // ── User-triggered: Course changed → reload Stream list ──
  useEffect(() => {
    if (!cascadeReady) return;
    if (!selectedIds.courseId) return;
    const load = async () => {
      try {
        const data = await fetchStreams(selectedIds.courseId);
        setStreams(data);
        setValue("stream", "");
      } catch (err) {
        show("error", err.message);
      }
    };
    load();
  }, [selectedIds.courseId]);


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

      // In edit mode, include student ID
      if (isEdit && student?.id) {
        formData.append("id", student.id);
      }

      // Qualification keys to skip from main loop
      const qualKeys = new Set(
        QUAL_KEYS.flatMap((k) => [`${k}_year`, `${k}_board`, `${k}_percentage`]),
      );

      // Append normal fields
      Object.entries(data).forEach(([key, value]) => {
        if (qualKeys.has(key)) return;
        if (value instanceof FileList) {
          if (value.length > 0) formData.append(key, value[0]);
        } else {
          formData.append(key, value ?? "");
        }
      });

      // Append structured qualifications
      let qi = 0;
      QUAL_KEYS.forEach((key) => {
        const year = data[`${key}_year`];
        const board = data[`${key}_board`];
        const percentage = data[`${key}_percentage`];
        const file = qualificationFiles[key];

        if (!year && !board && !percentage) return;

        formData.append(`qualifications[${qi}][examination]`, key);
        formData.append(`qualifications[${qi}][year_of_passing]`, year || "");
        formData.append(`qualifications[${qi}][board_university]`, board || "");
        formData.append(`qualifications[${qi}][percentage_cgpa]`, percentage || "");
        if (file) formData.append(`document[]`, file);
        qi++;
      });

      await onSubmitProp(formData);

      show("success", isEdit ? "Student updated successfully!" : "Student created successfully!");

      if (!isEdit) {
        reset();
        setStep(1);
        setQualificationFiles({});
        setSelectedIds({ courseTypeId: null, facultyId: null, courseId: null });
      }
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──
  if (isEdit && !cascadeReady) {
    return (
      <div className="py-20 flex flex-col items-center gap-3 text-text-muted">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl">
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
            onCourseTypeChange={(id) =>
              setSelectedIds((prev) => ({ ...prev, courseTypeId: id }))
            }
            onFacultyChange={(id) =>
              setSelectedIds((prev) => ({ ...prev, facultyId: id }))
            }
            onCourseChange={(id) =>
              setSelectedIds((prev) => ({ ...prev, courseId: id }))
            }
          />
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              disabled={loading}
              className="px-4 py-2 border border-border rounded-md disabled:opacity-50"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={loading}
              className="ml-auto bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(handleFormSubmit)}
              disabled={loading}
              className="ml-auto bg-accent text-primary px-6 py-2 rounded-md font-semibold disabled:opacity-50"
            >
              {loading ? "Saving..." : submitLabel}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
