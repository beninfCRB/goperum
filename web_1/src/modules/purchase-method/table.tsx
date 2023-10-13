import { Button, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PurchaseMethodType } from '.';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';

export interface tablePurchaseMethodProps {
    data: Array<PurchaseMethodType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TablePurchaseMethod = (props: tablePurchaseMethodProps) => {
    const code = props.data.map(({ code }) => {
        return { text: code, value: code }
    })
    const name = props.data.map(({ name }) => {
        return { text: name, value: name }
    })

    const columns: ColumnsType<PurchaseMethodType> = [
        {
            key: 'code',
            title: 'Kode',
            dataIndex: 'code',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.code - b.code,
                multiple: 1
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(code),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.code.startsWith(value),
        },
        {
            key: 'name',
            title: 'Nama',
            dataIndex: 'name',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.name - b.name,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(name),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.name.startsWith(value),
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

    return (
        <Spin
            spinning={props.onLoading}>
            <Table
                className='shadow-2xl'
                rowKey={'id'}
                columns={columns}
                dataSource={props.data}
                scroll={{ x: 'max-content' }}
                bordered
            />
        </Spin>
    );
}

export default TablePurchaseMethod