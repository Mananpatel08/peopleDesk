"use client";

import React, { useState } from 'react'
import { Button } from '../ui'
import { PlusIcon } from 'lucide-react'
import UserTable from './user-table'
import { CreateUserModal } from './create-user-modal'

export const UserListRoot = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <CreateUserModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className='w-full h-full bg-gray-100 p-4'>
                <div className='flex items-center justify-between py-2 mb-3'>
                    <h2>Users List</h2>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className='flex items-center gap-2 font-normal bg-blue-100/50 border border-blue-600 text-blue-600 hover:bg-blue-100'
                    >
                        <PlusIcon className='h-4 w-4' />
                        Add User
                    </Button>
                </div>

                <UserTable />
            </div>
        </>
    )
}