type PersonalDetailPayload = {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  gender: string;
  mobile_number: string;
  pan_number: string;
  voter_id?: string;
  is_step_completed?: boolean;
}
type PersonalDetailCreatePayload = {
  personal_details: PersonalDetailPayload;
};

export interface PersonalDetail {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  mobile_number: string;
  pan_number: string;
  voter_id?: string;
  is_step_completed: boolean;
  created_by: string;
  updated_by: string | null;
}

export interface ApiSuccessResponse<T, E = unknown> {
  status: boolean;
  message: string;
  data: T;
  errors?: E;
}
