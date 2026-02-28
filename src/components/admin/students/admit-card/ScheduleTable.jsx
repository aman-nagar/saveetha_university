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
      render: (row) => (
        <input
          type="time"
          defaultValue="10:00"
          {...register(`schedule.${row.id}.start_time`)}
          className="border border-border rounded px-2 py-1 text-xs bg-surface outline-none"
        />
      ),
    },
    {
      key: "end_time",
      label: "End Time",
      render: (row) => (
        <input
          type="time"
          defaultValue="12:00"
          {...register(`schedule.${row.id}.end_time`)}
          className="border border-border rounded px-2 py-1 text-xs bg-surface outline-none"
        />
      ),
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
