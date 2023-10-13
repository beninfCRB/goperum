import { FunctionComponent, useEffect } from 'react'
import { useMarketingAll } from '../marketing'
import MarketingStore from '../marketing/state'
import { Select, SelectItem } from '../../components/select'

interface SelectMarketingType {
    loading?: boolean,
    placeholder?: string,
}

const SelectMarketing: FunctionComponent<SelectMarketingType> = (props) => {

    const { data, isLoading } = useMarketingAll()
    const { getAll, multiple } = MarketingStore()


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

export default SelectMarketing