import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';

const Information = () => {
    const user = useSelector(state => state.user);
    const location = useLocation();
    return (
        <div className='bg-gray-100 border-b-2 min-h-screen'>
            <div className='px-6 xl:px-16'>
                {location.state?.msg && <div className='py-4 text-xl bg-green-300 text-center text-white font-semibold' onClick={() => {
                    console.log('delete')
                    location.state.msg = null
                }}> {location.state.msg}</div>}
                <div className='flex justify-between items-center'>
                    <div className='p-4 capitalize font-semibold text-xl text-gray-600 w-full'>Personal Information</div>
                    <div className='flex gap-4'>
                        <Link className='shadow-md whitespace-nowrap p-2 rounded-md hover:shadow-lg' to='/user/change-information'>change information</Link>
                        <Link className='shadow-md whitespace-nowrap p-2 rounded-md hover:shadow-lg' to='/user/change-password'>change password</Link>
                    </div>
                </div>

                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>name:</span> {user.name}</div>
                </div>
                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>email:</span> {user.email}</div>
                </div>
                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>phoneNumber:</span> {user.phoneNumber}</div>
                </div>
                <div className='p-4 mt-4 bg-white text-xl text-gray-700 flex flex-col gap-8'>
                    <div> <span className='capitalize font-semibold'>address:</span> {user?.address}</div>
                </div>
            </div>
        </div >
    )
}

export default Information
