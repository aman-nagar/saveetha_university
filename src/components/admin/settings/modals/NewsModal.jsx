// src/components/admin/settings/modals/NewsModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import FormSection from "@/components/form/FormSection";
import Button from "@/components/ui/Button";

export default function NewsModal({ isOpen, item, onClose, onSave }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (item) {
      reset(item);
    } else {
      reset({
        title: "",
        content: "",
        publish_date: new Date().toISOString().split("T")[0],
        is_published: false,
      });
    }
  }, [item, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    await onSave(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={item ? "Edit News" : "Add News"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          label="Title"
          name="title"
          register={register}
          required="Title is required"
          placeholder="Enter news title"
        />

        <FormTextarea
          label="Content"
          name="content"
          register={register}
          required="Content is required"
          placeholder="Enter news content..."
        />

        <FormSection columns={2}>
          <FormInput
            label="Publish Date"
            name="publish_date"
            type="date"
            register={register}
          />
          <div>
            <label className="text-xs sm:text-sm font-medium text-text mb-2 block">
              Published
            </label>
            <input
              type="checkbox"
              {...register("is_published")}
              className="w-4 h-4 rounded cursor-pointer"
            />
          </div>
        </FormSection>

        <div className="flex gap-2 justify-end mt-6">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800"
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-primary text-white">
            {item ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
