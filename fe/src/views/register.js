import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api/userApi'
import Logo from '../components/logo'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        confirmPassword: ''
    })
    const [registerState, setRegisterState] = useState({ status: 0, err: '' })
    const navigate = useNavigate();

    const registerHandler = async () => {
        //validators
        setRegisterState({ status: 1 });
        try {
            const res = await register(registerData);
            setRegisterState({ status: 0 });
            navigate('/login', { state: { msg: 'registor success', status: 0 } })
        } catch (e) {
            if (e.response) {
                setRegisterState({
                    status: -1,
                    err: e.response.data.errors[0].msg
                })
            }
        }
    }

    return (
        <div className='bg-gray-50 min-h-screen flex justify-center items-center'>
            <div className='w-80 rounded-xl shadow-lg p-4'>
                <div className='m-3 border-b-2 border-gray-300'>
                    <Logo iconClass='w-10 h-10 text-gray-400 font-bold' nameClass='text-xl text-gray-700' />
                </div>
                <div className='flex flex-col gap-4 items-center mt-8 px-6'>
                    <input onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-md w-full' placeholder='full name' />
                    <input onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-md w-full' placeholder='email' />
                    <input onChange={(e) => setRegisterData({ ...registerData, phoneNumber: e.target.value })}
                        type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-md w-full' placeholder='phone number' />
                    <input onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        type="password" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-md w-full' placeholder='password' />
                    <input onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        type="password" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-md w-full' placeholder='comfirm password' />
                    <div className='text-center text-red-400 font-semibold'>
                        {registerState.status === -1 && registerState.err}
                    </div>
                    <div onClick={registerHandler} className='py-2 cursor-pointer bg-gray-400 hover:bg-gray-300 w-full rounded-lg text-center text-white text-base font-semibold'>
                        Register
                    </div>
                    <Link className='py-2 cursor-pointer bg-white hover:bg-gray-100 w-full rounded-lg text-center text-gray-500 text-base font-semibold border-2 border-gray-100' to='/'>
                        Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
