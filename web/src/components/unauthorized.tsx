"use client";

import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import React from 'react'
import { Button } from './ui';
import { useRouter } from "next/navigation";

export default function AuthorizerPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="flex flex-col items-center text-center space-y-4">
                <ShieldExclamationIcon className="w-14 h-14 text-blue-700" />
                <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">Authorization Needed</h1>

                <p className="max-w-md text-gray-600 text-base leading-relaxed">
                    You don't have access to this page. Please continue to login and verify your
                    identity to proceed.
                </p>

                <Button onClick={() => { router.push("/login") }}>
                    Go to Login
                </Button>
            </div>
        </div>
    );
}