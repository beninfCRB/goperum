import { Button, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MarketingType } from '.';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';

export interface tableMarketingProps {
    data: Array<MarketingType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TableMarketing = (props: tableMarketingProps) => {
    const work = props.data.map(({ work }) => {
        return { text: work, value: work };
    })

    const columns: ColumnsType<MarketingType> = [
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            sorter: {
                compare: (a: any, b: any) => a.name - b.name,
                multiple: 1
            },
            sortDirections: ['descend'],
        },
        {
            key: 'nik',
            title: 'Nik',
            dataIndex: 'nik',
            width: '30%',
            sorter: {
                compare: (a: any, b: any) => a.nik - b.nik,
                multiple: 2
            },
            sortDirections: ['descend'],
        },
        {
            key: 'address',
            title: 'Address',
            dataIndex: 'address',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.adrress - b.address,
                multiple: 3
            },
            sortDirections: ['descend'],
        },
        {
            key: 'handphone',
            title: 'Handphone',
            dataIndex: 'handphone',
            width: '30%',
            sorter: {
                compare: (a: any, b: any) => a.handphone - b.handphone,
                multiple: 4
            },
            sortDirections: ['descend'],
        },
        {
            key: 'work',
            title: 'Pekerjaan',
            dataIndex: 'work',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.work - b.work,
                multiple: 5
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(work),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.work.startsWith(value),
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

export default TableMarketing