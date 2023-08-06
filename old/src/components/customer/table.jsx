import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getCustomers } from 'features/customer/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: '30%',
    },
    {
        title: 'Nik',
        dataIndex: 'nik',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableCustomer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCustomers())
    }, [])
    // const customerstate = useSelector((state) => state.customer);
    // console.log(customerstate);
    const data = [];
    // for (let i = 0; i < customerstate; i++) {
    //     if (customerstate[i].role !== "admin") {
    //         data.push({
    //             key: i + 1,
    //             nik: customerstate[i].nik,
    //             name: customerstate[i].name,
    //             address: customerstate[i].address,
    //             work: customerstate[i].work,
    //             handphone: customerstate[i].handphone,
    //         });
    //     }
    // }
    // console.log(data);
    return (
        <Table columns={columns} dataSource={data} onChange={onChange} />
    );
}

export default TableCustomer