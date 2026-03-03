import { useState } from "react";
import FormSection from "../../../../form/FormSection";
import { FaGraduationCap, FaFileUpload, FaHistory } from "react-icons/fa";

const ROWS = [
  { label: "Secondary", key: "secondary" },
  { label: "Sr. Secondary", key: "sr_secondary" },
  { label: "Graduation", key: "graduation" },
  { label: "Post Graduation", key: "post_graduation" },
  { label: "Other", key: "other" },
];

function findExisting(existingQualifications, key) {
  if (!Array.isArray(existingQualifications)) return null;
  return existingQualifications.find((q) => q.examination === key) || null;
}

export default function StepQualification({
  register,
  errors,
  setQualificationFiles,
  existingQualifications = [],
}) {
  const [newFiles, setNewFiles] = useState({});
  // NEW: State to store local preview URLs for the icons
  const [previews, setPreviews] = useState({});

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setQualificationFiles((prev) => ({ ...prev, [key]: file }));
      setNewFiles((prev) => ({ ...prev, [key]: true }));

      // Generate preview URL if it's an image
      if (file.type.startsWith("image/")) {
        setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
      } else {
        setPreviews((prev) => ({ ...prev, [key]: "pdf" })); // Placeholder for PDFs
      }
    }
  };

  return (
    <FormSection title="Previous Qualification Details">
      <div className="w-full md:col-span-2">
        {/* Desktop View: Traditional Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-border bg-surface">
          <table className="w-full text-sm text-left">
            <thead className="bg-bg text-text uppercase text-[10px] font-black tracking-widest">
              <tr className="border-b border-border">
                <th className="p-4">Examination</th>
                <th className="p-4">Year of Passing</th>
                <th className="p-4">Board/University</th>
                <th className="p-4">Result (%/CGPA)</th>
                <th className="p-4">Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROWS.map((row) => {
                const existing = findExisting(existingQualifications, row.key);
                return (
                  <tr
                    key={row.key}
                    className="hover:bg-bg/30 transition-colors"
                  >
                    <td className="p-4 font-bold text-primary dark:text-accent">
                      {row.label}
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        {...register(`${row.key}_year`)}
                        className="w-full border border-border rounded-lg px-3 py-2 bg-bg text-text focus:ring-2 focus:ring-accent/40"
                        placeholder="e.g. 2022"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        {...register(`${row.key}_board`)}
                        className="w-full border border-border rounded-lg px-3 py-2 bg-bg text-text focus:ring-2 focus:ring-accent/40"
                        placeholder="Board Name"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        type="text"
                        {...register(`${row.key}_percentage`)}
                        className="w-full border border-border rounded-lg px-3 py-2 bg-bg text-text focus:ring-2 focus:ring-accent/40"
                        placeholder="% / CGPA"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <ExistingDoc
                          existing={existing}
                          isNew={newFiles[row.key]}
                        />
                        <label className="flex flex-col items-center justify-center h-10 w-10 rounded-lg border-2 border-dashed border-border hover:border-accent cursor-pointer transition-all bg-bg overflow-hidden">
                          {previews[row.key] && previews[row.key] !== "pdf" ? (
                            <img
                              src={previews[row.key]}
                              alt="preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <FaFileUpload className="text-muted text-xs" />
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,image/*"
                            onChange={(e) => handleFileChange(e, row.key)}
                          />
                        </label>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet View: Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {ROWS.map((row) => {
            const existing = findExisting(existingQualifications, row.key);
            return (
              <div
                key={row.key}
                className="bg-surface border border-border rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FaGraduationCap className="text-primary text-sm" />
                  </div>
                  <h4 className="font-bold text-text uppercase text-xs tracking-wider">
                    {row.label}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 block">
                      Year of Passing
                    </label>
                    <input
                      type="text"
                      {...register(`${row.key}_year`)}
                      className="w-full border border-border rounded-xl px-4 py-2.5 bg-bg text-text"
                      placeholder="Year"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 block">
                      Board/University
                    </label>
                    <input
                      type="text"
                      {...register(`${row.key}_board`)}
                      className="w-full border border-border rounded-xl px-4 py-2.5 bg-bg text-text"
                      placeholder="University Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 block">
                        Result
                      </label>
                      <input
                        type="text"
                        {...register(`${row.key}_percentage`)}
                        className="w-full border border-border rounded-xl px-4 py-2.5 bg-bg text-text"
                        placeholder="% / CGPA"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 block">
                        Document
                      </label>
                      <div className="flex items-center gap-2">
                        <ExistingDoc
                          existing={existing}
                          isNew={newFiles[row.key]}
                        />
                        <label className="flex-1 flex items-center justify-center gap-2 h-[42px] border-2 border-dashed border-border rounded-xl bg-bg cursor-pointer hover:border-accent text-muted hover:text-accent transition-all text-xs overflow-hidden">
                          {previews[row.key] && previews[row.key] !== "pdf" ? (
                            <img
                              src={previews[row.key]}
                              alt="preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <>
                              <FaFileUpload />{" "}
                              {newFiles[row.key] ? "Change" : "Upload"}
                            </>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, row.key)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FormSection>
  );
}

function ExistingDoc({ existing, isNew }) {
  if (!existing?.document_url || isNew) return null;
  return (
    <div className="relative group shrink-0">
      <img
        src={existing.document_url}
        alt="doc"
        className="h-10 w-10 object-cover rounded-lg border border-border"
      />
      <div className="absolute -top-1 -right-1 bg-accent rounded-full p-0.5 shadow-sm">
        <FaHistory className="text-white text-[8px]" />
      </div>
    </div>
  );
}
