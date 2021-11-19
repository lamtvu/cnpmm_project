import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../api/userApi'
import Logo from '../components/logo'
import { useCookies } from 'react-cookie'

const Login = () => {
    const [banner, setBanner] = useState(null);
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [loginState, setLoginSate] = useState({ status: 0, err: '' })
    const [cookies, setCookies] = useCookies(['auth']);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        setBanner(location.state)
    }, [])

    const loginHandler = async () => {
        if (!loginData.username) {
            setLoginSate({ status: -1, err: 'username requied' });
            return;
        }
        if (!loginData.password) {
            setLoginSate({ status: -1, err: 'password required' });
            return;
        }
        setLoginSate({ ...loginState, status: 1 });
        try {
            const res = await login(loginData);
            setCookies('auth', res.data.data);
            if (res.data.data.role === 1) navigate('/');
            else navigate('/admin')

        } catch (e) {
            if (e.response) {
                setLoginSate({ status: -1, err: e.response.data.msg })
            }
        }
    }

    return (
        <div className='bg-gray-100 relative'>
            {banner && < div className={`p-4 ${banner.status === 0 ? 'bg-green-300' : 'bg-red-400'} text-lg font-semibold absolute w-full text-center text-white`}
                onClick={() => setBanner(null)}>
                {banner.msg}
            </div>}
            <div className=' min-h-screen flex justify-center items-center'>
                <div className='w-80 py-4 bg-gray-50 rounded-xl shadow-lg'>
                    <div className='m-3 border-b-2 border-gray-300'>
                        <Logo iconClass='w-10 h-10 text-gray-500 font-bold' nameClass='text-xl text-gray-600' />
                    </div>
                    <div className='flex flex-col gap-4 items-center mt-8 px-6'>
                        <input value={loginData.username}
                            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                            type="text" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='username/email    ' />
                        <input value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            type="password" className='border-2 border-gray-300 px-4 py-1 rounded-lg outline-none transform focus:-translate-y-1 focus:shadow-lg w-full' placeholder='password' />
                        <div className='text-center text-red-400 font-semibold'>
                            {loginState.status === -1 && loginState.err}
                        </div>
                        <div onClick={loginHandler} className='py-2 cursor-pointer bg-gray-400 hover:bg-gray-300 w-full rounded-lg text-center text-white text-base font-semibold'>
                            Login
                        </div>
                        <Link className='py-2 cursor-pointer bg-white hover:bg-gray-100 w-full rounded-lg text-center text-gray-500 text-base font-semibold border-2 border-purple-100' to='/'>
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login
