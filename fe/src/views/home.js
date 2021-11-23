import React, { useRef, useState } from 'react';
import SeikoLogo from '../images/Seiko.png';
import OrientLogo from '../images/Orient.png';
import CasioLogo from '../images/Casio.png';
import OlymLogo from '../images/Olym.png';
import watchLogo from './../images/watch.png'
import Banner from '../components/banner'
import Shop from '../components/shop';

const Home = () => {
    const [init, setInit] = useState({ category: null, brand: null });
    const scrollRef = useRef(null);

    return (
        <div>
            <Banner
                className='sm:px-6 lg:px-16 bg-gray-200 py-20 bg-left bg-auto bg-no-repeat'
                style={{ backgroundImage: `url(${watchLogo})` }}
                onBradSelect={(e) => {
                    setInit({ brand: e });
                    scrollRef.current.scrollIntoView();
                }}
                onCategorySelect={(e) => {
                    setInit({ category: e });
                    scrollRef.current.scrollIntoView();
                }}
                onAllSelect={() => {
                    setInit({});
                    scrollRef.current.scrollIntoView();
                }} />
            <div className='sm:px-6 lg:px-16 mb-4'>
                <div className='hidden lg:block'>
                    <div className='flex items-center mt-4'>
                        <div className='w-full bg-gray-200 h-0.5'></div>
                        <span className='whitespace-nowrap p-2 text-xl font-semibold'>Most Popular Brands</span>
                        <div className='w-full bg-gray-200 h-0.5'></div>
                    </div>
                    <div className='grid lg:grid-cols-4 gap-4'>
                        <img src={SeikoLogo} className='w-full h-full' alt='seiko' />
                        <img src={OrientLogo} className='w-full h-full' alt='orient' />
                        <img src={CasioLogo} className='w-full h-full' alt='casio' />
                        <img src={OlymLogo} className='w-full h-full' alt='olym' />
                    </div>
                </div>
                <div className='w-full bg-gray-200 h-0.5' ref={scrollRef}></div>
                <Shop initBrand={init.brand} initCategory={init.category} />
            </div>
        </div >
    )
}

export default Home
