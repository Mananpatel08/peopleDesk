"use client";

import React, { useState } from 'react'
import { Eye, EyeOff } from "lucide-react";
import { EModalPosition, EModalWidth, ModalCore } from '../ui/modals'
import { Button, Input } from '../ui';
import { cn } from '@/helpers';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { generatePassword } from '@/helpers/passwrdGenerate';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '@/validation/userSchema';
import { useAddUser, useGetUser } from '@/hooks/useUser';
import { useToast } from '@/context';

type Props = {
    isOpen: boolean
    onClose: () => void
}
export const CreateUserModal: React.FC<Props> = (props) => {
    const { isOpen, onClose } = props;
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { mutateAsync: createUser, isPending } = useAddUser();
    const { refetch } = useGetUser({});
    const { setToast } = useToast();

    const togglePassword = () => setShowPassword(prev => !prev);

    const methods = useForm({
        resolver: yupResolver(userSchema),
        mode: "onChange",
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        },
    });

    const handleClose = () => {
        onClose();
        setShowPassword(false);
        methods.reset();
    }

    const handlePassworGenerate = () => {
        setIsGenerating(true);
        try {
            setShowPassword(true);
            const gPassword = generatePassword();
            methods.setValue("password", gPassword);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    }

    const onSubmit = async (data: any) => {
        try {
            const res = await createUser(data);
            refetch();
            handleClose();
            setToast({
                type: "success",
                title: "Success",
                message: "User created successfully.",
            })
        } catch (error) {
            console.error(error);
            setToast({
                type: "failed",
                title: "Error",
                message: "Failed to create user.",
            })
        }
    }

    return (
        <ModalCore
            isOpen={isOpen}
            position={EModalPosition.TOP}
            width={EModalWidth.LG}
        >

            <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <h2 className="text-lg font-medium text-gray-900">Create User</h2>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-2 gap-4 px-5 mb-5'>
                        <Input name='first_name' placeholder='First Name' />
                        <Input name='last_name' placeholder='Last Name' />
                        <div className='col-span-2'>
                            <Input name='email' placeholder='User Email' />
                        </div>
                        <div className='col-span-2'>
                            <div className='relative'>
                                <input
                                    {...methods.control.register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
                                    })}
                                    type={showPassword ? "text" : "password"}
                                    className={cn(
                                        "w-full rounded-xl border px-3 py-2 outline-none focus:ring-0.5",
                                        methods.formState.errors.password
                                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                                    )}
                                    placeholder='Password'
                                />
                                {isGenerating && (<span className="w-4 h-4 border-2 absolute right-10 top-3 border-blue-400 border-t-transparent rounded-full animate-spin" />)}
                                {showPassword ? (
                                    <Eye onClick={togglePassword} className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700" />
                                ) : (
                                    <EyeOff onClick={togglePassword} className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700" />
                                )}
                            </div>
                            <button type='button' onClick={handlePassworGenerate} className='flex items-center gap-1 mt-1.5 text-blue-400 hover:text-blue-600 cursor-pointer w-fit'>
                                <SparklesIcon className="h-3.5 w-3.5" />
                                <span className='text-xs'>Generate Secure Password</span>
                            </button>
                        </div>
                    </div>
                    <div className="px-5 py-4  flex flex-col-reverse sm:flex-row sm:justify-end gap-2 border-t-[0.5px] border-custom-border-200">
                        <Button variant="secondary" size="sm" onClick={handleClose} type='button'>
                            Cancel
                        </Button>
                        <Button variant="primary" size="sm" type='submit' disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </FormProvider>



        </ModalCore>
    )
}
