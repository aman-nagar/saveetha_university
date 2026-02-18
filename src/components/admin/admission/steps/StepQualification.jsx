import FormSection from "../../../form/FormSection";
import FormFileInput from "../../../form/FormFileInput";

export default function StepQualification({ register }) {
  const rows = [
    { label: "Secondary", key: "secondary" },
    { label: "Sr. Secondary", key: "sr_secondary" },
    { label: "Graduation", key: "graduation" },
    { label: "Post Graduation", key: "post_graduation" },
    { label: "Other", key: "other" },
  ];

  return (
    <FormSection title="Previous Qualification Details">
      <div className="w-full md:col-span-2">
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
            {rows.map((row) => (
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
                  <input
                    type="file"
                    {...register(`${row.key}_document`)}
                    className="text-sm text-text"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FormSection>
  );
}
