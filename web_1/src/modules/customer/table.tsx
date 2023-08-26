import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { CustomerType, useCustomerAll } from '.';
import CustomerStore from './state';

const onChange: TableProps<CustomerType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableCustomer = () => {

    const { data } = useCustomerAll()
    const { multiple, getAll } = CustomerStore()

    const columns: ColumnsType<CustomerType> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            sorter: (a: any, b: any) => a.name - b.name,
        },
        {
            key: 'nik',
            title: 'Nik',
            dataIndex: 'nik',
            sorter: (a: any, b: any) => a.nik - b.nik,
        },
        {
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            width: '40%',
            sorter: (a: any, b: any) => a.adrress - b.address,
        },
        {
            key: 'handphone',
            title: 'Handphone',
            dataIndex: 'handphone',
            width: '40%',
            sorter: (a: any, b: any) => a.handphone - b.handphone,
        },
        {
            key: 'work',
            title: 'Pekerjaan',
            dataIndex: 'work',
            width: '40%',
            sorter: (a: any, b: any) => a.work - b.work,
        },
    ];


    useEffect(() => {
        if (data) {
            getAll(data)
        }
    }, [data])

    return (
        <Table rowKey={'id'} columns={columns} dataSource={multiple} onChange={onChange} />
    );
}

export default TableCustomer