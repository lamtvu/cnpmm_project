import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import * as yup from 'yup'
import { updateDiscountAction } from '../store/actions/discountAction';
import { getDiscountAPI } from '../api/discountApi';

const schema = yup.object().shape({
    value: yup.number().min(0).max(1).required(),
    endDate: yup.date().required(),
})

const EditDiscount = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editState, setEditState] = useState(null)
    const [errors, setErrors] = useState({});
    const [notfound, setNotfound] = useState(false);
    const dispatch = useDispatch();

    const changeStateHandler = async (key, value) => {
        const temp = { ...editState, [key]: value };
        try {
            await schema.validateAt([key], temp);
            delete errors[key];
            setErrors({ ...errors })
        } catch (err) {
            console.log(err)
            setErrors({ ...errors, [key]: err.errors[0] })
        }
        setEditState(temp)
    }

    useEffect(() => {
        getDiscoust()
    }, [])

    const getDiscoust = async () => {
        try {
            const res = await getDiscountAPI(id);
            const { value, endDate } = res.data;
            setEditState({ value: value, endDate: new Date(endDate) })
        } catch {
            setNotfound(true);
        }
    }

    const onSubmit = async () => {
        try {
            await schema.validate(editState);
            dispatch(updateDiscountAction(id, {
                ...editState,
                endDate: editState.endDate.getTime()
            }, navigate));
        } catch (err) {
            console.log(err.errors);
        }
    }

    return (
        <div>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full flex items-center gap-3'>
                <Link to='/admin/discounts'>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    Discount management / Create Discount
                </div>
            </div>

            <div className='px-6 xl:px-16 py-2'>
                {editState && (
                    <div>
                        <label className='pt-4 block'>
                            <div className='flex gap-4'>
                                <p className='font-semibold'>Value (0-1):</p>
                                <p className='font-semibold text-red-500'>{errors?.value}</p>
                            </div>
                            <input type='number' className=' focus:outline-none border-2 px-3 py-1'
                                value={editState.value} onChange={(e) => changeStateHandler('value', e.target.value)} />
                        </label>
                        <label className='pt-4 block'>
                            <div className='flex gap-4'>
                                <p className='font-semibold'>Date end:</p>
                                <p className='font-semibold text-red-500'>{errors?.endDate}</p>
                            </div>
                            <div className='w-96'>
                                <DatePicker
                                    selected={editState.endDate}
                                    onChange={(e) => changeStateHandler('endDate', e)}
                                    className='focus:outline-none border-2 px-3 py-1 w-full'
                                />
                            </div>
                        </label>
                        <button className='focus:outline-none shadow-md py-2 px-4 mt-4'
                            onClick={onSubmit}
                        >Update</button>
                    </div>
                )}
                {notfound && <div className='text-xl font-semibold'>Not Found</div>}
            </div>
        </div>
    )
}

export default EditDiscount
