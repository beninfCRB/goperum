import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableTransactionStatus from "../../../modules/private/transaction-status/table"
import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import TransactionStatusForm from "../../../modules/private/transaction-status/form"
import { useAddTransactionStatus, useTransactionStatus, useTransactionStatusAll, useDeleteTransactionStatus, useUpdateTransactionStatus } from "../../../modules/private/transaction-status"
import TransactionStatusStore from "../../../modules/private/transaction-status/state"
import { fetch } from "../../../utils/reponse"
import { MODAL } from "../../../static/text"

const TransactionStatusIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const TransactionStatusGetAllMutation = useTransactionStatusAll()
    const TransactionStatusDeleteMutation = useDeleteTransactionStatus()
    const TransactionStatusState = TransactionStatusStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (TransactionStatusGetAllMutation.data) {
            getData(TransactionStatusGetAllMutation.data)
        }
    }, [TransactionStatusGetAllMutation.data])

    useEffect(() => {
        if (TransactionStatusDeleteMutation.isSuccess) {
            TransactionStatusGetAllMutation.refetch()
            message.success(TransactionStatusDeleteMutation.data?.data?.Meta?.Message)
        }
        if (TransactionStatusDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(TransactionStatusDeleteMutation.error))
        }
        return () => {
            TransactionStatusGetAllMutation.refetch()
        }
    }, [
        TransactionStatusDeleteMutation.isSuccess,
        TransactionStatusDeleteMutation.isError
    ])

    const getData = (data: any) => {
        TransactionStatusState.getAll(data)
    }

    const onRefresh = () => {
        TransactionStatusGetAllMutation.refetch()
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
            onOk: async () => await TransactionStatusDeleteMutation.mutateAsync(id),
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
            title='DATA STATUS TRANSAKSI'
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
            <TableTransactionStatus
                data={TransactionStatusState.multiple}
                onLoading={TransactionStatusGetAllMutation.isLoading || TransactionStatusGetAllMutation.isRefetching}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddTransactionStatus
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditTransactionStatus
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default TransactionStatusIndex

const AddTransactionStatus = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addTransactionStatus = useAddTransactionStatus()
    const TransactionStatusMutation = useTransactionStatusAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addTransactionStatus.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addTransactionStatus.isSuccess) {
            message.success(addTransactionStatus?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addTransactionStatus.isError) {
            message.error(_fetch.getAxiosMessage(addTransactionStatus.error))
            props.onCancel()
        }
        return () => {
            TransactionStatusMutation.refetch()
            form.resetFields()
        }
    }, [addTransactionStatus.isSuccess, addTransactionStatus.isError])

    return (
        <Modal
            title="TAMBAH STATUS TRANSAKSI"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <TransactionStatusForm
                form={form}
            />
        </Modal>
    )
}
const EditTransactionStatus = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const TransactionStatusGetMutation = useTransactionStatus()
    const editTransactionStatus = useUpdateTransactionStatus()
    const TransactionStatusMutation = useTransactionStatusAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editTransactionStatus.mutateAsync({
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
            TransactionStatusGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (TransactionStatusGetMutation.data) {
            form.setFieldsValue(TransactionStatusGetMutation.data?.data?.Data)
        }
    }, [TransactionStatusGetMutation.data])

    useEffect(() => {
        if (editTransactionStatus.isSuccess) {
            message.success(editTransactionStatus?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editTransactionStatus.isError) {
            message.error(_fetch.getAxiosMessage(editTransactionStatus.error))
            props.onCancel()
        }
        return () => {
            TransactionStatusMutation.refetch()
        }
    }, [editTransactionStatus.isSuccess, editTransactionStatus.isError])

    return (
        <Modal
            title="UBAH STATUS TRANSAKSI"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <TransactionStatusForm
                form={form}
            />
        </Modal>
    )
}
