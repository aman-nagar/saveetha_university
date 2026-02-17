import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaCalendarAlt,
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";

export const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: FaHome,
    children: [{ label: "Overview", path: "/admin" }],
  },
  {
    id: 2,
    label: "Students",
    icon: FaUserGraduate,
    children: [
      { label: "All Students", path: "/admin/students" },
      { label: "Add New", path: "/admin/students/add" },
      { label: "Admissions", path: "/admin/admissions" },
      { label: "Attendance", path: "/admin/attendance" },
    ],
  },
  {
    id: 3,
    label: "Academics",
    icon: FaBook,
    children: [
      { label: "Courses", path: "/admin/courses" },
      { label: "Programs", path: "/admin/programs" },
      { label: "Faculty", path: "/admin/faculty" },
      { label: "Timetable", path: "/admin/timetable" },
    ],
  },
  {
    id: 4,
    label: "Examinations",
    icon: FaClipboardList,
    children: [
      { label: "Results", path: "/admin/results" },
      { label: "Schedule", path: "/admin/exam-schedule" },
      { label: "Hall Tickets", path: "/admin/hall-tickets" },
    ],
  },
  {
    id: 5,
    label: "Events",
    icon: FaCalendarAlt,
    children: [
      { label: "Calendar", path: "/admin/calendar" },
      { label: "Add Event", path: "/admin/events/add" },
    ],
  },
  {
    id: 6,
    label: "Communications",
    icon: FaEnvelope,
    children: [
      { label: "Notifications", path: "/admin/notifications" },
      { label: "Announcements", path: "/admin/announcements" },
    ],
  },
  {
    id: 7,
    label: "Reports",
    icon: FaChartBar,
    children: [
      { label: "Analytics", path: "/admin/analytics" },
      { label: "Generate Reports", path: "/admin/reports" },
    ],
  },
  {
    id: 8,
    label: "Settings",
    icon: FaCog,
    children: [
      { label: "General", path: "/admin/settings" },
      { label: "Users", path: "/admin/users" },
      { label: "Permissions", path: "/admin/permissions" },
    ],
  },
];
