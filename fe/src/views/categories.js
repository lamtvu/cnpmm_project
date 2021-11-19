import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../components/dialog';
import Loading from '../components/loading';
import { addCategoryAction, deleteCategoryAction, getCagtegoriesAction, selectCategoryAction, updateCategoryAction } from '../store/actions/categoriyActions';

const Categories = () => {
    const [nameInput, setNameInput] = useState('');
    const categoriesState = useSelector(state => state.categories);
    const [showDialog, setShowDialog] = useState({ show: false, msg: '' });
    const [deleteId, setDeleteId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCagtegoriesAction());
    }, [])

    useEffect(() => {
        if (categoriesState.selected)
            setNameInput(categoriesState.selected.name);
        else setNameInput('')
    }, [categoriesState.selected])

    const addCategotyHandler = () => {
        dispatch(addCategoryAction({ name: nameInput }));
    }

    const onDelele = (id) => {
        setDeleteId(id);
        setShowDialog({ show: true, msg: 'do you want delete this category?' });
    }
    const selectHander = (id) => {
        dispatch(selectCategoryAction(id));
    }

    const deleteHandler = () => {
        if (!deleteId) return;
        dispatch(deleteCategoryAction(deleteId))
        setShowDialog({show: false});
    }

    const cancelHandler = () => {
        dispatch(selectCategoryAction(null));
    }

    const updateHandler = () => {
        dispatch(updateCategoryAction({ name: nameInput }));
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
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full'>categories management</div>
            <div className='px-4 mt-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='shadow-md p-1 col-span-2'>
                        {categoriesState.loading && <Loading />}
                        { categoriesState && categoriesState.items.map((category, index) => (
                                <div className={`capitalize p-4 border-b-2 border-gray-100 hover:bg-gray-200 relative group ${categoriesState.selected?._id === category._id && 'bg-gray-200'}`}
                                    onClick={() => selectHander(category._id)}
                                    key={index}
                                > {category.name}
                                    <div className='absolute right-0 top-1/2 z-10 bg-gray-50 p-3 shadow-md rounded-full hover:bg-gray-200 hidden group-hover:block transform -translate-y-1/2'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelele(category._id);
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
                        <div className='p-1 text-md'>Category infomation</div>
                        <div className='p-4'>
                            {categoriesState?.selected && (
                                <div className='flex gap-2 my-2'>
                                    <div className='capitalize font-medium'>id:</div>
                                    <div>{categoriesState.selected._id}</div>
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
                            {categoriesState?.selected ? (
                                <div className='flex gap-4 justify-center'>
                                    <button className='shadow-md py-2 px-4 w-20 bg-blue-300 hover:bg-blue-400 text-white' onClick={updateHandler}>Save</button>
                                    <button className='shadow-md py-2 px-4 w-20 hover:bg-gray-100' onClick={cancelHandler}>Cancel</button>
                                </div>
                            ) : (
                                <button className='shadow-md py-2 px-4 w-20 bg-red-300 hover:bg-red-400 text-white'
                                    onClick={addCategotyHandler}>Add</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Categories
