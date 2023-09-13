import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableArea from "../../modules/area/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import AreaForm from "../../modules/area/form"
import { useAddArea, useArea, useAreaAll, useDeleteArea, useUpdateArea } from "../../modules/area"
import AreaStore from "../../modules/area/state"
import { MESSAGE_TEXT } from "../../static/text"
import { fetch } from "../../utils/reponse"

const AreaIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const AreaGetAllMutation = useAreaAll()
    const AreaDeleteMutation = useDeleteArea()
    const AreaState = AreaStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (AreaGetAllMutation.data) {
            getData(AreaGetAllMutation.data)
        }
    }, [AreaGetAllMutation.data])

    useEffect(() => {
        if (AreaDeleteMutation.isSuccess) {
            AreaGetAllMutation.refetch()
            message.success(AreaDeleteMutation.data?.data?.Meta?.Message)
        }
        if (AreaDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(AreaDeleteMutation.error))
        }
        return () => {
            AreaGetAllMutation.refetch()
        }
    }, [AreaDeleteMutation.isSuccess])

    const getData = (data: any) => {
        AreaState.getAll(data)
    }

    const onEdit = (id: string) => {
        setIsModalEditOpen(true)
        setId(id)
    }

    const onDelete = (id: string) => {
        AreaDeleteMutation.mutateAsync(id)
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
            title='DATA PELANGGAN'
            bodyStyle={{ padding: "0" }}
            extra={
                <Tooltip title='Tambah Data'>
                    <Button type="primary" shape="circle" onClick={showModal}>
                        <PlusCircleOutlined />
                    </Button>
                </Tooltip>
            }
        >
            <TableArea
                data={AreaState.multiple}
                onLoading={AreaGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddArea
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditArea
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default AreaIndex

const AddArea = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addArea = useAddArea()
    const AreaMutation = useAreaAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addArea.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addArea.isSuccess) {
            message.success(addArea?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addArea.isError) {
            message.error(_fetch.getAxiosMessage(addArea.error))
            props.onCancel()
        }
        return () => {
            AreaMutation.refetch()
            form.resetFields()
        }
    }, [addArea.isSuccess, addArea.isError])

    return (
        <Modal
            title="TAMBAH PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <AreaForm
                form={form}
            />
        </Modal>
    )
}
const EditArea = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const AreaGetMutation = useArea()
    const editArea = useUpdateArea()
    const AreaMutation = useAreaAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            console.log(props.id);

            await editArea.mutateAsync({
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
            AreaGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (AreaGetMutation.data) {
            form.setFieldsValue(AreaGetMutation.data?.data?.Data)
        }
    }, [AreaGetMutation.data])

    useEffect(() => {
        if (editArea.isSuccess) {
            message.success(editArea?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editArea.isError) {
            message.error(_fetch.getAxiosMessage(editArea.error))
            props.onCancel()
        }
        return () => {
            AreaMutation.refetch()
        }
    }, [editArea.isSuccess, editArea.isError])

    return (
        <Modal
            title="UBAH PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <AreaForm
                form={form}
            />
        </Modal>
    )
}
