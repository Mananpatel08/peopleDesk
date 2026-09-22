"use client";
import React from "react";

export function PersonalDetailSkeleton() {
  return (
    <div className="space-y-6 px-w-[95%]">
      <div className="h-8 w-56 bg-gray-200 rounded animate-pulse" />

      <div className="grid grid-cols-3 items-start gap-6">
        <div>
          <div className="h-6 w-40 mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-12 w-full col-span-2 bg-gray-200 rounded-lg animate-pulse" />
      </div>

      <div className="grid grid-cols-3 items-start gap-6">
        <div>
          <div className="h-6 w-full mb-2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-3">
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

    </div>
  );
}
