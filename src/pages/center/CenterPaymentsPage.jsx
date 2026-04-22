// src/pages/center/CenterPaymentsPage.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  HiOutlineCurrencyRupee,
  HiCheckCircle,
  HiExclamationCircle,
  HiCreditCard,
  HiTable,
} from "react-icons/hi";
import {
  fetchCenterFees,
  submitCenterPayment,
} from "../../api/center/centerApi";
import { useToast } from "../../context/ToastContext";
import LoadingFallback from "../../components/ui/LoadingFallback";
import FormInput from "../../components/form/FormInput";
import FormSection from "../../components/form/FormSection";
import Button from "../../components/ui/Button";

export default function CenterPaymentsPage() {
  const { show } = useToast();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    try {
      const data = await fetchCenterFees();
      setStats(data);
    } catch (err) {
      show("error", "Failed to load fee statistics");
    } finally {
      setLoading(false);
    }
  };

  const onPaymentSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await submitCenterPayment(formData);
      show("success", "Payment details submitted successfully");
      reset(); // Clear form
      loadFees(); // Refresh stats/table
    } catch (err) {
      show("error", err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingFallback variant="dashboard" />;

  return (
    <div className="p-4 sm:p-8 space-y-6 bg-bg min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-heading font-black text-primary tracking-tight">
          Fee & Payments
        </h1>
        <p className="text-muted text-xs sm:text-sm font-medium">
          Manage your institute balance and transactions
        </p>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Payable"
          value={stats?.total_payable_amount}
          icon={<HiOutlineCurrencyRupee />}
          color="text-primary"
        />
        <SummaryCard
          label="Verified Paid"
          value={stats?.total_verified_paid}
          icon={<HiCheckCircle />}
          color="text-success"
        />
        <SummaryCard
          label="Net Due"
          value={stats?.net_due_balance}
          icon={<HiExclamationCircle />}
          color="text-secondary"
        />
      </div>

      {/* Main Content: Form and Table in one row on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Payment Form (Left/Top) */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit(onPaymentSubmit)}>
            <FormSection
              title="Submit Transaction"
              icon={HiCreditCard}
              columns={1}
            >
              <FormInput
                label="Student Enrollment No"
                name="enrollment_no"
                register={register}
                required="Enrollment number is required"
                placeholder="e.g. SAU110057"
                error={errors.enrollment_no}
              />
              <FormInput
                label="Amount Paid (₹)"
                name="fees"
                type="number"
                register={register}
                required="Amount is required"
                placeholder="0.00"
                error={errors.fees}
              />
              <FormInput
                label="UTR / Transaction ID"
                name="transaction_id"
                register={register}
                required="Transaction ID is required"
                placeholder="Enter bank reference number"
                error={errors.transaction_id}
              />
              <Button
                type="submit"
                className="w-full h-11 sm:h-12 text-sm sm:text-base font-bold rounded-xl mt-2"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Submit Payment"}
              </Button>
            </FormSection>
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function SummaryCard({ label, value, icon, color }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 sm:p-5 flex items-center gap-4 hover:shadow-md transition-all">
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-bg flex items-center justify-center text-xl sm:text-2xl ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] sm:text-xs font-bold uppercase text-muted tracking-tight">
          {label}
        </p>
        <p className="text-lg sm:text-xl font-black text-text mt-0.5">
          ₹{Number(value || 0).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

function TableRow({ label, value, color }) {
  return (
    <tr className="hover:bg-bg/20 transition-colors">
      <td className="px-4 py-3.5 font-medium text-muted">{label}</td>
      <td className={`px-4 py-3.5 text-right font-bold ${color}`}>
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </td>
    </tr>
  );
}
