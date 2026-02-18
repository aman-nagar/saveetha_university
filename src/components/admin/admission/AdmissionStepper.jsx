export default function AdmissionStepper({ step }) {
  const steps = [
    "Personal Details",
    "Communication",
    "Qualification",
    "Program",
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const active = index + 1 === step;
        const completed = index + 1 < step;

        return (
          <div key={label} className="flex-1 text-center">
            <div
              className={`
                w-10 h-10 mx-auto rounded-full flex items-center justify-center
                text-sm font-semibold
                ${
                  completed
                    ? "bg-accent text-primary"
                    : active
                      ? "bg-primary text-white"
                      : "bg-border text-muted"
                }
              `}
            >
              {index + 1}
            </div>
            <p className="mt-2 text-xs text-muted">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
