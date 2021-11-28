import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Loading from '../components/loading'
import { userChangePasswordAction } from '../store/actions/userAction'

const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'invalid comfirm password'),
    oldPassword: yup.string().required()
})

const ChangePassword = () => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const naviagate = useNavigate()

    const onChange = async () => {
        try {
            await schema.validate(data);
            dispatch(userChangePasswordAction(data, naviagate));
        } catch (err) {
            setErrors(err.errors);
        }
    }

    const changeData = (key, value) => {
        setData({ ...data, [key]: value })
    }

    return (
        <div className='min-h-screen'>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full flex items-center gap-4'>
                <Link to='/user/information'>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    Information / Change Password
                </div>
            </div>

            <div className='px-16'>
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <div className='text-md font-semibold capitalize'>password:</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="password"
                            autoComplete="off"
                            onChange={(e) => changeData('password', e.target.value)}
                            className={`w-full outline-none border-2 rounded-md py-1 px-2`} />
                    </div>
                </label>
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <div className='text-md font-semibold capitalize'>comfirm password:</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="password"
                            autoComplete="off"
                            onChange={(e) => changeData('confirmPassword', e.target.value)}
                            className={`w-full outline-none border-2 rounded-md py-1 px-2`} />
                    </div>
                </label>
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <div className='text-md font-semibold capitalize'>old password:</div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="password"
                            autoComplete="off"
                            onChange={(e) => changeData('oldPassword', e.target.value)}
                            className={`w-full outline-none border-2 rounded-md py-1 px-2`} />
                    </div>
                </label>
                {errors && <div className='my-4 bg-red-400 font-semibold text-white p-4'>
                    {errors.map(e => <p>{e}</p>)}
                </div>}
                {user?.error && <div className='my-4 bg-red-400 font-semibold text-white p-4'>
                    {user.error}
                </div>}
                <div className='flex justify-center'>
                    <button className='focus:outline-none py-2 w-52 shadow-md bg-gray-100 hover:shadow-lg'
                        onClick={onChange} >
                        {user?.loading && <Loading />}
                        change</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
