import React, { useEffect, useRef } from 'react'
import CheckBox from './checkBox'
import Dropdown from './dropdown'
import Card from './card'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearProducts, getProductsAction, searchProductsAction } from '../store/actions/productAction'
import { getBrandsAction } from '../store/actions/brandAction'
import { getCagtegoriesAction } from '../store/actions/categoriyActions'
import Pagination from './pagination'
import { useLocation, useParams } from 'react-router-dom';
import Loading from './loading'

const ShopSearch = () => {
    const products = useSelector(state => state.products);
    const { searchStr } = useParams();
    const topRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrandsAction());
        dispatch(getCagtegoriesAction());
        dispatch(searchProductsAction(searchStr, 0, products.limit));
        return () => {
            dispatch(clearProducts());
        }
    }, [])

    const onPageChange = (e) => {
        const { page, pageLength } = e;
        dispatch(searchProductsAction(searchStr, page, pageLength));
        topRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    console.log(products.total)

    return (
        <>
            <div ref={topRef}></div>
            <div className='text-xl p-4 font-semibold bg-gray-100'>Search Products</div>
            <div className='flex min-h-screen mb-4'>
                <div className='w-full'>
                    {products?.loading && <>
                        <Loading />
                    </>}
                    {!products?.loading && !products?.total &&
                        <div className='text-xl font-semibold text-center'>
                            Not found
                        </div>}
                    <div className=' min-h-screen '>
                        <div className='grid grid-cols-3 md:grid-cols-4 gap-16 p-4'>
                            {products.items.map(product => {
                                return <Card productData={product} key={product._id} />
                            })}
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        {products && <Pagination totalRecords={products.total} onPageChange={onPageChange} />}
                    </div>
                </div>
            </div >
        </>
    )
}

export default React.memo(ShopSearch)
