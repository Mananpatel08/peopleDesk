"use client";

import React, { FC, useEffect, useState } from "react";
import { FormHeader } from "./header";
import { FormSidebar } from "./sidebar";
import { PersonalDetails, ServiceDetail } from "./detail-forms";
import { useFormById } from "@/hooks/useForm";
import { PersonalDetailSkeleton } from "../skeleton-loader";
import { useUserContext } from "@/context";
import { Spinner } from "../ui";
import { usePersistentStep } from "@/helpers/localStorage";
import { canSubmit } from "@/helpers/form";
import { ConfirmationStep } from "./detail-forms/Confirmation-step";

type Props = {
  propFormId?: string;
  isDashboard?: boolean;
};
export const EmployeeForm: FC<Props> = ({ propFormId, isDashboard }) => {
  const [formId, setFormId] = useState(propFormId || "");
  const { data: formData, isLoading, refetch } = useFormById(formId);
  const { user, isLoadingCurrentUser } = useUserContext();
  const currentStep = formData?.current_step || 1;
  const [step, setStep] = usePersistentStep("currentStep", currentStep);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const stepCompleted = formData?.step_completed || [];

  const personalDetailsData = formData?.personal_details;
  const serviceDetailsData = formData?.service_details;

  useEffect(() => {
    if (propFormId) return;
    if (user?.form_id) {
      const id = user.form_id;
      setFormId(id);
    }
  }, [user]);

  if (isLoadingCurrentUser) {
    return <Spinner />;
  }

  const canSubmitForm = canSubmit(step, stepCompleted);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {(!isDashboard && <FormHeader />)}
      <div className="flex justify-center max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-medium">
        <div className="flex flex-col gap-4 p-4">
          <FormSidebar
            currentStep={step}
            setStep={setStep}
            stepCompleted={stepCompleted}
          />
          <div className="flex justify-center max-w-5xl">
            {step === 1 &&
              (isLoading ? (
                <PersonalDetailSkeleton />
              ) : (
                <PersonalDetails
                  nextStep={nextStep}
                  personalDetails={personalDetailsData}
                  isLoading={isLoading}
                  refetch={refetch}
                  setFormId={setFormId}
                />
              ))}
            {step === 2 && (
              <ServiceDetail
                prevStep={prevStep}
                serviceDetails={serviceDetailsData}
                isLoading={isLoading}
                refetch={refetch}
                canSubmit={canSubmitForm}
                formId={formId}
              />
            )}
            {step === 3 && <ConfirmationStep canSubmit={canSubmitForm} />}
          </div>
        </div>
      </div>
    </div>
  );
}
