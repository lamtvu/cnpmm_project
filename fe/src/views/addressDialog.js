import React, { useEffect, useState } from 'react';
import Dialog from '../components/dialog';
import Select from 'react-select';

const AddressDialog = ({onOk}) => {
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState({ cities: [], districts: [], wards: [] });
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({ city: null, district: null, ward: null });
    const [err, setError] = useState(false);

    useEffect(() => {
        const cities = require('../data/tinh_tp.json');
        const arrCity = Object.keys(cities).map(key => {
            const temp = cities[key];
            return { label: temp.name, value: temp.code }
        });
        setOptions({ ...options, cities: arrCity });
    }, [])

    const onSelectCity = (e) => {
        setError(false);
        setLocation({ city: e, district: null, ward: null });
        const districts = require(`../data/quan-huyen/${e.value}.json`);
        const arrDistrict = Object.keys(districts).map(key => {
            const temp = districts[key];
            return { label: temp.name, value: temp.code }
        });
        setOptions({ ...options, districts: arrDistrict });
    }

    const onSelectDistrict = (e) => {
        setError(false);
        setLocation({ ...location, district: e, ward: null });
        const wards = require(`../data/xa-phuong/${e.value}.json`)
        const arrWard = Object.keys(wards).map(key => {
            const temp = wards[key];
            return { label: temp.name, value: temp.path_with_type }
        });
        setOptions({ ...options, wards: arrWard });
    }

    const onWardSelect = (e) => {
        setError(false);
        setLocation({ ...location, ward: e });
    }

    const okHandler = () => {
        if (!location.ward) {
            setError(true);
            return;
        }
        onOk && onOk(`${address}, ${location.ward.value}`)
        setShow(false);
    }

    return (
        <div>
            <button className='py-1 px-4 bg-gray-100 shadow-lg hover:shadow-xl focus:outline-none' onClick={() => { setShow(true) }}>edit</button>
            <Dialog show={show}>
                <div className='w-96'>
                    Province/City
                    <Select options={options.cities}
                        value={location.city}
                        onChange={onSelectCity} />
                </div>
                <div className='w-96'>
                    Districts
                    <Select options={options.districts}
                        value={location.district}
                        onChange={onSelectDistrict} />
                </div>
                <div className='w-96'>
                    wards
                    <Select options={options.wards}
                        value={location.ward}
                        onChange={onWardSelect} />
                </div>
                <div className='w-96'>
                    <p>Address</p>
                    <input type='text' className='py-1 px-2 focus:outline-none w-full border-2 rounded-md'
                        onChange={(e) => setAddress(e.target.value)} />
                </div>
                {err && <div className='text-red-500'>Fill in all infomation</div>}
                <div className='flex justify-around mt-4'>
                    <button className='py-2 w-20 border-2 focus:outline-none rounded-md hover:bg-gray-100'
                        onClick={okHandler}>Ok</button>
                    <button className='py-2 w-20 border-2 focus:outline-none rounded-md hover:bg-gray-100'
                        onClick={() => setShow(false)}>cancel</button>
                </div>
            </Dialog>
        </div>
    )
}

export default AddressDialog
