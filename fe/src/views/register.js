import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/logo'

const Register = () => {
    return (
        <div className='bg-gradient-to-r from-purple-700 to-purple-400 min-h-screen flex justify-center items-center'>
            <div className='w-80 bg-gray-50 rounded-xl shadow-lg p-4'>
                <div className='m-3 border-b-2 border-gray-300'>
                    <Logo iconClass='w-10 h-10 text-purple-400 font-bold' nameClass='text-xl text-purple-700' />
                </div>
                <div className='flex flex-col gap-4 items-center mt-8 px-6'>
                    <input type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='username' />
                    <input type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='email' />
                    <input type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='phone number' />
                    <input type="password" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='password' />
                    <input type="password" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='comfirm password' />
                    <div className='py-2 cursor-pointer bg-purple-400 hover:bg-purple-300 w-full rounded-lg text-center text-white text-base font-semibold'>
                        Register
                    </div>
                    <Link className='py-2 cursor-pointer bg-white hover:bg-purple-100 w-full rounded-lg text-center text-purple-500 text-base font-semibold border-2 border-purple-100' to='/'>
                        Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
