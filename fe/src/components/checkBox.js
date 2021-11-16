import React from 'react'
import './styles/checkBox.css'

const CheckBox = ({ onChange, lableString, ...rest }) => {
    return (
        <div {...rest}>
            <div className="flex items-center">
                <label className='flex'>
                    <input type="checkbox" value='yes' onChange={(e) => {onChange && onChange(e) }} className=' appearance-none' />
                    <div className="bg-white border-2 rounded-md border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500">
                        <svg className="h-6 w-6 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className='text-lg capitalize'>
                        {lableString}
                    </span>
                </label>
            </div>
        </div>
    )
}

export default CheckBox
