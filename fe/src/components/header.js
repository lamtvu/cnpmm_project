import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './logo'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction, setUser } from '../store/actions/userAction'

const Header = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [cookies, _, removeCookies] = useCookies(['auth']);
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.auth && cookies.auth.role === 1) dispatch(getUserAction());
    }, [])

    const logoutHandler = () => {
        console.log('logut')
        removeCookies('auth', { path: '/' });
        localStorage.removeItem('orderProducts');
        dispatch(setUser(null))
        navigate('/')
    }

    return (
        <div>
            <div className='py-4 flex justify-between items-center bg-gray-50 sm:px-6 lg:px-16 shadow-md relative z-10'>
                <Link to='/home'>
                    <Logo className='cursor-default' iconClass='w-12 h-12 text-gray-700' nameClass='text-gray-700 text-3xl'></Logo>
                </Link>
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
                        {cookies.auth.role === 1 && user && `Hi, ${user.name}`}
                        {cookies.auth.role === 0 && 'options'}
                        <div className='absolute z-10 bg-white left-1/2 top-full transform -translate-x-1/2 hidden
                        group-hover:block text-gray-500 rounded-lg p-1 shadow-xl'>
                            {cookies.auth && cookies.auth.role === 0 && (
                                <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'>
                                    <Link to='/admin'>Managements</Link>
                                </div>)}
                            {cookies.auth && cookies.auth.role === 1 && (
                                <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'>
                                    <Link to='/user/my-orders'>My orders</Link>
                                </div>)}
                            <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'>
                                <Link to='/user/information'>Information</Link>
                            </div>
                            <div className='text-lg px-8 py-2 font-semibold hover:bg-gray-100 rounded-lg'
                                onClick={logoutHandler}>
                                Logout
                            </div>
                        </div>
                    </div>}
                    {cookies.auth?.role !== 0 && <div className='flex items-center gap-4'>
                        <Link className='text-gray-400 cursor-pointer hover:text-gray-500' to='/cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </Link>
                        <Link className='text-gray-400 cursor-pointer hover:text-gray-500' to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </Link>
                    </div>
                    }
                </div>
            </div>
        </div >

    )
}

export default Header
