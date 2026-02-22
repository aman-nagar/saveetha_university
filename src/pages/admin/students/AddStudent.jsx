// src/pages/admin/students/AddStudent.jsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StepPersonal from "../../../components/admin/students/admission/steps/StepPersonal";
import StepCommunication from "../../../components/admin/students/admission/steps/StepCommunication";
import StepQualification from "../../../components/admin/students/admission/steps/StepQualification";
import StepProgram from "../../../components/admin/students/admission/steps/StepProgram";
import AdmissionStepper from "../../../components/admin/students/admission/AdmissionStepper";
import { createStudent } from "../../../api/students/studentApi";
import { useToast } from "../../../hooks/useToast";
import { fetchCourseCategories } from "../../../api/courses/courseTypeApi";
import { fetchFaculty } from "../../../api/courses/facultyApi";
import { fetchCourses } from "../../../api/courses/courseApi";
import { fetchStreams } from "../../../api/courses/streamApi";

export default function AddStudent() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [streams, setStreams] = useState([]);
  const [qualificationFiles, setQualificationFiles] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { show } = useToast();

  const selectedCourseType = watch("course_type");
  const selectedFaculty = watch("faculty");
  const selectedCourse = watch("course");

  // ✅ Load Course Types ONCE
  useEffect(() => {
    const loadCourseTypes = async () => {
      try {
        const data = await fetchCourseCategories();
        setCourseTypes(data);
      } catch (err) {
        show("error", err.message);
      }
    };

    loadCourseTypes();
  }, []);

  // ✅ Course Type → Faculty
  useEffect(() => {
    if (!selectedCourseType) {
      setFaculties([]);
      setCourses([]);
      setStreams([]);
      return;
    }

    const loadFaculty = async () => {
      try {
        const data = await fetchFaculty(selectedCourseType);
        setFaculties(data);
        setCourses([]);
        setStreams([]);
        setValue("faculty", "");
        setValue("course", "");
        setValue("stream", "");
      } catch (err) {
        show("error", err.message);
      }
    };

    loadFaculty();
  }, [selectedCourseType]);

  // ✅ Faculty → Course
  useEffect(() => {
    if (!selectedFaculty) {
      setCourses([]);
      setStreams([]);
      return;
    }

    const loadCourses = async () => {
      try {
        const data = await fetchCourses(selectedFaculty);
        setCourses(data);
        setStreams([]);
        setValue("course", "");
        setValue("stream", "");
      } catch (err) {
        show("error", err.message);
      }
    };

    loadCourses();
  }, [selectedFaculty]);

  // ✅ Course → Stream
  useEffect(() => {
    if (!selectedCourse) {
      setStreams([]);
      return;
    }

    const loadStreams = async () => {
      try {
        const data = await fetchStreams(selectedCourse);
        setStreams(data);
        setValue("stream", "");
      } catch (err) {
        show("error", err.message);
      }
    };

    loadStreams();
  }, [selectedCourse]);

  const stepFields = {
    1: ["candidate_name", "dob", "gender"],
    2: ["email"],
    3: [],
    4: [],
  };

  const next = async () => {
    const fields = stepFields[step] || [];
    const valid = await trigger(fields);

    if (!valid) {
      show("error", "Please fill all required fields");
      return;
    }

    setStep((s) => Math.min(s + 1, 4));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      // 🧠 1️⃣ Build qualification array
      const qualificationKeys = [
        "secondary",
        "sr_secondary",
        "graduation",
        "post_graduation",
        "other",
      ];

      // 🧠 2️⃣ Append normal fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          key.includes("_year") ||
          key.includes("_board") ||
          key.includes("_percentage") ||
          key.includes("_document")
        ) {
          return; // skip raw qualification fields
        }

        if (value instanceof FileList) {
          if (value.length > 0) {
            formData.append(key, value[0]);
          }
        } else {
          formData.append(key, value ?? "");
        }
      });

      // 🧠 3️⃣ Append structured qualifications
      let qIndex = 0;

      qualificationKeys.forEach((key) => {
        const year = data[`${key}_year`];
        const board = data[`${key}_board`];
        const percentage = data[`${key}_percentage`];
        const document = qualificationFiles[key];

        if (!year && !board && !percentage) return;

        formData.append(`qualifications[${qIndex}][examination]`, key);
        formData.append(
          `qualifications[${qIndex}][year_of_passing]`,
          year || "",
        );
        formData.append(
          `qualifications[${qIndex}][board_university]`,
          board || "",
        );
        formData.append(
          `qualifications[${qIndex}][percentage_cgpa]`,
          percentage || "",
        );

        if (document) {
          formData.append(`document[]`, document);
        }

        qIndex++;
      });

      const response = await createStudent(formData, true);

      show("success", `Student Created: ${response.enrollment_no}`);

      reset();
      setStep(1);
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl">
      <AdmissionStepper step={step} />

      <form>
        {step === 1 && (
          <StepPersonal register={register} errors={errors} watch={watch} />
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
          />
        )}

        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              disabled={loading}
              className="px-4 py-2 mt-5 border border-border rounded-md disabled:opacity-50"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              disabled={loading}
              className="ml-auto bg-primary text-white px-6 py-2 mt-5 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="ml-auto bg-accent text-primary px-6 py-2 mt-5 rounded-md font-semibold disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Admission"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
