import React from "react";

export default function SettingsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Basic Info Section Skeleton */}
      <div className="space-y-6">
        <div className="h-6 w-48 bg-border rounded-md mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-border rounded"></div>
              <div className="h-10 w-full bg-surface border border-border rounded-lg"></div>
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <div className="h-4 w-24 bg-border rounded"></div>
            <div className="h-24 w-full bg-surface border border-border rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Branding Section Skeleton */}
      <div className="space-y-6 pt-4">
        <div className="h-6 w-32 bg-border rounded-md mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-20 bg-border rounded"></div>
              <div className="h-16 w-full bg-surface border border-border rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-11 w-32 bg-border rounded-lg mt-8"></div>
    </div>
  );
}
