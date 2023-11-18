import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableRoleUser from "../../modules/role-user/table"
import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import RoleUserForm from "../../modules/role-user/form"
import { useAddRoleUser, useRoleUser, useRoleUserAllPrivate, useDeleteRoleUser, useUpdateRoleUser } from "../../modules/role-user"
import RoleUserStore from "../../modules/role-user/state"
import { fetch } from "../../utils/reponse"
import { MODAL } from "../../static/text"

const RoleUserIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const RoleUserGetAllMutation = useRoleUserAllPrivate()
    const RoleUserDeleteMutation = useDeleteRoleUser()
    const RoleUserState = RoleUserStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (RoleUserGetAllMutation.data) {
            getData(RoleUserGetAllMutation.data)
        }
    }, [RoleUserGetAllMutation.data])

    useEffect(() => {
        if (RoleUserDeleteMutation.isSuccess) {
            RoleUserGetAllMutation.refetch()
            message.success(RoleUserDeleteMutation.data?.data?.Meta?.Message)
        }
        if (RoleUserDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(RoleUserDeleteMutation.error))
        }
        return () => {
            RoleUserGetAllMutation.refetch()
        }
    }, [
        RoleUserDeleteMutation.isSuccess,
        RoleUserDeleteMutation.isError
    ])

    const getData = (data: any) => {
        RoleUserState.getAll(data)
    }

    const onRefresh = () =>{
        RoleUserGetAllMutation.refetch()
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
            onOk: async () => await RoleUserDeleteMutation.mutateAsync(id),
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
            title='DATA LEVEL PENGGUNA'
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
            <TableRoleUser
                data={RoleUserState.multiple}
                onLoading={RoleUserGetAllMutation.isLoading || RoleUserGetAllMutation.isRefetching}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddRoleUser
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditRoleUser
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default RoleUserIndex

const AddRoleUser = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addRoleUser = useAddRoleUser()
    const RoleUserMutation = useRoleUserAllPrivate()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addRoleUser.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addRoleUser.isSuccess) {
            message.success(addRoleUser?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addRoleUser.isError) {
            message.error(_fetch.getAxiosMessage(addRoleUser.error))
            props.onCancel()
        }
        return () => {
            RoleUserMutation.refetch()
            form.resetFields()
        }
    }, [addRoleUser.isSuccess, addRoleUser.isError])

    return (
        <Modal
            title="TAMBAH LEVEL PENGGUNA"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <RoleUserForm
                form={form}
            />
        </Modal>
    )
}
const EditRoleUser = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const RoleUserGetMutation = useRoleUser()
    const editRoleUser = useUpdateRoleUser()
    const RoleUserMutation = useRoleUserAllPrivate()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editRoleUser.mutateAsync({
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
            RoleUserGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (RoleUserGetMutation.data) {
            form.setFieldsValue(RoleUserGetMutation.data?.data?.Data)
        }
    }, [RoleUserGetMutation.data])

    useEffect(() => {
        if (editRoleUser.isSuccess) {
            message.success(editRoleUser?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editRoleUser.isError) {
            message.error(_fetch.getAxiosMessage(editRoleUser.error))
            props.onCancel()
        }
        return () => {
            RoleUserMutation.refetch()
        }
    }, [editRoleUser.isSuccess, editRoleUser.isError])

    return (
        <Modal
            title="UBAH LEVEL PENGGUNA"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <RoleUserForm
                form={form}
            />
        </Modal>
    )
}
