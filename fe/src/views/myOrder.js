import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getMyOrdersAction } from '../store/actions/orderAction';

const MyOrder = () => {
    const orders = useSelector(state => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyOrdersAction());
    }, [])

    return (
        <div className='bg-gray-100 border-b-2 min-h-screen pb-4'>
            <div className='px-6 xl:px-16'>
                <div className='p-4 capitalize font-semibold text-xl text-gray-600 w-full'>My Order</div>
                <div className='bg-white grid-cols-5 grid mt-4 capitalize font-semibold'>
                    <div className='border-r-2 p-2 overflow-hidden'>id</div>
                    <div className='border-r-2 col-span-2 p-2 overflow-hidden'>products</div>
                    <div className='p-2 border-r-2 overflow-hidden'>total price</div>
                    <div className='p-2 overflow-hidden'>status</div>
                </div>
                {orders && orders?.items?.map(order => (
                    <div className='bg-white grid-cols-5 grid mt-4 relative' key={order._id}>
                        <div className='border-r-2 p-4 overflow-hidden'>{order._id}</div>
                        <div className='border-r-2 col-span-2 p-4 overflow-hidden'>{order.orders.map(x => `${x.product?.name} x ${x.count} , `)}</div>
                        <div className='p-4 border-r-2 overflow-hidden'>{order.totalPrice} vnd</div>
                        {order.status === 1 && <div className='p-4'>handle</div>}
                        {order.status === 2 && <div className='p-4'>delevery</div>}
                        {order.status === 3 && <div className='p-4'>finish</div>}
                        <Link className='shadow-md py-1 px-4 absolute right-0 bg-gray-50 hover:bg-gray-100' to={`/user/order-detail/${order._id}`}>View</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrder
