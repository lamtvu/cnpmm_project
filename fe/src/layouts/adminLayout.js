import React from 'react'
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
    console.log('admin')
    return (
        <div>
            <Header />
            <div className='flex min-h-screen'>
                <div className='w-1/5'>
                    <SideNav className='bg-white'
                        title='management'
                        items={linkDatas} />
                </div>
                <div className='w-full h-full'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout
