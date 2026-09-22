"use client";
import { EmployeeForm } from "@/components/forms";
import { DashboardLayout } from "@/components/layout";
import { useParams } from "next/navigation";
import React from "react";

const FromDetailPage = () => {
  const { formId } = useParams<{ formId: string }>();
  return (
    <DashboardLayout>
      <EmployeeForm propFormId={formId} isDashboard />
    </DashboardLayout>
  );
};

export default FromDetailPage;
