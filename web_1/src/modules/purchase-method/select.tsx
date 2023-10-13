import { FunctionComponent, useEffect } from 'react'
import { usePurchaseMethodAll } from '../purchase-method'
import PurchaseMethodStore from '../purchase-method/state'
import { Select, SelectItem } from '../../components/select'

interface SelectPurchaseMethodType {
    loading?: boolean,
    placeholder?: string,
}

const SelectPurchaseMethod: FunctionComponent<SelectPurchaseMethodType> = (props) => {

    const { data, isLoading } = usePurchaseMethodAll()
    const { getAll, multiple } = PurchaseMethodStore()


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

export default SelectPurchaseMethod