import React from 'react'
import { useSelector } from 'react-redux'

const Banner = ({ onAllSelect, onBradSelect, onCategorySelect, ...rest }) => {
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);

    return (
        <div {...rest}>
            <div className='py-4 xl:flex relative'>
                <div className='px-4'>
                    <div className=' text-5xl font-semibold text-white lg:whitespace-nowrap text-shadow leading-tight'>
                        Beautiful Prestige and quality,
                    </div>
                    <div className='text-4xl font-semibold text-gray-100 text-shadow'>
                        Trust and accompany us
                    </div>
                </div>
                <div className='w-full mt-10 flex justify-center lg:justify-end'>
                    <div className='flex flex-col items-center justify-center gap-8'>
                        <div className='flex shadow-md transform focus-within:shadow-lg focus-within:-translate-y-1 text-gray-400 transition-transform'>
                            <div className='py-3 text-xl bg-white rounded-l-md cursor-pointer font-semibold hover:text-gray-600'>
                                <div className='px-4 border-r-2 border-gray-200'>Search</div>
                            </div>
                            <input type="text" className='px-4 py-3 outline-none w-60 rounded-r-md rounded-l-none text-gray-500' />
                        </div>
                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='text-xl font-semibold text-gray-500 text-center transform hover:-translate-y-1 cursor-pointer transition-transform
                     bg-gray-50 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 hover:shadow-xl hover:text-red-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                </svg>
                                Hot
                            </div>
                            <div className='text-xl font-semibold text-gray-500 text-center transform hover:-translate-y-1 cursor-pointer transition-transform
                     bg-gray-50 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 hover:shadow-xl hover:text-yellow-400'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                New
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row gap-8'>
                            <div className='group relative'>
                                <div className='text-xl font-semibold text-gray-500 text-center transform group-hover:-translate-y-1 cursor-pointer transition-transform
                     bg-gray-50 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 group-hover:shadow-xl relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    Categories
                                </div>
                                <div className='absolute z-10 top-full bg-white w-52 hidden group-hover:block p-1 rounded-lg shadow-xl'>
                                    {categories && categories.items.map(c => (
                                        <div key={c._id} className='py-3 capitalize font-semibold px-3 text-gray-500 rounded-lg hover:bg-gray-100 cursor-pointer'>
                                            {c.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='group relative'>
                                <div className='text-xl font-semibold text-gray-500 text-center transform group-hover:-translate-y-1 cursor-pointer transition-transform
                     bg-gray-50 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 hover:shadow-xl relative'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    Brands
                                </div>
                                <div className='absolute z-10 top-full bg-white w-52 hidden group-hover:block p-1 rounded-lg shadow-xl'>
                                    {brands && brands.items.map(b => (
                                        <div key={b._id} className='py-3 capitalize font-semibold px-3 text-gray-500 rounded-lg hover:bg-gray-100' >
                                            {b.name}
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div className='text-xl font-semibold text-gray-500 text-center transform hover:-translate-y-1 cursor-pointer transition-transform
                     bg-gray-50 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 hover:shadow-xl group'
                                onClick={onAllSelect}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                All
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
