// src/components/admin/courses/downloadSampleExcel
import * as XLSX from "xlsx";
import { FaFileDownload } from "react-icons/fa";

export const downloadSampleExcel = () => {
  // 1. Define the exact headers and a sample row of data
  const templateData = [
    {
      Category: "Undergraduate (Semester-wise)",
      Faculty: "Computer Science",
      Course: "BCA",
      Duration: 3,
      DurationType: "Semester",
      Stream: "BCA (General)",
      SubjectName: "Data Structures",
      SubjectCode: "BCA-201",
      MaxTheory: 70,
      MaxPractical: 30,
      DurationPart: 3 // e.g., this subject belongs to the 3rd Semester
    },
    {
      Category: "Diploma (Annual)",
      Faculty: "Management",
      Course: "PGDCA",
      Duration: 1,
      DurationType: "Year",
      Stream: "Computer Applications",
      SubjectName: "Office Automation",
      SubjectCode: "PG-101",
      MaxTheory: 100,
      MaxPractical: 0,
      DurationPart: 1 // e.g., 1st Year
    }
  ];

  // 2. Create a new worksheet from the JSON data
  const worksheet = XLSX.utils.json_to_sheet(templateData);

  // 3. Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "AcademicTemplate");

  // 4. Trigger the download
  XLSX.writeFile(workbook, "Master_Academic_Template.xlsx");
};