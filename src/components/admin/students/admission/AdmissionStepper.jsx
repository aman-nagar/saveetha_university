// src/components/admin/students/admission/AdmissionStepper.jsx
import { FiCheck, FiUser, FiMapPin, FiBook, FiLayers } from "react-icons/fi";

const steps = [
  { label: "Personal", icon: FiUser },
  { label: "Communication", icon: FiMapPin },
  { label: "Qualification", icon: FiBook },
  { label: "Program", icon: FiLayers },
];

export default function AdmissionStepper({ step: currentStep }) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center justify-between min-w-[320px] sm:min-w-0 px-1">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const active = stepNum === currentStep;
          const completed = stepNum < currentStep;
          const Icon = step.icon;

          return (
            <div key={step.label} className="flex-1 flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                    text-xs sm:text-sm font-semibold transition-all duration-200
                    ${
                      completed
                        ? "bg-success text-white"
                        : active
                          ? "bg-primary text-white ring-2 sm:ring-4 ring-primary/20"
                          : "bg-surface border-2 border-border text-muted"
                    }
                  `}
                >
                  {completed ? (
                    <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </div>
                <span
                  className={`
                  mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium whitespace-nowrap
                  ${active ? "text-primary" : completed ? "text-success" : "text-muted"}
                `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                  flex-1 h-0.5 mx-2 sm:mx-4 min-w-[20px] sm:min-w-[40px]
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
