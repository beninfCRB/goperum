import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import TableProduct from "../../modules/product/table"
import { PlusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import ProductForm from "../../modules/product/form"
import { useAddProduct, useProduct, useProductAll, useDeleteProduct, useUpdateProduct } from "../../modules/product"
import ProductStore from "../../modules/product/state"
import { fetch } from "../../utils/reponse"
import { MODAL } from "../../static/text"

const ProductIndex = () => {
    const [isModalAddOpen, setIsModalAddOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [_id, setId] = useState<string>('')
    const ProductGetAllMutation = useProductAll()
    const ProductDeleteMutation = useDeleteProduct()
    const ProductState = ProductStore()
    const _fetch = new fetch()

    useEffect(() => {
        if (ProductGetAllMutation.data) {
            getData(ProductGetAllMutation.data)
        }
    }, [ProductGetAllMutation.data])

    useEffect(() => {
        if (ProductDeleteMutation.isSuccess) {
            ProductGetAllMutation.refetch()
            message.success(ProductDeleteMutation.data?.data?.Meta?.Message)
        }
        if (ProductDeleteMutation.isError) {
            message.success(_fetch.getAxiosMessage(ProductDeleteMutation.error))
        }
        return () => {
            ProductGetAllMutation.refetch()
        }
    }, [
        ProductDeleteMutation.isSuccess,
        ProductDeleteMutation.isError
    ])

    const getData = (data: any) => {
        ProductState.getAll(data)
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
            onOk: async () => await ProductDeleteMutation.mutateAsync(id),
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
            title='DATA PRODUK'
            bodyStyle={{ padding: "0" }}
            extra={
                <Tooltip title='Tambah Data'>
                    <Button type="primary" shape="circle" onClick={showModal}>
                        <PlusCircleOutlined />
                    </Button>
                </Tooltip>
            }
        >
            <TableProduct
                data={ProductState.multiple}
                onLoading={ProductGetAllMutation.isLoading}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <AddProduct
                modal={isModalAddOpen}
                onCancel={onCancel}
            />
            <EditProduct
                id={_id}
                modal={isModalEditOpen}
                onCancel={onCancel}
            />
        </Card>
    )
}

export default ProductIndex

const AddProduct = (props: {
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const addProduct = useAddProduct()
    const ProductMutation = useProductAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await addProduct.mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addProduct.isSuccess) {
            message.success(addProduct?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (addProduct.isError) {
            message.error(_fetch.getAxiosMessage(addProduct.error))
            props.onCancel()
        }
        return () => {
            ProductMutation.refetch()
            form.resetFields()
        }
    }, [addProduct.isSuccess, addProduct.isError])

    return (
        <Modal
            title="TAMBAH PRODUK"
            width={'75%'}
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <ProductForm
                form={form}
            />
        </Modal>
    )
}
const EditProduct = (props: {
    id: string;
    modal: boolean;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm()
    const ProductGetMutation = useProduct()
    const editProduct = useUpdateProduct()
    const ProductMutation = useProductAll()
    const _fetch = new fetch()

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await editProduct.mutateAsync({
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
            ProductGetMutation.mutateAsync(props.id)
        }
    }, [props.id])

    useEffect(() => {
        if (ProductGetMutation.data) {
            form.setFieldsValue(ProductGetMutation.data?.data?.Data)
        }
    }, [ProductGetMutation.data])

    useEffect(() => {
        if (editProduct.isSuccess) {
            message.success(editProduct?.data?.data?.Meta?.Message)
            props.onCancel()
        }
        if (editProduct.isError) {
            message.error(_fetch.getAxiosMessage(editProduct.error))
            props.onCancel()
        }
        return () => {
            ProductMutation.refetch()
        }
    }, [editProduct.isSuccess, editProduct.isError])

    return (
        <Modal
            title="UBAH PRODUK"
            width={'75%'}
            open={props.modal}
            forceRender={true}
            onCancel={props.onCancel}
            onOk={onSubmit}
        >
            <ProductForm
                form={form}
            />
        </Modal>
    )
}
