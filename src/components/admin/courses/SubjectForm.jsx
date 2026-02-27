// src/components/admin/courses/SubjectForm.jsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormSection from "../../form/FormSection";
import FormInput from "../../form/FormInput";
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [durationOptions, setDurationOptions] = useState([]);
  const [fetchingRules, setFetchingRules] = useState(false);

  // Hydrate form when editing
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

  // Fetch course duration rules based on selected stream
  const loadStreamData = async (id) => {
    if (!id) {
      setDurationOptions([]);
      return;
    }

    setFetchingRules(true);
    try {
      const streamData = await fetchStreamsById(id);
      const course = await fetchCoursesById(streamData.course_id);

      const durationCount = Number(course.duration);
      const type = course.duration_type;

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
      setValue("duration_type", type.toLowerCase());
    } catch (err) {
      console.error("Failed to sync course rules:", err.message);
    } finally {
      setFetchingRules(false);
    }
  };

  useEffect(() => {
    loadStreamData(selectedStream);
  }, [selectedStream]);

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
    <form onSubmit={handleSubmit(submitForm)} className="space-y-5">
      <FormSection
        title={mode === "edit" ? "Edit Subject" : "Add Subject"}
        columns={2}
      >
        {/* Stream select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            Select Stream <span className="text-danger">*</span>
          </label>
          <select
            value={selectedStream}
            onChange={(e) => onStreamChange(e.target.value)}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
          >
            <option value="">Select Stream</option>
            {streamList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Name */}
        <FormInput
          label="Subject Name"
          name="subject_name"
          register={register}
          required="Required"
          error={errors.subject_name}
        />

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

        {/* Duration select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">
            {fetchingRules ? "Syncing Duration..." : "Duration *"}
          </label>
          <select
            {...register("duration", { required: "Please select duration" })}
            className={`w-full border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200
              ${errors.duration ? "border-danger ring-1 ring-danger/30" : "border-border hover:border-muted/50"}`}
          >
            <option value="">
              {fetchingRules ? "Loading..." : "Select Duration"}
            </option>
            {durationOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.duration && (
            <p className="text-xs text-danger mt-1">{errors.duration.message}</p>
          )}
        </div>

        {/* Status select */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="text-xs sm:text-sm font-medium text-text">Status</label>
          <select
            {...register("status")}
            className="w-full border border-border rounded-lg px-3 py-2 sm:py-2.5 bg-surface text-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all duration-200 hover:border-muted/50"
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>

        {/* Hidden field for duration_type */}
        <input type="hidden" {...register("duration_type")} />
      </FormSection>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-white bg-primary hover:bg-primary/90 transition text-sm sm:text-base font-medium shadow-sm"
        >
          {mode === "edit" ? "Update Subject" : "Create Subject"}
        </button>

        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-border text-text hover:bg-bg transition text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
