// src/components/admin/students/admit-card/ScheduleTable.jsx
import { formatTimeAMPM } from "../../../../utils/formatters";
import Table from "../../../table/Table";

export default function ScheduleTable({
  register,
  subjects,
  loading,
  courseType,
  selectedPart,
  watch, // Added
  setValue, // Added
}) {
  const scheduleValues = watch("schedule") || {};

  const toggleAMPM = (subjectId, field) => {
    const currentVal =
      scheduleValues[subjectId]?.[field] ||
      (field === "start_time" ? "10:00" : "12:00");
    let [hours, minutes] = currentVal.split(":");
    let h = parseInt(hours);

    // Toggle logic
    if (h < 12) h += 12;
    else h -= 12;

    const newTime = `${String(h).padStart(2, "0")}:${minutes}`;
    // setValue updates the react-hook-form state so it saves as HH:mm to the backend
    setValue(`schedule.${subjectId}.${field}`, newTime);
  };

  const subjectColumns = [
    {
      key: "subject_code",
      label: "Code",
      render: (r) => (
        <span className="font-mono text-xs">{r.subject_code}</span>
      ),
    },
    {
      key: "subject_name",
      label: "Subject Name",
      render: (r) => (
        <span className="uppercase text-xs font-semibold">
          {r.subject_name}
        </span>
      ),
    },
    {
      key: "exam_date",
      label: "Date",
      render: (row) => (
        <input
          type="date"
          {...register(`schedule.${row.id}.date`, { required: true })}
          className="border border-border rounded px-2 py-1 text-xs bg-surface outline-none focus:border-accent"
        />
      ),
    },
    {
      key: "start_time",
      label: "Start Time",
      render: (row) => {
        const timeVal = scheduleValues[row.id]?.start_time || "10:00";
        const isPM = parseInt(timeVal.split(":")[0]) >= 12;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <input
                type="time"
                {...register(`schedule.${row.id}.start_time`)}
                className="border border-border rounded px-2 py-1 text-xs bg-surface outline-none w-24"
              />
              <button
                type="button"
                onClick={() => toggleAMPM(row.id, "start_time")}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  isPM ? "bg-accent text-white" : "bg-primary text-white"
                }`}
              >
                {isPM ? "PM" : "AM"}
              </button>
            </div>
            <span className="text-[10px] text-accent font-medium">
              {formatTimeAMPM(timeVal)}
            </span>
          </div>
        );
      },
    },
    {
      key: "end_time",
      label: "End Time",
      render: (row) => {
        const timeVal = scheduleValues[row.id]?.end_time || "12:00";
        const isPM = parseInt(timeVal.split(":")[0]) >= 12;
        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <input
                type="time"
                {...register(`schedule.${row.id}.end_time`)}
                className="border border-border rounded px-2 py-1 text-xs bg-surface outline-none w-24"
              />
              <button
                type="button"
                onClick={() => toggleAMPM(row.id, "end_time")}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  isPM ? "bg-accent text-white" : "bg-primary text-white"
                }`}
              >
                {isPM ? "PM" : "AM"}
              </button>
            </div>
            <span className="text-[10px] text-accent font-medium">
              {formatTimeAMPM(timeVal)}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-lg font-semibold text-text">
        Exam Schedule: {courseType} {selectedPart}
      </h3>
      <div className="border border-border rounded-xl overflow-hidden">
        <Table
          columns={subjectColumns}
          data={subjects}
          loading={loading}
          emptyMessage={`No subjects found for ${courseType} ${selectedPart}.`}
        />
      </div>
    </div>
  );
}
