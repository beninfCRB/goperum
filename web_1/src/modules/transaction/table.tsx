import { Button, Input, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TransactionType } from '.';
import { CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';
import { useEffect, useState } from 'react';
import { get, map } from 'lodash';

export interface tableTransactionProps {
    data: Array<TransactionType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface stateTableTransaction {
    filteredInfo?: any | null;
    sortedInfo?: any | null;
    data?: Array<TransactionType>;
    filtered?: boolean | null;
    searchText?: string | null;
};

const TableTransaction = (props: tableTransactionProps) => {
    const [_state, setState] = useState<stateTableTransaction | null>(null)

    const Marketing = props.data.map(({ Marketing }) => {
        return { text: Marketing?.name, value: Marketing?.name }
    })
    const Product = props.data.map(({ Product }) => {
        return { text: Product?.name, value: Product?.name }
    })
    const PurchaseMethod = props.data.map(({ PurchaseMethod }) => {
        return { text: PurchaseMethod?.name, value: PurchaseMethod?.name }
    })
    const TypeDownPayment = props.data.map(({ TypeDownPayment }) => {
        return { text: TypeDownPayment?.name, value: TypeDownPayment?.name }
    })

    const columns: ColumnsType<TransactionType> = [
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
            key: 'Customer',
            title: 'Pelanggan',
            dataIndex: ['Customer', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.Customer.name - b.Customer.name,
                multiple: 2
            },
            sortDirections: ['descend'],
        },
        {
            key: 'Marketing',
            title: 'Marketing',
            dataIndex: ['Marketing', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.Marketing.name - b.Marketing.name,
                multiple: 3
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(Marketing),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.Marketing.name.startsWith(value),
        },
        {
            key: 'Product',
            title: 'Produk',
            dataIndex: ['Product', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.Product?.name - b.Product?.name,
                multiple: 4
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(Product),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.Product?.name.startsWith(value),
        },
        {
            key: 'PurchaseMethod',
            title: 'Metode Pembelian',
            dataIndex: ['PurchaseMethod', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.PurchaseMethod?.name - b.PurchaseMethod?.name,
                multiple: 5
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(PurchaseMethod),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.PurchaseMethod?.name.startsWith(value),
        },
        {
            key: 'TypeDownPayment',
            title: 'Metode Pembelian',
            dataIndex: ['TypeDownPayment', 'name'],
            width: '40%',
            sorter: {
                compare: (a: any, b: any) => a.TypeDownPayment?.name - b.TypeDownPayment?.name,
                multiple: 5
            },
            sortDirections: ['descend'],
            filters: removeDuplicates(TypeDownPayment),
            filterSearch: true,
            onFilter: (value: any, record: any) => record.TypeDownPayment?.name.startsWith(value),
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
            const customerMatch = get(record, ['Customer', 'name']).match(reg);
            const marketingMatch = get(record, ['Marketing', 'name']).match(reg);
            const productMatch = get(record, ['Product', 'name']).match(reg);
            const purchasemethodMatch = get(record, ['PurchaseMethod', 'name']).match(reg);
            const typedownpaymentMatch = get(record, ['TypeDownPayment', 'name']).match(reg);
            const downpaymentMatch = get(record, 'down_payment').match(reg);
            const lengthinstallmentsdpMatch = get(record, 'length_installments_dp').match(reg);
            const monthlyinstallmentsdppMatch = get(record, 'monthly_installments_dp').match(reg);
            const principalMatch = get(record, 'principal').match(reg);
            const lengthprincipalMatch = get(record, 'length_principal').match(reg);
            const monthlyprincipalMatch = get(record, 'monthly_principal').match(reg);
            const totalbillMatch = get(record, 'total_bill').match(reg);
            if (!downpaymentMatch && !codeMatch && !customerMatch && !marketingMatch && !productMatch && !purchasemethodMatch && !typedownpaymentMatch && !lengthinstallmentsdpMatch && !monthlyinstallmentsdppMatch && !principalMatch && !lengthprincipalMatch && !monthlyprincipalMatch && !totalbillMatch) {
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
                dataSource={_state?.data}
                scroll={{ x: 'max-content' }}
                bordered
            />
        </Spin>
    );
}

export default TableTransaction