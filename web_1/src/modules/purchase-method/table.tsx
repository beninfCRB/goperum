import { Button, Input, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PurchaseMethodType } from '.';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';
import { useEffect, useState } from 'react';
import { get, map } from 'lodash';

export interface tablePurchaseMethodProps {
    data: Array<PurchaseMethodType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface stateTablePurchase {
    filteredInfo?: any | null;
    sortedInfo?: any | null;
    data?: Array<PurchaseMethodType>;
    filtered?: boolean | null;
    searchText?: string | null;
};

const TablePurchaseMethod = (props: tablePurchaseMethodProps) => {
    const [_state, setState] = useState<stateTablePurchase | null>(null)

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

    const emitEmpty = () => {
        setState({
            data: props.data,
            searchText: '',
            filtered: null
        });
    };

    const onSearch = (e: any) => {
        const reg = new RegExp(e.target.value, 'gi');
        const filteredData = map(_state?.data, (record: any) => {
            const codeMatch = get(record, 'code').match(reg);
            const nameMatch = get(record, 'name').match(reg);
            if (!nameMatch && !codeMatch) {
                return null;
            }
            return record;
        }).filter((record: any) => !!record);

        setState({
            searchText: e.target.value,
            filtered: !!e.target.value,
            data: e.target.value ? filteredData : _state?.data
        });
    };

    useEffect(() => {
        if (props.data) {
            setState({
                data: props.data
            })
        }
    }, [props.data])

    const suffix = _state?.searchText ? (
        <CloseCircleOutlined onClick={emitEmpty} style={{ color: 'red' }} />
    ) : null;

    return (
        <Spin
            spinning={props.onLoading}>
            <div className='w-1/3'>
                <Input.Search
                    className='mb-2'
                    size='small'
                    ref={ele => (_state?.searchText == ele)}
                    suffix={suffix}
                    onChange={onSearch}
                    placeholder='Search'
                    value={_state?.searchText as string}
                    onPressEnter={onSearch}
                    autoFocus
                />
            </div>
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