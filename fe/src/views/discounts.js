import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Dialog from '../components/dialog';
import AsyncSelect from 'react-select/async'
import Pagination from '../components/pagination';
import { addProductDiscountAction, deleteDiscountAction, getDiscountAction, getDiscountProductAction, removeProductDiscountAction, SelectDiscontAction } from '../store/actions/discountAction';
import { searchProductsAPI } from '../api/productApi';
import Loading from '../components/loading';

const Discounts = () => {
    const discountState = useSelector(state => state.discounts);
    const [pdialog, setPDialog] = useState({ show: false, type: 0, inputValue: null })
    const [addProductdialog, setAddProductDialog] = useState({ show: false });
    const [productAdds, setProductAdds] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiscountAction());
    }, [])

    const pageChangeHandler = (e) => {
        const { page, pageLength } = e;
        if (discountState.selected)
            dispatch(getDiscountProductAction(discountState.selected, page, pageLength, ''));
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
            <Dialog show={pdialog.show} onTurnOff={() => { setPDialog({ show: false }) }} >
                <div className='capitalize text-md font-semibold'>
                    {pdialog.type === 0 ? 'Do you delete this discount' : 'Do you delete this product'}
                    <div className='flex justify-around pt-4'>
                        <button className='shadow-md py-2 px-4 w-20 bg-red-400 hover:bg-red-300 text-white'
                            onClick={() => {
                                if (pdialog.type === 0)
                                    dispatch(deleteDiscountAction())
                                else
                                    dispatch(removeProductDiscountAction(pdialog.inputValue))
                                setPDialog({ show: false })
                            }}>Delete</button>
                        <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100'
                            onClick={() => { setPDialog({ show: false }) }}
                        >Cancel</button>
                    </div>
                </div>
            </Dialog>
            <Dialog show={addProductdialog.show}>
                <div className='capitalize text-md font-semibold w-96'>
                    Products:
                    <AsyncSelect
                        loadOptions={loadProducts}
                        onChange={(e) => { setProductAdds(e.map(o => o.value)) }}
                        isMulti={true}
                    />
                    <div className='flex justify-center gap-4 mt-4'>
                        <button className='shadow-md py-2 px-4 w-20 bg-blue-400 hover:bg-blue-300 text-white'
                            onClick={() => {
                                console.log(productAdds)
                                dispatch(addProductDiscountAction(productAdds))
                                setAddProductDialog({ show: false })
                            }}
                        >Add</button>
                        <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100'
                            onClick={() => { setAddProductDialog({ show: false }) }}
                        >Cancel</button>
                    </div>
                </div>
            </Dialog>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>Discount management</div>
            <div className='px-6 xl:px-16'>
                <div className='lg:flex lg:gap-4'>
                    <div className='lg:w-2/5 shadow-md p-4'>
                        {discountState.dloading && <Loading/>}
                        <div className='flex justify-between my-2'>
                            <div className='capitalize font-semibold text-md'>discounts:</div>
                            <div className='flex gap-4 items-center'>
                                {discountState?.selected && (
                                    <div className='flex items-center gap-4'>
                                        <Link className='py-2 px-4 shadow-lg bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
                                            to={`/admin/update-discount/${discountState.selected}`}
                                        >update</Link>
                                        <button className='py-2 px-4 shadow-lg bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none'
                                            onClick={() => {
                                                setPDialog({ show: true, type: 0 })
                                            }}
                                        >delete</button>
                                    </div>
                                )
                                }
                                <Link to='/admin/create-discount'>
                                    <button className='py-2 px-4 shadow-lg bg-gray-100 hover:bg-gray-200 rounded-md'
                                    >create</button></Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div>value</div>
                            <div>endDate (UTC)</div>
                        </div>
                        {discountState && discountState.discounts.map(d => {
                            return (
                                <div className={`grid grid-cols-2 border-t-2 px-3 py-2 hover:bg-gray-200 ${discountState?.selected === d._id && 'bg-gray-200'}`}
                                    onClick={() => dispatch(SelectDiscontAction(d._id))} key={d._id}>
                                    <div>{d.value * 100}%</div>
                                    <div>{new Date(d.endDate).toDateString()}</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className='lg:w-3/5 p-4 shadow-md'>
                        {discountState.ploading && <Loading />}
                        <div className='flex justify-between my-2 items-center'>
                            <div className='capitalize font-semibold text-md'>products:</div>
                            {discountState.selected && (
                                < button className='focus:outline-none py-2 px-4 shadow-md bg-gray-100 hover:bg-gray-200'
                                    onClick={() => setAddProductDialog({ show: true })}
                                >Add product</button>
                            )}
                        </div>
                        <div className='w-full grid grid-cols-3 p-2'>
                            <p>id</p>
                            <p className='col-span-2 ml-4'>name</p>
                        </div>
                        <div style={{ minHeight: '300px' }}>
                            {discountState && discountState.products.map(p => {
                                return (
                                    <div className='w-full grid grid-cols-3 p-2 border-t-2 relative' key={p._id}>
                                        <p className='overflow-hidden'>{p._id}</p>
                                        <p className='ml-4 col-span-2'>{p.name}</p>
                                        <button className='focus:outline-none p-1 right-0 absolute bg-white z-10 shadow-md rounded-full hover:bg-gray-100'
                                            onClick={() => setPDialog({ type: 1, show: true, inputValue: p._id })}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>)
                            })}
                        </div>
                        <Pagination totalRecords={discountState.ptotal} onPageChange={pageChangeHandler} />
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Discounts
