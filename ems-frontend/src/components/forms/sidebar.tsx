"use client";

import React from "react";
import {
  CheckIcon,
  UserIcon,
  Cog8ToothIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

interface StepItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const stepData: StepItem[] = [
  {
    title: "Personal Information",
    desc: "Step details here",
    icon: <UserIcon className="w-5 h-5" />,
  },
  {
    title: "Service Details",
    desc: "Step details here",
    icon: <Cog8ToothIcon className="w-5 h-5" />,
  },
  {
    title: "Confirmation",
    desc: "Step details here",
    icon: <ShieldCheckIcon className="w-5 h-5" />,
  },
];

interface FormSidebarProps {
  currentStep: number;
  setStep: (step: number) => void;
  stepCompleted: any[];
}
export const FormSidebar: React.FC<FormSidebarProps> = ({
  currentStep,
  setStep,
  stepCompleted,
}) => {
  const hasSkippedSteps = stepData.some((_, i) => {
    return i + 1 < currentStep && !stepCompleted.includes(i + 1);
  });

  return (
    <div className="space-y-3">

      <ol className="flex items-center justify-between gap-4 px-3 py-4 relative">
        {stepData.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = stepCompleted.includes(index + 1);
          const isSkipped =
            index + 1 < currentStep && !isCompleted;

          return (
            <li key={index} className="relative flex flex-col items-center cursor-pointer w-full"
              onClick={() => setStep(index + 1)}
            >
              {/* line */}
              {index !== 0 && (
                <span
                  className={`absolute top-4 left-0 -translate-x-1/2 h-1 w-full
                    ${
                      isCompleted || isActive
                        ? "bg-blue-500"
                        : isSkipped
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }
                  `}
                ></span>
              )}

              {/* Circle */}
              <div
                className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white
                  ${
                    isCompleted
                      ? "bg-green-500 text-white "
                      : isSkipped
                      ? "bg-red-500 text-white "
                      : isActive
                      ? "bg-blue-500 text-white "
                      : "bg-gray-200 text-gray-500 "
                  }
                `}
              >
                {isCompleted ? <CheckIcon className="w-5 h-5" /> : step.icon}
              </div>

              <div className={`mt-1 text-xs block sm:hidden font-medium text-center
                ${isSkipped ? "text-red-600" : ""}
              `}>
                {step.title}
              </div>
            </li>
          );
        })}
      </ol>

      {/* DESKTOP VIEW */}
      {/* <ol className="hidden md:block relative border-s border-gray-300">
        {stepData.map((step, index) => {
          const isActive = currentStep === index + 1;
          const isCompleted = stepCompleted.includes(index + 1);
          const isSkipped =
            index + 1 < currentStep && !isCompleted;

          return (
            <li key={index} onClick={() => setStep(index + 1)} className="mb-10 ms-8 cursor-pointer">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white
                  ${
                    isCompleted
                      ? "bg-green-500 text-white "
                      : isSkipped
                      ? "bg-red-500 text-white "
                      : isActive
                      ? "bg-blue-500 text-white "
                      : "bg-gray-200 text-gray-500 "
                  }
                `}
              >
                {isCompleted ? <CheckIcon className="w-5 h-5" /> : step.icon}
              </span>

              <h3
                className={`font-semibold leading-tight ${
                  isSkipped
                    ? "text-red-600"
                    : isActive
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {step.title}
              </h3>

              <p className="text-sm text-gray-500">{step.desc}</p>
            </li>
          );
        })}
      </ol> */}

      {/* WARNING MESSAGE */}
      {/* {hasSkippedSteps && (
        <p className="text-red-600 text-sm font-medium">
          Previous step information is pending.
        </p>
      )} */}
    </div>
  );
};
