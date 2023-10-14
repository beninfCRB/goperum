import { Button, Spin, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PaymentType } from '.';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { removeDuplicates } from '../../utils/filterable';

export interface tablePaymentProps {
    data: Array<PaymentType>;
    onLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const TablePayment = (props: tablePaymentProps) => {
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

export default TablePayment