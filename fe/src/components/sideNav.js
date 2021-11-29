import React from 'react'
import { NavLink } from 'react-router-dom'

const SideNav = ({ title, items, ...rest }) => {
    return (
        <div {...rest}>
            <div className='p-2 shadow-md text-gray-500 h-full'>
                <div className=' capitalize text-xl border-b-2 p-2 font-semibold'>{title && title}</div>
                {items && items.map((item, index) => (
                    <div className='text-md border-b-2 border-gray-100 font-semibold capitalize' key={index}>
                        <NavLink to={item.link}
                            className={({ isActive }) => {
                                return `block p-4 hover:bg-gray-100
                                ${isActive && 'bg-gray-200'}`
                            }}
                        >{item.label}</NavLink>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default SideNav
