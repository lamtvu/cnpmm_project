import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'
import watchLogo from './../images/watch.png'
import Banner from '../components/banner'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Banner
                className='sm:px-6 lg:px-16 bg-gray-200 py-20 bg-left bg-auto bg-no-repeat'
                style={{ backgroundImage: `url(${watchLogo})` }} />
            <Outlet />
            <Footer />
        </>
    )
}

export default DefaultLayout
