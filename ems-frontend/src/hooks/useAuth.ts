import AuthService from "@/services/authService";
import { User } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation";


export const useLogin = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: (data: { email: string; password: string }) =>
            new AuthService().login(data),
    });
};

export const useLogout = () => {
    return useMutation({
        mutationKey: ["logout"],
        mutationFn: () => new AuthService().logout(),
        onSuccess: () => {
            window.location.href = "/login";
        }
    });
};

export const useUser = () => {
    const pathname = usePathname();

    const skipProfilePaths = new Set([
        "/login",
    ]);

    return useQuery<User>({
        queryKey: ["user"],
        queryFn: () => new AuthService().me(),
        select: (data: any) => data.data,
        enabled: !skipProfilePaths.has(pathname),
        retry: false
    });
}