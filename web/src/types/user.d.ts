import { IPagination } from "./pagination";

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_photo: string;
    form_id: string;
    user_role: string;
    date_joined: string;
};

export interface UserResponse {
    status: boolean;
    message: string;
    pagination: IPagination;
    data: User[];
}