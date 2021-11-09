import React from 'react'
import { Link } from 'react-router-dom'
import Banner from './banner'
import Logo from './logo'

const Header = () => {
    return (
        <div className='bg-gradient-to-r from-purple-700 to-purple-400 sm:px-6 lg:px-16'>
            <div className='py-4 border-b-2 border-purple-500 flex justify-between items-center'>
                <div>
                    <Logo className='cursor-default' iconClass='w-12 h-12 text-purple-400' nameClass='text-purple-200 text-3xl'></Logo>
                </div>
                <div className='flex gap-4'>
                    <div className='text-white cursor-pointer hover:text-purple-200 transform relative group'>
                        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div className='absolute z-10 bg-purple-50 left-1/2 top-full transform -translate-x-1/2 hidden
                        group-hover:block text-black rounded-lg p-1 shadow-xl'>
                            <div className='text-lg px-8 py-2 font-semibold text-gray-500 hover:bg-purple-400 hover:text-white rounded-lg' to='/login'>
                                <Link to='/login'>Login</Link>
                            </div>
                            <div className='text-lg px-8 py-2 font-semibold text-gray-500 hover:bg-purple-400 hover:text-white rounded-lg'>
                                <Link to='/register'>Register</Link>
                            </div>
                        </div>
                    </div>
                    <div className='text-white cursor-pointer hover:text-purple-200 transform'>
                        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <div className='text-white cursor-pointer hover:text-purple-200 transform'>
                        <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                </div>
            </div>
            <Banner/>
        </div >

    )
}

export default Header
