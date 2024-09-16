import { PlusCircleOutlined, RedoOutlined } from "@ant-design/icons"
import { Button, Card, Form, Modal, Tooltip, message } from "antd"
import { useEffect, useState } from "react"
import { useAddProduct, useDeleteProduct, useProduct, useProductAll, useProductImage, useUpdateProduct } from "../../../modules/private/product"
import ProductForm from "../../../modules/private/product/form"
import ProductStore from "../../../modules/private/product/state"
import TableProduct from "../../../modules/private/product/table"
import { MODAL } from "../../../static/text"
import { binaryToBlob, binaryToFile } from "../../../utils/binaryToFile"
import { fetch } from "../../../utils/reponse"

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

    const onRefresh = () => {
        ProductGetAllMutation.refetch()
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
            <TableProduct
                data={ProductState.multiple}
                onLoading={ProductGetAllMutation.isLoading || ProductGetAllMutation.isRefetching}
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
    const formData = new FormData()
    const [resetFile, setReset] = useState<boolean>(false)

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            Object.keys(values).map((key) => {
                formData.append(key, values[key])
            })

            await addProduct.mutateAsync(formData)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (addProduct.isSuccess) {
            message.success(addProduct?.data?.data?.Meta?.Message)
            setReset(true)
            props.onCancel()
        }
        if (addProduct.isError) {
            message.error(_fetch.getAxiosMessage(addProduct.error))
            setReset(true)
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
                formData={formData}
                reset={resetFile}
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
    const ProductImageMutation = useProductImage()
    const _fetch = new fetch()
    const formData = new FormData()
    const [resetFile, setReset] = useState<boolean>(false)

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            Object.keys(values).map((key) => {
                if (key !== 'image') {
                    formData.append(key, values[key])
                }
            })

            await editProduct.mutateAsync({ id: props.id, formData })
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    useEffect(() => {
        if (props.id) {
            ProductGetMutation.mutateAsync(props.id)
            ProductImageMutation.mutateAsync(props.id)
        }
    }, [props.id])

    console.log('file===>', typeof ProductImageMutation.data?.data);
    console.log('file===>', ProductImageMutation.data?.data);
    console.log('file===>', typeof ProductImageMutation.data);
    console.log('file===>', ProductImageMutation.data);


    useEffect(() => {
        if (ProductGetMutation.data) {
            form.setFieldsValue(ProductGetMutation.data?.data?.Data)
        }
    }, [ProductGetMutation.data])

    useEffect(() => {
        if (editProduct.isSuccess) {
            message.success(editProduct?.data?.data?.Meta?.Message)
            setReset(true)
            props.onCancel()
        }
        if (editProduct.isError) {
            message.error(_fetch.getAxiosMessage(editProduct.error))
            setReset(true)
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
                formData={formData}
                reset={resetFile}
                Blob={ProductImageMutation.data?.data}
            />
        </Modal>
    )
}
