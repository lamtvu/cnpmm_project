import React from 'react'
import { useSelector } from 'react-redux'

const Information = () => {
    const user = useSelector(state => state.user);
    return (
        <div className='bg-gray-100 border-b-2 min-h-screen'>
            <div className='px-6 xl:px-16'>
                <div className='p-4 capitalize font-semibold text-xl text-gray-600 w-full'>Personal Information</div>
                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>name:</span> {user.name}</div>
                </div>
                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>email:</span> {user.email}</div>
                </div>
                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>phoneNumber:</span> {user.phoneNumber}</div>
                </div>
            </div>
        </div>
    )
}

export default Information
