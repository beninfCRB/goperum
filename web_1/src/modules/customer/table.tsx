import { Button, Spin, Table, Tooltip } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { CustomerType } from '.';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export interface tableCustomerProps {
    data: Array<CustomerType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TableCustomer = (props: tableCustomerProps) => {
    const columns: ColumnsType<CustomerType> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.name.startsWith(value),
        },
        {
            key: 'nik',
            title: 'Nik',
            dataIndex: 'nik',
            width: '40%',
            sorter: (a: any, b: any) => a.nik - b.nik,
            sortDirections: ['descend'],
        },
        {
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            width: '40%',
            sorter: (a: any, b: any) => a.adrress - b.address,
            sortDirections: ['descend'],
        },
        {
            key: 'handphone',
            title: 'Handphone',
            dataIndex: 'handphone',
            width: '40%',
            sorter: (a: any, b: any) => a.handphone - b.handphone,
            sortDirections: ['descend'],
        },
        {
            key: 'work',
            title: 'Pekerjaan',
            dataIndex: 'work',
            width: '40%',
            sorter: (a: any, b: any) => a.work - b.work,
            sortDirections: ['descend'],
        },
        {
            key: '',
            title: 'Action',
            dataIndex: '',
            width: '40%',
            render: (value: any) =>
                <div className='flex items-stretch gap-x-2'>
                    <Tooltip title='Ubah Data' placement='left'>
                        <Button className='bg-slate-400 border-black hover:scale-150' size='small' shape='circle' onClick={() => props.onEdit(value.id)}><EditOutlined style={{ color: 'white' }} /></Button>
                    </Tooltip>
                    <Tooltip title='Hapus Data'>
                        <Button className='bg-red-600  border-black hover:scale-150' size='small' shape='circle' onClick={() => props.onDelete(value.id)}><DeleteOutlined style={{ color: 'white' }} /></Button>
                    </Tooltip>
                </div>
        },
    ];

    const onChange: TableProps<CustomerType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Spin
            spinning={props.onLoading}>
            <Table
                className='shadow-2xl'
                rowKey={'id'}
                columns={columns}
                dataSource={props.data}
                onChange={onChange}
                scroll={{ x: 'max-content' }}
            />
        </Spin>
    );
}

export default TableCustomer