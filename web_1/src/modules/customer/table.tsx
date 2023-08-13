import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { CustomerType, useCustomerAll } from '.';
import CustomerStore from './state';


const columns: ColumnsType<CustomerType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        // filters: [
        //     {
        //         text: 'Joe',
        //         value: 'Joe',
        //     },
        //     {
        //         text: 'Category 1',
        //         value: 'Category 1',
        //     },
        //     {
        //         text: 'Category 2',
        //         value: 'Category 2',
        //     },
        // ],
        // filterMode: 'tree',
        filterSearch: true,
        // onFilter: (value: string, record) => record.name.startsWith(value),
        width: '30%',
    },
    {
        title: 'Nik',
        dataIndex: 'nik',
        sorter: (a: any, b: any) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        // filters: [
        //     {
        //         text: 'London',
        //         value: 'London',
        //     },
        //     {
        //         text: 'New York',
        //         value: 'New York',
        //     },
        // ],
        // onFilter: (value: string, record: any) => record.address.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
    {
        title: 'Handphone',
        dataIndex: 'handphone',
        // filters: [
        //     {
        //         text: 'London',
        //         value: 'London',
        //     },
        //     {
        //         text: 'New York',
        //         value: 'New York',
        //     },
        // ],
        // onFilter: (value: string, record: any) => record.address.startsWith(value),
        filterSearch: true,
        width: '40%',
    },
];

const onChange: TableProps<CustomerType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableCustomer = () => {

    const { data } = useCustomerAll()
    const { multiple, getAll } = CustomerStore()

    useEffect(() => {
        if (data) {
            getAll(data)
        }
    }, [data])

    return (
        <Table columns={columns} dataSource={multiple} onChange={onChange} />
    );
}

export default TableCustomer