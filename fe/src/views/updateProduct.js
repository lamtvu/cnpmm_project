import { convertToRaw, EditorState, ContentState } from 'draft-js';
import { useNavigate, useParams } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TextEditor from '../components/editor'
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCagtegoriesAction } from '../store/actions/categoriyActions'
import { getBrandsAction } from '../store/actions/brandAction'
import { updateProductAction } from '../store/actions/productAction';
import { getProductAPI } from '../api/productApi';
import NumberFormat from 'react-number-format';
import Loading from '../components/loading';
import Products from './products';

const UpdateProduct = () => {
    const categories = useSelector(state => state.categories);
    const brands = useSelector(state => state.brands);
    const products = useSelector(state => state.products);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    let { productId } = useParams();
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(null);

    const [updateData, setUpdateData] = useState({ value: {}, error: {} })
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        dispatch(getCagtegoriesAction());
        dispatch(getBrandsAction());
        getProduct();
    }, [productId])

    const getProduct = async () => {
        try {
            setLoading(true);
            const res = await getProductAPI(productId);
            setLoading(false);
            const { category, producer } = res.data;
            const categorySelect = { value: category._id, label: category.name };
            const producerSelect = { value: producer._id, label: producer.name };
            setImgSrc(res.data.image);
            setUpdateData({ ...updateData, value: { ...res.data, category: categorySelect, producer: producerSelect } });

            const blocksFromHtml = htmlToDraft(res.data.detail);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const _editorState = EditorState.createWithContent(contentState);
            setEditorState(_editorState);
        } catch (e) {
            setLoading(false);
            setNotFound(true);
        }
    }

    const onFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return;
        const temp = {
            ...updateData,
            value: {
                ...updateData.value, image: file
            }
        }
        delete temp.error.image;
        console.log(temp)
        setUpdateData(temp)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImgSrc(reader.result);
        };
    }


    const onEditorChange = (e) => {
        setEditorState(e)
    }

    const changeDataValue = (key, value) => {
        const createDataTemp = {
            value: { ...updateData.value, [key]: value },
            error: { ...updateData.error }
        }
        if (value) delete createDataTemp.error[key];
        else createDataTemp.error[key] = 'requied'

        setUpdateData(createDataTemp);
    }

    const updateHandler = () => {
        if (!updateData.value.name) {
            setUpdateData({ ...updateData, error: { ...updateData.error, name: 'requied' } });
            return;
        }
        if (!updateData.value.category) {
            setUpdateData({ ...updateData, error: { ...updateData.error, category: 'requied' } });
            return;
        }
        if (!updateData.value.producer) {
            setUpdateData({ ...updateData, error: { ...updateData.error, producer: 'requied' } });
            return;
        }
        if (!updateData.value.price) {
            setUpdateData({ ...updateData, error: { ...updateData.error, price: 'requied' } });
            return;
        }
        if (!updateData.value.description) {
            setUpdateData({ ...updateData, error: { ...updateData.error, image: 'requied' } });
            return;
        }
        const fd = new FormData();
        fd.append('name', updateData.value.name);
        fd.append('description', updateData.value.description);
        fd.append('price', updateData.value.price);
        fd.append('category', updateData.value.category.value);
        fd.append('producer', updateData.value.producer.value);
        fd.append('image', updateData.value.image);
        fd.append('detail', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        dispatch(updateProductAction(updateData.value._id, fd, () => navigate('/admin/products')));
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
                    products management / Update Product
                </div>
            </div>
            {loading && <Loading />}
            {notFound ? <div className='text-xl font-semibold text-gray-600 p-4'>
                NOT FOUND
            </div> : (
                <div className='px-6 xl:px-16 inline-block'>
                    <div className='my-4'>
                        <div className='py-2'>
                            <div className='text-md font-semibold capitalize'>image*:</div>
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
                                        value={updateData?.value?.name || ''}
                                        onChange={(e) => changeDataValue('name', e.target.value)}
                                        className='w-full outline-none border-2 rounded-md py-1 px-2' />
                                    {updateData.error.name && <div className='text-red-500 font-semibold'>requied</div>}
                                </div>
                            </label>
                        </div>
                        <div className='py-2'>
                            <label className='py-4'>
                                <div className='text-md py-2 font-semibold capitalize'>Category*:
                                    {updateData.error.category && <span className='text-red-500'> required</span>}
                                </div>
                                <Select
                                    value={updateData?.value.category}
                                    onChange={(e) => changeDataValue('category', e)}
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
                                <div className='text-md py-2 font-semibold capitalize'>Brand/producer*:
                                    {updateData.error.producer && <span className='text-red-500'> required</span>}
                                </div>
                                <Select
                                    value={updateData?.value.producer}
                                    onChange={(e) => changeDataValue('producer', e)}
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
                                    {updateData.error.description && <span className='text-red-500'> required</span>}
                                </div>
                                <textarea name="description"
                                    value={updateData?.value?.description || ''}
                                    onChange={(e) => changeDataValue('description', e.target.value)}
                                    className='w-full outline-none border-2 rounded-md py-1 px-2' rows='10' />
                            </label>
                        </div>
                        <div className='py-2'>
                            <label>
                                <div className='text-md font-semibold capitalize'>
                                    Price*:
                                    {updateData.error.price && <span className='text-red-500'> required</span>}
                                </div>

                                <NumberFormat
                                    thousandSeparator={true}
                                    onValueChange={(e) => changeDataValue('price', e.value)}
                                    value={updateData?.value?.price || 0}
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
                            {Object.keys(updateData.error).length > 0 && <div name='errors' className='text-red-600 text-base font-semibold'>
                                Fill in all input fields
                            </div>}
                            {products?.loading && <Loading />}
                            {/* <Loading/> */}
                            <button
                                onClick={updateHandler}
                                className='w-52 py-2 bg-gray-50 shadow-md hover:bg-gray-100 hover:shadow-lg'>
                                Update
                            </button>
                        </div>
                    </div>
                </div>)}
        </div >
    )
}

export default UpdateProduct
