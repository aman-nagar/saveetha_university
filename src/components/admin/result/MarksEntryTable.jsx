// src/components/admin/result/MarksEntryTable.jsx

export default function MarksEntryTable({ subjects, register, errors }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-bg/60 text-muted font-bold uppercase text-[10px]">
          <tr>
            <th className="px-6 py-4">Subject Name</th>
            <th className="px-6 py-4 text-center">Theory (Max)</th>
            <th className="px-6 py-4 text-center">Practical (Max)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {subjects.map((sub) => {
            const subId = sub.id || sub.subject_id;
            const theoryErr = errors?.marks?.[subId]?.theory;
            const practicalErr = errors?.marks?.[subId]?.practical;

            return (
              <tr key={subId} className="hover:bg-bg/10 transition-colors">
                <td className="px-6 py-4 font-semibold text-text">
                  {sub.subject_name}
                </td>

                {/* Theory Input */}
                <td className="px-6 py-4">
                  <input
                    type="number"
                    {...register(`marks.${subId}.theory`, {
                      valueAsNumber: true,
                      validate: (val) =>
                        val <= (sub.max_theory_marks || 100) ||
                        `Max ${sub.max_theory_marks}`,
                    })}
                    className={`w-full p-2 border rounded-lg text-center bg-bg outline-none transition-all ${
                      theoryErr
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-slate-200"
                    }`}
                  />
                  <p className="text-[10px] text-center mt-1 text-muted">
                    Max: {sub.max_theory_marks || 100}
                  </p>
                  {theoryErr && (
                    <p className="text-[10px] text-danger text-center font-bold mt-1">
                      {theoryErr.message}
                    </p>
                  )}
                </td>

                {/* Practical Input */}
                <td className="px-6 py-4">
                  <input
                    type="number"
                    {...register(`marks.${subId}.practical`, {
                      valueAsNumber: true,
                      validate: (val) =>
                        val <= (sub.max_practical_marks || 0) ||
                        `Max ${sub.max_practical_marks}`,
                    })}
                    className={`w-full p-2 border rounded-lg text-center bg-bg outline-none transition-all ${
                      practicalErr
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-slate-200"
                    }`}
                  />
                  <p className="text-[10px] text-center mt-1 text-muted">
                    Max: {sub.max_practical_marks || 0}
                  </p>
                  {practicalErr && (
                    <p className="text-[10px] text-danger text-center font-bold mt-1">
                      {practicalErr.message}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
