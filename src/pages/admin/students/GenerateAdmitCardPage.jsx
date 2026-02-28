// src/pages/admin/students/GenerateAdmitCardPage.jsx
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useAdmitCardLogic } from "../../../hooks/useAdmitCardLogic";
import Button from "../../../components/ui/Button";
import AdmitCardForm from "../../../components/admin/students/admit-card/AdmitCardForm";
import ScheduleTable from "../../../components/admin/students/admit-card/ScheduleTable";
import Table from "../../../components/table/Table";

export default function GenerateAdmitCardPage() {
  const { register, setValue, handleSubmit, watch } = useForm();
  const selectedPart = watch("selectedDuration");
  const searchContainerRef = useRef(null);
  const [admitCards, setAdmitCards] = useState([]);

  const logic = useAdmitCardLogic(setValue);

  useEffect(() => {
    logic.loadSubjectsForPart(selectedPart);
  }, [selectedPart, logic.loadSubjectsForPart]);

  const onGenerate = (data) => {
    const newEntry = {
      id: Date.now(),
      enrollmentNo: data.enrollmentNo,
      rollNo: data.rollNo,
      courseName: data.course,
      selectedPart: `${logic.courseType} ${data.selectedDuration}`,
    };
    setAdmitCards([newEntry, ...admitCards]);
  };

  return (
    <div className="w-full p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-text">Generate Admit Card</h1>
      <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit(onGenerate)}>
          <AdmitCardForm
            register={register}
            logic={logic}
            searchRef={searchContainerRef}
          />

          {selectedPart && (
            <ScheduleTable
              register={register}
              subjects={logic.subjects}
              loading={logic.loadingSubjects}
              courseType={logic.courseType}
              selectedPart={selectedPart}
            />
          )}

          <div className="flex justify-end mt-6">
            <Button type="submit">Generate</Button>
          </div>
        </form>
      </div>

      <Table
        title="Admit Card History"
        columns={[
          { key: "enrollmentNo", label: "Enrollment No." },
          { key: "rollNo", label: "Roll No." },
          { key: "courseName", label: "Course" },
          { key: "selectedPart", label: "Exam For" },
        ]}
        data={admitCards}
      />
    </div>
  );
}
