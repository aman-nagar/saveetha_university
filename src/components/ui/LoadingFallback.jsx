/**
 * Loading Fallback Component
 * Displays a skeleton loader while pages are being loaded
 * Can be customized with different layouts
 */

import Skeleton from "./Skeleton";

const LoadingFallback = ({
  variant = "dashboard", // 'dashboard', 'table', 'form', 'minimal'
  title = "Loading...",
}) => {
  if (variant === "minimal") {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium">{title}</p>
        </div>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="w-full p-6 bg-white">
        <div className="mb-6 space-y-3">
          <Skeleton height="h-6" width="w-1/3" />
          <Skeleton height="h-4" width="w-1/4" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton height="h-12" width="w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white">
        <Skeleton height="h-8" width="w-1/3" className="mb-6" />
        <div className="space-y-5">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton height="h-4" width="w-1/4" className="mb-2" />
              <Skeleton height="h-10" width="w-full" rounded="rounded-lg" />
            </div>
          ))}
          <div className="flex gap-4 pt-4">
            <Skeleton height="h-10" width="w-1/3" rounded="rounded-lg" />
            <Skeleton height="h-10" width="w-1/3" rounded="rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  // Default dashboard variant
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-3">
        <Skeleton height="h-8" width="w-1/4" />
        <Skeleton height="h-4" width="w-1/3" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
            <Skeleton height="h-4" width="w-1/2" className="mb-4" />
            <Skeleton height="h-10" width="w-2/3" />
          </div>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <Skeleton height="h-6" width="w-1/3" className="mb-6" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton variant="circle" className="flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton height="h-4" width="w-3/4" />
                  <Skeleton height="h-3" width="w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Skeleton height="h-6" width="w-2/3" className="mb-6" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton height="h-4" width="w-full" className="mb-3" />
                <Skeleton height="h-10" width="w-full" rounded="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;
