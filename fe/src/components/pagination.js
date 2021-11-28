import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { nextPageAction } from '../store/actions/productAction';

const options = [
    { label: '5 per page', value: 5 },
    { label: '10 per page', value: 10 },
    { label: '25 per page', value: 25 },
]

const Pagination = ({ totalRecords = 0, onPageChange }) => {
    const [paginationState, setPaginationState] = useState({ page: 0, pageLength: 10, totalRecords: 0 });

    useEffect(() => {
        setPaginationState({
            ...paginationState,
            totalRecords: totalRecords,
            page: 0
        })
    }, [totalRecords]);

    const getRecordsString = () => {
        const { page, pageLength, totalRecords } = paginationState;
        const start = page * pageLength + 1 <= totalRecords ? page * pageLength + 1 : totalRecords;
        const end = (page + 1) * pageLength <= totalRecords ? (page + 1) * pageLength : totalRecords;
        return `${start} - ${end} / ${totalRecords}`
    }

    const nextPage = () => {
        const { page, pageLength, totalRecords } = paginationState;
        if ((page + 1) * pageLength >= totalRecords) return;
        onPageChange && onPageChange({ ...paginationState, page: page + 1 });
        setPaginationState({ ...paginationState, page: page + 1 })
    }

    const prePage = () => {
        const { page } = paginationState;
        if (page === 0) return;
        onPageChange && onPageChange({ ...paginationState, page: page - 1 });
        setPaginationState({ ...paginationState, page: page - 1 })
    }

    const onSelect = (e) => {
        setPaginationState({ ...paginationState, pageLength: e.value, page: 0 })
    }

    return (
        <div className='flex gap-4 items-center'>
            <div className='text-gray-500'>Records: {getRecordsString()}</div>
            <Select
                options={options}
                value={options.find(x => x.value === paginationState.pageLength)}
                onChange={onSelect}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        text: 'gray',
                        primary25: 'lightgray',
                        primary50: 'hotgray',
                        primary: 'gray',
                    },
                })}
            />
            <div className='text-gray-500 flex items-center gap-4'>
                <button className={` focus:outline-none ${paginationState.page === 0 && `text-gray-300`}`}
                    onClick={prePage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className={` focus:outline-none ${(paginationState.page + 1) * paginationState.pageLength >= paginationState.totalRecords && `text-gray-300`}`}
                    onClick={nextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Pagination
