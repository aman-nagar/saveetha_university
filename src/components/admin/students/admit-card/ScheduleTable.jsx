// src/components/admin/students/ScheduleTable.jsx
import Table from "../../../table/Table";

export default function ScheduleTable({
  register,
  subjects,
  loading,
  courseType,
  selectedPart,
}) {
  const subjectColumns = [
    {
      key: "subject_code",
      label: "Code",
      render: (r) => (
        <span className="text-muted font-mono text-sm">{r.subject_code}</span>
      ),
    },
    {
      key: "subject_name",
      label: "Subject Name",
      render: (r) => (
        <span className="font-medium text-text text-sm uppercase">
          {r.subject_name}
        </span>
      ),
    },
    {
      key: "exam_date",
      label: "Date",
      render: (r) => (
        <input
          type="date"
          {...register(`schedule.${r.id}.date`)}
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-surface outline-none"
        />
      ),
    },
    {
      key: "start_time",
      label: "Start Time",
      render: (r) => (
        <input
          type="time"
          defaultValue="10:00"
          {...register(`schedule.${r.id}.start_time`)}
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-surface outline-none"
        />
      ),
    },
    {
      key: "end_time",
      label: "End Time",
      render: (r) => (
        <input
          type="time"
          defaultValue="12:00"
          {...register(`schedule.${r.id}.end_time`)}
          className="border border-border rounded-md px-3 py-1.5 text-sm bg-surface outline-none"
        />
      ),
    },
  ];

  return (
    <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-lg font-semibold text-text">
        Exam Schedule: {courseType} {selectedPart}
      </h3>
      <Table
        columns={subjectColumns}
        data={subjects}
        loading={loading}
        emptyMessage={`No subjects found for ${courseType} ${selectedPart}.`}
      />
    </div>
  );
}
