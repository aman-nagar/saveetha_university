import FormSection from "../../../../form/FormSection";
import FormSelect from "../../../../form/FormSelect";
import FormInput from "../../../../form/FormInput";

export default function StepProgram({ register }) {
  return (
    <FormSection title="Programme Details">
      <FormSelect
        label="Course Type"
        name="course_type"
        register={register}
        required
        options={[
          { label: "Select course type", value: "" },
          { label: "Undergraduate", value: "ug" },
          { label: "Postgraduate", value: "pg" },
          { label: "Diploma", value: "diploma" },
        ]}
      />

      <FormSelect
        label="Faculty"
        name="faculty"
        register={register}
        required
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
        required
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
        required
        options={[
          { label: "Select stream", value: "" },
          { label: "General", value: "general" },
          { label: "Honours", value: "honours" },
        ]}
      />

      <FormSelect
        label="Year"
        name="year"
        register={register}
        required
        options={[
          { label: "2025", value: "2025" },
          { label: "2026", value: "2026" },
          { label: "2027", value: "2027" },
        ]}
      />

      <FormSelect
        label="Month Session"
        name="month_session"
        register={register}
        required
        options={[
          { label: "January", value: "january" },
          { label: "July", value: "july" },
        ]}
      />

      <FormSelect
        label="Session"
        name="session"
        register={register}
        required
        options={[
          { label: "2025–26", value: "2025" },
          { label: "2026–27", value: "2026" },
        ]}
      />

      <FormSelect
        label="Mode of Study"
        name="mode"
        register={register}
        required
        options={[
          { label: "Regular", value: "regular" },
          { label: "Distance", value: "distance" },
        ]}
      />

      <FormSelect
        label="Hostel Facility"
        name="hostel"
        register={register}
        required
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <FormInput
        label="Application Fee"
        name="application_fee"
        register={register}
        required
        type="number"
      />

      <FormInput
        label="Duration"
        name="duration"
        register={register}
        type="text"
        placeholder="e.g. 3 Years"
      />
    </FormSection>
  );
}
