// src/components/admin/sidebar/menuItems.js
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";

export const menuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: FaHome,
    roles: ["admin", "center", "sub-center"],
    children: [
      { label: "Overview", path: "/admin", roles: ["admin"] },
      { label: "Overview", path: "/center", roles: ["center"] },
      { label: "Overview", path: "/sub-center", roles: ["sub-center"] },
    ],
  },
  {
    id: 2,
    label: "Students",
    icon: FaUserGraduate,
    roles: ["admin", "center", "sub-center"],
    children: [
      // Admin sees "All Students", Centers see "My Students" pointing to same path
      { label: "All Students", path: "/admin/students", roles: ["admin"] },
      {
        label: "My Students",
        path: "/admin/students",
        roles: ["center", "sub-center"],
      },
      // Both Admin and Center can create students
      {
        label: "Add New",
        path: "/admin/students/add",
        roles: ["admin", "center"],
      },
      {
        label: "Generate AdmitCard",
        path: "/admin/admit-card/generate",
        roles: ["admin"],
      },
    ],
  },
  {
    id: 3,
    label: "Courses",
    icon: FaBook,
    roles: ["admin"], // Restricted to Admin
    children: [
      { label: "Course Category", path: "/admin/course-category" },
      { label: "Faculty", path: "/admin/faculty" },
      { label: "Course", path: "/admin/course" },
      { label: "Stream", path: "/admin/stream" },
      { label: "Subjects", path: "/admin/subject" },
    ],
  },
  {
    id: 4,
    label: "Management", // Generic label that feels right for both roles
    icon: FaClipboardList,
    roles: ["admin", "center"],
    children: [
      // Labels change based on role, but use the same functional paths
      { label: "Add Center", path: "/admin/centers/add", roles: ["admin"] },
      { label: "Centers List", path: "/admin/centers", roles: ["admin"] },
      {
        label: "Add Sub-center",
        path: "/admin/centers/add",
        roles: ["center"],
      },
      { label: "Sub-center List", path: "/admin/centers", roles: ["center"] },
    ],
  },
  {
    id: 8,
    label: "Settings",
    icon: FaCog,
    roles: ["admin"],
    children: [{ label: "Site Setting", path: "/admin/site-settings" }],
  },
];
