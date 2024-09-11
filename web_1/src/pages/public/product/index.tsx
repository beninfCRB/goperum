import { RedoOutlined } from "@ant-design/icons"
import { Button, Card, Tooltip } from "antd"
import { useEffect } from "react"
import { useProductAll } from "../../../modules/public/product"
import FlexProduct from "../../../modules/public/product/flex"
import ProductStore from "../../../modules/public/product/state"

const UserProductIndex = () => {
    const ProductGetAllMutation = useProductAll()
    const ProductState = ProductStore()

    useEffect(() => {
        if (ProductGetAllMutation.data) {
            getData(ProductGetAllMutation.data)
        }
    }, [ProductGetAllMutation.data])

    const getData = (data: any) => {
        ProductState.getAll(data)
    }

    const onRefresh = () => {
        ProductGetAllMutation.refetch()
    }

    return (
        <Card
            title='DAFTAR PRODUK'
            bodyStyle={{ padding: "0" }}
            className="min-h-full"
            extra={
                <div className="flex items-stretch">
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
            <FlexProduct
                data={ProductState.multiple}
                onLoading={ProductGetAllMutation.isLoading || ProductGetAllMutation.isRefetching}
            />
        </Card >
    )
}

export default UserProductIndex