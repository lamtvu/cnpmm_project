import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { getOrderByIdAPI } from '../api/orderApi';
import { numberToPrice } from '../services/formatService';

const OrderDetail = () => {
    const [orderDetail, setOrderDetail] = useState(null);
    const [err, setErr] = useState(false);
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        getOrder()
    }, [id])

    const getOrder = async () => {
        try {
            console.log(id)
            const res = await getOrderByIdAPI(id)
            setOrderDetail(res.data)
        } catch {
            setErr(true)
        }
    }

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full items-center shadow-sm'>
                Order detail
            </div>
            {location.state && <div className='py-4 text-xl bg-green-300 text-center text-white font-semibold'> {location.state.msg}</div>}
            {
                orderDetail && (<div className='p-4'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='col-span-2'>
                            <div className='grid grid-cols-5 bg-white py-2 px-3'>
                                <div className='col-span-2'>Products</div>
                                <div>Unit price</div>
                                <div>Amount</div>
                                <div>Total</div>
                            </div>

                            {orderDetail && orderDetail.orders.map((o, index) => {
                                const { product } = o;
                                return (
                                    <div className='grid grid-cols-5 bg-white py-2 px-3 mt-4 h-40 relative' key={index}>
                                        <div className='col-span-2 grid grid-cols-3'>
                                            <div>
                                                <img src={product.image} alt='' />
                                            </div>
                                            <div className='px-2 col-span-2'>{product.name}</div>
                                        </div>
                                        <div>
                                            {numberToPrice((o.price / (1 - o.discount))/o.count)} vnd
                                        </div>
                                        <div className='px-4 outline-none'>
                                            {o.count}
                                        </div>
                                        {o.discount ?
                                            <div>
                                                <p className='text-sm'>
                                                    <span className=' line-through'>
                                                        {numberToPrice(o.price / (1 - o.discount))} vnd
                                                    </span>
                                                    <span className='ml-2 font-semibold'>-{o.discount * 100}%</span>
                                                </p>
                                                <p> {numberToPrice(o.price)} vnd</p>
                                            </div>
                                            : <div> {numberToPrice(o.price)} vnd</div>
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <div className='bg-white p-3'>
                                <div className='text-gray-700 text-sm font-semibold'>
                                    <p>Status</p>
                                    <div className='mb-2 p-2 text-gray-400 bg-white border-2 rounded-md'>
                                        {orderDetail.status === 1 && <div>handle</div>}
                                        {orderDetail.status === 2 && <div>delevery</div>}
                                        {orderDetail.status === 3 && <div>finish</div>}
                                    </div>
                                </div>
                                <div className='text-gray-700 text-sm font-semibold'>
                                    <p>Address</p>
                                    <div className='mb-2 p-2 text-gray-400 bg-white border-2 rounded-md'>{orderDetail.address}</div>
                                </div>
                                <label className='text-gray-700 text-sm font-semibold'>
                                    <p>Receiver name</p>
                                    <div className='w-full p-1 outline-none border-2 rounded-md focus:border-blue-200'>
                                        {orderDetail.receiver}
                                    </div>
                                </label>
                                <label className='text-gray-700 text-sm font-semibold'>
                                    <p>Phone number </p>
                                    <div className='w-full p-1 outline-none border-2 rounded-md focus:border-blue-200'>
                                        {orderDetail.phoneReceiver}
                                    </div>
                                </label>
                            </div>

                            <div className='mt-4 bg-white p-3'>
                                <div className='text-lg font-semibold'>
                                    Discount:
                                    <span className='text-xl font-normal'> {numberToPrice(orderDetail?.orders?.reduce((total, o) => {
                                        if (o.discount)
                                            return total + o.discount * o.price
                                        else
                                            return total
                                    }, 0))} vnd</span>
                                </div>
                                <div className='text-lg font-semibold'>
                                    Total:
                                    <span className='text-xl font-normal'> {numberToPrice(orderDetail?.totalPrice)} vnd</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            {err && <div> Not Found</div>}
        </div >)
}

export default OrderDetail
