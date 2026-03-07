import { useState } from "react";
import * as XLSX from "xlsx";
import {
  FaFileImport,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Button from "../../ui/Button";

export default function CourseCategoryImport({
  onImportComplete,
  showToast,
  existingData,
}) {
  const [previewData, setPreviewData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const json = XLSX.utils.sheet_to_json(sheet);

      // Basic Validation & Cleaning
      const cleaned = json.map((row, index) => {
        const name = row.CategoryName || row.name || row.category;
        const exists = existingData.some(
          (cat) => cat.name.toLowerCase() === name?.toString().toLowerCase(),
        );

        return {
          id: index,
          name: name?.toString().trim(),
          status: !name ? "error" : exists ? "duplicate" : "ready",
          message: !name
            ? "Missing name"
            : exists
              ? "Already exists"
              : "Ready to import",
        };
      });

      setPreviewData(cleaned);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = async () => {
    const toImport = previewData.filter((item) => item.status === "ready");
    if (toImport.length === 0)
      return showToast("error", "No valid categories to import");

    setIsProcessing(true);
    let successCount = 0;
    let errorCount = 0;

    for (const item of toImport) {
      try {
        await onImportComplete(item.name); // Calls the handleCreate in Page
        successCount++;
      } catch (err) {
        errorCount++;
      }
    }

    showToast(
      "success",
      `Imported ${successCount} items successfully. ${errorCount} failed.`,
    );
    setPreviewData([]);
    setIsProcessing(false);
  };

  return (
    <div className="bg-bg/50 border border-dashed border-border p-6 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <FaFileImport className="text-primary" /> Bulk Import via Excel
          </h3>
          <p className="text-xs text-text-muted">
            Column header should be "CategoryName"
          </p>
        </div>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
          id="excel-upload"
        />
        <label
          htmlFor="excel-upload"
          className="cursor-pointer px-4 py-2 bg-surface border border-border rounded-lg text-xs font-bold hover:bg-bg transition"
        >
          Select File
        </label>
      </div>

      {previewData.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="max-h-40 overflow-auto border border-border rounded-lg text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface sticky top-0">
                <tr>
                  <th className="p-2 border-b">Name</th>
                  <th className="p-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {previewData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-2 font-medium">{row.name || "---"}</td>
                    <td className="p-2">
                      <span
                        className={`flex items-center gap-1 ${row.status === "ready" ? "text-green-500" : "text-danger"}`}
                      >
                        {row.status === "ready" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaExclamationCircle />
                        )}
                        {row.message}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setPreviewData([])}
              className="text-xs font-bold px-4 py-2"
            >
              Clear
            </button>
            <Button onClick={handleImport} disabled={isProcessing}>
              {isProcessing ? (
                <FaSpinner className="animate-spin" />
              ) : (
                `Import ${previewData.filter((i) => i.status === "ready").length} Items`
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
