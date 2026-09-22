import { UserResponse } from "@/types";
import apiClient from "./apiClient";

export default class UserService {

    async getUsers(params: any): Promise<UserResponse> {
        const response = await apiClient.get<UserResponse>("/user/users/", {
            params
        });
        return response.data;
    }

    async addUser(data: any) {
        const response = await apiClient.post<any>("user/add/", data);
        return response.data.data;
    }
}