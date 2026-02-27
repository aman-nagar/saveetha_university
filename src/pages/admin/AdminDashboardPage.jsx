import React from "react";
import {
  HiUserGroup,
  HiOfficeBuilding,
  HiDocumentText,
  HiClipboardList,
  HiCheckCircle,
  HiXCircle,
  HiBookOpen,
  HiPhotograph,
  HiUser,
  HiIdentification,
} from "react-icons/hi";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: 7,
      icon: HiUserGroup,
      approved: 4,
      pending: 3,
      approvedPercent: 57,
      pendingPercent: 43,
      color: "from-primary to-primary/80",
    },
    {
      title: "Total Centers",
      value: 20,
      icon: HiOfficeBuilding,
      approved: 20,
      pending: 0,
      approvedPercent: 100,
      pendingPercent: 0,
      color: "from-secondary to-secondary/80",
    },
    {
      title: "Certificates Issued",
      value: 0,
      icon: HiDocumentText,
      subtitle: "CERTIFICATES ISSUED",
      color: "from-accent to-accent/80",
    },
    {
      title: "Results Issued",
      value: 5,
      icon: HiClipboardList,
      subtitle: "71% of Students",
      color: "from-primary to-secondary",
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-bg p-3 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-[#0b1f4b]">
              Dashboard Overview
            </h1>
            <p className="text-[#6b7280] text-sm mt-1">
              Complete Statistics and Analytics
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-[#0b1f4b]/10 text-[#0b1f4b] rounded-full text-xs sm:text-sm font-medium">
              Last updated: Today
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, i) => {
            const Icon = item.icon;
            const colorMap = {
              "from-primary to-primary/80": {
                bg: "#0b1f4b",
                icon: "#0b1f4b",
                header: "#0b1f4b",
              },
              "from-secondary to-secondary/80": {
                bg: "#b23a3a",
                icon: "#b23a3a",
                header: "#b23a3a",
              },
              "from-accent to-accent/80": {
                bg: "#c9a227",
                icon: "#c9a227",
                header: "#c9a227",
              },
              "from-primary to-secondary": {
                bg: "#0b1f4b",
                icon: "#0b1f4b",
                header: "#0b1f4b",
              },
            };
            const colors = colorMap[item.color] || {
              bg: "#0b1f4b",
              icon: "#0b1f4b",
              header: "#0b1f4b",
            };

            return (
              <div
                key={i}
                className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden group"
              >
                {/* Colored Header */}
                <div
                  className="h-1"
                  style={{ backgroundColor: colors.header }}
                ></div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[#6b7280] text-sm font-medium">
                        {item.title}
                      </p>
                      <h2 className="text-3xl font-bold text-[#0b1f4b] mt-1">
                        {item.value}
                      </h2>
                    </div>

                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${colors.bg}20` }}
                    >
                      <Icon
                        className="text-2xl"
                        style={{ color: colors.icon }}
                      />
                    </div>
                  </div>

                  {/* Approval Stats */}
                  {item.approved !== undefined && (
                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <HiCheckCircle className="text-green-600" />
                          <span className="text-[#6b7280]">Approved</span>
                        </div>
                        <span className="font-semibold text-[#0b1f4b]">
                          {item.approved} ({item.approvedPercent}%)
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <HiXCircle className="text-orange-600" />
                          <span className="text-[#6b7280]">Pending</span>
                        </div>
                        <span className="font-semibold text-[#0b1f4b]">
                          {item.pending} ({item.pendingPercent}%)
                        </span>
                      </div>

                      {item.title === "Total Students" && (
                        <div className="pt-2 text-xs text-[#c9a227] font-semibold flex items-center gap-1">
                          <HiBookOpen />
                          <span>Available Courses</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Certificate/Results Subtitle */}
                  {item.subtitle && (
                    <div className="mt-4 pt-3 border-t border-[#e5e7eb]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6b7280] uppercase tracking-wider font-medium">
                          {item.subtitle}
                        </span>
                        <span className="text-sm font-semibold text-[#0b1f4b]">
                          {item.value === 0 ? "0" : `${item.value} Total`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Status Distribution */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Main Status Card */}
          <div className="lg:col-span-2 bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#0b1f4b] mb-6">
              Student Status Distribution
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Approved Students */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-lg p-5 border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <HiCheckCircle className="text-green-600 text-2xl" />
                  <span className="text-3xl font-bold text-green-700">4</span>
                </div>
                <p className="text-green-900 font-semibold">
                  Approved Students
                </p>
                <p className="text-green-700 text-sm mt-1">
                  57% of total students
                </p>
                <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full w-[57%] bg-green-600 rounded-full"></div>
                </div>
              </div>

              {/* Pending Students */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-lg p-5 border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <HiXCircle className="text-orange-600 text-2xl" />
                  <span className="text-3xl font-bold text-orange-700">3</span>
                </div>
                <p className="text-orange-900 font-semibold">
                  Pending Students
                </p>
                <p className="text-orange-700 text-sm mt-1">
                  43% of total students
                </p>
                <div className="mt-3 h-2 bg-orange-200 rounded-full overflow-hidden">
                  <div className="h-full w-[43%] bg-orange-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Distribution Chart */}
            <div className="mt-6 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[#0b1f4b]">
                  Overall Distribution
                </span>
                <span className="text-xs text-[#6b7280]">
                  Total: 7 Students
                </span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden gap-1">
                <div
                  className="h-full bg-green-600"
                  style={{ width: "57%" }}
                ></div>
                <div
                  className="h-full bg-orange-600"
                  style={{ width: "43%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs font-medium">
                <span className="text-green-700">Approved: 4</span>
                <span className="text-orange-700">Pending: 3</span>
              </div>
            </div>
          </div>

          {/* Quick Actions / Footer Links */}
          <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-[#0b1f4b] mb-4">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors group text-left">
                <div className="w-10 h-10 rounded-lg bg-[#0b1f4b]/10 flex items-center justify-center group-hover:bg-[#0b1f4b]/20 transition-colors flex-shrink-0">
                  <HiPhotograph className="text-[#0b1f4b]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0b1f4b] text-sm">
                    Gallery Category
                  </p>
                  <p className="text-xs text-[#6b7280]">Manage categories</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors group text-left">
                <div className="w-10 h-10 rounded-lg bg-[#b23a3a]/10 flex items-center justify-center group-hover:bg-[#b23a3a]/20 transition-colors flex-shrink-0">
                  <HiPhotograph className="text-[#b23a3a]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0b1f4b] text-sm">
                    Image Gallery
                  </p>
                  <p className="text-xs text-[#6b7280]">Upload & manage</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors group text-left">
                <div className="w-10 h-10 rounded-lg bg-[#c9a227]/10 flex items-center justify-center group-hover:bg-[#c9a227]/20 transition-colors flex-shrink-0">
                  <HiUser className="text-[#c9a227]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0b1f4b] text-sm">
                    Students
                  </p>
                  <p className="text-xs text-[#6b7280]">Manage records</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors group text-left">
                <div className="w-10 h-10 rounded-lg bg-[#0b1f4b]/10 flex items-center justify-center group-hover:bg-[#0b1f4b]/20 transition-colors flex-shrink-0">
                  <HiIdentification className="text-[#0b1f4b]" />
                </div>
                <div>
                  <p className="font-semibold text-[#0b1f4b] text-sm">
                    ID Card
                  </p>
                  <p className="text-xs text-[#6b7280]">Generate IDs</p>
                </div>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 pt-4 border-t border-[#e5e7eb]">
              <h4 className="text-sm font-bold text-[#0b1f4b] mb-3">
                Recent Activity
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-[#6b7280]">New student registered</span>
                  <span className="text-[#6b7280] ml-auto flex-shrink-0">
                    2 min ago
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-[#c9a227] rounded-full flex-shrink-0"></span>
                  <span className="text-[#6b7280]">Certificate issued</span>
                  <span className="text-[#6b7280] ml-auto flex-shrink-0">
                    1 hour ago
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 bg-[#b23a3a] rounded-full flex-shrink-0"></span>
                  <span className="text-[#6b7280]">New center added</span>
                  <span className="text-[#6b7280] ml-auto flex-shrink-0">
                    3 hours ago
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
