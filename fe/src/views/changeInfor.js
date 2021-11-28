import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AddressDialog from './addressDialog'
import * as yup from 'yup'
import { userChangeInfoAction } from '../store/actions/userAction'
import Loading from '../components/loading'

const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
const schema = yup.object().shape({
    name: yup.string().min(5),
    phoneNumber: yup.string().matches(phoneRegExp, 'invalid phone number')
})

const ChangeInfor = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [changeData, setChangeData] = useState({});
    const [errors, setErrors] = useState({});
    const [errMsg, setErrMsg] = useState(null);

    const onChange = async () => {
        setErrMsg(null);
        try {
            await schema.validate(changeData);
            dispatch(userChangeInfoAction(changeData, navigate));
        } catch (error) {
            setErrMsg(error.errors)
        }
    }

    const dataChangeHandler = async (key, value) => {
        const temp = { ...changeData, [key]: value };
        try {
            await schema.validateAt([key], temp);
            delete errors[key];
            setErrors({ ...errors })
        } catch (err) {
            console.log(errors)
            setErrors({ ...errors, [key]: err.errors })
        }
        setChangeData(temp)
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
                    Information / Change Information
                </div>
            </div>

            <div className='px-16'>
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <div className='text-md font-semibold capitalize'>name:</div>
                        {errors.name && <div className='text-red-500 font-semibold'>{errors.name[0]}</div>}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="text" name="productName"
                            defaultValue={user?.name}
                            autoComplete="off"
                            onChange={(e) => dataChangeHandler('name', e.target.value)}
                            className={`w-full outline-none border-2 rounded-md py-1 px-2 ${errors.name && 'border-red-500'}`} />
                    </div>
                </label>
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <div className='text-md font-semibold capitalize'>phone:</div>
                        {errors.phoneNumber && <div className='text-red-500 font-semibold'>{errors.phoneNumber[0]}</div>}
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input type="text" name="productName"
                            defaultValue={user?.phoneNumber}
                            autoComplete="off"
                            onChange={(e) => dataChangeHandler('phoneNumber', e.target.value)}
                            className={`w-full outline-none border-2 rounded-md py-1 px-2 ${errors.phoneNumber && 'border-red-500'}`} />
                    </div>
                </label>
                <div className='pt-4 block'>
                    <div className='text-md font-semibold capitalize'>address:</div>
                    <div className='flex gap-2 items-center'>
                        <p className='w-full outline-none border-2 rounded-md py-1 px-2' style={{ minHeight: '40px' }}>{changeData.address || user.address}</p>
                    </div>
                    <AddressDialog
                        onOk={(e) => dataChangeHandler('address', e)}
                    />
                </div>
                {errMsg && <div className='p-4 text-white bg-red-400 rounded-md my-4'>
                    {errMsg.map(e => (
                        <p key={e._id}>{e}</p>
                    ))}
                </div>}
                <div className='flex justify-center'>
                    <button className='focus:outline-none py-2 w-52 shadow-md bg-gray-100 hover:shadow-lg'
                        onClick={onChange} >
                        {user?.loading && <Loading />}
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangeInfor
