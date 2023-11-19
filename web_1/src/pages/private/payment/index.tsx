import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TablePayment from "../../../modules/private/payment/table"
import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import PaymentForm from "../../../modules/private/payment/form"
import { useAddPayment, usePayment, usePaymentAll, useDeletePayment, useUpdatePayment } from "../../../modules/private/payment"
import PaymentStore from "../../../modules/private/payment/state"
import { fetch } from "../../../utils/reponse"
import moment from "moment"
import { MODAL } from "../../../static/text"

const PaymentIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const PaymentGetAllMutation = usePaymentAll()
    const PaymentDeleteMutation = useDeletePayment()
    const PaymentState = PaymentStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (PaymentGetAllMutation.data) {
            getData(PaymentGetAllMutation.data)
        }
    }, [PaymentGetAllMutation.data])

    useEffect(() => {
        if (PaymentDeleteMutation.isSuccess) {
            PaymentGetAllMutation.refetch()
            message.success(PaymentDeleteMutation.data?.data?.Meta?.Message)
        }
        if (PaymentDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(PaymentDeleteMutation.error))
        }
        return () => {
            PaymentGetAllMutation.refetch()
        }
    }, [
        PaymentDeleteMutation.isSuccess,
        PaymentDeleteMutation.isError
    ])

    const getData = (data: any) => {
        PaymentState.getAll(data)
    }

    const onRefresh = () => {
        PaymentGetAllMutation.refetch()
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
            onOk: async () => await PaymentDeleteMutation.mutateAsync(id),
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
            title='DATA PEMBAYARAN'
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
            <TablePayment
                data={PaymentState.multiple}
                onLoading={PaymentGetAllMutation.isLoading || PaymentGetAllMutation.isRefetching}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddPayment
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditPayment
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default PaymentIndex

const AddPayment = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addPayment = useAddPayment()
    const PaymentMutation = usePaymentAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addPayment.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addPayment.isSuccess) {
            message.success(addPayment?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addPayment.isError) {
            message.error(_fetch.getAxiosMessage(addPayment.error))
            props.onCancel()
        }
        return () => {
            PaymentMutation.refetch()
            form.resetFields()
        }
    }, [addPayment.isSuccess, addPayment.isError])

    return (
        <Modal
            title="TAMBAH PEMBAYARAN"
            width={'75%'}
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <PaymentForm
                form={form}
            />
        </Modal>
    )
}
const EditPayment = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const PaymentGetMutation = usePayment()
    const editPayment = useUpdatePayment()
    const PaymentMutation = usePaymentAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editPayment.mutateAsync({
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
            PaymentGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (PaymentGetMutation.data) {
            form.setFieldsValue({
                ...PaymentGetMutation.data?.data?.Data,
                confirm_date: moment(PaymentGetMutation.data?.data?.Data)
            })
        }
    }, [PaymentGetMutation.data])

    useEffect(() => {
        if (editPayment.isSuccess) {
            message.success(editPayment?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editPayment.isError) {
            message.error(_fetch.getAxiosMessage(editPayment.error))
            props.onCancel()
        }
        return () => {
            PaymentMutation.refetch()
        }
    }, [editPayment.isSuccess, editPayment.isError])

    return (
        <Modal
            title="UBAH PELANGGAN"
            width={'75%'}
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <PaymentForm
                form={form}
            />
        </Modal>
    )
}
