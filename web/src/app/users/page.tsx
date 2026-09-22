
import { DashboardLayout } from '@/components/layout'
import { UserListRoot } from '@/components/user-list'
import React from 'react'

const UsersPage = () => {
    return (
        <DashboardLayout>
            <UserListRoot />
        </DashboardLayout>
    )
}

export default UsersPage