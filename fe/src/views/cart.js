import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { calculatorAPI } from '../api/orderApi';
import Dialog from '../components/dialog';
import Loading from '../components/loading';
import { numberToPrice } from '../services/formatService';
import { cartMsgClose } from '../store/actions/cartMsgAction';
import { createOrderAction } from '../store/actions/orderAction';
import { userChangeInfoAction } from '../store/actions/userAction';
import AddressDialog from './addressDialog'

const Cart = () => {
    const [cookies] = useCookies(['auth']);
    const [orderInfo, setOrderInfo] = useState({ address: '', receiver: '', phoneReceiver: '' });
    const user = useSelector(state => state.user);
    const [errorInfo, setErrorInfo] = useState('');
    const [orderDetail, setOrderDetail] = useState(null);
    const [orders, setOrders] = useState(null)
    const [dialog, setDialog] = useState({ show: false, value: null });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeOrderDataHandler = (key, value) => {
        setErrorInfo('')
        setOrderInfo({ ...orderInfo, [key]: value });
    }

    useEffect(() => {
        const _orders = JSON.parse(localStorage.getItem('orderProducts')) || [];
        setOrders(_orders)
    }, [])

    useEffect(() => {
        if (user.address)
            setOrderInfo({ ...orderInfo, address: user.address })
    }, [user])

    useEffect(() => {
        if (!orders) return;
        calculator(orders)
        localStorage.setItem('orderProducts', JSON.stringify(orders))
        dispatch(cartMsgClose());
    }, [orders])

    const calculator = async (_orders) => {
        try {
            const res = await calculatorAPI(_orders);
            console.log(res.data)
            setOrderDetail(res.data)
        } catch {
            console.log('error to load orders')
        }
    }

    const removeOrderHandler = (id) => {
        const temp = orders.filter(x => x.product !== id);
        setOrders([...temp]);
        setDialog({ show: false });
    }

    const increaseOrder = (id) => {
        const order = orders.find(x => x.product === id);
        order.count++;
        setOrders([...orders])
    }

    const decreaseOrder = (id) => {
        const order = orders.find(x => x.product === id);
        if (order.count === 1) return;
        order.count--;
        setOrders([...orders])
    }

    const orderHanler = () => {
        if (!cookies.auth) {
            navigate('/login', { state: { msg: "please, login to continute", status: 0, continue: '/cart' } })
        }

        if (!orderInfo.address || !orderInfo.phoneReceiver || !orderInfo.receiver) {
            setErrorInfo('Fill in all information');
            return;
        }

        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(orderInfo.phoneReceiver)) {
            setErrorInfo('Invalid phone number');
            return;
        }

        dispatch(createOrderAction({ ...orderInfo, orders: orders }, navigate));
    }

    return (
        <div className='bg-gray-100 border-b-2 min-h-screen'>
            <Dialog show={dialog.show} onTurnOff={() => { setDialog({ show: false }) }} >
                <div className='capitalize text-md font-semibold'>
                    Are you sure?
                    <div className='flex justify-around pt-4 gap-4'>
                        <button className='shadow-md py-2 px-4 w-20 bg-red-400 hover:bg-red-300 text-white'
                            onClick={() => removeOrderHandler(dialog.value)}>Delete</button>
                        <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100'
                            onClick={() => { setDialog({ show: false }) }}
                        >Cancel</button>
                    </div>
                </div>
            </Dialog>
            <div className='px-6 xl:px-16'>
                <div className='p-4 capitalize font-semibold text-xl text-gray-600 w-full'>shopping cart</div>
                {orders?.length > 0 ? <div className='grid grid-cols-3 gap-4'>
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
                                    <div>{product.price} vnd</div>
                                    <div className='flex justify-start items-start'>
                                        {o.count > 1 && <button className='px-2 border-2 outline-none'
                                            onClick={() => { decreaseOrder(product._id) }}>-</button>}
                                        <div className='px-4 outline-none border-2'>
                                            {o.count}
                                        </div>
                                        <button className='px-2 border-2 outline-none' onClick={() => increaseOrder(product._id)}>+</button>
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
                                        : <div> {numberToPrice(o.price)} vnd</div>}
                                    <button className='absolute right-0 text-gray-400 p-2' onClick={() => setDialog({ show: true, value: product._id })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <div>
                        <div className='bg-white p-3'>
                            <div className='text-gray-700 text-sm font-semibold'>
                                <p>Address</p>
                                <div className='mb-2 p-2 text-gray-400 bg-white border-2 rounded-md'>{orderInfo.address}</div>
                                <AddressDialog onOk={(e) => changeOrderDataHandler('address', e)} />
                            </div>
                            <label className='text-gray-700 text-sm font-semibold'>
                                <p>Receiver name</p>
                                <input className='w-full p-1 outline-none border-2 rounded-md focus:border-blue-200'
                                    onChange={(e) => changeOrderDataHandler('receiver', e.target.value)} />
                            </label>
                            <label className='text-gray-700 text-sm font-semibold'>
                                <p>Phone number </p>
                                <input className='w-full p-1 outline-none border-2 rounded-md focus:border-blue-200'
                                    onChange={(e) => changeOrderDataHandler('phoneReceiver', e.target.value)} />
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
                        <div className='text-red-500 font-semibold' >{errorInfo}</div>
                        <div className='mt-4 bg-white font-semibold text-gray-500 p-3 text-center shadow-md hover:shadow-lg text-md '
                            onClick={orderHanler}>
                            {orderDetail?.loading && <Loading />}
                            Order
                        </div>
                    </div>
                </div> : (
                    <div className='text-xl font-semibold text-center'>
                        <div>Emmpty Cart</div>
                        <div>
                            <button onClick={() => navigate('/')} className='shadow-md text-md px-4 py-2 text-gray-500 rounded-md'>Contiue Shopping</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Cart
