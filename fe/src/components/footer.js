import React from 'react'
import Logo from './logo'

const Footer = () => {
    return (
        <div className='py-4 sm:px-6 lg:px-16 bg-gray-100 flex justify-between items-center border-t-2'>
            <div>
                <div className='text-lg font-semibold text-gray-500'>
                    Contact Info:
                </div>
                <div className='text-gray-400 ml-2'>
                    <div>
                        lamtvu@gmail.com
                    </div>
                    <div>
                        lhnam1202@gmail.com
                    </div>
                </div>
            </div>
            <Logo iconClass='w-8 h-8 text-purple-400' nameClass=' text-lg text-purple-500'></Logo>
        </div>
    )
}

export default Footer
