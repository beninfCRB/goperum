import { Button, Input, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MarketingType } from '.';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';
import { useEffect, useState } from 'react';
import { get, map } from 'lodash';

export interface tableMarketingProps {
    data: Array<MarketingType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface stateTableMarketing {
    filteredInfo?: any | null;
    sortedInfo?: any | null;
    data?: Array<MarketingType>;
    filtered?: boolean | null;
    searchText?: string | null;
};

const TableMarketing = (props: tableMarketingProps) => {
    const [_state, setState] = useState<stateTableMarketing | null>(null)

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
            const codeMatch = get(record, 'nik').match(reg);
            const numbemployeeMatch = get(record, 'numbemployee').match(reg);
            const nameMatch = get(record, 'name').match(reg);
            const addressMatch = get(record, 'address').match(reg);
            const handphoneMatch = get(record, 'handphone').match(reg);
            const workMatch = get(record, 'work').match(reg);
            if (!nameMatch && !codeMatch && !addressMatch && !handphoneMatch && !workMatch && !numbemployeeMatch) {
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
            <div className='lg:w-1/3 md:w-full'>
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

export default TableMarketing