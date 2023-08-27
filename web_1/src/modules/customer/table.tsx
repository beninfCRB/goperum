import React, { useEffect, useState } from 'react';
import { Spin, Table } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { CustomerType, useCustomerAll } from '.';
import CustomerStore from './state';

const onChange: TableProps<CustomerType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const TableCustomer = () => {

    const { data, isLoading } = useCustomerAll()
    const { multiple, getAll } = CustomerStore()

    const columns: ColumnsType<CustomerType> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            sorter: (a: any, b: any) => a.name - b.name,
            sortDirections: ['descend'],
        },
        {
            key: 'nik',
            title: 'Nik',
            dataIndex: 'nik',
            sorter: (a: any, b: any) => a.nik - b.nik,
            sortDirections: ['descend'],
            responsive: ['md'],
        },
        {
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            width: '40%',
            sorter: (a: any, b: any) => a.adrress - b.address,
            sortDirections: ['descend'],
            responsive: ['md'],
        },
        {
            key: 'handphone',
            title: 'Handphone',
            dataIndex: 'handphone',
            width: '40%',
            sorter: (a: any, b: any) => a.handphone - b.handphone,
            sortDirections: ['descend'],
            responsive: ['md'],
        },
        {
            key: 'work',
            title: 'Pekerjaan',
            dataIndex: 'work',
            width: '40%',
            sorter: (a: any, b: any) => a.work - b.work,
            sortDirections: ['descend'],
            responsive: ['md'],
        },
    ];


    useEffect(() => {
        if (data) {
            getAll(data)
        }
    }, [data])

    return (
        <Spin spinning={isLoading}>
            <Table rowKey={'id'} columns={columns} dataSource={multiple} onChange={onChange} />
        </Spin>
    );
}

export default TableCustomer