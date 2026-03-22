export function downloadStudentPdf(student) {
  const bgUrl = "https://api.nsprowebtech.com/backend/format/admissionForm.png";

  const html = `
  <html>
    <head>
      <title>Admission Form - ${student.candidate_name}</title>
      <style>
        @page { size: A4; margin: 0; }
        body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; -webkit-print-color-adjust: exact; }
        
        .page {
          width: 210mm;
          height: 297mm;
          position: relative;
          background-image: url('${bgUrl}');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        /* --- SHARED STYLES --- */
        .section { position: absolute; width: 100%; color: #1a4ab9; text-transform: uppercase; font-size: 13px; }
        .row { display: flex; margin-bottom: 6px; align-items: center; }
        .label { font-weight: bold; color: #6370ff; min-width: 160px; font-size: 12px; }
        .val { flex: 1; }
        .col-2 { display: flex; width: 100%; gap: 40px; }
        .half { flex: 1; display: flex; }

        /* --- 1. HEADER SECTION (Session, Course, Stream) --- */
        #section-header { top: 200px; left: 85px; width: 300px; }
        #section-header .label { min-width: 80px; }

        /* --- 2. GENERAL INFORMATION SECTION --- */
        #section-general { top: 328px; left: 85px; width: 630px; }

        /* --- 3. QUALIFICATION SECTION --- */
        #section-qual { top: 640px; left: 40px; width: 754px; }
        .qual-row { display: flex; margin-bottom: 8px; font-size: 12px; }
        .qual-cell { flex: 1; text-align: center; }
        .qual-cell.exam { text-align: left; flex: 1.5; padding-left: 10px; }
        /* Added Header Styling */
        .qual-header { font-weight: bold; color: #ac0a0a; margin-bottom: 12px; font-size: 14px; text-transform: capitalize; }

        /* --- PHOTO --- */
        .student-photo { position: absolute; top: 150px; right: 40px; width: 120px; height: 126px; border: 1px solid #000; background: #fff; }

        /* --- FOOTER --- */
        #section-footer { position: absolute; bottom: 80px; left: 100px; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="page">
        
        <div id="section-header" class="section">
          <div class="row"><span class="label">SESSION:</span> <span class="val">${student.session || ""}</span></div>
          <div class="row"><span class="label">COURSE:</span>  <span class="val">${student.course_name || student.course || ""}</span></div>
          <div class="row"><span class="label">STREAM:</span>  <span class="val">${student.stream_name || student.stream || ""}</span></div>
        </div>

        <img src="${student.photo_url}" class="student-photo" />

        <div id="section-general" class="section">
          <div class="row" style="font-weight:bold; margin-bottom:12px;">
            <span class="label">Enrollment No:</span> <span class="val">${student.enrollment_no}</span>
          </div>
          
          <div class="row"><span class="label">Name of Candidate:</span> <span class="val">${student.candidate_name}</span></div>
          
          <div class="col-2">
             <div class="half"><span class="label">Father's Name:</span> <span class="val">${student.father_name}</span></div>
             <div class="half"><span class="label">Mother's Name:</span> <span class="val">${student.mother_name}</span></div>
          </div>

          <div class="col-2">
             <div class="half"><span class="label">Date Of Birth:</span> <span class="val">${student.dob}</span></div>
             <div class="half"><span class="label">Nationality:</span> <span class="val">${student.nationality || "INDIAN"}</span></div>
          </div>

          <div class="col-2">
             <div class="half"><span class="label">Category:</span> <span class="val">${student.category}</span></div>
             <div class="half"><span class="label">Gender:</span> <span class="val">${student.gender}</span></div>
          </div>

          <div class="col-2">
             <div class="half"><span class="label">Admission Type:</span> <span class="val">${student.mode_of_study}</span></div>
             <div class="half"><span class="label">Email Address:</span> <span class="val" style="text-transform:lowercase; font-size:11px;">${student.email}</span></div>
          </div>

          <div class="row"><span class="label">Contact Number:</span> <span class="val">${student.contact_number}</span></div>
          <div class="row"><span class="label">Candidate Address:</span> <span class="val">${student.address}</span></div>

          <div class="col-2">
             <div class="half"><span class="label">City:</span> <span class="val">${student.city}</span></div>
             <div class="half"><span class="label">Pin Code:</span> <span class="val">${student.pincode}</span></div>
          </div>

          <div class="col-2">
             <div class="half"><span class="label">State:</span> <span class="val">${student.state}</span></div>
             <div class="half"><span class="label">Country:</span> <span class="val">${student.country}</span></div>
          </div>
        </div>

        <div id="section-qual" class="section">
          <div class="qual-row qual-header">
            <div class="qual-cell exam">Examination</div>
            <div class="qual-cell">Year</div>
            <div class="qual-cell" style="flex:2;">Board/University</div>
            <div class="qual-cell">Marks(%)</div>
          </div>
          
          ${(student.qualifications || [])
            .map(
              (q) => `
            <div class="qual-row">
              <div class="qual-cell exam">${q.examination.replace("_", " ")}</div>
              <div class="qual-cell">${q.year_of_passing}</div>
              <div class="qual-cell" style="flex:2;">${q.board_university}</div>
              <div class="qual-cell">${q.percentage_cgpa}%</div>
            </div>
          `,
            )
            .join("")}
        </div>

        <div id="section-footer">
          <span>Place: ${student.city}</span>
        </div>

      </div>
    </body>
  </html>`;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();

  // setTimeout(() => {
  //   win.print();
  // }, 1000);
}
