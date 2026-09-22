// const exam_types = "pre_service" | "ccc" | "ccc_plus" | "lrq" | "hrq";

type Exam = {
    exam_type: string;
    passing_date?: string;
    attempt_count?: number;
};

type ServiceDetailsPayload = {
    joining_appointment_date: string;
    regular_appointment_date?: string;
    post_at_appointment: string;
    ppan?: string;
    pran?: string;
    exams?: Exam[];
    root_form_id: string;
    is_step_completed: boolean
};

export interface ServiceDetails {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    joining_appointment_date: string;
    regular_appointment_date: string;
    post_at_appointment: string;
    ppan: string;
    pran: string;
    exams: Exam[];
    is_step_completed: boolean;
    created_by: string;
    updated_by: string | null;
}
