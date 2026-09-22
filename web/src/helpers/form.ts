import { Mars, Venus, VenusAndMars } from "lucide-react";

export const GENDER_OPTIONS = [
    { label: "Male", value: "male", icon: Mars },
    { label: "Female", value: "female", icon: Venus },
    // { label: "Other", value: "other", icon: VenusAndMars },
]

export const ATTEMP_OPTIONS = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
];

export const POST_OPTIONS = [
    { label: "Revenue Clerk", value: "revenue_clerk" },
    { label: "Revenue Talati", value: "revenue_talati" },
    { label: "Deputy Mamlatdar", value: "deputy_mamlatdar" },
]

export const EXAM_TYPES = ["pre_service", "ccc", "ccc_plus", "lrq", "hrq"] as const;

export const canSubmit = (
    currentStep: number,
    completedSteps: any[]
  ): boolean => {
    // Every step from 1 → currentStep-1 must be completed
    for (let i = 1; i < currentStep; i++) {
      if (!completedSteps.includes(i)) {
        return false;
      }
    }
    return true;
  };
  