import { PersonalDetail } from "./personal-details";
import { ServiceDetails } from "./service-details";

export interface FormDataResponse {
  id: string;
  personal_details: PersonalDetail;
  service_details: ServiceDetails;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  step_completed: string[];
  status: string;
  completed_at: string | null;
  current_step: number;
  form_number: string;
  created_by: string;
  updated_by: string | null;
  user: string;
}

export interface IForm {
  id: string;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  step_completed: number[];
  status: string;
  completed_at: string | null;
  current_step: number;
  form_number: string;
  created_by: string;
  updated_by: string | null;
  user: string;
}

type Pagination = {
    current_page: number,
    page_size: number,
    total_items: number,
    total_pages: number,
    has_next: boolean,
    has_previous: boolean
}

export interface FormResponse {
  status: boolean;
  message: string;
  pagination: Pagination;
  data: IForm[];
}