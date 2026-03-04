import FormInput from "../../../components/form/FormInput";

export default function MarksEntryTable({ subjects, register }) {
  return (
    <div className="mt-8 border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-bg text-text-muted font-bold uppercase text-[10px]">
          <tr>
            <th className="px-6 py-4">Subject Name</th>
            <th className="px-6 py-4 w-40 text-center">Theory Marks</th>
            <th className="px-6 py-4 w-40 text-center">Practical Marks</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {subjects.map((sub) => (
            <tr key={sub.id} className="bg-surface hover:bg-bg/40">
              <td className="px-6 py-4 font-semibold uppercase">{sub.subject_name}</td>
              <td className="px-6 py-4">
                <FormInput
                  label={`max ${sub.max_theory_marks}`}
                  type="number"
                  name={`marks.${sub.id}.theory`}
                  register={register}
                  required
                  rules={{ valueAsNumber: true }}
                />
              </td>
              <td className="px-6 py-4">
                <FormInput
                  label={`max ${sub.max_practical_marks}`}
                  type="number"
                  name={`marks.${sub.id}.practical`}
                  register={register}
                  required
                  rules={{ valueAsNumber: true }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}