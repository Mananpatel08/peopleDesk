"use client";

import { Button } from "@/components/ui";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
      <div className="flex flex-col items-center justify-center mb-10">
        <img src="/auth/404.gif" alt="Not Found" height={200} width={200} />
        {/* <h1 className="text-9xl font-bold text-gray-900">404</h1> */}
        <h1 className="text-2xl font-semibold text-gray-900 mt-3 mb-1 font-sans">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 max-w-md mb-6 font-sans">
          The page you are looking for doesn’t exist. Click the button below to
          go to the homepage.
        </p>

        <Button
          onClick={() => {
            router.push("/login");
          }}
          className="px-6 py-2 font-sans bg-gray-200 text-gray-900 hover:bg-gray-300"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}
