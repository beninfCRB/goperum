import { Card } from "antd"
import TableCustomer from "../../modules/customer/table"

const CustomerIndex = () => {
    return (
        <Card
            title='DATA CUSTOMER'
            bodyStyle={{ padding: "0" }}
        >
            <TableCustomer />
        </Card>
    )
}

export default CustomerIndex
