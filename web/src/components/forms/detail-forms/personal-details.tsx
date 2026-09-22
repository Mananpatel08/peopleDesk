"use client";

import React, { useEffect, useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Button, Input } from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsSchema } from "@/validation/formSchema";
import { usePersonalDetails, useUpdatePersonalDetails } from "@/hooks/useForm";
import { PersonalDetail, PersonalDetailPayload } from "@/types";
import { GENDER_OPTIONS } from "@/helpers/form";
import { useToast } from "@/context";

interface PersonalDetailProps {
  nextStep: () => void;
  personalDetails?: PersonalDetail | null;
  isLoading?: boolean;
  refetch?: () => void;
  setFormId: (formId: string) => void;
}

export const PersonalDetails: React.FC<PersonalDetailProps> = ({
  nextStep,
  personalDetails,
  isLoading,
  refetch,
  setFormId,
}) => {
  const [gender, setGender] = useState<string | null>(null);
  const personalDetailId = personalDetails?.id;
  const { mutateAsync: createPersonalDetails, isPending } =
    usePersonalDetails();
  const { mutateAsync: updatePersonalDetails, isPending: isUpdating } =
    useUpdatePersonalDetails(personalDetailId || "");
  const { setToast } = useToast();
  const methods = useForm({
    resolver: yupResolver(personalDetailsSchema),
    mode: "onSubmit",
    defaultValues: personalDetails
      ? {
          first_name: personalDetails.first_name || "",
          middle_name: personalDetails.middle_name || "",
          last_name: personalDetails.last_name || "",
          gender: personalDetails.gender || "",
          mobile_number: personalDetails.mobile_number || undefined,
          pan_number: personalDetails.pan_number || "",
          voter_id: personalDetails.voter_id || "",
          email: personalDetails.email || "",
        }
      : {
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "",
          mobile_number: undefined,
          pan_number: "",
          voter_id: "",
          email: "",
        },
  });

  const onSubmit = async (data: PersonalDetailPayload) => {
    try {
      if (personalDetailId) {
        await updatePersonalDetails(data);
        setToast({
          type: "success",
          title: "Success",
          message: "Personal details updated successfully.",
        });
      } else {
        const createPayload = {
          ...data,
          is_step_completed: true,
        };
        const response = await createPersonalDetails({
          personal_details: createPayload,
        });
        const formId = response.id;
        setFormId(formId);
        nextStep();
      }
      refetch?.();
    } catch (err) {
      console.error(err);
    }
  };

  const genderFieldError = methods.formState.errors.gender?.message || "";
  useEffect(() => {
    if (personalDetails?.gender) setGender(personalDetails.gender);
  }, [personalDetails]);
  return (
    <div className="w-full sm:w-5/6  px-3 sm:px-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 hidden sm:block">
        Personal Information
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* ====== Name ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">Your Name</label>
              <p className="text-gray-400 text-sm">
                First, middle, and last name
              </p>
            </div>

            <div className="col-span-2 grid grid-cols-3 gap-3">
              <Input name="first_name" type="text" placeholder="First name" />
              <Input name="middle_name" type="text" placeholder="Middle name" />
              <Input name="last_name" type="text" placeholder="Last name" />
            </div>
          </div>

          {/* ====== Gender ====== */}
          <div className="grid grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">Gender</label>
              <p className="text-gray-400 text-sm">Select your gender</p>
              <input
                type="hidden"
                {...methods.register("gender")}
                value={gender || ""}
              />
            </div>

            <div className="col-span-2 flex flex-col w-full">
              <div className=" flex gap-4">
                {GENDER_OPTIONS.map(({ label, value, icon: Icon }) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => {
                      setGender(value);
                      methods.setValue("gender", value, {
                        shouldValidate: true,
                      });
                    }}
                    className={`flex flex-col items-center justify-center w-24 border rounded-xl p-3 transition
                                    ${
                                      gender === value
                                        ? "border-blue-500 bg-blue-50 text-blue-600"
                                        : genderFieldError
                                        ? "border-red-500 bg-white text-red-400 hover:bg-gray-50"
                                        : "border-gray-300 bg-white text-gray-400 hover:bg-gray-50"
                                    }`}
                  >
                    <Icon className="w-6 h-6 mb-1" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
              {genderFieldError && (
                <p className="text-xs text-red-500 mt-1">
                  {genderFieldError as string}
                </p>
              )}
            </div>
          </div>

          {/* ====== Mobile Number ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start gap-1 sm:gap-6">
            <div>
              <label className="text-gray-700 font-medium">Mobile Number</label>
              <p className="text-gray-400 text-sm hidden sm:block">Enter valid phone number</p>
            </div>

            <div className="col-span-2 relative w-full">
              <Input
                type="tel"
                name="mobile_number"
                placeholder="+91 9876543210"
                icon={<PhoneIcon />}
              />
            </div>
          </div>

          {/* ====== PAN Number ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start gap-1 sm:gap-6">
            <div>
              <label className="text-gray-700 font-medium">PAN Number</label>
              <p className="text-gray-400 text-sm hidden sm:block">Enter your PAN ID</p>
            </div>

            <div className="col-span-2 relative w-full">
              <Input
                name="pan_number"
                type="text"
                placeholder="ABCDE1234F"
                icon={<IdentificationIcon />}
              />
            </div>
          </div>

          {/* ====== Voter Card Number ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start gap-1 sm:gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Voter Card Number
              </label>
              <p className="text-gray-400 text-sm hidden sm:block">
                As printed on your voter ID
              </p>
            </div>

            <div className="col-span-2 relative w-full">
              <Input
                name="voter_id"
                type="text"
                placeholder="ABC1234567"
                icon={<UserIcon />}
              />
            </div>
          </div>

          {/* ====== Email ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 items-start gap-1 sm:gap-6">
            <div>
              <label className="text-gray-700 font-medium">Email ID</label>
              <p className="text-gray-400 text-sm hidden sm:block">Enter your valid email</p>
            </div>

            <div className="col-span-2 relative w-full">
              <Input
                name="email"
                type="email"
                placeholder="example@email.com"
                icon={<EnvelopeIcon />}
              />
            </div>
          </div>

          {/* ====== Continue Button ====== */}
          <div className="flex gap-2 justify-end pt-8 border-t border-gray-200">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending || isUpdating}
              className={isPending || isUpdating ? "cursor-progress" : ""}
            >
              {isUpdating
                ? "Updating..."
                : isPending
                ? "Saving..."
                : personalDetailId
                ? "Update"
                : "Continue →"}
            </Button>
            {personalDetailId && (
              <Button
                type="submit"
                variant="primary"
                size="md"
                onClick={nextStep}
              >
                Next Page →
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
