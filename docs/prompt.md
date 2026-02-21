**Project Title:** University Management System (Admin + Public Portal)

**Project Type:** Full-stack web application (Admin dashboard + public website)

## 1. Tech Stack

### Frontend

- React (Vite)
- React Router (routing)
- Tailwind CSS (utility styling)
- Flowbite (UI components)
- React Hook Form (form handling)
- Framer Motion (animations)
- React Icons

### Backend (existing API)

- REST API (external backend provided)
- Base URL:
  `https://api.nsprowebtech.com/backend/api/v1`

---

## 2. Main App Structure

The app has **two separate UI systems**:

### 1. Public Website

Accessible to everyone:

- Home
- About
- Contact
- News
- Login

Uses:

```
PublicLayout
```

### 2. Admin Panel

Accessible after login:

- Dashboard
- Students
- Academics
- Examinations
- Events
- Communications
- Reports
- Settings

Uses:

```
AdminLayout
```

Each layout has:

- Separate header
- Separate sidebar
- Separate theme logic

---

## 3. Routing Structure

Example routes:

### Public Routes

```
/
 /about
 /contact
 /news
 /login
```

### Admin Routes

```
/admin
/admin/students
/admin/students/add
/admin/settings/site-settings
```

---

## 4. Folder Structure

```
src/
│
├── api/
│   └── settingsApi.js
│
├── assets/
│   └── images/
│
├── components/
│   ├── admin/
│   │   ├── AdminHeader.jsx
│   │   ├── sidebar/
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── SidebarHeader.jsx
│   │   │   ├── SidebarMenuItem.jsx
│   │   │   ├── SidebarSearch.jsx
│   │   │   └── SidebarFooter.jsx
│   │   │
│   │   └── settings/
│   │       ├── SettingsForm.jsx
│   │
│   └── form/
│       ├── FormInput.jsx
│       ├── FormSelect.jsx
│       ├── FormFileInput.jsx
│       └── FormSection.jsx
│
├── layouts/
│   ├── PublicLayout.jsx
│   └── AdminLayout.jsx
│
├── pages/
│   ├── public/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── News.jsx
│   │
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   │
│   │   ├── students/
│   │   │   └── AddStudent.jsx
│   │   │
│   │   └── settings/
│   │       └── SiteSettingsPanel.jsx
│
├── utils/
│   └── adminSettings.js
│
├── App.jsx
└── index.css
```

---

## 5. Theme System

The app uses **CSS variables** for theming.

### Light Mode

- Background: light gray
- Surface: white
- Text: dark gray
- Primary: academic navy
- Accent: university gold

### Dark Mode

- Background: deep blue-black
- Surface: dark slate
- Text: light gray
- Primary: brighter navy
- Accent: brighter gold

Dark mode is:

- Admin-only
- Stored in `localStorage`
- Applied via `.dark` class in `AdminLayout`

---

## 6. Admin Panel Features

### Sidebar

- Collapsible
- Pinned/unpinned state
- Hover auto-expand
- Search filter
- State stored in localStorage

### Header

- Breadcrumb navigation
- Dynamic page title
- Admin user display
- Dark mode toggle

---

## 7. Forms System

All forms use:

- React Hook Form
- Reusable components

### Reusable Form Components

```
FormInput
FormSelect
FormFileInput
FormSection
```

---

## 8. Student Admission Flow

The “Add Student” page is a **4-step form wizard**:

### Step 1: Personal Details

- Candidate name
- Father’s name
- Mother’s name
- DOB
- Gender
- Category
- ID proof
- Photo upload

### Step 2: Communication Details

- Address
- Phone
- Email
- City, State, etc.

### Step 3: Previous Qualification

Table-based input:

- Secondary
- Sr. Secondary
- Graduation
- Post Graduation
- Other

Each row:

- Year
- Board
- Percentage
- Document upload

### Step 4: Programme Details

- Course type
- Faculty
- Stream
- Session
- Year
- Hostel option
- Application fee

---

## 9. Site Settings Page

Admin can submit:

- College name
- Short name
- Email
- Phone
- Address
- Logo
- Additional logo
- Favicon

Uses:

```
POST /settings/
```

Form sends:

```
multipart/form-data
```

---

## 10. Public Homepage Features

Sections:

- Hero/banner
- Highlight news (auto vertical scrolling)
- Campus news
- Announcements
- University news
- Footer

News cards:

- Scroll automatically
- “View All” opens `/news` page

---

## 11. Design Principles Used

- Admin and Public UI are completely separate
- Reusable form components for scalability
- Theme via CSS variables
- Sidebar state persisted in localStorage
- Minimal, working, fast-delivery architecture
  Hierarchy:
  Course Type → Faculty → Course → Stream

---

## 12. Current Project Status

Completed:

- Public layout and pages
- Admin layout and sidebar
- Dark mode (admin only)
- Site settings form
- Student admission multi-step form
- News section with scrolling
- Reusable form system

Pending:

- Full backend integration
- Validation rules
- Role-based login redirect
- Data tables for students/centers
