import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableCustomer from "../../modules/customer/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import CustomerForm from "../../modules/customer/form"
import { useAddCustomer, useCustomer, useCustomerAll, useDeleteCustomer, useUpdateCustomer } from "../../modules/customer"
import CustomerStore from "../../modules/customer/state"
import { MESSAGE_TEXT } from "../../static/text"

const CustomerIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const customerGetAllMutation = useCustomerAll()
    const customerDeleteMutation = useDeleteCustomer()
    const customerState = CustomerStore()

    useEffect(() => {
        if (customerGetAllMutation.data) {
            getData(customerGetAllMutation.data)
        }
    }, [customerGetAllMutation.data])

    useEffect(() => {
        if (customerDeleteMutation.isSuccess) {
            customerGetAllMutation.refetch()
            message.success(MESSAGE_TEXT.CRUD.IND.SUCCESS.DELETE)
        }
        if (customerDeleteMutation.isError) {
            message.success(MESSAGE_TEXT.CRUD.IND.ERROR.DELETE)
        }
        return () => {
            customerGetAllMutation.refetch()
        }
    }, [customerDeleteMutation.isSuccess])

    const getData = (data: any) => {
        customerState.getAll(data)
    }

    const onEdit = (id: string) => {
        setIsModalEditOpen(true)
        setId(id)
    }

    const onDelete = (id: string) => {
        customerDeleteMutation.mutateAsync(id)
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
            <TableCustomer
                data={customerState.multiple}
                onLoading={customerGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddCustomer
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditCustomer
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default CustomerIndex

const AddCustomer = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addCustomer = useAddCustomer()
    const customerMutation = useCustomerAll()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addCustomer.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addCustomer.isSuccess) {
            message.success(MESSAGE_TEXT.CRUD.IND.SUCCESS.ADD)
            props.onCancel()
        }
        if (addCustomer.isError) {
            message.error(MESSAGE_TEXT.CRUD.IND.ERROR.ADD)
            props.onCancel()
        }
        return () => {
            customerMutation.refetch()
            form.resetFields()
        }
    }, [addCustomer.isSuccess, addCustomer.isError])

    return (
        <Modal
            title="TAMBAH PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <CustomerForm
                form={form}
            />
        </Modal>
    )
}
const EditCustomer = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const customerGetMutation = useCustomer()
    const editCustomer = useUpdateCustomer()
    const customerMutation = useCustomerAll()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            console.log(props.id);

            await editCustomer.mutateAsync({
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
            customerGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (customerGetMutation.data) {
            form.setFieldsValue(customerGetMutation.data?.data?.Data)
        }
    }, [customerGetMutation.data])

    useEffect(() => {
        if (editCustomer.isSuccess) {
            message.success(MESSAGE_TEXT.CRUD.IND.SUCCESS.EDIT)
            props.onCancel()
        }
        if (editCustomer.isError) {
            message.error(MESSAGE_TEXT.CRUD.IND.ERROR.EDIT)
            props.onCancel()
        }
        return () => {
            customerMutation.refetch()
            form.resetFields()
        }
    }, [editCustomer.isSuccess, editCustomer.isError])

    return (
        <Modal
            title="TAMBAH PELANGGAN"
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <CustomerForm
                form={form}
            />
        </Modal>
    )
}
