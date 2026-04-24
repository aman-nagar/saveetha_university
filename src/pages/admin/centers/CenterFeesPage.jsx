// src/pages/admin/centers/CenterFees.jsx
import React, { useEffect, useState } from "react";
import {
  fetchAdminFees,
  updatePaymentStatus,
} from "../../../api/admin/adminApi";
import { useToast } from "../../../context/ToastContext";
import { HiCheck, HiX } from "react-icons/hi";
import DataTableLayout from "../../../components/table/DataTableLayout";
import Table from "../../../components/table/Table";
import Pagination from "../../../components/ui/Pagination";

export default function CenterFees() {
  const { show } = useToast();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });

  useEffect(() => {
    loadPayments(pagination.current_page);
  }, [pagination.current_page]);

  const loadPayments = async (page) => {
    setLoading(true);
    try {
      const res = await fetchAdminFees({ page });
      setPayments(res.data || []);
      if (res.pagination) {
        setPagination({
          current_page: res.pagination.current_page,
          total_pages: res.pagination.total_pages,
        });
      }
    } catch (err) {
      show("error", "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      await updatePaymentStatus({ payment_id: id, status });
      show("success", `Payment ${status} successfully`);
      loadPayments(pagination.current_page);
    } catch (err) {
      show("error", err.message);
    }
  };

  const columns = [
    {
      key: "index",
      label: "#",
      render: (_, index) => {
        const absoluteIndex = (pagination.current_page - 1) * 10 + (index + 1);
        return <span className="text-muted font-medium">{absoluteIndex}</span>;
      },
    },
    {
      key: "institute",
      label: "Institute & Student",
      render: (row) => (
        <div className="flex flex-col min-w-[150px]">
          <span
            className="font-bold text-text uppercase truncate"
            title={row.institute_name}
          >
            {row.institute_name}
          </span>
          <span className="text-[10px] text-muted truncate">
            {row.candidate_name} ({row.enrollment_no})
          </span>
        </div>
      ),
    },
    {
      key: "transaction_id",
      label: "Transaction ID",
      render: (row) => (
        <span className="font-mono text-xs text-primary">
          {row.transaction_id}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (row) => (
        <span className="font-black text-text whitespace-nowrap">
          ₹{row.amount_paid}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },

    {
      key: "manage_actions",
      label: "Actions",
      // Standardizing alignment to start/left to match the table header
      render: (row) => (
        <div className="flex items-center gap-2 min-w-[100px]">
          {row.status === "pending" ? (
            <>
              <button
                onClick={() => handleAction(row.payment_id, "verified")}
                className="p-2 bg-success/10 text-success rounded-lg hover:bg-success hover:text-white transition-all shadow-sm"
                title="Verify"
              >
                <HiCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleAction(row.payment_id, "rejected")}
                className="p-2 bg-danger/10 text-danger rounded-lg hover:bg-danger hover:text-white transition-all shadow-sm"
              >
                <HiX className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className="text-[11px] font-bold text-muted/50 bg-bg px-2 py-1 rounded border border-border/50 italic">
              Processed
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-4 sm:p-8 space-y-6 bg-bg min-h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-primary tracking-tight">
          Payment Verification
        </h1>
        <p className="text-muted text-sm font-medium">
          Review and process center-submitted fee records
        </p>
      </div>

      {/* Main Table Layout */}
      <DataTableLayout
        pagination={
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={(page) =>
              setPagination((prev) => ({ ...prev, current_page: page }))
            }
          />
        }
      >
        <div className="w-full">
          {/* Not passing 'actions' prop here to avoid the shared component bug */}
          <Table
            columns={columns}
            data={payments}
            loading={loading}
            emptyMessage="No payment records found"
          />
        </div>
      </DataTableLayout>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    verified: "bg-success/10 text-success border-success/20",
    rejected: "bg-danger/10 text-danger border-danger/20",
    pending: "bg-warning/10 text-warning border-warning/20",
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${styles[status] || "border-border"}`}
    >
      {status}
    </span>
  );
}
