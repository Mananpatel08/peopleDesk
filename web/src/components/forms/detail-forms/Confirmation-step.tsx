import React from "react";

interface ConfirmationStepProps {
  canSubmit: boolean;
}
export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({
  canSubmit,
}) => {
  return (
    <div className="w-5/6 px-auto ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Confirmation
      </h2>
      
    </div>
  );
};
