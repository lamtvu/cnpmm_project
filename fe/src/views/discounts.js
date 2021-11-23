import React from 'react'

const Discounts = () => {
    return (
        <div>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>Discount management</div>
            <div className='px-6 xl:px-16 py-2'>
                <div className='flex'>
                    <div className='w-2/5'>
                        <div className='capitalize font-semibold text-md'>discounts:</div>
                        <div className='grid grid-cols-3'>
                            <div>id</div>
                            <div>name</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Discounts
