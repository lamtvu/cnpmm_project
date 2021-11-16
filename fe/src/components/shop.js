import React from 'react'
import CheckBox from './checkBox'
import Dropdown from './dropdown'
import Card from './card'

const Shop = () => {
    return (
        <div className='flex'>
            <div className='w-1/4 border-r-2 shadow-md bg-white my-4 hidden lg:block'>
                <Dropdown title='Categories'>
                    <div className='flex flex-col gap-4 p-4'>
                        <CheckBox lableString='sport watches' />
                        <CheckBox lableString='offiec watches' />
                    </div>
                </Dropdown>
                <Dropdown title='Brands'>
                    <div className='flex flex-col gap-4 p-4'>
                        <CheckBox lableString='casio' />
                        <CheckBox lableString='Orient' />
                        <CheckBox lableString='Seiko' />
                        <CheckBox lableString='olym pianus' />
                    </div>
                </Dropdown>
                <Dropdown title='price'>
                    <div className='flex flex-col gap-4 p-4'>
                        <CheckBox lableString='0-500.000vnd' />
                        <CheckBox lableString='500.000-1.000.000vnd' />
                        <CheckBox lableString='1.000.000-3.000.000vnd' />
                        <CheckBox lableString='3.000.000-5.000.000vnd' />
                    </div>
                </Dropdown>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-16 p-4 w-full'>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
                <Card size='100%'/>
            </div>
        </div>
    )
}

export default Shop
