I am building a College Management System (CMS) using:

Frontend:

React (Vite)

React Router

TailwindCSS

React Hook Form

Context API for auth

js-cookie for token storage

Backend:

PHP REST APIs

MySQL database

Token-based authentication (Bearer token)

Role-based system (admin, center, sub-center, student)

Base API URL:
https://api.nsprowebtech.com/backend/api/v1

🏗 PROJECT STRUCTURE

The system has four main roles:

Admin (full access)

Center (limited access)

Sub-center (more restricted)

Student (portal access)

We separated authentication domains:

Student login:
POST /students/login.php

Admin / Center / Sub-center login:
POST /admin_login.php

Backend returns token + role.

Token is stored in:

Cookie (authToken)

User object in localStorage

All API requests go through a global client wrapper that:

Auto-injects Authorization: Bearer <token>

Handles 401 globally

Redirects to login if session expired

📚 CURRENT FEATURES IMPLEMENTED
Authentication

Admin login

Student login

Role-based route protection

ProtectedRoute component

Unauthorized redirect

Token auto-injection

Global 401 handling

Student Management

Multi-step admission form

File uploads (FormData)

Student list with pagination

Search

Status toggle (Pending/Active)

Soft delete (Recycle Bin)

Permanent delete

Restore from recycle bin

Edit student via modal

View student details modal

Recycle bin uses separate endpoint:
GET /students/students-recycle.php

Soft delete:
DELETE /students/delete.php

Restore:
POST /students/restore_delete.php

Courses Module

Course Categories

Faculties

Courses

Streams

Dependent dropdown loading

Centers Module (In Progress)

Admin can:

Create centers

Manage centers

Assign role

Centers can:

Create sub-centers

Role-based restriction planned.

🔐 SECURITY ARCHITECTURE

Frontend:

Separate login screens (student vs admin)

Role-based route protection

Token stored in cookie (SameSite Strict)

Global 401 redirect

Backend:

Issues token + expires_at

Must validate token for each protected route

Must validate role per endpoint

Current concern:
Ensuring backend actually enforces:

Token validation

Role-based permission checks

📁 FOLDER STRUCTURE (Frontend)

src/

api/

client.js

auth/

context/

AuthContext.jsx

ProtectedRoute.jsx

pages/

Login.jsx (student)

admin/AdminLogin.jsx

layouts/

AdminLayout

CenterLayout

components/

students

courses

centers

🎯 FUTURE ROADMAP

Full center/sub-center role system

Permission-based access (not just role)

Dashboard analytics

Token refresh mechanism

Idle timeout auto logout

Activity logs

Audit trail for edits/deletes

Center-based data isolation

Scalable student pagination for large datasets

Possibly migration to JWT if backend supports

⚠️ DESIGN DECISIONS

Separate login systems for scalability and database load separation

Recycle bin uses backend logic (double delete for permanent)

No mixed role login screen

Frontend route protection is NOT considered security — backend must enforce.

📌 WHAT I WANT FROM YOU

When helping me:

Think in terms of scalability

Suggest architecture improvements

Avoid quick hacks

Consider security implications

Assume this project may go production

Treat this as a real SaaS system, not a tutorial project.
