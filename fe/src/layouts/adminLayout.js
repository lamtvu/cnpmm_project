import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer'
import Header from '../components/header'
import SideNav from '../components/sideNav'

const linkDatas = [
    { label: 'categories', link: '/admin/categories' },
    { label: 'brands', link: '/admin/brands' },
    { label: 'products', link: '/admin/products' },
    { label: 'customers', link: '/admin/customers' },
    { label: 'orders', link: '/admin/orders' },
    { label: 'discounts', link: '/admin/discounts' },
]

const AdminLayout = () => {
    const message = useSelector(state => state.message)

    return (
        <div>
            {message && message.open && < div className='xl:w-96 fixed top-20 z-20 p-3 bg-green-300 rounded-md
      text-white text-center text-md font-normal right-10 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {message.msg}
            </div>}
            <Header />
            <div className='flex min-h-screen'>
                <div className='w-1/5'>
                    <SideNav className='bg-white'
                        title='management'
                        items={linkDatas} />
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout
