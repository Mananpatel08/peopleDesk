import { User } from "@/types";
import apiClient from "./apiClient";
import { LoginResponse } from "@/types/login";

export default class AuthService {
    async login(data: { email: string; password: string }) {
        const response = await apiClient.post<LoginResponse>("user/login/", data);
        return response.data;
    }

    async logout() {
        const response = await apiClient.post("user/logout/");
        return response.data;
    }

    async me() {
        const response = await apiClient.get<User>("user/me/");
        return response.data;
    }
}