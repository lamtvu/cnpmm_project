import React from 'react'
import { Link } from 'react-router-dom'

const Products = () => {
    return (
        <div>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>products management</div>
            <div className='mx-6 xl:mx-16'>
                <div className='my-4 flex justify-between'>
                    <input type="text" name="filter"
                        className='border-2 rounded-md outline-none px-2 py-1'
                        placeholder='filter'
                    />
                    <Link to='/admin/create-product'>
                        <button className='bg-gray-50 px-4 py-2 rounded-sm shadow-md
                     font-medium text-gray-600 hover:bg-gray-100'>create products</button>
                    </Link>
                </div>
                <table className='w-full text-gray-600'>
                    <tr className='p-4 text-base font-semibold capitalize border-b-2'>
                        <td className='border-r-2'>id</td>
                        <td className='pl-2'>name</td>
                        <td>description</td>
                        <td>brand/producer</td>
                        <td>price</td>
                    </tr>
                    <tr className='p-4 text-md border-b-2 border-gray-100'>
                        <td className='border-r-2 border-gray-100'>1</td>
                        <td className='pl-2'>aaaaaa</td>
                        <td>aaaaaaa</td>
                        <td>apple</td>
                        <td>2.000.000vnd</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Products
