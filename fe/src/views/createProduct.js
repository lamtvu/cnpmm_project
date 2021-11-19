import { convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import TextEditor from '../components/editor'
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCagtegoriesAction } from '../store/actions/categoriyActions'
import { getBrandsAction } from '../store/actions/brandAction'
import { addProductAction } from '../store/actions/productAction';

const CreateProduct = () => {
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);
    const dispatch = useDispatch();

    const imgRef = useRef(null);
    const [createData, setCreateData] = useState({ value: {}, error: {} })
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        dispatch(getCagtegoriesAction());
        dispatch(getBrandsAction());
    }, [])

    const onFileChange = (e) => {
        const file = e.target.files[0]
        setCreateData({ ...createData, value: { ...createData.value, image: file } });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgRef.current.src = reader.result
        };
    }

    const onEditorChange = (e) => {
        setEditorState(e)
    }

    const changeCreateDataValue = (key, value) => {
        const createDataTemp = {
            value: { ...createData.value, [key]: value },
            error: { ...createData.error }
        }
        if (value) delete createDataTemp.error[key];
        else createDataTemp.error[key] = 'requied'

        setCreateData(createDataTemp);
    }

    const createHandler = () => {
        console.log(createData.value.image)
        const fd = new FormData();
        fd.append('name', createData.value.name);
        fd.append('description', createData.value.discription);
        fd.append('price', createData.value.price);
        fd.append('category', createData.value.category);
        fd.append('producer', createData.value.producer);
        fd.append('image', createData.value.image);
        fd.append('detail', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        console.log(fd);
        dispatch(addProductAction(fd));
        console.log(createData);
    }

    return (
        <div>
            <div className='p-4 capitalize font-semibold text-xl text-gray-600 bg-gray-100 w-full flex items-center gap-4'>
                <Link to='/admin/products'>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    products management / Create Product
                </div>
            </div>
            <div className='px-6 xl:px-16 inline-block'>
                <div className='my-4'>
                    <div className='py-2'>
                        <div className='text-md font-semibold capitalize'>image:</div>
                        <div className='relative'>
                            <img ref={imgRef} className='w-96 h-96' />
                        </div>
                        <label className='inline-block px-4 py-2 bg-gray-50 rounded-md shadow-md  hover:bg-gray-100 hover:shadow-lg'>
                            upload
                            <input hidden type="file" name="file" onChange={onFileChange} accept='image/png, image/jpeg' />
                        </label>
                    </div>
                    <div className='py-2'>
                        <label className='py-4'>
                            <div className='text-md font-semibold capitalize'>Product Name:</div>
                            <input type="text" name="productName"
                                onChange={(e) => changeCreateDataValue('name', e.target.value)}
                                className='w-full outline-none border-2 rounded-md
                        py-1 px-2' />
                        </label>
                    </div>
                    <div className='py-2'>
                        <label className='py-4'>
                            <div className='text-md py-2 font-semibold capitalize'>Category:</div>
                            <Select
                                onChange={(e) => changeCreateDataValue('category', e.value)}
                                options={categories?.items.map(cate => {
                                    return { value: cate._id, label: cate.name }
                                })}
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
                        </label>
                    </div>
                    <div className='py-2'>
                        <label className='py-4'>
                            <div className='text-md py-2 font-semibold capitalize'>Brand/producer:</div>
                            <Select
                                onChange={(e) => changeCreateDataValue('producer', e.value)}
                                options={brands?.items.map(brand => {
                                    return { value: brand._id, label: brand.name }
                                })}
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
                        </label>
                    </div>
                    <div className='py-2'>
                        <label>
                            <div className='text-md font-semibold capitalize'>Discription:</div>
                            <textarea name="discription"
                                onChange={(e) => changeCreateDataValue('description', e.target.value)}
                                className='w-full outline-none border-2 rounded-md py-1 px-2' rows='10' />
                        </label>
                    </div>
                    <div className='py-2'>
                        <label>
                            <div className='text-md font-semibold capitalize'>Price:</div>
                            <input type="number" name="price"
                                onChange={(e) => changeCreateDataValue('price', e.target.value)}
                                className='outline-none border-2 rounded-md py-1 px-2' />
                            <span className='ml-1'>vnd</span>
                        </label>
                    </div>
                    <div className='py-2'>
                        <div className='text-md font-semibold capitalize'>Detail:</div>
                        <div className='h-96'>
                            <TextEditor
                                editorState={editorState}
                                onEditorStateChange={onEditorChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div name='errors' className='text-red-600 text-base mb-4'>
                        </div>
                        <button
                            onClick={createHandler}
                            className='w-52 py-2 bg-gray-50 shadow-md hover:bg-gray-100 hover:shadow-lg'>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CreateProduct
