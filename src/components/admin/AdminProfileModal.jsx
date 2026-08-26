import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import FormInput from "@/components/form/FormInput";
import { useToast } from "@/context/ToastContext";
import {
  fetchAdminProfile,
  updateAdminProfile,
} from "@/api/admin/adminApi";

export default function AdminProfileModal({
  isOpen,
  onClose,
  fallbackEmail = "",
}) {
  const { show } = useToast();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let active = true;

    // Reset form when modal opens
    setEmail(fallbackEmail);
    setNewPassword("");
    setLoadingProfile(true);

    fetchAdminProfile()
      .then((profile) => {
        if (!active) return;

        setEmail(profile?.email || fallbackEmail);
      })
      .catch((error) => {
        console.warn("Could not load admin profile:", error);

        // Keep fallback email if profile API fails
        if (active) {
          setEmail(fallbackEmail);
        }
      })
      .finally(() => {
        if (active) {
          setLoadingProfile(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isOpen, fallbackEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      show("error", "Please enter your email");
      return;
    }

    if (!newPassword) {
      show("error", "Please enter a new password");
      return;
    }

    setSaving(true);

    try {
      await updateAdminProfile({
        email: trimmedEmail,
        newPassword,
      });

      show("success", "Email and password updated successfully");

      setNewPassword("");

      onClose();
    } catch (error) {
      console.error("Admin profile update failed:", error);

      show(
        "error",
        error?.message || "Failed to update admin profile",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (saving) return;

    setNewPassword("");
    onClose();
  };

  const modal = (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Update Admin Account"
      size="md"
      centered
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          name="admin-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter new email"
          disabled={loadingProfile || saving}
          autoComplete="email"
        />

        <FormInput
          label="New Password"
          name="admin-new-password"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="Enter new password"
          disabled={loadingProfile || saving}
          autoComplete="new-password"
        />

        <p className="text-xs text-muted">
          You can update your admin email and password. Your current password
          is not required.
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={saving}
            disabled={loadingProfile || saving}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );

  return typeof document === "undefined"
    ? modal
    : createPortal(modal, document.body);
}