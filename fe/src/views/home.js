import React from 'react';
import SeikoLogo from '../images/Seiko.png';
import OrientLogo from '../images/Orient.png';
import CasioLogo from '../images/Casio.png';
import OlymLogo from '../images/Olym.png';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Card from '../components/card';
import Shop from '../components/shop';

const responsive = {
    0: { items: 2 },
    768: { items: 3 },
    1024: { items: 5 },
}


const Home = () => {
    return (
        <div className='min-h-screen sm:px-6 lg:px-16 mb-4'>
            <div className='hidden lg:block'>
                <div className='flex items-center mt-4'>
                    <div className='w-full bg-gray-200 h-0.5'></div>
                    <span className='whitespace-nowrap p-2 text-xl font-semibold'>Most Popular Brands</span>
                    <div className='w-full bg-gray-200 h-0.5'></div>
                </div>
                <div className='grid lg:grid-cols-4 gap-4'>
                    <img src={SeikoLogo} className='w-full h-full' />
                    <img src={OrientLogo} className='w-full h-full' />
                    <img src={CasioLogo} className='w-full h-full' />
                    <img src={OlymLogo} className='w-full h-full' />
                </div>
            </div>
            <div className='w-full bg-gray-200 h-0.5'></div>
            <Shop />
        </div >
    )
}

export default Home
