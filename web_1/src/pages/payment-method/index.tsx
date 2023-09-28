import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TablePaymentMethod from "../../modules/payment-method/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import PaymentMethodForm from "../../modules/payment-method/form"
import { useAddPaymentMethod, usePaymentMethod, usePaymentMethodAll, useDeletePaymentMethod, useUpdatePaymentMethod } from "../../modules/payment-method"
import PaymentMethodStore from "../../modules/payment-method/state"
import { fetch } from "../../utils/reponse"

const PaymentMethodIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const PaymentMethodGetAllMutation = usePaymentMethodAll()
    const PaymentMethodDeleteMutation = useDeletePaymentMethod()
    const PaymentMethodState = PaymentMethodStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (PaymentMethodGetAllMutation.data) {
            getData(PaymentMethodGetAllMutation.data)
        }
    }, [PaymentMethodGetAllMutation.data])

    useEffect(() => {
        if (PaymentMethodDeleteMutation.isSuccess) {
            PaymentMethodGetAllMutation.refetch()
            message.success(PaymentMethodDeleteMutation.data?.data?.Meta?.Message)
        }
        if (PaymentMethodDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(PaymentMethodDeleteMutation.error))
        }
        return () => {
            PaymentMethodGetAllMutation.refetch()
        }
    }, [PaymentMethodDeleteMutation.isSuccess])

    const getData = (data: any) => {
        PaymentMethodState.getAll(data)
    }

    const onEdit = (id: string) => {
        setIsModalEditOpen(true)
        setId(id)
    }

    const onDelete = (id: string) => {
        PaymentMethodDeleteMutation.mutateAsync(id)
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
            title='DATA METODE PEMBAYARAN'
            bodyStyle={{ padding: "0" }}
            extra={
                <Tooltip title='Tambah Data'>
                    <Button type="primary" shape="circle" onClick={showModal}>
                        <PlusCircleOutlined />
                    </Button>
                </Tooltip>
            }
        >
            <TablePaymentMethod
                data={PaymentMethodState.multiple}
                onLoading={PaymentMethodGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddPaymentMethod
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditPaymentMethod
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default PaymentMethodIndex

const AddPaymentMethod = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addPaymentMethod = useAddPaymentMethod()
    const PaymentMethodMutation = usePaymentMethodAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addPaymentMethod.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addPaymentMethod.isSuccess) {
            message.success(addPaymentMethod?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addPaymentMethod.isError) {
            message.error(_fetch.getAxiosMessage(addPaymentMethod.error))
            props.onCancel()
        }
        return () => {
            PaymentMethodMutation.refetch()
            form.resetFields()
        }
    }, [addPaymentMethod.isSuccess, addPaymentMethod.isError])

    return (
        <Modal
            title="TAMBAH METODE PEMBAYARAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <PaymentMethodForm
                form={form}
            />
        </Modal>
    )
}
const EditPaymentMethod = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const PaymentMethodGetMutation = usePaymentMethod()
    const editPaymentMethod = useUpdatePaymentMethod()
    const PaymentMethodMutation = usePaymentMethodAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editPaymentMethod.mutateAsync({
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
            PaymentMethodGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (PaymentMethodGetMutation.data) {
            form.setFieldsValue(PaymentMethodGetMutation.data?.data?.Data)
        }
    }, [PaymentMethodGetMutation.data])

    useEffect(() => {
        if (editPaymentMethod.isSuccess) {
            message.success(editPaymentMethod?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editPaymentMethod.isError) {
            message.error(_fetch.getAxiosMessage(editPaymentMethod.error))
            props.onCancel()
        }
        return () => {
            PaymentMethodMutation.refetch()
        }
    }, [editPaymentMethod.isSuccess, editPaymentMethod.isError])

    return (
        <Modal
            title="UBAH TIPE DP"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <PaymentMethodForm
                form={form}
            />
        </Modal>
    )
}
