// src/components/admin/students/admission/steps/StepQualificationSkeleton.jsx
import { FiAward } from "react-icons/fi";

export default function StepQualificationSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-xl p-4 sm:p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
        <FiAward className="w-4 h-4 sm:w-5 sm:h-5 text-muted/20" />
        <div className="h-5 sm:h-6 bg-muted/20 rounded w-48" />
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg">
            <tr>
              {["Examination", "Year", "Board", "Percentage", "Document"].map(
                (_, i) => (
                  <th key={i} className="p-3">
                    <div className="h-4 bg-muted/20 rounded w-20" />
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-border">
                <td className="p-3">
                  <div className="h-4 bg-muted/20 rounded w-24" />
                </td>
                <td className="p-2">
                  <div className="h-8 bg-muted/20 rounded w-full" />
                </td>
                <td className="p-2">
                  <div className="h-8 bg-muted/20 rounded w-full" />
                </td>
                <td className="p-2">
                  <div className="h-8 bg-muted/20 rounded w-full" />
                </td>
                <td className="p-2">
                  <div className="h-8 bg-muted/20 rounded w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Skeleton */}
      <div className="md:hidden space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-bg/50 border border-border rounded-lg p-3 space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-4 bg-muted/20 rounded w-24" />
              <div className="h-6 w-6 bg-muted/20 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-8 bg-muted/20 rounded" />
              <div className="h-8 bg-muted/20 rounded" />
            </div>
            <div className="h-8 bg-muted/20 rounded" />
            <div className="h-10 bg-muted/20 rounded border border-dashed border-border" />
          </div>
        ))}
      </div>
    </div>
  );
}
