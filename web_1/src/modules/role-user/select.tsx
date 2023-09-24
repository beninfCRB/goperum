import { FunctionComponent, useEffect } from 'react'
import { useRoleUserAll } from '.'
import RoleUserStore from './state'
import { Select, SelectItem } from '../../components/select'

interface SelectRoleUserType {
    loading?: boolean,
    placeholder?: string,
}

const SelectRoleUser: FunctionComponent<SelectRoleUserType> = (props) => {

    const { data, isLoading } = useRoleUserAll()
    const { getAll, multiple } = RoleUserStore()


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
                        <SelectItem key={index} value={item.id}>
                            {item.name}
                        </SelectItem>
                    )
                })
            }
        </Select>
    )
}

export default SelectRoleUser