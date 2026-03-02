export function downloadStudentPdf(student) {
  const rows = [
    ["Enrollment No", student.enrollment_no],
    ["Name", student.candidate_name],
    ["Father", student.father_name],
    ["Mother", student.mother_name],
    ["DOB", student.dob],
    ["Gender", student.gender],
    ["Category", student.category],
    ["Contact", student.contact_number],
    ["Email", student.email],
    ["Address", student.address],
    ["Course", student.course],
    ["Faculty", student.faculty],
    ["Course Type", student.course_type],
    ["Stream", student.stream],
    ["Year", student.year],
    ["Session", student.session],
    ["Mode", student.mode_of_study],
    ["Status", student.status === 1 ? "Active" : "Inactive"],
  ];

  const html = `
  <html>
    <head>
      <title>Student - ${student.candidate_name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
        h1 { font-size: 20px; margin-bottom: 4px; }
        p.enroll { color: #555; font-size: 13px; margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
        th { background: #f4f4f4; font-weight: 600; width: 35%; }
      </style>
    </head>
    <body>
      <h1>${student.candidate_name}</h1>
      <p class="enroll">Enrollment: ${student.enrollment_no}</p>
      <table>
        ${rows
          .filter(([, v]) => v)
          .map(([l, v]) => `<tr><th>${l}</th><td>${v}</td></tr>`)
          .join("")}
      </table>
    </body>
  </html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 500);
}