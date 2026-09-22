import React from 'react'
import ProfileDropdown from '../ui/profile-dropdown'
import EMSLogo from '../../../public/logos/light-ens-logo.png'
import Image from "next/image";

export const FormHeader = () => {
    return (
        <>
        <div className='sticky top-0 left-0 w-full py-2.5 px-10 bg-white border-b flex items-center justify-between z-50'>
                <div className='flex items-center'>
                    <Image
                        src={EMSLogo}
                        alt="EMS Logo"
                        className="w-[75px] h-8 object-contain"
                    />
                </div>
                <div className='flex items-center'>
                    <ProfileDropdown />
                </div>
            </div>
        </>
    )
}
