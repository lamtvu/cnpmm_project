import React from 'react'

const Logo = ({ iconClass, nameClass, ...rest }) => {
    return (
        <div {...rest}>
            <div className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className={nameClass}>
                    <div className='flex align-middle'>
                        <div className='font-bold'>WATCHSHOP</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logo
