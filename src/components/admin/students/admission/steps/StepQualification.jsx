// src/components/admin/students/admission/steps/StepQualification.jsx
import { useState } from "react";
import FormSection from "../../../../form/FormSection";

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
  // Track locally which rows have a new file selected (to hide existing preview)
  const [newFiles, setNewFiles] = useState({});

  return (
    <FormSection title="Previous Qualification Details">
      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
          <thead className="bg-bg text-text">
            <tr className="border-b border-border">
              <th className="text-left p-3">Examination</th>
              <th className="text-left p-3">Year of Passing</th>
              <th className="text-left p-3">Board/University</th>
              <th className="text-left p-3">Percentage/CGPA</th>
              <th className="text-left p-3">Upload Document</th>
            </tr>
          </thead>

          <tbody>
            {ROWS.map((row) => {
              const existing = findExisting(existingQualifications, row.key);

              return (
                <tr key={row.key} className="border-b border-border">
                  <td className="p-3 text-text font-medium">{row.label}</td>

                  <td className="p-3">
                    <input
                      type="text"
                      {...register(`${row.key}_year`)}
                      className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
                      placeholder="Year"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="text"
                      {...register(`${row.key}_board`)}
                      className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
                      placeholder="Board/University"
                    />
                  </td>

                  <td className="p-3">
                    <input
                      type="text"
                      {...register(`${row.key}_percentage`)}
                      className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text"
                      placeholder="% / CGPA"
                    />
                  </td>

                  <td className="p-3">
                    {/* Show existing doc thumbnail if in edit mode and no new file chosen yet */}
                    {existing?.document_url && !newFiles[row.key] && (
                      <div className="mb-1 flex items-center gap-2">
                        <img
                          src={existing.document_url}
                          alt="doc"
                          className="h-9 w-9 object-cover rounded border border-border"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <span className="text-[10px] text-text-muted">
                          Saved · select to replace
                        </span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="text-sm text-text pl-3 file:mr-2 file:py-2 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary file:text-white cursor-pointer"
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
              className="border border-border rounded-lg bg-bg/50 p-4 space-y-3"
            >
              <h4 className="font-medium text-text">{row.label}</h4>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-text-muted uppercase block mb-1">
                    Year of Passing
                  </label>
                  <input
                    type="text"
                    {...register(`${row.key}_year`)}
                    className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text text-sm"
                    placeholder="Year"
                  />
                </div>

                <div>
                  <label className="text-xs text-text-muted uppercase block mb-1">
                    Board/University
                  </label>
                  <input
                    type="text"
                    {...register(`${row.key}_board`)}
                    className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text text-sm"
                    placeholder="Board/University"
                  />
                </div>

                <div>
                  <label className="text-xs text-text-muted uppercase block mb-1">
                    Percentage/CGPA
                  </label>
                  <input
                    type="text"
                    {...register(`${row.key}_percentage`)}
                    className="w-full border border-border rounded-md px-3 py-2 bg-surface text-text text-sm"
                    placeholder="% / CGPA"
                  />
                </div>

                <div>
                  <label className="text-xs text-text-muted uppercase block mb-2">
                    Upload Document
                  </label>

                  {/* Show existing doc thumbnail if in edit mode and no new file chosen yet */}
                  {existing?.document_url && !newFiles[row.key] && (
                    <div className="mb-2 flex items-center gap-2">
                      <img
                        src={existing.document_url}
                        alt="doc"
                        className="h-10 w-10 object-cover rounded border border-border"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <span className="text-[10px] text-text-muted">
                        Saved · select to replace
                      </span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className="w-full text-sm text-text pl-3 file:mr-2 file:py-2 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary file:text-white cursor-pointer"
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </FormSection>
  );
}
