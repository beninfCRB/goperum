import { FunctionComponent, useEffect } from 'react'
import { useCustomerAll } from '../customer'
import CustomerStore from '../customer/state'
import { Select, SelectItem } from '../../components/select'

interface SelectCustomerType {
    loading?: boolean,
    placeholder?: string,
}

const SelectCustomer: FunctionComponent<SelectCustomerType> = (props) => {

    const { data, isLoading } = useCustomerAll()
    const { getAll, multiple } = CustomerStore()


    useEffect(() => {
        if (data) {
            getAll(data)
        }
    }, [data])

    return (
        <Select
            loading={isLoading}
            disabled={isLoading}
            placeholder={props.placeholder}
            allowClear
            {...props}
        >
            {
                multiple.map((item, index) => {
                    return (
                        <SelectItem.Option key={index} value={item.id}>
                            {item.name}
                        </SelectItem.Option>
                    )
                })
            }
        </Select>
    )
}

export default SelectCustomer