import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableMarketing from "../../modules/marketing/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import MarketingForm from "../../modules/marketing/form"
import { useAddMarketing, useMarketing, useMarketingAll, useDeleteMarketing, useUpdateMarketing } from "../../modules/marketing"
import MarketingStore from "../../modules/marketing/state"
import { fetch } from "../../utils/reponse"
import { MODAL } from "../../static/text"

const MarketingIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const marketingGetAllMutation = useMarketingAll()
    const marketingDeleteMutation = useDeleteMarketing()
    const marketingState = MarketingStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (marketingGetAllMutation.data) {
            getData(marketingGetAllMutation.data)
        }
    }, [marketingGetAllMutation.data])

    useEffect(() => {
        if (marketingDeleteMutation.isSuccess) {
            marketingGetAllMutation.refetch()
            message.success(marketingDeleteMutation?.data?.data?.Meta?.Message)
        }
        if (marketingDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(marketingDeleteMutation.error))
        }
        return () => {
            marketingGetAllMutation.refetch()
        }
    }, [
        marketingDeleteMutation.isSuccess,
        marketingDeleteMutation.isError
    ])

    const getData = (data: any) => {
        marketingState.getAll(data)
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
            onOk: async () => await marketingDeleteMutation.mutateAsync(id),
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
            title='DATA MARKETING'
            bodyStyle={{ padding: "0" }}
        // extra={
        //     <Tooltip title='Tambah Data'>
        //         <Button type="primary" shape="circle" onClick={showModal}>
        //             <PlusCircleOutlined />
        //         </Button>
        //     </Tooltip>
        // }
        >
            <TableMarketing
                data={marketingState.multiple}
                onLoading={marketingGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddMarketing
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditMarketing
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default MarketingIndex

const AddMarketing = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addMarketing = useAddMarketing()
    const marketingMutation = useMarketingAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addMarketing.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addMarketing.isSuccess) {
            message.success(addMarketing.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addMarketing.isError) {
            message.error(_fetch.getAxiosMessage(addMarketing.error))
            props.onCancel()
        }
        return () => {
            marketingMutation.refetch()
            form.resetFields()
        }
    }, [addMarketing.isSuccess, addMarketing.isError])

    return (
        <Modal
            title="TAMBAH MARKETING"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <MarketingForm
                form={form}
            />
        </Modal>
    )
}
const EditMarketing = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const marketingGetMutation = useMarketing()
    const editMarketing = useUpdateMarketing()
    const marketingMutation = useMarketingAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editMarketing.mutateAsync({
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
            marketingGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (marketingGetMutation.data) {
            form.setFieldsValue(marketingGetMutation.data?.data?.Data)
        }
    }, [marketingGetMutation.data])

    useEffect(() => {
        if (editMarketing.isSuccess) {
            message.success(editMarketing.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editMarketing.isError) {
            message.error(_fetch.getAxiosMessage(editMarketing.error))
            props.onCancel()
        }
        return () => {
            marketingMutation.refetch()
        }
    }, [editMarketing.isSuccess, editMarketing.isError])

    return (
        <Modal
            title="UBAH PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <MarketingForm
                form={form}
            />
        </Modal>
    )
}
