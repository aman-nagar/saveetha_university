import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateStudent } from "../../../api/students/studentApi";
import { useToast } from "../../../hooks/useToast";

export default function EditStudentForm({ student, onClose, onUpdated }) {
  const { register, handleSubmit } = useForm({
    defaultValues: student,
  });

  const { show } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await updateStudent(student.id, data);

      show("success", "Student updated successfully");

      onUpdated({
        id: student.id,
        ...data,
      });

      onClose();
    } catch (err) {
      show("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Candidate Name</label>
        <input
          {...register("candidate_name")}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          {...register("email")}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Contact Number</label>
        <input
          {...register("contact_number")}
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
