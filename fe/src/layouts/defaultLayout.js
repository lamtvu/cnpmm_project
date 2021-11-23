import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default DefaultLayout
