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
      { label: "Admin Overview", path: "/admin", roles: ["admin"] },
      { label: "Center Overview", path: "/center", roles: ["center"] },
      {
        label: "Sub-Center Overview",
        path: "/sub-center",
        roles: ["sub-center"],
      },
    ],
  },
  {
    id: 2,
    label: "Students",
    icon: FaUserGraduate,
    roles: ["admin", "center", "sub-center"],
    children: [
      { label: "All Students", path: "/admin/students", roles: ["admin"] },
      {
        label: "My Students",
        path: "/center/students",
        roles: ["center", "sub-center"],
      },
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
    roles: ["admin"], // Restricted to Admin only
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
    label: "Centers",
    icon: FaClipboardList,
    roles: ["admin"], // Restricted to Admin only
    children: [
      { label: "Add Center", path: "/admin/centers/add" },
      { label: "Centers List", path: "/admin/centers" },
    ],
  },
  {
    id: 8,
    label: "Settings",
    icon: FaCog,
    roles: ["admin"], // Restricted to Admin only
    children: [{ label: "Site Setting", path: "/admin/site-settings" }],
  },
];
