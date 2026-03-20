// src/components/admin/settings/modals/TestimonialModal.jsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import FormInput from "@/components/form/FormInput";
import FormTextarea from "@/components/form/FormTextarea";
import FormSection from "@/components/form/FormSection";
import Button from "@/components/ui/Button";

export default function TestimonialModal({ isOpen, item, onClose, onSave }) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (item) {
      reset(item);
    } else {
      reset({
        name: "",
        company: "",
        message: "",
        rating: 5,
      });
    }
  }, [item, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    await onSave(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={item ? "Edit Testimonial" : "Add Testimonial"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormSection columns={2}>
          <FormInput
            label="Name"
            name="name"
            register={register}
            required="Name is required"
          />
          <FormInput
            label="Company"
            name="company"
            register={register}
            placeholder="Company name"
          />
        </FormSection>

        <FormTextarea
          label="Testimonial Message"
          name="message"
          register={register}
          required="Message is required"
          placeholder="Enter testimonial message..."
        />

        <FormInput
          label="Rating (1-5)"
          name="rating"
          type="number"
          register={register}
          min="1"
          max="5"
        />

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
