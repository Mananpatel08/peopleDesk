import UserService from "@/services/userService"
import { UserResponse } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetUser = (params: any) => {
    return useQuery<UserResponse>({
        queryKey: ["get-users", params],
        queryFn: () => new UserService().getUsers(params),
    })
}

export const useAddUser = () => {
    return useMutation({
        mutationKey: ["add-user"],
        mutationFn: (data: any) => new UserService().addUser(data),
    })
}