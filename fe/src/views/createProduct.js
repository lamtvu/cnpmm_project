import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TextEditor from '../components/editor'
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCagtegoriesAction } from '../store/actions/categoriyActions'
import { getBrandsAction } from '../store/actions/brandAction'
import { addProductAction } from '../store/actions/productAction';
import NumberFormat from 'react-number-format';
import Loading from '../components/loading';

const CreateProduct = () => {
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);
    const products = useSelector(state=> state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [imgSrc, setImgSrc] = useState(null);
    const [createData, setCreateData] = useState({ value: {}, error: {} })
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect(() => {
        dispatch(getCagtegoriesAction());
        dispatch(getBrandsAction());
    }, [])

    const onFileChange = (e) => {
        const file = e.target.files[0]
        if(!file) return;
        const temp = {
            ...createData,
            value: {
                ...createData.value, image: file
            }
        }
        delete temp.error.image;
        console.log(temp)
        setCreateData(temp)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImgSrc(reader.result);
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
        let errors = null;
        console.log(createData.value)
        if (!createData.value.image) {
            errors = { ...errors, image: 'requied' }
        }
        if (!createData.value.name) {
            errors = { ...errors, name: 'requied' }
        }
        if (!createData.value.category) {
            errors = { ...errors, category: 'requied' }
        }
        if (!createData.value.producer) {
            errors = { ...errors, producer: 'requied' }
        }
        if (!createData.value.price) {
            errors = { ...errors, price: 'requied' }
        }
        if (!createData.value.description) {
            errors = { ...errors, description: 'requied' }
        }

        if (errors) {
            setCreateData({
                ...createData,
                error: {
                    ...createData.error,
                    ...errors
                }
            })
            return;
        }

        const fd = new FormData();
        fd.append('name', createData.value.name);
        fd.append('description', createData.value.description);
        fd.append('price', createData.value.price);
        fd.append('category', createData.value.category);
        fd.append('producer', createData.value.producer);
        fd.append('image', createData.value.image);
        fd.append('detail', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        setEditorState(EditorState.createEmpty());
        dispatch(addProductAction(fd, () => navigate('/admin/products')));
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
                        <div className='text-md font-semibold capitalize'>image*:
                            {createData.error.image && <span className='text-red-500'> required</span>}
                        </div>
                        {imgSrc && <img className='w-96' src={imgSrc} alt='productImgae' />}
                        <label className='inline-block px-4 py-2 bg-gray-50 rounded-md shadow-md  hover:bg-gray-100 hover:shadow-lg'>
                            upload
                            <input hidden type="file" name="file" onChange={onFileChange} accept='image/png, image/jpeg' />
                        </label>
                    </div>
                    <div className='py-2 flex'>
                        <label className='py-4'>
                            <div className='text-md font-semibold capitalize'>Product Name*:</div>
                            <div className='flex gap-2 items-center'>
                                <input type="text" name="productName"
                                    autoComplete="off"
                                    onChange={(e) => changeCreateDataValue('name', e.target.value)}
                                    className='w-full outline-none border-2 rounded-md py-1 px-2' />
                                {createData.error.name && <div className='text-red-500 font-semibold'>requied</div>}
                            </div>
                        </label>
                    </div>
                    <div className='py-2'>
                        <label className='py-4'>
                            <div className='text-md py-2 font-semibold capitalize'>Category*:
                                {createData.error.category && <span className='text-red-500'> required</span>}
                            </div>
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
                            <div className='text-md py-2 font-semibold capitalize'>Brand:
                                {createData.error.producer && <span className='text-red-500'> required</span>}
                            </div>
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
                            <div className='text-md font-semibold capitalize'>
                                Discription*:
                                {createData.error.description && <span className='text-red-500'> required</span>}
                            </div>
                            <textarea name="description"
                                onChange={(e) => changeCreateDataValue('description', e.target.value)}
                                className='w-full outline-none border-2 rounded-md py-1 px-2' rows='10' />
                        </label>
                    </div>
                    <div className='py-2'>
                        <label>
                            <div className='text-md font-semibold capitalize'>
                                Price*:
                                {createData.error.price && <span className='text-red-500'> required</span>}
                            </div>
                            <NumberFormat thousandSeparator={true} onValueChange={(e) => changeCreateDataValue('price', e.value)}
                            className='outline-none border-2 rounded-md py-1 px-2' />
                            <span> vnd</span>
                        </label>
                    </div>
                    <div className='py-2'>
                        <div className='text-md font-semibold capitalize'>Detail:</div>
                        <div className='h-96 mb-20'>
                            <TextEditor
                                editorState={editorState}
                                onEditorStateChange={onEditorChange}
                            />
                        </div>
                    </div>
                    <div>
                        {Object.keys(createData.error).length > 0 && (
                            <div name='errors' className='text-white text-base font-semibold bg-red-400 p-3 rounded-sm'>
                                Fill in all input fields
                            </div>)}
                        {products?.loading && <Loading />}
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
