import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint';
import Dialog from '../components/dialog';
import Loading from '../components/loading';
import { deleteProductAction, nextPageAction, searchProductsAction } from '../store/actions/productAction';

const Products = () => {
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [dialogShow, setDialogShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        searchProduct('');
    }, [])

    const searchProduct = (str) => {
        dispatch(searchProductsAction(str));
    }

    const deleteHander = () => {
        dispatch(deleteProductAction(selected._id));
        setSelected(null);
        setDialogShow(false);
    }

    return (
        <div>
            <Dialog show={dialogShow} onTurnOff={() => { setDialogShow(false) }} >
                <div className='capitalize text-md font-semibold'>
                    do you want delete this product?
                    <div className='flex justify-around pt-4'>
                        <button className='shadow-md py-2 px-4 w-20 bg-red-400 hover:bg-red-300 text-white'
                            onClick={deleteHander}>Delete</button>
                        <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100'
                            onClick={() => { setDialogShow(false) }}
                        >Cancel</button>
                    </div>
                </div>
            </Dialog >
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>products management</div>
            <div className='mx-6 xl:mx-16'>
                {products?.Loading && <Loading className='w-full' />}
                <div className='my-4 flex justify-between'>
                    <input type="text" name="filter"
                        autoComplete="off"
                        value={products?.query ? products?.query : ''}
                        className='border-2 rounded-md outline-none px-2 py-1'
                        placeholder='filter'
                        onChange={(e) => { searchProduct(e.target.value) }}
                    />
                    <div className='flex gap-4'>
                        {selected && (
                            <div className='flex gap-4'>
                                <button className='bg-gray-50 px-4 py-2 rounded-sm shadow-md
                     font-medium text-gray-600 hover:bg-gray-100'
                                    onClick={() => navigate('/admin/update-product/' + selected._id)}>Update</button>
                                <button className='bg-gray-50 px-4 py-2 rounded-sm shadow-md
                     font-medium text-gray-600 hover:bg-gray-100'
                                    onClick={() => setDialogShow(true)}>Delete</button>
                            </div>
                        )}
                        <Link to='/admin/create-product'>
                            <button className='bg-gray-50 px-4 py-2 rounded-sm shadow-md
                     font-medium text-gray-600 hover:bg-gray-100'>Create Products</button>
                        </Link>
                    </div>
                </div>
                <table className='w-full text-gray-600'>
                    <thead>
                        <tr className='p-4 text-base font-semibold capitalize border-b-2'>
                            <td className='border-r-2'>id</td>
                            <td className='pl-2'>name</td>
                            <td>description</td>
                            <td>brand/producer</td>
                            <td>categories</td>
                            <td>price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.items.map(product => {
                            return (
                                <tr className={`p-4 text-md border-b-2 ${selected?._id === product._id && 'bg-gray-100'}
                                border-gray-100 hover:bg-gray-50`} key={product._id}
                                    onClick={() => setSelected(product)}>
                                    <td className='border-r-2 border-gray-100'>{product._id}</td>
                                    <td className='pl-2'>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.producer?.name}</td>
                                    <td>{product.category?.name}</td>
                                    <td>{product.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {products.items.length > 0 && products.page !== -1 && <Waypoint onEnter={() => {
                    dispatch(nextPageAction());
                }} />}
            </div>
        </div >
    )
}

export default Products
