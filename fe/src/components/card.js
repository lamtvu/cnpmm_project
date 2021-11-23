import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ productData, size, ...rest }) => {
    const navigate = useNavigate();

    return (
        <div {...rest}>
            <div className='rounded-lg p-2 bg-white relative transform hover:shadow-lg shadow-md'
                onClick={() => navigate('/product/' + productData._id)}>
                <div className='absolute w-full left-1 top-1 flex'>
                    <div className='bg-gray-50 p-2 rounded-xl border-2 border-gray-100 hover:shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                </div>
                <img src={productData.image} className='rounded-lg border-2 border-gray-100 shadow-sm bg-white h-72 w-full' alt='' />
                <div className='p-2'>
                    <div className='capitalize text-lg font-semibold text-gray-600'>
                        {productData.name}
                    </div>
                    <div className='capitalize text-md font-normal text-gray-600'>
                        {productData.producer.name}
                    </div>
                    <div className='capitalize text-md font-normal text-gray-600'>
                        {productData.price} vnd
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
