// src/components/admin/sidebar/menuItems.js
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
    label: "Courses",
    icon: FaBook,
    children: [
      { label: "Course Category", path: "/admin/course-category" },
      { label: "Faculty", path: "/admin/faculty" },
      { label: "Course", path: "/admin/course" },
      { label: "stream", path: "/admin/stream" },
    ],
  },
  {
    id: 4,
    label: "Centers",
    icon: FaClipboardList,
    children: [
      { label: "Add Center", path: "/admin/centers/add" },
      { label: "Centers List", path: "/admin/centers" },
      { label: "Hall Tickets", path: "/admin/hall-tickets" },
    ],
  },
  {
    id: 8,
    label: "Settings",
    icon: FaCog,
    children: [
      { label: "Site Setting", path: "/admin/site-settings" },
      { label: "Users", path: "/admin/users" },
      { label: "Permissions", path: "/admin/permissions" },
    ],
  },
];
