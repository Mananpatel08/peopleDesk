import { UserGreetingsView } from '@/components/dashboard'
import DashboardCards from '@/components/dashboard/dashboard-cards'
import { DashboardLayout } from '@/components/layout'


import React from 'react'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <>
        <UserGreetingsView />
        <DashboardCards />
      </>
    </DashboardLayout>
  )
}

export default Dashboard