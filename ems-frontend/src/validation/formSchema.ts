import * as Yup from "yup";

export const personalDetailsSchema = Yup.object({
  first_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name must contain only letters")
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  middle_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Middle name must contain only letters")
    .min(2, "Middle name must be at least 2 characters")
    .required("Middle name is required"),
  last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Select your gender"),
  mobile_number: Yup.string()
    .matches(/^[6-9][0-9]*$/, "Enter a valid mobile number")
    .length(10, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  pan_number: Yup.string().required("PAN number is required"),
  voter_id: Yup.string().optional(),
})

export const serviceDetailsSchema = Yup.object({
  joining_appointment_date: Yup.string().required("Joining date is required"),
  post_at_appointment: Yup.string().required("Post at appointment is required"),
  regular_appointment_date: Yup.string().nullable(),
  ppan: Yup.string().optional(),
  pran: Yup.string().optional(),
  exams: Yup.array().of(
    Yup.object({
      exam_type: Yup.string().required("Exam type is required"),
      passing_date: Yup.string().nullable(),
      attempt_count: Yup.number()
        .transform((value, originalValue) =>
          originalValue === undefined || originalValue === "" ? undefined : value
        )
        .typeError("Attempt count must be a number")
        .nullable(),
    }).test("passing-and-attempt-required", function (value) {
      const { passing_date, attempt_count } = value || {};

      if (passing_date && !attempt_count) {
        return this.createError({
          path: `${this.path}.attempt_count`,
          message: "Please fill attempt count",
        });
      }

      if (!passing_date && attempt_count) {
        return this.createError({
          path: `${this.path}.passing_date`,
          message: "Please fill passing date",
        });
      }

      return true;
    })
  ),
});
