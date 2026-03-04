Subject: Fixing Data Dependency in Shared Academic Hooks (React)

The Context:
I have a shared hook, useAcademicFlow, used by two different administrative pages: GenerateAdmitCard and CreateResult. Both pages use the student's Enrollment Number to fetch basic profile data (Name, Course, Stream) from a Student table.

The Problem:
The code logic is breaking in the CreateResult flow because of a "Missing Data Source" issue:

GenerateAdmitCard: This is where the Roll Number is first created. It is stored in an AdmitCards table, linked by student_id and duration (Semester/Year).

CreateResult: This page requires the Roll Number to be read-only and pre-filled. However, the current useAcademicFlow only fetches from the Students table, which does not contain the Roll Number.

The Conflict: If I pick a student in CreateResult, the Roll Number field stays empty because it exists in the AdmitCards API, not the Students API.

The Breaking Point:
In CreateResult, when a user selects a Duration (e.g., Semester 2), the app needs to "Look Up" the existing Admit Card for that specific student_id + duration combination to find the correct Roll Number.

The Required Solution:
Modify useAcademicFlow to include an optional, conditional fetcher called fetchRollNoForResult.

Trigger: In CreateResult, after a student is selected AND a Duration is picked.

Logic: Query the fetchAdmitCards API, filter by studentId and selectedDuration, and if a match is found, use setValue to inject that roll_number into the form.

Constraint: This must NOT affect the GenerateAdmitCard page, where the Roll Number must remain a manual input.

🛠️ The Technical Implementation Flow

1. Update the Hook (useAcademicFlow.js)
   Add a specific function to bridge the gap between the Student data and the Admit Card data.

2. Update the Page (CreateResult.jsx)
   Use a useEffect to trigger the search only when the Semester/Year is selected.
