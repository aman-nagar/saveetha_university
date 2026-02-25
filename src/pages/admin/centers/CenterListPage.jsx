//src/pages/admin/centers/CenterListPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCenters } from "@api/center/centerApi";
import { useCrud } from "@hooks/useCrud";
import { useToast } from "@hooks/useToast";
import Table from "@components/table/Table";
import Button from "@components/ui/Button";
import Toast from "@components/ui/Toast";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";
import { useConfirm } from "@/hooks/useConfirm";
import StatusBadge from "@components/ui/StatusBadge";
import Modal from "@components/ui/Modal";

export default function CenterListPage() {
  const navigate = useNavigate();
  const { toast, show, clear } = useToast();
  const { target, isOpen, open, close } = useConfirm();

  const {
    data: centers,
    loading,
    load,
    remove,
  } = useCrud({
    fetchFn: fetchCenters,
    deleteFn: async (id) => {
      // Logic for delete would go here (e.g., deleteCenter API call)
      console.log(`[CenterListPage.jsx] Attempting to delete ID: ${id}`);
    },
  });

  useEffect(() => {
    console.log(
      "[CenterListPage.jsx] Component mounted. Fetching centers... [from useEffect]",
    );
    load();
  }, [load]);

  const confirmDelete = async () => {
    if (!target) return;
    try {
      await remove(target.id);
      show("success", `Center "${target.institute_name}" deleted successfully`);
    } catch (err) {
      console.log(err);
      show("error", "Failed to delete center");
    } finally {
      close();
    }
  };

  // Define columns based on your API response keys
  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, i) => <span className="text-muted">{i + 1}</span>,
    },
    {
      key: "institute_name",
      label: "Institute Name",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-text">{row.institute_name}</span>
          <span className="text-xs text-muted">
            {row.institute_full_address}
          </span>
        </div>
      ),
    },
    {
      key: "institute_owner_name",
      label: "Owner Detail",
      render: (row) => (
        <div className="flex flex-col">
          <span>{row.institute_owner_name}</span>
          <span className="text-xs text-muted">DOB: {row.date_of_birth}</span>
        </div>
      ),
    },
    {
      key: "contact_number",
      label: "Contact & Email",
      render: (row) => (
        <div className="flex flex-col text-sm">
          <span>{row.contact_number}</span>
          <span className="text-blue-500 hover:underline">{row.email}</span>
        </div>
      ),
    },
  ];
  const actions = [
    {
      icon: <HiPencil className="w-4 h-4" />,
      className:
        "bg-blue-100 text-blue-600 hover:bg-blue-200 p-2 rounded-md transition",
      title: "Edit Center",
      onClick: (row) => navigate(`/admin/centers/add?id=${row.id}`),
    },
    {
      icon: <HiTrash className="w-4 h-4" />,
      className:
        "bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-md transition",
      title: "Delete Center",
      // Simply call open(row) to trigger your modal!
      onClick: (row) => open(row),
    },
  ];

  return (
    <div className="w-full">
      {toast && <Toast {...toast} onClose={clear} />}

      <div className="bg-surface rounded-xl shadow-sm border border-border">
        <Table
          title="All Registered Centers"
          columns={columns}
          data={centers}
          actions={actions}
          loading={loading}
          emptyMessage="No centers found. Click 'Add New Center' to get started."
        />
      </div>
      <Modal
        isOpen={isOpen}
        title="Confirm Delete"
        onClose={close}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete Center
            </Button>
          </>
        }
      >
        {target && (
          <p className="text-text">
            Are you sure you want to delete{" "}
            <strong>{target.institute_name}</strong>? This action cannot be
            undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
