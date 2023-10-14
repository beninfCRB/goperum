import { FunctionComponent, useEffect } from 'react'
import { useApprovalStatusAll } from '.'
import ApprovalStatusStore from './state'
import { Select, SelectItem } from '../../components/select'

interface SelectApprovalStatusType {
    loading?: boolean,
    placeholder?: string,
}

const SelectApprovalStatus: FunctionComponent<SelectApprovalStatusType> = (props) => {

    const { data, isLoading } = useApprovalStatusAll()
    const { getAll, multiple } = ApprovalStatusStore()


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

export default SelectApprovalStatus