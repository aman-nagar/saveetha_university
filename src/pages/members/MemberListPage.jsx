import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import Table from "../../components/table/Table";
import DataTableLayout from "../../components/table/DataTableLayout";
import Pagination from "../../components/ui/Pagination";
import SearchInput from "../../components/ui/SearchInput";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import MemberForm from "../../components/members/MemberForm";
import { useToast } from "../../context/ToastContext";
import {
  createMember,
  deleteMember,
  fetchMembers,
  updateMember,
} from "../../api/member/membersApi";

export default function MemberListPage() {
  const { show } = useToast();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadMembers = useCallback(
    async (page = 1, searchTerm = "") => {
      setLoading(true);
      try {
        const response = await fetchMembers({ page, search: searchTerm });
        const records = response.records || [];
        const limit = Number(response.limit || records.length || 10);
        const total = Number(response.total || records.length || 0);

        setMembers(records);
        setCurrentPage(response.page || 1);
        setPerPage(limit > 0 ? limit : 10);
        setTotalPages(Math.max(1, Math.ceil(total / (limit > 0 ? limit : 10))));
      } catch (err) {
        show("error", err.message || "Failed to load members");
      } finally {
        setLoading(false);
      }
    },
    [show],
  );

  useEffect(() => {
    loadMembers(1, "");
  }, [loadMembers]);

  const openCreateModal = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingMember(null);
  };

  const handleSearch = useCallback(
    (value) => {
      setSearch(value);
      setCurrentPage(1);
      loadMembers(1, value);
    },
    [loadMembers],
  );

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadMembers(page, search);
  };

  const handleFormSubmit = async (values) => {
    setIsSubmitting(true);
    const isEditMode = Boolean(editingMember?.id);

    try {
      if (isEditMode) {
        await updateMember({
          id: editingMember.id,
          name: values.name,
          email: values.email,
          number: values.number,
          password: values.password,
        });
        show("success", "Member updated successfully");
      } else {
        await createMember({
          name: values.name,
          email: values.email,
          number: values.number,
          password: values.password,
        });
        show("success", "Member created successfully");
      }

      closeFormModal();

      const nextPage = isEditMode ? currentPage : 1;
      setCurrentPage(nextPage);
      await loadMembers(nextPage, search);
    } catch (err) {
      show("error", err.message || "Failed to save member");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!memberToDelete?.id) return;

    setIsDeleting(true);
    try {
      await deleteMember(memberToDelete.id);
      show("success", `Member "${memberToDelete.name}" deleted successfully`);
      setMemberToDelete(null);
      await loadMembers(currentPage, search);
    } catch (err) {
      show("error", err.message || "Failed to delete member");
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = [
    {
      key: "serial",
      label: "#",
      render: (_, index) => (currentPage - 1) * perPage + index + 1,
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "number",
      label: "Phone",
      render: (row) => row.number || row.mobile || "-",
    },
    {
      key: "created_at",
      label: "Created At",
      render: (row) => row.created_at || "-",
    },
  ];

  const actions = [
    {
      icon: <FaEdit />,
      className:
        "px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm",
      title: "Edit Member",
      onClick: openEditModal,
    },
    {
      icon: <FaTrashAlt />,
      className:
        "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm",
      title: "Delete Member",
      onClick: setMemberToDelete,
    },
  ];

  const toolbar = (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap w-full">
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        onDebounce={handleSearch}
        placeholder="Search member by name or email..."
        delay={500}
        className="flex-1 sm:flex-none"
        inputClassName="sm:w-56 md:w-72"
      />

      <Button
        onClick={openCreateModal}
        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm justify-center sm:justify-start"
      >
        <HiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Add Member</span>
        <span className="sm:hidden">Add</span>
      </Button>
    </div>
  );

  return (
    <div className="w-full">
      <DataTableLayout
        title="Member Management"
        toolbar={toolbar}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        }
      >
        <Table
          columns={columns}
          data={members}
          actions={actions}
          loading={loading}
          pageOffset={(currentPage - 1) * perPage}
          emptyMessage="No members found. Create a member to get started."
        />
      </DataTableLayout>

      <Modal
        isOpen={isFormOpen}
        onClose={closeFormModal}
        title={editingMember ? "Edit Member" : "Create Member"}
        size="md"
      >
        <MemberForm
          initialData={editingMember}
          onSubmit={handleFormSubmit}
          onCancel={closeFormModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        title="Delete Member"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setMemberToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete} loading={isDeleting}>
              Delete Member
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-text">
          <div className="flex items-center gap-3 text-danger">
            <FaUsers className="shrink-0" />
            <p className="font-medium">This action cannot be undone.</p>
          </div>
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{memberToDelete?.name || "this member"}</span>
            ?
          </p>
        </div>
      </Modal>
    </div>
  );
}
