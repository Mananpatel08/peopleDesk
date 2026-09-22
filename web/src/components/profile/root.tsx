"use client";
import { useState } from "react";
import { Button, Input } from "../ui";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import profileIcon from "../../../public/icons/user-icon.png";
import Image from "next/image";

export const ProfileRoot = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("Manan");
  const [lastName, setLastName] = useState("Patel");
  const [email, setEmail] = useState("manan@example.com");
  const [username, setUsername] = useState("manan");

  return (
    <div className=" p-6 flex justify-center items-start">
      {/* Card */}
      <div className="w-full max-w-3xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative h-44 w-full">
            <img
              src={"https://images.unsplash.com/photo-1506383796573-caf02b4a79ab"}
              className="h-44 w-full rounded-lg object-cover"
            // alt={currentUser?.first_name ?? "Cover image"}
            />
            <div className="absolute -bottom-7 left-6 flex items-end justify-between w-20 h-20">
              <Image
                className=" rounded-full border-4 border-white"
                src={profileIcon}
                alt="User Image"
              />
            </div>
          </div>

        </div>

        <div className="flex-1 mb-5 mt-8">
          <h1 className="text-xl font-medium">{firstName} {lastName}</h1>
          <p className="text-gray-500 text-sm">{email}</p>
        </div>

        {/* Form */}
        <div className="grid gap-6">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="first_name"
              placeholder="First Name"
              className="focus:border-gray-300"
              label="First Name"
            />
            <Input
              name="last_name"
              placeholder="Last Name"
              className="focus:border-gray-300"
              label="Last Name"
            />
          </div>

          {/* Email */}
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="focus:border-gray-300"
              label="Email"
            />
          </div>

          <Button className="w-fit">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
