import { FunctionComponent, useEffect } from 'react'
import { useRoleUserAllPrivate, useRoleUserAllPublic } from '.'
import RoleUserStore from './state'
import { Select, SelectItem } from '../../components/select'

interface SelectRoleUserType {
    loading?: boolean,
    placeholder?: string,
}

export const SelectRoleUser: FunctionComponent<SelectRoleUserType> = (props) => {

    const { data, isLoading } = useRoleUserAllPrivate()
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
                        <SelectItem.Option key={index} value={item.id}>
                            {item.name}
                        </SelectItem.Option>
                    )
                })
            }
        </Select>
    )
}

export const SelectRoleUserPublic: FunctionComponent<SelectRoleUserType> = (props) => {

    const { data, isLoading } = useRoleUserAllPublic()
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
                        <SelectItem.Option key={index} value={item.id}>
                            {item.name}
                        </SelectItem.Option>
                    )
                })
            }
        </Select>
    )
}