"use client";

import React, { useState } from "react";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Button, CommonDropdown, DatePicker, Input } from "@/components/ui";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { resolve } from "path";
import { serviceDetailsSchema } from "@/validation/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ATTEMP_OPTIONS, EXAM_TYPES, POST_OPTIONS } from "@/helpers/form";
import { useServiceDetails, useUpdateServiceDetails } from "@/hooks/useForm";
import { ServiceDetails, ServiceDetailsPayload } from "@/types";
import { useToast } from "@/context";
import dayjs from "dayjs";
interface ServiceDetailProps {
  prevStep: () => void;
  serviceDetails?: ServiceDetails | null;
  isLoading?: boolean;
  refetch?: () => void;
  canSubmit: boolean;
  formId: string;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({
  prevStep,
  serviceDetails,
  isLoading,
  refetch,
  canSubmit,
  formId,
}) => {
  const serviceDetailsId = serviceDetails?.id;
  const { mutateAsync: createServiceDetails, isPending } = useServiceDetails();
  const { mutateAsync: updateServiceDetails, isPending: isUpdating } =
    useUpdateServiceDetails(serviceDetailsId || "");
  const { setToast } = useToast();
  const methods = useForm({
    resolver: yupResolver(serviceDetailsSchema),
    mode: "onSubmit",
    defaultValues: serviceDetails
      ? {
          joining_appointment_date: serviceDetails.joining_appointment_date,
          regular_appointment_date: serviceDetails.regular_appointment_date,
          post_at_appointment: serviceDetails.post_at_appointment,
          ppan: serviceDetails.ppan,
          pran: serviceDetails.pran,
          exams: serviceDetails.exams.map((exam) => ({
            exam_type: exam.exam_type,
            passing_date: exam.passing_date,
            attempt_count: exam.attempt_count,
          })),
        }
      : {
          joining_appointment_date: "",
          regular_appointment_date: null,
          post_at_appointment: "",
          ppan: "",
          pran: "",
          exams: EXAM_TYPES.map((type) => ({
            exam_type: type,
            passing_date: null,
            attempt_count: undefined,
          })),
        },
  });
  const { fields } = useFieldArray({
    control: methods.control,
    name: "exams",
  });

  const onSubmit = async (data: any) => {
    try {
      if (serviceDetailsId) {
        await updateServiceDetails(data);
        setToast({
          type: "success",
          title: "Success",
          message: "Service details updated successfully.",
        });
      } else {
        const createPayload = {
          ...data,
          is_step_completed: true,
          root_form_id: formId,
        };
        await createServiceDetails(createPayload);
      }
      refetch?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full sm:w-5/6 px-auto px-3 sm:px-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 hidden sm:block">
        Service Details
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* ====== Joining / Appointment ====== */}
          <div className="grid grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Joining / Appointment Date
              </label>
              <p className="text-gray-400 text-sm">Date of appointment</p>
            </div>

            <div className="col-span-2">
              <DatePicker
                name="joining_appointment_date"
                placeholder="Joining Appointment Date"
                minDate="1967-01-01"
                maxDate={dayjs().format("YYYY-MM-DD")}
              />
            </div>
          </div>

          {/* ====== Joining / Appointment ====== */}
          <div className="grid grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Regular Appointment Dates
              </label>
              <p className="text-gray-400 text-sm">Date of appointment</p>
            </div>

            <div className="col-span-2">
              <DatePicker
                name="regular_appointment_date"
                placeholder="Regular Appointment Date"
                minDate="2005-01-01"
                maxDate={dayjs().format("YYYY-MM-DD")}
              />
            </div>
          </div>

          {/* ====== Post at Appointment ====== */}
          <div className="grid grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Post at Appointment
              </label>
              <p className="text-gray-400 text-sm">
                Select initial designation
              </p>
            </div>

            <div className="col-span-2">
              <Controller
                name="post_at_appointment"
                control={methods.control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <CommonDropdown
                    options={POST_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select a country"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-3 items-start gap-6 mb-4"
            >
              <div>
                <label className="text-gray-700 font-medium capitalize">
                  {field.exam_type.replace("_", " ")} Exam Details
                </label>
                <p className="text-gray-400 text-sm">
                  Passing date & attempt count
                </p>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Controller
                  control={methods.control}
                  name={`exams.${index}.passing_date`}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      placeholder="Passing Date"
                      isClearable={true}
                      minDate="1967-01-01"
                      maxDate={dayjs().format("YYYY-MM-DD")}
                    />
                  )}
                />

                <Controller
                  control={methods.control}
                  name={`exams.${index}.attempt_count`}
                  render={({ field, fieldState }) => {
                    return (
                      <CommonDropdown
                        options={ATTEMP_OPTIONS}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Attempt Count"
                        optionClassName="flex w-fit"
                        error={fieldState.error?.message}
                        isClearable={true}
                      />
                    );
                  }}
                />
              </div>
            </div>
          ))}

          {/* ====== PPAN ====== */}
          <div className="grid grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Permanent Pension Account Number (PPAN)
              </label>
              <p className="text-gray-400 text-sm">Enter PPAN number</p>
            </div>

            <div className="col-span-2 relative">
              <Input
                placeholder="110105295155"
                name="ppan"
                icon={<IdentificationIcon className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* ====== PRAN ====== */}
          <div className="grid grid-cols-3 items-start gap-6">
            <div>
              <label className="text-gray-700 font-medium">
                Permanent Retirement Account Number (PRAN)
              </label>
              <p className="text-gray-400 text-sm">Enter PRAN number</p>
            </div>

            <div className="col-span-2 relative">
              <Input
                placeholder="110105295155"
                name="pran"
                icon={<IdentificationIcon className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* ====== Action Buttons ====== */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <Button
              variant="secondary"
              size="md"
              type="button"
              onClick={prevStep}
            >
              ← Back
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={isPending || isUpdating || !canSubmit}
            >
              {isUpdating
                ? "Updating..."
                : isPending
                ? "Saving..."
                : serviceDetailsId
                ? "Update"
                : "Submit"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
