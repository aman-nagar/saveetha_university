// src/components/admin/students/admission/steps/StepProgram.jsx
import FormSection from "../../../../form/FormSection";
import FormSelect from "../../../../form/FormSelect";
import FormInput from "../../../../form/FormInput";
import { useMemo } from "react";

export default function StepProgram({
  register,
  errors,
  courseTypes = [],
  faculties = [],
  courses = [],
  streams = [],
  isAdmin = false,
}) {
  const courseTypeOptions = useMemo(
    () =>
      courseTypes.map((ct) => ({ label: ct.name, value: ct.name, id: ct.id })),
    [courseTypes],
  );

  const facultyOptions = useMemo(
    () => faculties.map((f) => ({ label: f.name, value: f.name, id: f.id })),
    [faculties],
  );

  const courseOptions = useMemo(
    () => courses.map((c) => ({ label: c.name, value: c.name, id: c.id })),
    [courses],
  );

  const streamOptions = useMemo(
    () => streams.map((s) => ({ label: s.name, value: s.name, id: s.id })),
    [streams],
  );
  return (
    <FormSection title="Programme Details" columns={2}>
      <FormSelect
        label="Course Type"
        name="course_type"
        register={register}
        error={errors.course_type}
        options={courseTypeOptions}
      />

      <FormSelect
        label="Faculty"
        name="faculty"
        register={register}
        error={errors.faculty}
        options={facultyOptions}
      />

      <FormSelect
        label="Course"
        name="course"
        register={register}
        error={errors.course}
        options={courseOptions}
      />

      <FormSelect
        label="Stream"
        name="stream"
        register={register}
        error={errors.stream}
        options={streamOptions}
      />

      <FormInput
        label="Year"
        name="year"
        register={register}
        disabled={!isAdmin}
        error={errors.year}
      />

      <FormInput
        label="Month Session"
        name="month_session"
        register={register}
        error={errors.month_session}
      />

      <FormInput
        label="Session"
        name="session"
        register={register}
        error={errors.session}
      />

      <FormSelect
        label="Mode of Study"
        name="mode_of_study"
        register={register}
        error={errors.mode_of_study}
        options={[
          { label: "Regular", value: "Regular" },
          { label: "Distance", value: "Distance" },
        ]}
      />

      <FormSelect
        label="Hostel Facility"
        name="hostel_facility"
        register={register}
        error={errors.hostel_facility}
        options={[
          { label: "Yes", value: 1 },
          { label: "No", value: 0 },
        ]}
      />

      <FormInput
        label="Application Fee"
        name="application_fee"
        register={register}
        type="number"
        error={errors.application_fee}
      />

      <div className="sm:col-span-2">
        <FormInput
          label="Duration"
          name="duration"
          register={register}
          type="text"
          placeholder="e.g. 3 Years"
          error={errors.duration}
        />
      </div>
    </FormSection>
  );
}
