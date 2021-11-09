import React from 'react'

const Banner = () => {
    return (
        <div className="mt-4">
            <div className='py-4 flex'>
                <div>
                    <div className='text-4xl font-semibold text-white'>
                        Beautiful Prestige and quality,
                    </div>
                    <div className='text-4xl font-semibold text-purple-200'>
                        Trust and accompany us
                    </div>
                </div>
                <div className='w-full mt-10 flex justify-end'>
                    <div className='flex flex-col items-center justify-center gap-8'>
                        <div className='flex shadow-md transform focus-within:shadow-lg focus-within:-translate-y-1 focus-within:text-purple-400 text-gray-500 transition-transform'>
                            <div className='py-3 text-xl bg-white rounded-l-md cursor-pointer font-semibold hover:underline'>
                                <div className='px-4 border-r-2 border-gray-200'>Search</div>
                            </div>
                            <input type="text" className='px-4 py-3 outline-none w-60 rounded-r-md rounded-l-none text-gray-500' />
                        </div>
                        <div className='flex gap-8'>
                            <div className='text-xl font-semibold text-gray-500 text-center transform hover:-translate-y-1 cursor-pointer transition-transform
                     bg-purple-100 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 hover:shadow-xl hover:text-purple-400 group'>
                                <svg class="h-8 w-8 group-hover:text-red-400 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                </svg>
                                Hot
                            </div>
                            <div className='text-xl font-semibold text-white text-center transform hover:-translate-y-1 cursor-pointer transition-transform
                     bg-purple-400 py-2 w-52 rounded-xl shadow-md flex justify-center gap-3 hover:shadow-xl hover:bg-purple-300'>
                                <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                New
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-8 mt-4 pb-9'>
                <div className='flex align-middle gap-1'>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-400 w-8 h-8">
                        <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"></path>
                    </svg>
                    <div className='text-lg font-semibold text-white'>
                        2.500 Products
                    </div>
                </div>
                <div className='flex align-middle gap-1'>
                    <svg className="text-purple-400 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className='text-lg font-semibold text-white'>
                        100.000 Custormer
                    </div>
                </div>
                <div className='flex align-middle gap-1'>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-400 w-8 h-8">
                        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clip-rule="evenodd"></path>
                    </svg>
                    <div className='text-lg font-semibold text-white'>
                        Licensed
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
