// src/components/admin/settings/modals/SliderModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import FormInput from "@/components/form/FormInput";
import FormFileInput from "@/components/form/FormFileInput";
import Button from "@/components/ui/Button";

export default function SliderModal({ isOpen, item, onClose, onSave }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (item) {
      reset({
        heading: item.heading || "",
        title: item.title || "",
        is_active: item.status === 1 || false,
      });
    } else {
      reset({
        heading: "",
        title: "",
        image: "",
        is_active: true,
      });
    }
  }, [item, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    const formData = new FormData();

    if (item?.id) {
      formData.append("id", item.id);
    }

    formData.append("heading", data.heading);
    formData.append("title", data.title);

    formData.append("status", data.is_active ? 1 : 0);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    await onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={item ? "Edit Slider" : "Add Slider"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormInput
          label="Heading"
          name="heading"
          register={register}
          required="Heading is required"
          placeholder="Slider heading"
        />

        <FormInput
          label="Title"
          name="title"
          register={register}
          required="Title is required"
          placeholder="Slider title"
        />

        <FormFileInput
          label="Image"
          name="image"
          register={register}
          existingUrl={item?.image_url}
        />

        <div>
          <label className="text-xs sm:text-sm font-medium text-text mb-2 block">
            Active
          </label>
          <input
            type="checkbox"
            {...register("is_active")}
            className="w-4 h-4 rounded cursor-pointer"
          />
        </div>

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
