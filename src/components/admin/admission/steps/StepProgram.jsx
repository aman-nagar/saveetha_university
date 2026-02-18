import FormSection from "../../../form/FormSection";
import FormSelect from "../../../form/FormSelect";

export default function StepProgram({ register }) {
  return (
    <FormSection title="Program Details">
      <FormSelect
        label="Program"
        name="program"
        register={register}
        required
        options={[
          { label: "BCA", value: "bca" },
          { label: "MBA", value: "mba" },
          { label: "B.Tech", value: "btech" },
        ]}
      />

      <FormSelect
        label="Session"
        name="session"
        register={register}
        required
        options={[
          { label: "2026–27", value: "2026" },
          { label: "2027–28", value: "2027" },
        ]}
      />
    </FormSection>
  );
}
