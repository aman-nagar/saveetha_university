// src/components/public/admission/PublicAdmissionStepper.jsx
import { FiCheck, FiUser, FiMapPin, FiBook, FiLayers } from "react-icons/fi";

const steps = [
  { label: "Personal", icon: FiUser },
  { label: "Communication", icon: FiMapPin },
  { label: "Qualification", icon: FiBook },
  { label: "Program", icon: FiLayers },
];

export default function PublicAdmissionStepper({ step: currentStep }) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-start w-full">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const active = stepNum === currentStep;
          const completed = stepNum < currentStep;
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={step.label}
              className={`flex items-center ${isLast ? "flex-none" : "flex-1"}`}
            >
              {/* Step dot + label */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <div
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                    text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0
                    ${
                      completed
                        ? "bg-success text-white shadow-sm"
                        : active
                          ? "bg-primary text-white ring-4 ring-primary/20 shadow-md"
                          : "bg-surface border-2 border-border text-muted"
                    }
                  `}
                >
                  {completed ? (
                    <FiCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>

                {/* Label — hidden on xs, visible from sm */}
                <span
                  className={`
                    hidden sm:block text-[10px] sm:text-xs font-medium text-center leading-tight max-w-[64px]
                    ${active ? "text-primary" : completed ? "text-success" : "text-muted"}
                  `}
                >
                  {step.label}
                </span>

                {/* Tiny step number on xs only */}
                <span
                  className={`
                    sm:hidden text-[9px] font-semibold text-center
                    ${active ? "text-primary" : completed ? "text-success" : "text-muted"}
                  `}
                >
                  {stepNum}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={`
                    flex-1 h-0.5 mx-1.5 sm:mx-3 mt-[-18px] sm:mt-[-24px] transition-colors duration-300
                    ${stepNum < currentStep ? "bg-success" : "bg-border"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
