import { FunctionComponent, useEffect } from 'react'
import { usePaymentMethodAll } from '.'
import PaymentMethodStore from './state'
import { Select, SelectItem } from '../../../components/select'

interface SelectPaymentMethodType {
    loading?: boolean,
    placeholder?: string,
}

const SelectPaymentMethod: FunctionComponent<SelectPaymentMethodType> = (props) => {

    const { data, isLoading } = usePaymentMethodAll()
    const { getAll, multiple } = PaymentMethodStore()


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

export default SelectPaymentMethod