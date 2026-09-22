import React from 'react'
import FormTable from './form-table'

export const FormListRoot = () => {
    return (
        <div className='w-full h-full bg-gray-100 p-4'>
            <div className='flex items-center justify-between py-4 mb-3'>
                <h2>Forms List</h2>
            </div>

            <FormTable />
        </div>
    )
}
