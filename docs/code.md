// src/components/admin/courses/SubjectForm.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
import FormSelect from "../../form/FormSelect";

// API Imports
import { fetchStreamsById } from "../../../api/courses/streamApi";
import { fetchCoursesById } from "../../../api/courses/courseApi";

export default function SubjectForm({
streamList = [],
selectedStream,
onStreamChange,
onSubmit,
initialData = null,
mode = "create",
onCancel,
}) {
// 1. Initialize Form Hooks
const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

// 2. Local State for Dynamic Logic
const [durationOptions, setDurationOptions] = useState([]);
const [fetchingRules, setFetchingRules] = useState(false); // ✅ Fix: Added the missing state

// 3. Hydrate form when editing
useEffect(() => {
if (initialData) {
reset({
subject_name: initialData.subject_name,
subject_code: initialData.subject_code,
short_name: initialData.short_name,
max_theory_marks: initialData.max_theory_marks,
max_practical_marks: initialData.max_practical_marks,
duration: initialData.duration,
duration_type: initialData.duration_type,
status: initialData.status ?? 1,
});
onStreamChange(initialData.stream_id);
} else {
reset();
}
}, [initialData, reset, onStreamChange]);

// 4. Dynamic Logic: Fetch Course rules based on Stream
const loadStreamData = async (id) => {
if (!id) {
setDurationOptions([]);
return;
}

    setFetchingRules(true); // Start loading
    try {
      const streamData = await fetchStreamsById(id);
      const course = await fetchCoursesById(streamData.course_id);

      const durationCount = Number(course.duration);
      const type = course.duration_type; // "Year", "Semester", or "Month"

      let options = [];

      if (type === "Year" || type === "Semester") {
        for (let i = 1; i <= durationCount; i++) {
          options.push({ label: `${type} ${i}`, value: String(i) });
        }
      } else {
        options.push({
          label: `${durationCount} Months`,
          value: String(durationCount),
        });
      }

      setDurationOptions(options);

      // Auto-set duration_type to keep hidden fields in sync
      setValue("duration_type", type.toLowerCase());

    } catch (err) {
      console.error("Failed to sync course rules:", err.message);
    } finally {
      setFetchingRules(false); // Stop loading
    }

};

useEffect(() => {
loadStreamData(selectedStream);
}, [selectedStream]);

// 5. Submit Handler
const submitForm = async (data) => {
if (!selectedStream) return;

    await onSubmit({
      id: initialData?.id,
      stream_id: selectedStream,
      subject_name: data.subject_name,
      subject_code: data.subject_code,
      short_name: data.short_name,
      max_theory_marks: Number(data.max_theory_marks),
      max_practical_marks: Number(data.max_practical_marks),
      duration: Number(data.duration),
      duration_type: data.duration_type,
      status: Number(data.status),
    });

    if (mode === "create") reset();

};

return (

<form onSubmit={handleSubmit(submitForm)} className="space-y-6">
<FormSection title={mode === "edit" ? "Edit Subject" : "Add Subject"}>

        {/* Stream Select */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">
            Select Stream *
          </label>
          <select
            value={selectedStream}
            onChange={(e) => onStreamChange(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text focus:ring-2 focus:ring-accent"
          >
            <option value="">Select Stream</option>
            {streamList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <FormInput
          label="Subject Name"
          name="subject_name"
          register={register}
          required="Required"
          error={errors.subject_name}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Subject Code"
            name="subject_code"
            register={register}
          />
          <FormInput
            label="Short Name"
            name="short_name"
            register={register}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Max Theory Marks"
            name="max_theory_marks"
            type="number"
            register={register}
          />
          <FormInput
            label="Max Practical Marks"
            name="max_practical_marks"
            type="number"
            register={register}
          />
        </div>

        <FormSelect
          label={fetchingRules ? "Syncing Duration..." : "Select Duration"}
          name="duration"
          register={register}
          watch={watch}
          options={durationOptions}
          placeholder={fetchingRules ? "Please wait..." : "Select Duration"}
          error={errors.duration}
          required="Please select duration"
        />

        {/* Status */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-text">Status</label>
          <select
            {...register("status")}
            className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* Hidden field for duration_type to send to API */}
        <input type="hidden" {...register("duration_type")} />
      </FormSection>

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-md text-white bg-primary hover:bg-primary/90 transition shadow-sm"
        >
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </button>

        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-md border border-border hover:bg-bg transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>

);
}
