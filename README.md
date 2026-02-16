<!-- folder structure -->

src/
│
├── components/
│ ├── public/
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ │
│ └── admin/
│ ├── AdminSidebar.jsx
│ └── AdminHeader.jsx
│
├── layouts/
│ ├── PublicLayout.jsx
│ └── AdminLayout.jsx
│
├── pages/
│ ├── public/
│ │ ├── Home.jsx
│ │ ├── About.jsx
│ │ ├── Contact.jsx
│ │ └── Centers.jsx
│ │
│ ├── student/
│ │ ├── StudentLogin.jsx
│ │ └── StudentDashboard.jsx
│ │
│ └── admin/
│ ├── AdminLogin.jsx
│ ├── AdminDashboard.jsx
│ ├── Centers.jsx
│ ├── Students.jsx
│ └── Pages.jsx
│
├── context/
│ └── AuthContext.jsx
│
├── services/
│ └── api.js
│
├── App.jsx
└── main.jsx

5-day delivery plan (realistic)

Day 1:

Project setup

Routing

Layouts

Navbar + Footer

Day 2:

Home

About

Contact

Centers page (API)

Day 3:

Student login

Student dashboard

Day 4:

Admin login

Admin dashboard

Centers CRUD

Day 5:

Students + Pages CRUD

Responsive fixes

Bug fixing


/* src/index.css */
@import "tailwindcss";
@import "flowbite";

@theme {
  /* PRIMARY BRAND COLORS - Academic & Professional */
  --color-primary: #003d82; /* Deep Academic Navy - Main brand color */
  --color-primary-light: #1555b0; /* Lighter navy for hover states */
  --color-primary-dark: #001a3d; /* Darker for text on light backgrounds */
  
  /* SECONDARY BRAND - Supporting accent */
  --color-secondary: #d4a574; /* Warm university gold - Trust & prestige */
  --color-secondary-light: #e8c4a0; /* Light gold for backgrounds */
  --color-secondary-dark: #b8860b; /* Dark gold for text */
  
  /* TERTIARY - Complementary accent */
  --color-tertiary: #2d7a8a; /* Teal-blue for secondary actions */
  --color-tertiary-light: #5a99a8; /* Light teal for hover */
  --color-tertiary-dark: #1a4a52; /* Dark teal */
  
  /* STATUS COLORS */
  --color-success: #10b981; /* Emerald green - Success, approval, passing */
  --color-success-light: #d1fae5; /* Light success background */
  --color-success-dark: #047857; /* Dark success text */
  
  --color-error: #ef4444; /* Red - Error, rejection, failing */
  --color-error-light: #fee2e2; /* Light error background */
  --color-error-dark: #991b1b; /* Dark error text */
  
  --color-warning: #f59e0b; /* Amber - Warning, pending, inactive */
  --color-warning-light: #fef3c7; /* Light warning background */
  --color-warning-dark: #92400e; /* Dark warning text */
  
  --color-info: #3b82f6; /* Blue - Information, updates */
  --color-info-light: #dbeafe; /* Light info background */
  --color-info-dark: #1e40af; /* Dark info text */
  
  /* ROLE-SPECIFIC ACCENT COLORS */
  --color-admin: #8b5cf6; /* Purple - Admin/Authority */
  --color-admin-light: #ede9fe; /* Light admin background */
  
  --color-faculty: #ec4899; /* Pink - Faculty/Instructors */
  --color-faculty-light: #fce7f3; /* Light faculty background */
  
  --color-student: #06b6d4; /* Cyan - Students/Learners */
  --color-student-light: #cffafe; /* Light student background */
  
  /* NEUTRAL COLORS - UI Foundation */
  --color-bg: #f8fafc; /* Soft white - Main page background */
  --color-bg-secondary: #f1f5f9; /* Slightly darker background */
  --color-bg-tertiary: #e2e8f0; /* Even darker for nested areas */
  
  --color-surface: #ffffff; /* Pure white - Cards, panels, modals */
  --color-surface-hover: #f8fafc; /* Hover state for cards */
  --color-surface-secondary: #f9fafb; /* Secondary surface */
  
  --color-text: #0f172a; /* Almost black - Primary text */
  --color-text-secondary: #475569; /* Muted gray - Secondary text */
  --color-text-muted: #64748b; /* Light gray - Tertiary text, labels */
  --color-text-disabled: #94a3b8; /* Very light gray - Disabled text */
  
  --color-border: #cbd5e1; /* Medium gray - Default borders */
  --color-border-light: #e2e8f0; /* Light borders for subtle dividers */
  --color-border-focus: #003d82; /* Navy - Focus borders */
  
  /* INTERACTIVE STATES */
  --color-hover: #f1f5f9; /* Hover background */
  --color-active: #e2e8f0; /* Active/pressed background */
  --color-focus: #003d82; /* Focus ring color */
  --color-disabled-bg: #f1f5f9; /* Disabled background */
  
  /* OVERLAY & TRANSPARENCY */
  --color-overlay: rgba(15, 23, 42, 0.5); /* Dark overlay for modals */
  --color-overlay-light: rgba(15, 23, 42, 0.25); /* Light overlay */
  --color-overlay-brand: rgba(0, 61, 130, 0.1); /* Brand color overlay */
  
  /* GRADIENTS (optional - can be used for hero sections) */
  --color-gradient-primary: linear-gradient(135deg, #003d82 0%, #1555b0 100%);
  --color-gradient-warm: linear-gradient(135deg, #d4a574 0%, #b8860b 100%);
  --color-gradient-accent: linear-gradient(135deg, #2d7a8a 0%, #1a4a52 100%);
  
  /* FONTS */
  --font-sans: "Inter", "Segoe UI", sans-serif;
  --font-heading: "Poppins", "Segoe UI", sans-serif;
  --font-mono: "Fira Code", monospace;
  
  /* SEMANTIC TOKENS FOR COMPONENTS */
  --color-link: #003d82; /* Links */
  --color-link-hover: #1555b0; /* Link hover */
  --color-badge-default: #e2e8f0; /* Default badge */
  --color-badge-primary: #dbeafe; /* Primary badge */
}