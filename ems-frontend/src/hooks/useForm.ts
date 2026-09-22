import FormService from "@/services/formService"
import { FormDataResponse, FormResponse, IForm, PersonalDetailCreatePayload } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetForms = (params: any) => {
    return useQuery<FormResponse>({
        queryKey: ["get-forms", params],
        queryFn: () => new FormService().getForms(params),
    })
}

export const useFormById = (id: string) => {
    return useQuery<FormDataResponse>({
        queryKey: ["form", id],
        queryFn: () => new FormService().getForm(id),
        enabled: Boolean(id),
    })
}

export const usePersonalDetails = () => {
    return useMutation<FormDataResponse, unknown, PersonalDetailCreatePayload>({
        mutationKey: ["personal-details"],
        mutationFn: (data: any) =>
            new FormService().personalDetail(data),
    })
}

export const useUpdatePersonalDetails = (id: string) => {
    return useMutation({
        mutationKey: ["update-personal-details", id],
        mutationFn: (data: any) =>
            new FormService().updatePersonalDetail(id, data),
    })
}

export const useServiceDetails = () => {
    return useMutation({
        mutationKey: ["service-details"],
        mutationFn: (data: any) =>
            new FormService().serviceDetail(data),
    })
}

export const useUpdateServiceDetails = (id: string) => {
    return useMutation({
        mutationKey: ["update-service-details", id],
        mutationFn: (data: any) =>
            new FormService().updateServiceDetail(id, data),
    })
}