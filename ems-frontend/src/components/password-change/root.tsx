import React from "react";
import { Button, Input } from "../ui";
import { Eye } from "lucide-react";

export const PasswordRoot = () => {
  return (
    <div className="vertical-scrollbar scrollbar-md mx-auto h-full w-full flex flex-col px-8 md:px-20 lg:px-36 xl:px-56 py-10 md:py-16">
      <div className="w-full max-w-lg">

        {/* Title */}
        <h2 className="flex flex-col gap-1 py-4 border-b border-gray-200 mb-8 text-2xl font-medium">
          Change password
        </h2>

        {/* Current Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current password
          </label>

          <div className="relative">
            <Input
              name="old_password"
              placeholder="Old password"
              type="password"
              className="pr-10"
            />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" />
          </div>
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New password
          </label>

          <div className="relative">
            <Input
              name="new_password"
              placeholder="Enter new password"
              type="password"
              className="pr-10"
            />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm password
          </label>

          <div className="relative">
            <Input
              name="confirm_password"
              placeholder="Confirm password"
              type="password"
              className="pr-10"
            />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" />
          </div>
        </div>

        {/* Button */}
        <Button
            variant="primary"
            size="md"
        >
          Change password
        </Button>
      </div>
    </div>
  );
};
