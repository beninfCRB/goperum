import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableTypeDP from "../../modules/type-dp/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import TypeDPForm from "../../modules/type-dp/form"
import { useAddTypeDP, useTypeDP, useTypeDPAll, useDeleteTypeDP, useUpdateTypeDP } from "../../modules/type-dp"
import TypeDPStore from "../../modules/type-dp/state"
import { fetch } from "../../utils/reponse"
import { MODAL } from "../../static/text"

const TypeDPIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const TypeDPGetAllMutation = useTypeDPAll()
    const TypeDPDeleteMutation = useDeleteTypeDP()
    const TypeDPState = TypeDPStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (TypeDPGetAllMutation.data) {
            getData(TypeDPGetAllMutation.data)
        }
    }, [TypeDPGetAllMutation.data])

    useEffect(() => {
        if (TypeDPDeleteMutation.isSuccess) {
            TypeDPGetAllMutation.refetch()
            message.success(TypeDPDeleteMutation.data?.data?.Meta?.Message)
        }
        if (TypeDPDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(TypeDPDeleteMutation.error))
        }
        return () => {
            TypeDPGetAllMutation.refetch()
        }
    }, [
        TypeDPDeleteMutation.isSuccess,
        TypeDPDeleteMutation.isError
    ])

    const getData = (data: any) => {
        TypeDPState.getAll(data)
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
            onOk: async () => await TypeDPDeleteMutation.mutateAsync(id),
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
            title='DATA TIPE DP'
            bodyStyle={{ padding: "0" }}
            extra={
                <Tooltip title='Tambah Data'>
                    <Button type="primary" shape="circle" onClick={showModal}>
                        <PlusCircleOutlined />
                    </Button>
                </Tooltip>
            }
        >
            <TableTypeDP
                data={TypeDPState.multiple}
                onLoading={TypeDPGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddTypeDP
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditTypeDP
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default TypeDPIndex

const AddTypeDP = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addTypeDP = useAddTypeDP()
    const TypeDPMutation = useTypeDPAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addTypeDP.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addTypeDP.isSuccess) {
            message.success(addTypeDP?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addTypeDP.isError) {
            message.error(_fetch.getAxiosMessage(addTypeDP.error))
            props.onCancel()
        }
        return () => {
            TypeDPMutation.refetch()
            form.resetFields()
        }
    }, [addTypeDP.isSuccess, addTypeDP.isError])

    return (
        <Modal
            title="TAMBAH TIPE DP"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <TypeDPForm
                form={form}
            />
        </Modal>
    )
}
const EditTypeDP = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const TypeDPGetMutation = useTypeDP()
    const editTypeDP = useUpdateTypeDP()
    const TypeDPMutation = useTypeDPAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editTypeDP.mutateAsync({
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
            TypeDPGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (TypeDPGetMutation.data) {
            form.setFieldsValue(TypeDPGetMutation.data?.data?.Data)
        }
    }, [TypeDPGetMutation.data])

    useEffect(() => {
        if (editTypeDP.isSuccess) {
            message.success(editTypeDP?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editTypeDP.isError) {
            message.error(_fetch.getAxiosMessage(editTypeDP.error))
            props.onCancel()
        }
        return () => {
            TypeDPMutation.refetch()
        }
    }, [editTypeDP.isSuccess, editTypeDP.isError])

    return (
        <Modal
            title="UBAH TIPE DP"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <TypeDPForm
                form={form}
            />
        </Modal>
    )
}
