// src/components/admin/students/AdmitCardForm.jsx
import FormInput from "../../../form/FormInput";

export default function AdmitCardForm({ register, logic, searchRef }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="relative" ref={searchRef}>
        <label className="text-sm font-medium text-text mb-2 block">
          Enrollment No.
        </label>
        <input
          type="text"
          value={logic.searchTerm}
          autoComplete="off"
          onChange={(e) => {
            logic.setSearchTerm(e.target.value);
            logic.setIsTyping(true);
            logic.setShowResults(true);
          }}
          className="w-full border border-border rounded-lg px-3 py-2 bg-surface focus:ring-2 focus:ring-accent outline-none"
        />
        {logic.showResults && (
          <div className="absolute z-[100] w-full bg-surface border border-border rounded-lg mt-1 shadow-2xl max-h-60 overflow-y-auto">
            {logic.isSearching ? (
              <div className="p-3 text-sm text-muted animate-pulse">
                Searching...
              </div>
            ) : (
              logic.searchResults.map((s) => (
                <div
                  key={s.id}
                  onClick={() => logic.selectStudent(s)}
                  className="p-3 hover:bg-accent/10 cursor-pointer border-b border-border"
                >
                  <div className="font-bold text-sm text-text">
                    {s.enrollment_no}
                  </div>
                  <div className="text-xs text-muted">Click to select</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <FormInput label="Roll No." name="rollNo" register={register} />
      <FormInput
        label="Session"
        name="session"
        register={register}
        placeholder="e.g. 2024-25"
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-text">
          Select course type semester *
        </label>
        <select
          {...register("selectedDuration", { required: true })}
          className="w-full border border-border rounded-lg px-3 py-2 bg-surface text-sm focus:ring-2 focus:ring-accent outline-none"
        >
          <option value="">
            {logic.fetchingRules
              ? "Syncing..."
              : `Select ${logic.courseType || "Part"}`}
          </option>
          {logic.durationOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <FormInput label="Course" name="course" register={register} readOnly />
      <FormInput label="Stream" name="stream" register={register} readOnly />
    </div>
  );
}
