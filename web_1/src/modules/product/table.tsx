import { Button, Input, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ProductType } from '.';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';
import { useEffect, useState } from 'react';
import { get, map } from 'lodash';

export interface tableProductProps {
    data: Array<ProductType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface stateTableProduct {
    filteredInfo?: any | null;
    sortedInfo?: any | null;
    data?: Array<ProductType>;
    filtered?: boolean | null;
    searchText?: string | null;
};

const TableProduct = (props: tableProductProps) => {
    const [_state, setState] = useState<stateTableProduct | null>(null)

    const name = props.data.map(({ name }) => {
        return { text: name, value: name }
    })
    const model = props.data.map(({ model }) => {
        return { text: model, value: model }
    })
    const type = props.data.map(({ type }) => {
        return { text: type, value: type }
    })
    const blok = props.data.map(({ blok }) => {
        return { text: blok, value: blok }
    })
    const kavling = props.data.map(({ kavling }) => {
        return { text: kavling, value: kavling }
    })
    const price = props.data.map(({ price }) => {
        return { text: price, value: price }
    })

    const columns: ColumnsType<ProductType> = [
        {
            key: 'name',
            title: 'Nama',
            dataIndex: 'name',
            width: '20%',
            sorter: {
                compare: (a: any, b: any) => a.name - b.name,
                multiple: 1
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(name),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.name.startsWith(value),
        },
        {
            key: 'model',
            title: 'Model',
            dataIndex: 'model',
            width: '20%',
            sorter: {
                compare: (a: any, b: any) => a.model - b.model,
                multiple: 1
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(model),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.model.startsWith(value),
        },
        {
            key: 'type',
            title: 'Tipe',
            dataIndex: 'type',
            width: '20%',
            sorter: {
                compare: (a: any, b: any) => a.type - b.type,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(type),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.type.startsWith(value),
        },
        {
            key: 'blok',
            title: 'Blok',
            dataIndex: 'blok',
            width: '20%',
            sorter: {
                compare: (a: any, b: any) => a.blok - b.blok,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(blok),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.blok.startsWith(value),
        },
        {
            key: 'price',
            title: 'Kavling',
            dataIndex: 'price',
            width: '30%',
            sorter: {
                compare: (a: any, b: any) => a.price - b.price,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(price),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.price.startsWith(value),
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
            key: 'kavling',
            title: 'Kavling',
            dataIndex: 'kavling',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.kavling - b.kavling,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(kavling),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record: any) => record.type.startsWith(value),
        },
        {
            key: 'description',
            title: 'Deskripsi',
            dataIndex: 'description',
            width: '40%',
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
            const nameMatch = get(record, 'name').match(reg);
            const modelMatch = get(record, 'model').match(reg);
            const typeMatch = get(record, 'type').match(reg);
            const blokMatch = get(record, 'blok').match(reg);
            const kavlingMatch = get(record, 'kavling').match(reg);
            const sertifikatMatch = get(record, 'sertifikat').match(reg);
            const priceMatch = get(record, 'price').match(reg);
            const descriptionMatch = get(record, 'description').match(reg);
            const stockMatch = get(record, 'stock').match(reg);
            if (!nameMatch && !modelMatch && !typeMatch && !blokMatch && !kavlingMatch && !sertifikatMatch && !priceMatch && !descriptionMatch && !stockMatch) {
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

export default TableProduct