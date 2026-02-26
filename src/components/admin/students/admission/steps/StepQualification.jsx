// src/components/admin/students/admission/steps/StepQualification.jsx
import { useState } from "react";
import FormSection from "../../../../form/FormSection";
import { FiFile, FiImage, FiUpload, FiAward } from "react-icons/fi";

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

  return (
    <FormSection title="Previous Qualification Details" icon={FiAward}>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-bg text-text">
            <tr className="border-b border-border">
              <th className="text-left p-3 font-medium">Examination</th>
              <th className="text-left p-3 font-medium">Year</th>
              <th className="text-left p-3 font-medium">Board/University</th>
              <th className="text-left p-3 font-medium">Percentage/CGPA</th>
              <th className="text-left p-3 font-medium">Document</th>
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row) => {
              const existing = findExisting(existingQualifications, row.key);

              return (
                <tr
                  key={row.key}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="p-3 text-text font-medium">{row.label}</td>
                  <td className="p-2">
                    <input
                      type="text"
                      {...register(`${row.key}_year`)}
                      className="w-full border border-border rounded-md px-2 py-1.5 bg-surface text-text text-sm"
                      placeholder="Year"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      {...register(`${row.key}_board`)}
                      className="w-full border border-border rounded-md px-2 py-1.5 bg-surface text-text text-sm"
                      placeholder="Board"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      {...register(`${row.key}_percentage`)}
                      className="w-full border border-border rounded-md px-2 py-1.5 bg-surface text-text text-sm"
                      placeholder="%"
                    />
                  </td>
                  <td className="p-2">
                    {existing?.document_url && !newFiles[row.key] && (
                      <div className="mb-1 flex items-center gap-2">
                        <img
                          src={existing.document_url}
                          alt="doc"
                          className="h-8 w-8 object-cover rounded border border-border"
                        />
                        <span className="text-[10px] text-muted">Saved</span>
                      </div>
                    )}
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-muted hover:text-primary transition-colors">
                      <FiUpload className="w-4 h-4" />
                      <span className="text-xs">Upload</span>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setQualificationFiles((prev) => ({
                              ...prev,
                              [row.key]: file,
                            }));
                            setNewFiles((prev) => ({
                              ...prev,
                              [row.key]: true,
                            }));
                          }
                        }}
                      />
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {ROWS.map((row) => {
          const existing = findExisting(existingQualifications, row.key);

          return (
            <div
              key={row.key}
              className="bg-bg/50 border border-border rounded-lg p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-text text-sm">{row.label}</h4>
                {existing?.document_url && !newFiles[row.key] && (
                  <div className="flex items-center gap-1.5">
                    <img
                      src={existing.document_url}
                      alt="doc"
                      className="h-6 w-6 object-cover rounded border border-border"
                    />
                    <span className="text-[10px] text-muted">Saved</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-muted uppercase">
                    Year
                  </label>
                  <input
                    type="text"
                    {...register(`${row.key}_year`)}
                    className="w-full border border-border rounded-md px-2 py-1.5 bg-surface text-text text-sm mt-1"
                    placeholder="YYYY"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted uppercase">
                    Percentage
                  </label>
                  <input
                    type="text"
                    {...register(`${row.key}_percentage`)}
                    className="w-full border border-border rounded-md px-2 py-1.5 bg-surface text-text text-sm mt-1"
                    placeholder="%"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-muted uppercase">
                  Board/University
                </label>
                <input
                  type="text"
                  {...register(`${row.key}_board`)}
                  className="w-full border border-border rounded-md px-2 py-1.5 bg-surface text-text text-sm mt-1"
                  placeholder="Enter board"
                />
              </div>

              <label className="flex items-center justify-center gap-2 p-2 border border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <FiUpload className="w-4 h-4 text-muted" />
                <span className="text-xs text-muted">Upload Document</span>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setQualificationFiles((prev) => ({
                        ...prev,
                        [row.key]: file,
                      }));
                      setNewFiles((prev) => ({ ...prev, [row.key]: true }));
                    }
                  }}
                />
              </label>
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}
