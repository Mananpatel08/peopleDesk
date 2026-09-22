import { User } from "./user";

interface UserData {
    refresh: string;
    access: string;
    user: User;
}

interface LoginResponse {
    status: boolean;
    message: string;
    data: UserData;
    errors: null | Record<string, string[]>;
}

interface LoginFormData {
    email: string;
    password: string;
}