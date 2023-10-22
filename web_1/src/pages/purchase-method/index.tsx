import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TablePurchaseMethod from "../../modules/purchase-method/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import PurchaseMethodForm from "../../modules/purchase-method/form"
import { useAddPurchaseMethod, usePurchaseMethod, usePurchaseMethodAll, useDeletePurchaseMethod, useUpdatePurchaseMethod } from "../../modules/purchase-method"
import PurchaseMethodStore from "../../modules/purchase-method/state"
import { fetch } from "../../utils/reponse"
import { MODAL } from "../../static/text"

const PurchaseMethodIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const PurchaseMethodGetAllMutation = usePurchaseMethodAll()
    const PurchaseMethodDeleteMutation = useDeletePurchaseMethod()
    const PurchaseMethodState = PurchaseMethodStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (PurchaseMethodGetAllMutation.data) {
            getData(PurchaseMethodGetAllMutation.data)
        }
    }, [PurchaseMethodGetAllMutation.data])

    useEffect(() => {
        if (PurchaseMethodDeleteMutation.isSuccess) {
            PurchaseMethodGetAllMutation.refetch()
            message.success(PurchaseMethodDeleteMutation.data?.data?.Meta?.Message)
        }
        if (PurchaseMethodDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(PurchaseMethodDeleteMutation.error))
        }
        return () => {
            PurchaseMethodGetAllMutation.refetch()
        }
    }, [
        PurchaseMethodDeleteMutation.isSuccess,
        PurchaseMethodDeleteMutation.isError
    ])

    const getData = (data: any) => {
        PurchaseMethodState.getAll(data)
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
            onOk: async () => await PurchaseMethodDeleteMutation.mutateAsync(id),
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
            title='DATA METODE PEMBELIAN'
            bodyStyle={{ padding: "0" }}
            extra={
                <Tooltip title='Tambah Data'>
                    <Button type="primary" shape="circle" onClick={showModal}>
                        <PlusCircleOutlined />
                    </Button>
                </Tooltip>
            }
        >
            <TablePurchaseMethod
                data={PurchaseMethodState.multiple}
                onLoading={PurchaseMethodGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddPurchaseMethod
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditPurchaseMethod
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default PurchaseMethodIndex

const AddPurchaseMethod = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addPurchaseMethod = useAddPurchaseMethod()
    const PurchaseMethodMutation = usePurchaseMethodAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addPurchaseMethod.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addPurchaseMethod.isSuccess) {
            message.success(addPurchaseMethod?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addPurchaseMethod.isError) {
            message.error(_fetch.getAxiosMessage(addPurchaseMethod.error))
            props.onCancel()
        }
        return () => {
            PurchaseMethodMutation.refetch()
            form.resetFields()
        }
    }, [addPurchaseMethod.isSuccess, addPurchaseMethod.isError])

    return (
        <Modal
            title="TAMBAH METODE PEMBELIAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <PurchaseMethodForm
                form={form}
            />
        </Modal>
    )
}
const EditPurchaseMethod = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const PurchaseMethodGetMutation = usePurchaseMethod()
    const editPurchaseMethod = useUpdatePurchaseMethod()
    const PurchaseMethodMutation = usePurchaseMethodAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editPurchaseMethod.mutateAsync({
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
            PurchaseMethodGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (PurchaseMethodGetMutation.data) {
            form.setFieldsValue(PurchaseMethodGetMutation.data?.data?.Data)
        }
    }, [PurchaseMethodGetMutation.data])

    useEffect(() => {
        if (editPurchaseMethod.isSuccess) {
            message.success(editPurchaseMethod?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editPurchaseMethod.isError) {
            message.error(_fetch.getAxiosMessage(editPurchaseMethod.error))
            props.onCancel()
        }
        return () => {
            PurchaseMethodMutation.refetch()
        }
    }, [editPurchaseMethod.isSuccess, editPurchaseMethod.isError])

    return (
        <Modal
            title="UBAH TIPE DP"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <PurchaseMethodForm
                form={form}
            />
        </Modal>
    )
}
