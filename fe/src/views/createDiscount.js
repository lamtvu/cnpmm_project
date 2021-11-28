import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import AsyncSelect from 'react-select/async';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { searchProductsAPI } from '../api/productApi';
import * as yup from 'yup'
import { createDiscountAction } from '../store/actions/discountAction';

const schema = yup.object().shape({
    value: yup.number().min(0).max(1).required(),
    endDate: yup.date().required(),
    products: yup.array(),
})

const CreateDiscount = () => {
    const navigate = useNavigate();

    const [createState, setCreateState] = useState({
        value: 0.1,
        endDate: new Date(),
        products: []
    })
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const changeCreateStateHandler = async (key, value) => {
        const temp = { ...createState, [key]: value };
        try {
            await schema.validateAt([key], temp);
            delete errors[key];
            setErrors({ ...errors })
        } catch (err) {
            console.log(err)
            setErrors({ ...errors, [key]: err.errors[0] })
        }
        setCreateState(temp)
    }

    const onSubmit = async () => {
        try {
            await schema.validate(createState);
            dispatch(createDiscountAction({
                ...createState,
                endDate: createState.endDate.getTime()
            }, navigate));
        } catch (err) {
            console.log(err.errors);
        }
    }

    const loadProducts = async (inputValue, callback) => {
        try {
            const res = await searchProductsAPI(inputValue, 10, 0);
            const options = res.data.results.map(p => {
                return { label: p.name, value: p._id }
            })
            callback(options);
        } catch {
            callback([])
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
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <p className='font-semibold'>Value (0-1):</p>
                        <p className='font-semibold text-red-500'>{errors?.value}</p>
                    </div>
                    <input type='number' className=' focus:outline-none border-2 px-3 py-1'
                        value={createState.value} onChange={(e) => changeCreateStateHandler('value', e.target.value)} />
                </label>
                <label className='pt-4 block'>
                    <div className='flex gap-4'>
                        <p className='font-semibold'>Date end:</p>
                        <p className='font-semibold text-red-500'>{errors?.endDate}</p>
                    </div>
                    <div className='w-96'>
                        <DatePicker
                            selected={createState.endDate}
                            onChange={(e) => changeCreateStateHandler('endDate', e)}
                            showTimeSelect
                            className='focus:outline-none border-2 px-3 py-1 w-full'
                        />
                    </div>
                </label>

                <label className='pt-4 block'>
                    <p className='font-semibold'>Products:</p>
                    <AsyncSelect isMulti={true}
                        onChange={(e) => { changeCreateStateHandler('products', e.map(o => o.value)) }}
                        loadOptions={loadProducts}
                    />
                </label>
                <button className='focus:outline-none shadow-md py-2 px-4 mt-4'
                    onClick={onSubmit}
                >Create</button>
            </div>
        </div>
    )
}

export default CreateDiscount
