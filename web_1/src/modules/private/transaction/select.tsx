import { FunctionComponent, useEffect } from 'react'
import { useTransactionAll } from '.'
import TransactionStore from './state'
import { Select, SelectItem } from '../../../components/select'

interface SelectTransactionType {
    loading?: boolean,
    placeholder?: string,
}

const SelectTransaction: FunctionComponent<SelectTransactionType> = (props) => {

    const { data, isLoading } = useTransactionAll()
    const { getAll, multiple } = TransactionStore()


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
                            {item.code}/{item.Customer?.nik}/{item.Customer?.name}
                        </SelectItem.Option>
                    )
                })
            }
        </Select>
    )
}

export default SelectTransaction