import { FunctionComponent, useEffect } from 'react'
import { useBankAll } from '.'
import BankStore from './state'
import { Select, SelectItem } from '../../components/select'

interface SelectBankType {
    loading?: boolean,
    placeholder?: string,
}

const SelectBank: FunctionComponent<SelectBankType> = (props) => {

    const { data, isLoading } = useBankAll()
    const { getAll, multiple } = BankStore()


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

export default SelectBank