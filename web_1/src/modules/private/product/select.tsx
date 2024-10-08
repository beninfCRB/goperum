import { FunctionComponent, useEffect } from 'react'
import { useProductAll } from '.'
import ProductStore from './state'
import { Select, SelectItem } from '../../../components/select'

interface SelectProductType {
    loading?: boolean,
    placeholder?: string,
}

const SelectProduct: FunctionComponent<SelectProductType> = (props) => {

    const { data, isLoading } = useProductAll()
    const { getAll, multiple } = ProductStore()


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
                multiple?.map((item, index) => {
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

export default SelectProduct