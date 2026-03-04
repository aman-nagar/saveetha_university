import FormInput from "../../../components/form/FormInput";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function ResultFormHeader({ flow, register, rollNo }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="relative">
        <FormInput
          label="Enrollment No."
          name="enrollmentSearch"
          value={flow.searchTerm}
          placeholder="Search enrollment..."
          onChange={(e) => {
            flow.setSearchTerm(e.target.value);
            flow.setIsTyping(true);
          }}
        />

        {flow.showResults && flow.searchResults.length > 0 && (
          <div className="absolute z-50 w-full bg-surface border border-border rounded-lg shadow-xl mt-1 max-h-48 overflow-auto">
            {flow.searchResults.map((s) => (
              <div
                key={s.id}
                onClick={() => flow.selectStudent(s)}
                className="p-3 hover:bg-accent/10 cursor-pointer text-sm border-b border-border flex justify-between"
              >
                <span className="font-bold">{s.enrollment_no}</span>
                <span className="text-text-muted">{s.candidate_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <FormInput
        label={
          <>
            Roll NO{" "}
            {rollNo && rollNo !== "Not Generated" && (
              <FaCheckCircle className="text-green-500 text-xs" />
            )}
          </>
        }
        name="rollNo"
        register={register}
        readOnly
        placeholder={flow.isFetchingRoll ? "Fetching..." : "Auto-filled"}
        rightIcon={
          flow.isFetchingRoll && (
            <FaSpinner className="animate-spin text-accent" />
          )
        }
      />

      <div className="flex space-x-5">
        <FormInput label="Course" name="course" register={register} readOnly />
        <FormInput label="Stream" name="stream" register={register} readOnly />
      </div>
    </div>
  );
}
