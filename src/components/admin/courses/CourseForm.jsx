// src/components/admin/courses/CourseForm.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";
import Button from "../../ui/Button";

export default function CourseForm({
  courseTypes = [],
  selectedCourseType,
  onCourseTypeChange,
  facultyList = [],
  selectedFaculty,
  onFacultyChange,
  onSubmit,
  initialData = null,
  mode = "create",
  onCancel,
  loadingFaculties = false,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        course: initialData.name,
        duration: initialData.duration,
        duration_type: initialData.duration_type,
      });
      // In edit mode, cascade: set course type first, then faculty
      onCourseTypeChange(initialData.course_type_id);
      onFacultyChange(initialData.faculty_id);
    } else {
      reset({
        course: "",
        duration: "",
        duration_type: "",
      });
    }
  }, [initialData, reset, onCourseTypeChange, onFacultyChange]);

  const submitForm = async (data) => {
    await onSubmit({
      facultyId: selectedFaculty,
      name: data.course,
      duration: Number(data.duration),
      durationType: data.duration_type,
    });

    if (mode === "create") reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection
        title={mode === "edit" ? "Edit Course" : "Add Course"}
        columns={2}
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

        <FormInput
          label="Course Name"
          name="course"
          register={register}
          required="Enter course name"
        />

        <FormInput
          label="Duration"
          name="duration"
          type="number"
          register={register}
          required="Enter duration"
        />

        {/* Duration Type select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            Duration Type <span className="text-danger">*</span>
          </label>
          <select
            {...register("duration_type", {
              required: "Select duration type",
            })}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
          >
            <option value="">Select Duration Type</option>
            <option value="year">Year</option>
            <option value="months">Months</option>
            <option value="semester">Semester</option>
          </select>
        </div>
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-white bg-primary hover:bg-primary/90 transition text-sm sm:text-base font-medium"
        >
          {mode === "edit" ? "Update Course" : "Create Course"}
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
