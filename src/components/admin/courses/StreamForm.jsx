// src/components/admin/courses/StreamForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";
import Button from "../../ui/Button";

export default function StreamForm({
  courseTypes = [],
  selectedCourseType,
  onCourseTypeChange,
  facultyList = [],
  selectedFaculty,
  onFacultyChange,
  courseList = [],
  selectedCourse,
  onCourseChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
  loadingFaculties = false,
  loadingCourses = false,
  isEmptyFaculties = false,
  isEmptyCourses = false,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      courseType: "",
      faculty: "",
      course: "",
      stream: "",
      application_fee: "",
    },
  });

  useEffect(() => {
    if (!initialData) return;

    reset({
      courseType: selectedCourseType || initialData.course_type_id || "",
      faculty: selectedFaculty || initialData.faculty_id || "",
      course: selectedCourse || initialData.course_id || "",
      stream: initialData.name || "",
      application_fee: initialData.application_fee ?? "",
    });
  }, [initialData, reset, selectedCourseType, selectedFaculty, selectedCourse]);

  const submitForm = async (data) => {
    await onSubmit({
      courseId: selectedCourse || initialData?.course_id || data.course,
      name: data.stream,
      applicationFee: parseFloat(data.application_fee),
    });

    if (mode === "create") {
      reset({
        courseType: selectedCourseType || "",
        faculty: selectedFaculty || "",
        course: selectedCourse || "",
        stream: "",
        application_fee: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection
        title={mode === "edit" ? "Edit Stream" : "Add Stream"}
        columns={3}
      >
        {/* Course Type select */}
        <FormSelect
          label="Course Type"
          name="courseType"
          register={register}
          options={courseTypes.map((ct) => ({
            value: ct.id,
            label: ct.name,
            id: ct.id,
          }))}
          onChangeCb={(selected) => {
            onCourseTypeChange(selected?.value || "");
          }}
          disabled={mode === "edit" || courseTypes.length === 0}
          placeholder="Select Course Type"
          required={mode === "create" ? "Course type is required" : false}
        />

        {/* Faculty select */}
        <FormSelect
          label="Faculty"
          name="faculty"
          register={register}
          options={facultyList.map((f) => ({
            value: f.id,
            label: f.name,
            id: f.id,
          }))}
          onChangeCb={(selected) => {
            onFacultyChange(selected?.value || "");
          }}
          disabled={mode === "edit" || !selectedCourseType || facultyList.length === 0}
          isLoading={loadingFaculties}
          isEmpty={isEmptyFaculties}
          placeholder="Select Faculty"
          required={mode === "create" ? "Faculty is required" : false}
        />

        {/* Course select */}
        <FormSelect
          label="Course"
          name="course"
          register={register}
          options={courseList.map((c) => ({
            value: c.id,
            label: c.name,
            id: c.id,
          }))}
          onChangeCb={(selected) => {
            onCourseChange(selected?.value || "");
          }}
          disabled={mode === "edit" || !selectedFaculty || courseList.length === 0}
          isLoading={loadingCourses}
          isEmpty={isEmptyCourses}
          placeholder="Select Course"
          required={mode === "create" ? "Course is required" : false}
        />

        <FormInput
          label="Stream Name"
          name="stream"
          register={register}
          required="Enter stream name"
        />
        <FormInput
          type="number"
          label="Stream Fees"
          name="application_fee"
          register={register}
          required="Enter Fees Amount"
        />
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="submit">
          {mode === "edit" ? "Update Stream" : "Create Stream"}
        </Button>

        {mode === "edit" && (
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
