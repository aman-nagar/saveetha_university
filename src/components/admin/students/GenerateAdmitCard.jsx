// src/pages/admin/admit-card/GenerateAdmitCard.jsx
import { useForm } from "react-hook-form";
import FormInput from "../../../components/form/FormInput";
import FormSelect from "../../../components/form/FormSelect";
import Table from "../../../components/table/Table";
import Button from "../../../components/ui/Button";
import { HiEye, HiTrash } from "react-icons/hi";

// Dummy data for selects and table
const enrollmentOptions = [
  { label: "ABC/001", value: "ABC/001" },
  { label: "ABC/002", value: "ABC/002" },
  { label: "ABC/003", value: "ABC/003" },
];

const courseOptions = [
  { label: "Computer Science", value: "CS" },
  { label: "Mathematics", value: "MATH" },
  { label: "Physics", value: "PHY" },
];

const durationOptions = [
  { label: "1 Year", value: "1" },
  { label: "2 Years", value: "2" },
  { label: "3 Years", value: "3" },
  { label: "4 Years", value: "4" },
];

const examCenterOptions = [
  { label: "Center A", value: "A" },
  { label: "Center B", value: "B" },
  { label: "Center C", value: "C" },
];

// Dummy table data
const dummyData = [
  {
    id: 1,
    enrollmentNo: "ABC/001",
    rollNo: "101",
    courseName: "Computer Science",
  },
  { id: 2, enrollmentNo: "ABC/002", rollNo: "102", courseName: "Mathematics" },
  { id: 3, enrollmentNo: "ABC/003", rollNo: "103", courseName: "Physics" },
];

export default function GenerateAdmitCard() {
  const {
    register,
    formState: { errors },
  } = useForm();

  // Table columns
  const columns = [
    { key: "enrollmentNo", label: "Enrollment No." },
    { key: "rollNo", label: "Roll No." },
    { key: "courseName", label: "Course Name" },
  ];

  const actions = [
    {
      icon: <HiEye className="w-4 h-4" />,
      className:
        "bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition",
      title: "View",
      onClick: (row) => console.log("View", row),
    },
    {
      icon: <HiTrash className="w-4 h-4" />,
      className:
        "bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-md transition",
      title: "Delete",
      onClick: (row) => console.log("Delete", row),
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold text-text">Generate Admit Card</h1>

      {/* Filter Form */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormSelect
            label="Enrollment No."
            name="enrollmentNo"
            register={register}
            options={enrollmentOptions}
            placeholder="--Select--"
          />
          <FormInput
            label="Roll No."
            name="rollNo"
            register={register}
            placeholder="Enter Roll No."
          />
          <FormSelect
            label="Course"
            name="course"
            register={register}
            options={courseOptions}
            placeholder="Select Course"
          />
          <FormSelect
            label="Duration"
            name="duration"
            register={register}
            options={durationOptions}
            placeholder="Select Option"
          />
          <FormSelect
            label="Exam Center"
            name="examCenter"
            register={register}
            options={examCenterOptions}
            placeholder="Exam Center Name"
          />
          <FormInput
            label="Session"
            name="session"
            register={register}
            placeholder="Enter Session"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button>Generate</Button>
        </div>
      </div>

      {/* Results Table */}
      <Table
        title="Admit Card List"
        columns={columns}
        data={dummyData}
        actions={actions}
        emptyMessage="No records found"
      />
    </div>
  );
}
