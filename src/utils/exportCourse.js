// src/utils/exportCourse.js
import * as XLSX from "xlsx";

export const handleExport = (data) => {
  if (!data || data.length === 0) return;

  // 1. Prepare the data (Mapping internal keys to user-friendly headers)
  const exportData = data.map((item, index) => ({
    "#": index + 1,
    "Category Name": item.name,
    "Database ID": item.id, // Helpful for advanced admins
  }));

  // 2. Create worksheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

  // 3. Download the file
  XLSX.writeFile(
    workbook,
    `Course_Categories_${new Date().toLocaleDateString()}.xlsx`,
  );
};
