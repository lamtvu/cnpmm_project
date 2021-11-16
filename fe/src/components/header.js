import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './logo'
import { useCookies } from 'react-cookie'

const Header = () => {
    const [cookies, _, removeCookies] = useCookies(['auth']);

    const logoutHandler = () => {
        console.log('logut')
        removeCookies('auth', { path: '/' });
    }

    return (
        <div>
            <div className='py-4 flex justify-between items-center bg-gray-50 sm:px-6 lg:px-16 shadow-md relative z-10'>
                <div>
                    <Logo className='cursor-default' iconClass='w-12 h-12 text-gray-700' nameClass='text-gray-700 text-3xl'></Logo>
                </div>
                <div className='flex gap-4 items-center'>
                    {!cookies.auth ? <div className='text-gray-400 cursor-pointer hover:text-gray-500 transform relative group'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div className='absolute z-10 bg-white left-1/2 top-full transform -translate-x-1/2 hidden
                        group-hover:block text-gray-500 rounded-lg p-1 shadow-xl'>
                            <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'>
                                <Link to='/login'>Login</Link>
                            </div>
                            <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'>
                                <Link to='/register'>Register</Link>
                            </div>
                        </div>
                    </div> : <div className='text-xl text-gray-500 cursor-default group relative'>
                        {`Hi, lamtvu`}
                        <div className='absolute z-10 bg-white left-1/2 top-full transform -translate-x-1/2 hidden
                        group-hover:block text-gray-500 rounded-lg p-1 shadow-xl'>
                            <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'>
                                <Link to='/login'>Information</Link>
                            </div>
                            <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'
                                onClick={logoutHandler}>
                                Logout
                            </div>
                        </div>
                    </div>}
                    <div className='text-gray-400 cursor-pointer hover:text-gray-500 transform'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <div className='text-gray-400 cursor-pointer hover:text-gray-500 transform'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default Header
