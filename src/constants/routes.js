/**
 * Application Routes Constants
 * Centralized route definitions to avoid hardcoding strings throughout the app
 */

// Auth Routes
export const AUTH_ROUTES = {
  PORTAL: "/portal",
  STUDENT_LOGIN: "/login",
  ADMIN_LOGIN: "/admin/login",
  CENTER_LOGIN: "/center/login",
};

// Public Routes
export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  NEWS: "/news",
  ACADEMICS: "/academics",
  GALLERY: "/gallery",
};

// Admin Routes
export const ADMIN_ROUTES = {
  DASHBOARD: "/admin",
  STUDENTS: "/admin/students",
  STUDENTS_ADD: "/admin/students/add",
  STUDENTS_EDIT: (id) => `/admin/students/edit/${id}`,
  CENTERS: "/admin/centers",
  CENTERS_ADD: "/admin/centers/add",
  ADMIT_CARD_GENERATE: "/admin/admit-card/generate",
  RESULTS_CREATE: "/admin/results/create",
  COURSE_CATEGORY: "/admin/course-category",
  FACULTY: "/admin/faculty",
  COURSE: "/admin/course",
  STREAM: "/admin/stream",
  SUBJECT: "/admin/subject",
  SITE_SETTINGS: "/admin/site-settings",
};

// Center Routes
export const CENTER_ROUTES = {
  DASHBOARD: "/center",
  STUDENTS: "/center/students",
  STUDENTS_ADD: "/center/students/add",
  CENTER_ADD: "/center/center/add",
};

// Student Routes
export const STUDENT_ROUTES = {
  DASHBOARD: "/student-dashboard",
  ID_CARD: "/student-dashboard/id-card",
  ADMIT_CARD: "/student-dashboard/admit-card",
  RESULTS: "/student-dashboard/results",
};

// Error Routes
export const ERROR_ROUTES = {
  UNAUTHORIZED: "/unauthorized",
};

// All Routes Combined
export const ROUTES = {
  AUTH: AUTH_ROUTES,
  PUBLIC: PUBLIC_ROUTES,
  ADMIN: ADMIN_ROUTES,
  CENTER: CENTER_ROUTES,
  STUDENT: STUDENT_ROUTES,
  ERROR: ERROR_ROUTES,
};
