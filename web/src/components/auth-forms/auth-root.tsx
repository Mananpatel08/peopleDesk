"use client";

import React, { use, useEffect, useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/context";
import Checkbox from "../ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { LoginFormData } from "@/types/login";
import Cookies from "js-cookie";

export const AuthRoot = () => {
    const router = useRouter();
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [defaultValues, setDefaultValues] = useState({ email: "", password: "" });
    const { mutateAsync: login, isPending } = useLogin();
    const { setToast } = useToast();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        mode: "onChange",
        defaultValues,
    });
    const togglePassword = () => setShowPassword(prev => !prev);
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data);
            const access = response.data.access;
            const user_role = response.data.user.user_role;
            Cookies.set("token", access, {
                expires: 7,
                secure: true,
                sameSite: "None",
                path: "/",
            });
            if (remember) {
                localStorage.setItem("rememberedEmail", data.email);
                localStorage.setItem("rememberedPassword", data.password);
            } else {
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
            }
            console.log("role", user_role)
            if (response.status && user_role === "SUPER_ADMIN") {
                router.push("/");
            } else {
                router.push("/form");
            }
        } catch (error: any) {
            console.error(error);
            const err = error?.response?.data?.message?.message || error?.response?.data?.message?.error
            setToast({
                type: "failed",
                title: "Error!",
                message: err || "Invalid email or password",
            })
        }
    };
    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail") || "";
        const rememberedPassword = localStorage.getItem("rememberedPassword") || "";
        setDefaultValues({ email: rememberedEmail, password: rememberedPassword });
    }, []);

    return (
        <div className="flex items-center bg-white px-4">
            <div className="w-full max-w-sm space-y-6 text-center">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Log In
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Welcome back to EMS.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <div className="text-left space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="name@company.com"
                                        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none ${errors.email
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="text-left space-y-1.5">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                }}
                                render={({ field }) => (
                                    <div className="relative">
                                        <input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className={`w-full border rounded-md px-3 pe-10 py-2 text-sm focus:outline-none ${errors.password
                                                ? "border-red-500"
                                                : "border-gray-300"
                                                }`}
                                        />
                                        {showPassword ? (
                                            <Eye onClick={togglePassword} className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700" />
                                        ) : (
                                            <EyeOff onClick={togglePassword} className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700" />
                                        )}
                                    </div>
                                )}
                            />
                            {errors.password && (
                                <p className="text-xs text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <Checkbox setChecked={setRemember} checked={remember} />
                            <p className="text-blue-500 text-xs hover:underline cursor-pointer">Forgot Password</p>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isPending || !isValid}
                        className={`w-full ${isPending || !isValid
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            } text-white py-2.5 rounded-md text-sm font-medium transition flex justify-center items-center gap-2`}
                    >
                        {isPending ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            </>
                        ) : (
                            "Continue"
                        )}
                    </button>
                </form>

                <p className="text-xs text-gray-500">
                    By signing in, you understand and agree to our{" "}
                    <a href="#" className="underline hover:text-blue-600">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-blue-600">
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};
