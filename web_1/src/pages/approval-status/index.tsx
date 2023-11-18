import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableApprovalStatus from "../../modules/approval-status/table"
import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import ApprovalStatusForm from "../../modules/approval-status/form"
import { useAddApprovalStatus, useApprovalStatus, useApprovalStatusAll, useDeleteApprovalStatus, useUpdateApprovalStatus } from "../../modules/approval-status"
import ApprovalStatusStore from "../../modules/approval-status/state"
import { fetch } from "../../utils/reponse"
import { MODAL } from "../../static/text"

const ApprovalStatusIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const ApprovalStatusGetAllMutation = useApprovalStatusAll()
    const ApprovalStatusDeleteMutation = useDeleteApprovalStatus()
    const ApprovalStatusState = ApprovalStatusStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (ApprovalStatusGetAllMutation.data) {
            getData(ApprovalStatusGetAllMutation.data)
        }
    }, [ApprovalStatusGetAllMutation.data])

    useEffect(() => {
        if (ApprovalStatusDeleteMutation.isSuccess) {
            ApprovalStatusGetAllMutation.refetch()
            message.success(ApprovalStatusDeleteMutation.data?.data?.Meta?.Message)
        }
        if (ApprovalStatusDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(ApprovalStatusDeleteMutation.error))
        }
        return () => {
            ApprovalStatusGetAllMutation.refetch()
        }
    }, [
        ApprovalStatusDeleteMutation.isSuccess,
        ApprovalStatusDeleteMutation.isError
    ])

    const getData = (data: any) => {
        ApprovalStatusState.getAll(data)
    }

    const onRefresh = () => {
        ApprovalStatusGetAllMutation.refetch()
    }

    const onEdit = (id: string) => {
        setIsModalEditOpen(true)
        setId(id)
    }

    const onDelete = async (id: string) => {
        Modal.confirm({
            title: MODAL.MODAL_CONFIRM.IND.DELETE.TITLE,
            content: MODAL.MODAL_CONFIRM.IND.DELETE.CONTENT,
            okText: 'Ok',
            cancelText: 'Cancel',
            onOk: async () => await ApprovalStatusDeleteMutation.mutateAsync(id),
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
            title='DATA STATUS PERSETUJUAN'
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
            <TableApprovalStatus
                data={ApprovalStatusState.multiple}
                onLoading={ApprovalStatusGetAllMutation.isLoading || ApprovalStatusGetAllMutation.isRefetching}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddApprovalStatus
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditApprovalStatus
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default ApprovalStatusIndex

const AddApprovalStatus = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addApprovalStatus = useAddApprovalStatus()
    const ApprovalStatusMutation = useApprovalStatusAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addApprovalStatus.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addApprovalStatus.isSuccess) {
            message.success(addApprovalStatus?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addApprovalStatus.isError) {
            message.error(_fetch.getAxiosMessage(addApprovalStatus.error))
            props.onCancel()
        }
        return () => {
            ApprovalStatusMutation.refetch()
            form.resetFields()
        }
    }, [addApprovalStatus.isSuccess, addApprovalStatus.isError])

    return (
        <Modal
            title="TAMBAH STATUS PERSETUJUAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <ApprovalStatusForm
                form={form}
            />
        </Modal>
    )
}
const EditApprovalStatus = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const ApprovalStatusGetMutation = useApprovalStatus()
    const editApprovalStatus = useUpdateApprovalStatus()
    const ApprovalStatusMutation = useApprovalStatusAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editApprovalStatus.mutateAsync({
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
            ApprovalStatusGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (ApprovalStatusGetMutation.data) {
            form.setFieldsValue(ApprovalStatusGetMutation.data?.data?.Data)
        }
    }, [ApprovalStatusGetMutation.data])

    useEffect(() => {
        if (editApprovalStatus.isSuccess) {
            message.success(editApprovalStatus?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editApprovalStatus.isError) {
            message.error(_fetch.getAxiosMessage(editApprovalStatus.error))
            props.onCancel()
        }
        return () => {
            ApprovalStatusMutation.refetch()
        }
    }, [editApprovalStatus.isSuccess, editApprovalStatus.isError])

    return (
        <Modal
            title="UBAH STATUS TRANSAKSI"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <ApprovalStatusForm
                form={form}
            />
        </Modal>
    )
}
