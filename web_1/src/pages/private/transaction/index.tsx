import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableTransaction from "../../../modules/private/transaction/table"
import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import TransactionForm from "../../../modules/private/transaction/form"
import { useAddTransaction, useTransaction, useTransactionAll, useDeleteTransaction, useUpdateTransaction } from "../../../modules/private/transaction"
import TransactionStore from "../../../modules/private/transaction/state"
import { fetch } from "../../../utils/reponse"
import { MODAL } from "../../../static/text"

const TransactionIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const TransactionGetAllMutation = useTransactionAll()
    const TransactionDeleteMutation = useDeleteTransaction()
    const TransactionState = TransactionStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (TransactionGetAllMutation.data) {
            getData(TransactionGetAllMutation.data)
        }
    }, [TransactionGetAllMutation.data])

    useEffect(() => {
        if (TransactionDeleteMutation.isSuccess) {
            TransactionGetAllMutation.refetch()
            message.success(TransactionDeleteMutation.data?.data?.Meta?.Message)
        }
        if (TransactionDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(TransactionDeleteMutation.error))
        }
        return () => {
            TransactionGetAllMutation.refetch()
        }
    }, [
        TransactionDeleteMutation.isSuccess,
        TransactionDeleteMutation.isError
    ])

    const getData = (data: any) => {
        TransactionState.getAll(data)
    }

    const onRefresh = () => {
        TransactionGetAllMutation.refetch()
    }

    const onEdit = (id: string) => {
        setIsModalEditOpen(true)
        setId(id)
    }

    const onDelete = (id: string) => {
        Modal.confirm({
            title: MODAL.MODAL_CONFIRM.IND.DELETE.TITLE,
            content: MODAL.MODAL_CONFIRM.IND.DELETE.CONTENT,
            okText: 'Ok',
            cancelText: 'Cancel',
            onOk: async () => await TransactionDeleteMutation.mutateAsync(id),
            onCancel: () => { },
        })
    }

    const showModal = () => {
        setIsModalAddOpen((prev: boolean) => !prev)
    }

    const onCancel = () => {
        isModalAddOpen && setIsModalAddOpen(false)
        isModalEditOpen && setIsModalEditOpen(false)
    }

    return (
        <Card
            title='DATA TRANSAKSI'
            bodyStyle={{ padding: "0" }}
            extra={
                <div className="flex items-stretch">
                    <div className="py-4 ml-1">
                        <Tooltip title='Tambah Data'>
                            <Button type="primary" shape="circle" onClick={showModal}>
                                <PlusCircleOutlined />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="py-4 ml-1">
                        <Tooltip title='Segarkan Data'>
                            <Button type="default" shape="circle" onClick={onRefresh}>
                                <RedoOutlined />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            }
        >
            <TableTransaction
                data={TransactionState.multiple}
                onLoading={TransactionGetAllMutation.isLoading || TransactionGetAllMutation.isRefetching}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddTransaction
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditTransaction
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default TransactionIndex

const AddTransaction = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addTransaction = useAddTransaction()
    const TransactionMutation = useTransactionAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addTransaction.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addTransaction.isSuccess) {
            message.success(addTransaction?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addTransaction.isError) {
            message.error(_fetch.getAxiosMessage(addTransaction.error))
            props.onCancel()
        }
        return () => {
            TransactionMutation.refetch()
            form.resetFields()
        }
    }, [addTransaction.isSuccess, addTransaction.isError])

    return (
        <Modal
            title="TAMBAH TRANSAKSI"
            width={'75%'}
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <TransactionForm
                form={form}
            />
        </Modal>
    )
}
const EditTransaction = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const TransactionGetMutation = useTransaction()
    const editTransaction = useUpdateTransaction()
    const TransactionMutation = useTransactionAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editTransaction.mutateAsync({
                ...values,
                id: props.id
            })
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (props.id) {
            TransactionGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (TransactionGetMutation.data) {
            form.setFieldsValue(TransactionGetMutation.data?.data?.Data)
        }
    }, [TransactionGetMutation.data])

    useEffect(() => {
        if (editTransaction.isSuccess) {
            message.success(editTransaction?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editTransaction.isError) {
            message.error(_fetch.getAxiosMessage(editTransaction.error))
            props.onCancel()
        }
        return () => {
            TransactionMutation.refetch()
        }
    }, [editTransaction.isSuccess, editTransaction.isError])

    return (
        <Modal
            title="UBAH PELANGGAN"
            width={'75%'}
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <TransactionForm
                form={form}
            />
        </Modal>
    )
}
