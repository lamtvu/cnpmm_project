import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersAction, updateOrderAction } from '../store/actions/orderAction';

const Orders = () => {
    const orders = useSelector(state => state.orders);
    const [seleced, setSelected] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrdersAction());
    }, [])

    const updateHandler = (status) => {
        dispatch(updateOrderAction(seleced, { status }))
        setSelected(null);
    }

    return (
        <div>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>Order Management</div>
            <div className='px-6 xl:px-16 py-4'>
                <div className='flex justify-between items-center h-20'>
                    {/* <input type='text' className='outline-none border-2 py-2 px-3 my-2' placeholder='filter' /> */}
                    {seleced && <div className='relative group py-4'>
                        <div className='text-md font-semibold py-2 px-3 bg-gray-50 rounded-md shadow-md hover:shadow-xl cursor-pointer'>Action</div>
                        <div className='absolute z-10 bg-white shadow-md transform translate-y-1 hidden group-hover:flex w-52 flex-col'>
                            <button className='p-2 border-b-2 hover:bg-gray-100'
                                onClick={() => { updateHandler(1) }}> handle </button>
                            <button className='p-2 border-b-2 hover:bg-gray-100'
                                onClick={() => { updateHandler(2) }}> delivery </button>
                            <button className='p-2 border-b-2 hover:bg-gray-100'
                                onClick={() => { updateHandler(3) }}> finish </button>
                        </div>
                    </div>}
                </div>
                <table className='w-full'>
                    <thead>
                        <tr className='capitalize text-gray-500 font-semibold border-b-2'>
                            <td>id</td>
                            <td>customer</td>
                            <td>status</td>
                            <td>total price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.items.map(order => (
                            < tr className={`text-gray-500 font-base border-b-2 border-gray-100 hover:bg-gray-200 ${seleced === order._id && 'bg-gray-100'}`} key={order._id}
                                onClick={() => setSelected(order._id)}>
                                <td>{order._id}</td>
                                <td>{order.customer?.name}</td>
                                {order.status === 1 && <td>handle</td>}
                                {order.status === 2 && <td>delevery</td>}
                                {order.status === 3 && <td>finish</td>}
                                <td>{order.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Orders
