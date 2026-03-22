// src/components/admin/settings/modals/DownloadFormModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import FormInput from "@/components/form/FormInput";
import FormFileInput from "@/components/form/FormFileInput";
import Button from "@/components/ui/Button";

export default function DownloadFormModal({ isOpen, onClose, onSave }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        file: "",
      });
    }
  }, [isOpen, reset]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.file?.[0]) {
      formData.append("file", data.file[0]);
    }

    await onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} title="Add Download Form" onClose={onClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          label="Form Name"
          name="name"
          register={register}
          required="Form name is required"
          placeholder="e.g., Admission Form, Transfer Form"
        />

        <FormFileInput
          label="PDF File"
          name="file"
          register={register}
          required="PDF file is required"
          accept=".pdf,application/pdf"
        />

        <div className="flex gap-2 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-primary text-white hover:bg-primary/90"
          >
            Create Form
          </Button>
        </div>
      </form>
    </Modal>
  );
}
