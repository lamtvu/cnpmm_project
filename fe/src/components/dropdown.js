import React, { useState } from 'react'

const Dropdown = ({ title, children, ...rest }) => {
    const [open, setOpen] = useState(true)
    return (
        <div {...rest}>
            <div>
                <div onClick={() => setOpen(!open)} className='flex justify-between items-center'>
                    <div className='cursor-pointer text-xl capitalize bg-gray-50 p-4'>{title}</div>
                    <svg className={`h-6 w-6 mr-4 text-gray-400 transition-transform duration-300 transform ${open && `rotate-180`}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                <div className={`duration-400 transition-all overflow-hidden ${!open ? 'max-h-0' : 'max-h-96'}`}>
                    {children}
                </div>
            </div>
        </div >
    )
}

export default Dropdown
