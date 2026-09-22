import Image from "next/image";
import EMSBackgroundPattern from '../../../public/auth/bg-white.jpg';
import EMSLogo from '../../../public/logos/light-ens-logo.png';
import { AuthRoot } from "@/components/auth-forms";

export default function Login() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={EMSBackgroundPattern}
          className="object-cover w-full h-full opacity-25"
          alt="EMS background pattern"
        />
      </div>
      <div className="relative z-10 flex flex-col w-screen h-screen overflow-hidden overflow-y-auto">
        <div className="container relative flex items-center justify-between shrink-0 min-w-full px-10 pb-4 transition-all lg:px-20 xl:px-36">
          <div className="flex items-center py-6">
            <Image
              src={EMSLogo}
              alt="EMS Logo"
              className="w-[75px] h-8 object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center flex-grow container h-[100vh-60px] mx-auto max-w-lg px-10 lg:max-w-md lg:px-5 transition-all">
          <AuthRoot />
        </div>
      </div>
    </main>
  );
}
