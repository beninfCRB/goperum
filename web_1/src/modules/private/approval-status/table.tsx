import { Button, Input, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ApprovalStatusType } from '.';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../../utils/filterable';
import { useEffect, useState } from 'react';
import { get, map } from 'lodash';

export interface tableApprovalStatusProps {
    data: Array<ApprovalStatusType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface stateTableApprovalStatus {
    filteredInfo?: any | null;
    sortedInfo?: any | null;
    data?: Array<ApprovalStatusType>;
    filtered?: boolean | null;
    searchText?: string | null;
};

const TableApprovalStatus = (props: tableApprovalStatusProps) => {
    const [_state, setState] = useState<stateTableApprovalStatus | null>(null)

    const code = props.data.map(({ code }) => {
        return { text: code, value: code }
    })
    const name = props.data.map(({ name }) => {
        return { text: name, value: name }
    })

    const RoleUser = props.data.map(({ RoleUser }) => {
        return { text: RoleUser?.name, value: RoleUser?.name }
    })

    const columns: ColumnsType<ApprovalStatusType> = [
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
            filterSearch: true,
            onFilter: (value: any, record: any) => record.name.startsWith(value),
        },
        {
            key: 'RoleUser',
            title: 'Asiggn',
            dataIndex: ['RoleUser', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.RoleUser?.name - b.RoleUser?.name,
                multiple: 2
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(RoleUser),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.RoleUser?.name.startsWith(value),
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
        let reg = new RegExp(e.target.value, "gi");
        let filteredData = map(_state?.data, (record: any) => {
            const codeMatch = get(record, "code").match(reg);
            const nameMatch = get(record, "name").match(reg);
            const roleMatch = get(record, ["RoleUser", "name"]).match(reg);
            if (!nameMatch && !codeMatch && !roleMatch) {
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
                filteredInfo: null,
                sortedInfo: null,
                data: props.data,
                filtered: false,
                searchText: ""
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
                    size="small"
                    ref={ele => (_state?.searchText == ele?.focus())}
                    suffix={suffix}
                    onChange={onSearch}
                    placeholder="Search"
                    value={_state?.searchText as string}
                    onPressEnter={onSearch}
                    autoFocus
                />
            </div>
            <Table
                className='shadow-2xl'
                rowKey={'id'}
                columns={columns}
                dataSource={_state?.data}
                scroll={{ x: 'max-content' }}
                bordered
            />
        </Spin>
    );
}

export default TableApprovalStatus