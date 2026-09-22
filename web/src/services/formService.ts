import { ApiSuccessResponse, FormDataResponse, FormResponse, PersonalDetail, PersonalDetailCreatePayload, PersonalDetailPayload, ServiceDetailsPayload } from "@/types";
import apiClient from "./apiClient";

export default class FormService {

    // GET FORMS
    async getForms(params: any): Promise<FormResponse> {
        const response = await apiClient.get<FormResponse>(`/form/`, {
            params
        });
        return response.data;
    }

    // GET FORM BY ID
    async getForm(id: string): Promise<FormDataResponse> {
        const response = await apiClient.get<FormDataResponse>(`/form/${id}/`);
        return response.data;
    }

    // CREATE PERSONAL DETAILS STEP
    async personalDetail(data: PersonalDetailCreatePayload) {
        const response = await apiClient.post<ApiSuccessResponse<FormDataResponse>>("/form/", data);
        return response.data.data;
    }

    // UPDATE PERSONAL DETAILS STEP
    async updatePersonalDetail(id: string, data: PersonalDetailPayload) {
        const response = await apiClient.put<PersonalDetail>(`/form/personal-details/${id}/`, data);
        return response.data;
    }

    // CREATE SERVICE DETAILS STEP
    async serviceDetail(data: ServiceDetailsPayload) {
        const response = await apiClient.post("/form/service-details/", data);
        return response.data;
    }

    // UPDATE SERVICE DETAILS STEP
    async updateServiceDetail(id: string, data: ServiceDetailsPayload) {
        const response = await apiClient.put(`/form/service-details/${id}/`, data);
        return response.data;
    }

}