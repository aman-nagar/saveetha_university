// src/components/admin/sidebar/menuItems.js
import {
  FaHome,
  FaUserGraduate,
  FaBook,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import { TbReport } from "react-icons/tb";
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
      { label: "All Students", path: "/admin/students", roles: ["admin"] },
      {
        label: "Inactive Students",
        path: "/admin/students/inactive",
        roles: ["admin"],
      },
      {
        label: "Center Wise Students",
        path: "/admin/center-wise-students",
        roles: ["admin"],
      },
      { label: "My Students", path: "/center/students", roles: ["center"] },
      {
        label: "My Students",
        path: "/sub-center/students",
        roles: ["sub-center"],
      },
      { label: "Add New", path: "/admin/students/add", roles: ["admin"] },
      { label: "Add New", path: "/center/students/add", roles: ["center"] },
    ],
  },
  {
    id: 3,
    label: "Courses",
    icon: FaBook,
    roles: ["admin"],
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
    roles: ["admin", "center"],
    children: [
      { label: "Centers List", path: "/admin/centers", roles: ["admin"] },
      { label: "Add Center", path: "/admin/centers/add", roles: ["admin"] },
      {
        label: "Add Center",
        path: "/center/center/add",
        roles: ["center"],
        condition: (user) => user?.is_form_enabled === true,
      },
    ],
  },
  {
    id: 5,
    label: "Admit Cards",
    icon: TbReport,
    roles: ["admin"],
    children: [
      { label: "Generate Admit Card", path: "/admin/admit-card/generate" },
    ],
  },
  {
    id: 6,
    label: "Result",
    icon: TbReport,
    roles: ["admin"],
    children: [{ label: "Create Result", path: "/admin/results/create" }],
  },
  {
    id: 7,
    label: "Settings",
    icon: FaCog,
    roles: ["admin"],
    children: [{ label: "Site Setting", path: "/admin/site-settings" }],
  },
  // students menus only

  {
    id: 8,
    label: "My Academy",
    icon: FaUserGraduate,
    roles: ["student"],
    children: [{ label: "Dashboard", path: "/student-dashboard" }],
  },
  {
    id: 9,
    label: "Downloads",
    icon: TbReport,
    roles: ["student"],
    children: [
      { label: "ID Card", path: "/student-dashboard/id-card" },
      { label: "Admit Card", path: "/student-dashboard/admit-card" },
      { label: "Results", path: "/student-dashboard/results" },
    ],
  },
];
