import { FunctionComponent, useEffect } from 'react'
import { useTypeDPAll } from '../type-dp'
import TypeDPStore from '../type-dp/state'
import { Select, SelectItem } from '../../components/select'

interface SelectTypeDPType {
    loading?: boolean,
    placeholder?: string,
}

const SelectTypeDP: FunctionComponent<SelectTypeDPType> = (props) => {

    const { data, isLoading } = useTypeDPAll()
    const { getAll, multiple } = TypeDPStore()


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

export default SelectTypeDP