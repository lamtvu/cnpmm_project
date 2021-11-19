import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../components/dialog';
import Loading from '../components/loading';
import { addBrandAction, deleteBrandAction, getBrandsAction, selectBandAction, updateBrandAction } from '../store/actions/brandAction';

const Brands = () => {
    const brandState = useSelector(state => state.brands);
    const dispatch = useDispatch();
    const [nameInput, setNameInput] = useState('');
    const [showDialog, setShowDialog] = useState({ show: false, msg: '' });
    const [deleteId, setDeleteId] = useState(null);
    useEffect(() => {
        dispatch(getBrandsAction());
    }, [])

    useEffect(() => {
        if (brandState.selected)
            setNameInput(brandState.selected.name);
        else setNameInput('');
    }, [brandState.selected])

    const addHandler = () => {
        dispatch(addBrandAction({ name: nameInput }));
        setNameInput('');
    }

    const onDelele = (id) => {
        setDeleteId(id);
        setShowDialog({ show: true, msg: 'do you want delete this brand?' });
    }
    const selectHander = (id) => {
        dispatch(selectBandAction(id));
    }

    const deleteHandler = () => {
        if (!deleteId) return;
        dispatch(deleteBrandAction(deleteId))
        setShowDialog({ show: false });
    }

    const cancelHandler = () => {
        dispatch(selectBandAction(null));
    }

    const updateHandler = () => {
        dispatch(updateBrandAction({ name: nameInput }));
    }
    return (
        <div>
            <Dialog show={showDialog.show} onTurnOff={() => { setShowDialog({ show: false }) }} >
                <div className='capitalize text-md font-semibold'>
                    {showDialog.msg}
                    <div className='flex justify-around pt-4'>
                        <button className='shadow-md py-2 px-4 w-20 bg-red-400 hover:bg-red-300 text-white'
                            onClick={deleteHandler}>Delete</button>
                        <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100'
                            onClick={() => { setShowDialog({ show: false }) }}
                        >Cancel</button>
                    </div>
                </div>
            </Dialog>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>brand management</div>
            <div className='px-4 mt-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='shadow-md p-1 col-span-2'>
                        {brandState?.loading && <Loading />}
                        {brandState && brandState.items.map((brand, index) => (
                            <div className={`capitalize p-4 border-b-2 border-gray-100 hover:bg-gray-200 relative group ${brandState.selected?._id === brand._id && 'bg-gray-200'}`}
                                onClick={() => selectHander(brand._id)}
                                key={index}
                            > {brand.name}
                                <div className='absolute right-0 top-1/2 z-10 bg-gray-50 p-3 shadow-md rounded-full hover:bg-gray-200 hidden group-hover:block transform -translate-y-1/2'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelele(brand._id);
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className='shadow-md p-1 h-52 text-gray-600'>
                        <div className='p-1 text-md'>Brand infomation</div>
                        <div className='p-4'>
                            {brandState?.selected && (
                                <div className='flex gap-2 my-2'>
                                    <div className='capitalize font-medium'>id:</div>
                                    <div>{brandState.selected._id}</div>
                                </div>
                            )}
                            <label className='flex gap-2 my-2 items-end'>
                                <div className='capitalize font-medium'>name:</div>
                                <input type="text" name="caregory-name"
                                    value={nameInput}
                                    onChange={(e) => setNameInput(e.target.value)}
                                    className='w-full shadow-md outline-none px-4 py-1' />
                            </label>
                        </div>
                        <div className='flex gap-4 justify-center'>
                            {brandState?.selected ? (
                                <div className='flex gap-4 justify-center'>
                                    <button className='shadow-md py-2 px-4 w-20 bg-blue-300 hover:bg-blue-400 text-white' onClick={updateHandler}>Save</button>
                                    <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100' onClick={cancelHandler}>Cancel</button>
                                </div>
                            ) : (
                                <button className='shadow-md py-2 px-4 w-20 bg-red-300 hover:bg-red-400 text-white'
                                    onClick={addHandler}>Add</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Brands
