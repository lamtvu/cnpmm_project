import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Loading from '../components/loading';
import Pagination from '../components/pagination';
import { getCustomersAction } from '../store/actions/customerAction';

const Customers = () => {
    const customers = useSelector(state => state.customers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCustomersAction(''));
    }, [])

    return (
        <div>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>customers</div>
            <div className='px-6 xl:px-16 py-4'>
                <input type='text' className='outline-none border-2 py-2 px-3 my-2' placeholder='name/email'
                    onChange={(e) => dispatch(getCustomersAction(e.target.value, 0, customers.limit))} autoComplete='off' />
                {customers?.loading && <Loading />}
                {/* <Loading /> */}
                <div style={{ minHeight: '400px' }}>
                    <table className='w-full mt-2'>
                        <thead>
                            <tr className='text-gray-500 capitalize font-semibold border-b-2 '>
                                <td className='w-20'>id</td>
                                <td>name</td>
                                <td>email</td>
                                <td>createdAt</td>
                            </tr>
                        </thead>
                        <tbody>
                            {customers && customers.items.map(customer => (
                                <tr className='text-gray-500 border-b-2 border-gray-100' key={customer._id}>
                                    <td className='w-20 border-r-2 border-gray-100'>{customer._id}</td>
                                    <td className='pl-2'>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{new Date(customer.createdAt.toString()).toDateString()}</td>
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='flex justify-center'>
                    <Pagination totalRecords={customers.total} onPageChange={(e) => {
                        const { page, pageLength } = e
                        console.log('aaaaaaaaa')
                        dispatch(getCustomersAction(customers.searchString, page, pageLength))
                    }} />
                </div>
            </div>
        </div >
    )
}
export default Customers
