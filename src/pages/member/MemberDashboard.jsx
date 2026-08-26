import { FaEnvelope, FaIdBadge, FaPhoneAlt, FaUserTie } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const dashboardCards = [
  {
    key: "name",
    label: "Member Name",
    icon: <FaUserTie className="w-4 h-4" />,
    field: "name",
  },
  {
    key: "email",
    label: "Email Address",
    icon: <FaEnvelope className="w-4 h-4" />,
    field: "email",
  },
  {
    key: "number",
    label: "Phone Number",
    icon: <FaPhoneAlt className="w-4 h-4" />,
    field: "number",
  },
  {
    key: "memberId",
    label: "Member ID",
    icon: <FaIdBadge className="w-4 h-4" />,
    field: "id",
  },
];

export default function MemberDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-surface rounded-2xl shadow-xl p-8 max-w-md text-center border border-border">
          <p className="text-text text-lg font-medium">
            No member data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-2xl shadow-2xl overflow-hidden border border-accent/20">
        <div className="p-6 md:p-8 flex flex-col gap-4">
          <p className="text-white/70 text-[10px] font-semibold uppercase tracking-[0.2em]">
            Member Dashboard
          </p>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {user.name || "Member"}
            </h1>
            <p className="text-white/80 text-sm">
              Signed in as {user.email || "member user"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
              Role: Member
            </span>
            <span className="bg-white/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20">
              Portal Access Active
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dashboardCards.map((card) => (
          <div
            key={card.key}
            className="bg-surface rounded-2xl border border-border shadow-sm p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {card.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {card.label}
              </span>
            </div>
            <p className="mt-4 text-base font-semibold text-text break-words">
              {user[card.field] || "Not available"}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
          <h2 className="text-lg font-semibold text-text mb-4">
            Account Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
              <span className="text-muted">Name</span>
              <span className="font-medium text-text">{user.name || "-"}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
              <span className="text-muted">Email</span>
              <span className="font-medium text-text break-all">
                {user.email || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
              <span className="text-muted">Phone</span>
              <span className="font-medium text-text">
                {user.number || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted">Role</span>
              <span className="font-medium text-text">Member</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl border border-accent/20 p-6">
          <h2 className="text-lg font-semibold text-text mb-3">
            Portal Access
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            Your member login is now connected to the university portal. This
            dashboard is protected by the same role-based auth flow used for
            admin, center, and student accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
