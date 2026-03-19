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
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        stream: initialData.name,
        application_fee: initialData.application_fee || "",
      });
      // In edit mode, cascade: set course type first, then faculty, then course
      onCourseTypeChange(initialData.course_type_id);
      onFacultyChange(initialData.faculty_id);
      onCourseChange(initialData.course_id);
    } else {
      reset({ stream: "", application_fee: "" });
    }
  }, [initialData, reset, onCourseTypeChange, onFacultyChange, onCourseChange]);

  const submitForm = async (data) => {
    await onSubmit({
      courseId: selectedCourse,
      name: data.stream,
      applicationFee: parseFloat(data.application_fee),
    });

    if (mode === "create") reset();
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
          disabled={courseTypes.length === 0}
          placeholder="Select Course Type"
          required="Course type is required"
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
          disabled={!selectedCourseType || facultyList.length === 0}
          isLoading={loadingFaculties}
          placeholder="Select Faculty"
          required="Faculty is required"
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
          disabled={!selectedFaculty || courseList.length === 0}
          isLoading={loadingCourses}
          placeholder="Select Course"
          required="Course is required"
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
