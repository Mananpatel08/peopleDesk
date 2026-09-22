import React from 'react'
import { CommonDropdown } from '../ui'

export const AppearanceRoot = () => {
    return (
        <div className="vertical-scrollbar scrollbar-md mx-auto h-full w-full flex flex-col px-8 md:px-20 lg:px-36 xl:px-56 py-10 md:py-16">
            <div className="w-full max-w-3xl">
                <h2 className="flex flex-col gap-1 py-4 border-b border-gray-200 mb-8 text-2xl font-medium">
                    Appearance
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-3xl">
                <div className='flex flex-col gap-1'>
                    <p className="block text-lg font-medium text-gray-700">
                        Theme
                    </p>
                    <span className='text-sm text-gray-500'>Select or customize your interface color scheme.</span>
                </div>

                <CommonDropdown
                    options={[
                        { label: 'Light', value: 'light' },
                        { label: 'Dark', value: 'dark' },
                        { label: 'System Default', value: 'system' },
                    ]}
                    placeholder="Select Theme"
                
                />

            </div>
        </div>
    )
}
