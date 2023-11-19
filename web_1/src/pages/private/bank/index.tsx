import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableBank from "../../../modules/private/bank/table"
import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import BankForm from "../../../modules/private/bank/form"
import { useAddBank, useBank, useBankAll, useDeleteBank, useUpdateBank } from "../../../modules/private/bank"
import BankStore from "../../../modules/private/bank/state"
import { fetch } from "../../../utils/reponse"
import { MODAL } from "../../../static/text"

const BankIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const BankGetAllMutation = useBankAll()
    const BankDeleteMutation = useDeleteBank()
    const BankState = BankStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (BankGetAllMutation.data) {
            getData(BankGetAllMutation.data)
        }
    }, [BankGetAllMutation.data])

    useEffect(() => {
        if (BankDeleteMutation.isSuccess) {
            BankGetAllMutation.refetch()
            message.success(BankDeleteMutation.data?.data?.Meta?.Message)
        }
        if (BankDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(BankDeleteMutation.error))
        }
        return () => {
            BankGetAllMutation.refetch()
        }
    }, [
        BankDeleteMutation.isSuccess,
        BankDeleteMutation.isError
    ])

    const getData = (data: any) => {
        BankState.getAll(data)
    }

    const onRefresh = () => {
        BankGetAllMutation.refetch()
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
            onOk: async () => await BankDeleteMutation.mutateAsync(id),
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
            title='DATA BANK'
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
            <TableBank
                data={BankState.multiple}
                onLoading={BankGetAllMutation.isLoading || BankGetAllMutation.isRefetching}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddBank
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditBank
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default BankIndex

const AddBank = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addBank = useAddBank()
    const BankMutation = useBankAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addBank.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addBank.isSuccess) {
            message.success(addBank?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addBank.isError) {
            message.error(_fetch.getAxiosMessage(addBank.error))
            props.onCancel()
        }
        return () => {
            BankMutation.refetch()
            form.resetFields()
        }
    }, [addBank.isSuccess, addBank.isError])

    return (
        <Modal
            title="TAMBAH BANK"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <BankForm
                form={form}
            />
        </Modal>
    )
}
const EditBank = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const BankGetMutation = useBank()
    const editBank = useUpdateBank()
    const BankMutation = useBankAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editBank.mutateAsync({
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
            BankGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (BankGetMutation.data) {
            form.setFieldsValue(BankGetMutation.data?.data?.Data)
        }
    }, [BankGetMutation.data])

    useEffect(() => {
        if (editBank.isSuccess) {
            message.success(editBank?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editBank.isError) {
            message.error(_fetch.getAxiosMessage(editBank.error))
            props.onCancel()
        }
        return () => {
            BankMutation.refetch()
        }
    }, [editBank.isSuccess, editBank.isError])

    return (
        <Modal
            title="UBAH TIPE DP"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <BankForm
                form={form}
            />
        </Modal>
    )
}
