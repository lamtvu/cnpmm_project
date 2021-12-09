import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductAPI } from '../api/productApi';
import Loading from '../components/loading';
import { numberToPrice } from '../services/formatService';
import { openCartMsgAction } from '../store/actions/cartMsgAction';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
        getProduct();
    }, [])

    const getProduct = async () => {
        try {
            setLoading(true);
            const res = await getProductAPI(productId);
            setLoading(false);
            setProduct(res.data);
        } catch {
            setNotFound(true);
        }
    }

    const caculateDiscount = () => {
        return product.price - product.discount.value * product.price
    }

    const buyHandler = async () => {
        const temp = localStorage.getItem('orderProducts');
        const orderProducts = JSON.parse(temp) || [];
        const _product = orderProducts.find(x => x.product === productId);
        if (_product) {
            _product.count = _product.count + 1;
            localStorage.setItem('orderProducts', JSON.stringify([...orderProducts]));
            dispatch(openCartMsgAction());
            window.scrollTo(0, 0)
            return;
        }
        localStorage.setItem('orderProducts', JSON.stringify([...orderProducts, { product: productId, count: 1 }]));
        window.scrollTo(0, 0)
        dispatch(openCartMsgAction());
    }

    return (
        <div className='px-6 xl:px-28 py-10 bg-gray-100 min-h-screen text-gray-500'>
            {loading && <Loading />}
            {product && (
                <div>
                    <div className='grid grid-cols-3 gap-8 w-full p-4 bg-white'>
                        <div className='p-2 border-r-2'>
                            <img src={product.image} alt='' className='w-full' />
                        </div>
                        <div className='col-span-2 flex flex-col gap-8 items-start'>
                            <div className='text-3xl'>{product.name}</div>
                            <div className='text-md capitalize'>
                                <span className='font-semibold'>Brand: </span>
                                {product.producer.name}
                            </div>
                            <div className='text-md capitalize'>
                                <span className='font-semibold'>category: </span>
                                {product.category.name}
                            </div>
                            {product.discount ?
                                <div className='p-4 bg-gray-100 rounded-lg shadow-md'>
                                    <div>
                                        <span className='line-through text-gray-400'>{numberToPrice(product.price)} vnd</span>
                                        <span className='ml-2 font-semibold'>-{product.discount.value * 100}%</span>
                                    </div>
                                    <div className='text-3xl font-bold  text-gray-600'>
                                        {numberToPrice(caculateDiscount(product.price))} vnd
                                    </div>
                                </div>
                                : <div className='text-3xl font-bold p-4 bg-gray-100 rounded-lg shadow-md'>
                                    {numberToPrice(product.price)} vnd
                                </div>}
                            <button className='focus:outline-none py-2 w-64 bg-gray-400 rounded-lg
                            text-white hover:bg-gray-300 shadow-md font-semibold text-xl'
                                onClick={buyHandler}>Add to cart</button>
                        </div>
                    </div>
                    <div className='p-4 bg-white mt-4'>
                        <div className='font-semibold'>Description</div>
                        <div>
                            {product.description}
                        </div>
                    </div>
                    <div className='p-4 bg-white mt-4'>
                        <div className='font-semibold'>Detail</div>
                        <div dangerouslySetInnerHTML={{ __html: product.detail }}>
                        </div>
                    </div>
                </div>)
            }
            {notFound && <div>Not Found</div>}
        </div>
    )
}

export default ProductDetail
