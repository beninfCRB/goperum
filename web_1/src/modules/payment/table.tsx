import { Button, Input, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PaymentType } from '.';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';
import { useEffect, useState } from 'react';
import { get, map } from 'lodash';

export interface tablePaymentProps {
    data: Array<PaymentType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface stateTablePayment {
    filteredInfo?: any | null;
    sortedInfo?: any | null;
    data?: Array<PaymentType>;
    filtered?: boolean | null;
    searchText?: string | null;
};

const TablePayment = (props: tablePaymentProps) => {
    const [_state, setState] = useState<stateTablePayment | null>(null)

    const Transaction = props.data.map(({ Transaction }) => {
        return { text: Transaction?.code, value: Transaction?.code }
    })
    const PaymentMethod = props.data.map(({ PaymentMethod }) => {
        return { text: PaymentMethod?.name, value: PaymentMethod?.name }
    })
    const ApprovalStatus = props.data.map(({ ApprovalStatus }) => {
        return { text: ApprovalStatus?.name, value: ApprovalStatus?.name }
    })
    const Bank = props.data.map(({ Bank }) => {
        return { text: Bank?.name, value: Bank?.name }
    })

    const columns: ColumnsType<PaymentType> = [
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
        },
        {
            key: 'account_name',
            title: 'Rekening',
            dataIndex: 'account_name',
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.account_name - b.account_name,
                multiple: 1
            },
            sortDirections: ['descend'],
        },
        {
            key: 'Transaction',
            title: 'Transaksi',
            dataIndex: ['Transaction', 'code'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.Transaction.code - b.Transaction.code,
                multiple: 3
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(Transaction),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.Transaction.code.startsWith(value),
        },
        {
            key: 'PaymentMethod',
            title: 'Produk',
            dataIndex: ['PaymentMethod', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.PaymentMethod?.name - b.PaymentMethod?.name,
                multiple: 4
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(PaymentMethod),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.PaymentMethod?.name.startsWith(value),
        },
        {
            key: 'ApprovalStatus',
            title: 'Metode Pembelian',
            dataIndex: ['ApprovalStatus', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.ApprovalStatus?.name - b.ApprovalStatus?.name,
                multiple: 5
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(ApprovalStatus),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.ApprovalStatus?.name.startsWith(value),
        },
        {
            key: 'Bank',
            title: 'Metode Pembelian',
            dataIndex: ['Bank', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.Bank?.name - b.Bank?.name,
                multiple: 5
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(Bank),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.Bank?.name.startsWith(value),
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
            const confirmdateMatch = get(record, 'confirm_date').match(reg);
            const transactionMatch = get(record, ['Transaction', 'code']).match(reg);
            const totalpaymentMatch = get(record, 'total_payment').match(reg);
            const informationMatch = get(record, 'information').match(reg);
            const approvalstatusMatch = get(record, ['ApprovalStatus', 'name']).match(reg);
            const paymentmethodMatch = get(record, ['PaymentMethod', 'name']).match(reg);
            const bankMatch = get(record, ['Bank', 'name']).match(reg);
            const accountnameMatch = get(record, 'account_name').match(reg);
            const accountnumberMatch = get(record, 'account_number').match(reg);
            const accountreceivableMatch = get(record, 'account_receivable').match(reg);
            const profpaymentMatch = get(record, 'prof_payment').match(reg);
            if (!confirmdateMatch && !codeMatch && !transactionMatch && !totalpaymentMatch && !informationMatch && !approvalstatusMatch && !paymentmethodMatch && !bankMatch && !accountnameMatch && !accountnumberMatch && !accountreceivableMatch && !profpaymentMatch) {
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

export default TablePayment