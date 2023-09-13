import { Button, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AreaType } from '.';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export interface tableAreaProps {
    data: Array<AreaType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TableArea = (props: tableAreaProps) => {
    const columns: ColumnsType<AreaType> = [
        {
            key: 'blok',
            title: 'Blok',
            dataIndex: 'blok',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.blok - b.blok,
                multiple: 1
            },
            sortDirections: ['descend'],
            filters:
                props.data.map((value) => {
                    return { text: String(value.blok), value: String(value.blok) }
                })
            ,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.blok.startsWith(value),
        },
        {
            key: 'kavling',
            title: 'Kavling',
            dataIndex: 'kavling',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.kavling - b.kavling,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters:
                props.data.map((value) => {
                    return { text: String(value.kavling), value: String(value.kavling) }
                })
            ,
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.kavling.startsWith(value),
        },
        {
            key: 'sertifikat',
            title: 'Sertifikat',
            dataIndex: 'sertifikat',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.sertifikat - b.sertifikat,
                multiple: 3
            },
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

export default TableArea