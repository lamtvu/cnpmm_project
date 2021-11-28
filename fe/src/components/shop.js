import React, { useEffect } from 'react'
import CheckBox from './checkBox'
import Dropdown from './dropdown'
import Card from './card'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearProducts, getProductsAction, nextPageAction } from '../store/actions/productAction'
import { getBrandsAction } from '../store/actions/brandAction'
import { getCagtegoriesAction } from '../store/actions/categoriyActions'
import { Waypoint } from 'react-waypoint'

const Shop = () => {
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrandsAction());
        dispatch(getCagtegoriesAction());
        dispatch(getProductsAction({ producers: [], categories: [] }));
        return () => {
            dispatch(clearProducts());
        }
    }, [])

    const onBrandChange = (e) => {
        const target = e.target;
        let query = { ...products.query };
        if (target.checked) {
            query = { ...query, producers: [...query.producers, target.value] }
        } else {
            const temp = query.producers.filter(p => p !== target.value);
            query = { ...query, producers: [...temp] }
        }
        dispatch(getProductsAction(query));
    }

    const onCategoryChange = (e) => {
        const target = e.target;
        let query = { ...products.query };
        if (target.checked) {
            query = { ...query, categories: [...query.categories, target.value] }
        } else {
            const temp = query.categories.filter(p => p !== target.value);
            query = { ...query, categories: [...temp] }
        }
        dispatch(getProductsAction(query));
    }


    return (
        <div className='flex min-h-screen'>
            <div className='w-1/4 border-r-2 shadow-md bg-white my-4 hidden lg:block'>
                <Dropdown title='Categories'>
                    <div className='flex flex-col gap-4 p-4'>
                        {categories && categories.items.map(category => (
                            <CheckBox lableString={category.name}
                                onChange={onCategoryChange}
                                value={category._id}
                                key={category._id} />
                        ))}

                    </div>
                </Dropdown>
                <Dropdown title='Brands'>
                    <div className='flex flex-col gap-4 p-4'>
                        {brands && brands.items.map(brand => (
                            <CheckBox lableString={brand.name}
                                key={brand._id}
                                value={brand._id}
                                onChange={onBrandChange} />
                        ))}
                    </div>
                </Dropdown>
            </div>
            <div className='w-full'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-16 p-4'>
                    {products.items.map(product => {
                        return <Card productData={product} key={product._id} />
                    })}
                </div>
                {products?.loading && <div className='grid grid-cols-2 md:grid-cols-3 gap-16 p-4'>
                    <div className='hidden md:block p-3 animate-pulse'>
                        <div className='w-full h-52 bg-gray-200 mt-4'></div>
                        <div className='w-2/3 h-5 bg-gray-200 mt-4'></div>
                        <div className='w-2/5 h-4 bg-gray-200 mt-4'></div>
                    </div>
                    <div className='p-3 animate-pulse'>
                        <div className='w-full h-52 bg-gray-200 mt-4'></div>
                        <div className='w-2/3 h-5 bg-gray-200 mt-4'></div>
                        <div className='w-2/5 h-4 bg-gray-200 mt-4'></div>
                    </div>
                    <div className='p-3 animate-pulse'>
                        <div className='w-full h-52 bg-gray-200 mt-4'></div>
                        <div className='w-2/3 h-5 bg-gray-200 mt-4'></div>
                        <div className='w-2/5 h-4 bg-gray-200 mt-4'></div>
                    </div>
                </div>}
                {products.page !== -1 && !products.loading && <Waypoint className='bg-gray-700 p-4' onEnter={() => {
                    console.log('next')
                    dispatch(nextPageAction())
                }} />}
            </div>
        </div >
    )
}

export default React.memo(Shop)
