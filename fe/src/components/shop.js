import React, { useEffect, useRef } from 'react'
import CheckBox from './checkBox'
import Dropdown from './dropdown'
import Card from './card'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearProducts, getProductsAction } from '../store/actions/productAction'
import { getBrandsAction } from '../store/actions/brandAction'
import { getCagtegoriesAction } from '../store/actions/categoriyActions'
import Pagination from './pagination'
import { useLocation } from 'react-router-dom';
import Loading from './loading'

const Shop = () => {
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);
    const location = useLocation();
    const topRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrandsAction());
        dispatch(getCagtegoriesAction());
        console.log('render', location.state)
        if (location.state) {
            const { producer, category } = location.state;
            let query = { producers: [], categories: [] }
            if (producer) {
                query = { ...query, producers: [producer] }
            }
            if (category) {
                query = { ...query, categories: [category] }
            }
            dispatch(getProductsAction(query));
            return;
        }
        dispatch(getProductsAction({ producers: [], categories: [] }));
        return () => {
            dispatch(clearProducts());
        }
    }, [])

    const onBrandChange = (e) => {
        const target = e.target;
        const { limit } = products;
        let query = { ...products.query }
        if (target.checked) {
            query = { ...query, producers: [...query.producers, target.value] }
        } else {
            const temp = query.producers.filter(p => p !== target.value);
            query = { ...query, producers: [...temp] }
        }
        dispatch(getProductsAction(query, limit));
    }

    const onCategoryChange = (e) => {
        const target = e.target;
        let { limit } = products;
        let query = { ...products.query }
        console.log(products)
        if (target.checked) {
            query = { ...query, categories: [...query.categories, target.value] }
        } else {
            const temp = query.categories.filter(p => p !== target.value);
            query = { ...query, categories: [...temp] }
        }
        console.log(limit, query)
        dispatch(getProductsAction(query, 0, limit));
    }

    const onPageChange = (e) => {
        const { page, pageLength } = e;
        console.log(pageLength)
        const { query } = products;
        dispatch(getProductsAction(query, page, pageLength));
        topRef.current.scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <>
            <div ref={topRef}></div>
            <div className='flex min-h-screen mb-4 sm:px-6 lg:px-16'>
                <div className='w-1/4 border-r-2 shadow-md bg-white my-4 hidden lg:block'>
                    <Dropdown title='Categories'>
                        <div className='flex flex-col gap-4 p-4'>
                            {categories && categories.items.map(category => (
                                <CheckBox lableString={category.name}
                                    onChange={onCategoryChange}
                                    value={category._id}
                                    key={category._id}
                                    defaultChecked={category._id === location.state?.category} />
                            ))}

                        </div>
                    </Dropdown>
                    <Dropdown title='Brands'>
                        <div className='flex flex-col gap-4 p-4'>
                            {brands && brands.items.map(brand => (
                                <CheckBox lableString={brand.name}
                                    key={brand._id}
                                    value={brand._id}
                                    onChange={onBrandChange}
                                    defaultChecked={brand._id === location.state?.producer} />
                            ))}
                        </div>
                    </Dropdown>
                </div>
                <div className='w-full'>
                    {products?.loading && <>
                        <Loading />
                    </>}
                    <div className=' min-h-screen '>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-16 p-4'>
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

export default React.memo(Shop)
