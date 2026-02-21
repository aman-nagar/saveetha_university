// src/components/admin/students/admission/steps/StepProgram.jsx
import FormSection from "../../../../form/FormSection";
import FormSelect from "../../../../form/FormSelect";
import FormInput from "../../../../form/FormInput";

export default function StepProgram({ register, errors }) {
  return (
    <FormSection title="Programme Details">
      <FormSelect
        label="Course Type"
        name="course_type"
        register={register}
        options={[
          { label: "Select course type", value: "" },
          { label: "Undergraduate", value: "ug" },
          { label: "Postgraduate", value: "pg" },
          { label: "Diploma", value: "diploma" },
        ]}
        error={errors.course_type}
      />

      <FormSelect
        label="Faculty"
        name="faculty"
        register={register}
        error={errors.faculty}
        options={[
          { label: "Select department", value: "" },
          { label: "Science", value: "science" },
          { label: "Management", value: "management" },
          { label: "Engineering", value: "engineering" },
        ]}
      />

      <FormSelect
        label="Course"
        name="course"
        register={register}
        error={errors.course}
        options={[
          { label: "Select course", value: "" },
          { label: "BCA", value: "bca" },
          { label: "BBA", value: "bba" },
          { label: "MBA", value: "mba" },
        ]}
      />

      <FormSelect
        label="Stream"
        name="stream"
        register={register}
        error={errors.stream}
        options={[
          { label: "Select stream", value: "" },
          { label: "General", value: "general" },
          { label: "Honours", value: "honours" },
        ]}
      />

      <FormInput
        label="Year"
        name="year"
        register={register}
        error={errors.year}
      />

      <FormInput
        label="Month Session"
        name="month_session"
        register={register}
        error={errors.month_session}
      />

      <FormInput label="Session" name="session" register={register} />

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

      <FormInput
        label="Duration"
        name="duration"
        register={register}
        type="text"
        placeholder="e.g. 3 Years"
        error={errors.duration}
      />
    </FormSection>
  );
}
