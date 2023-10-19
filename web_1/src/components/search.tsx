import React, { useEffect, useState, FunctionComponent } from "react";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";

export interface SearchProps {
    loading?: boolean
    disabled?: boolean
    placeholder?: string
    searchText?: string
    setSearchText?: (value?: string) => void
    fetchFunction?: (search?: string) => void
    route?: string
}

export const Search: FunctionComponent<SearchProps> = (props) => {
    const router = useNavigate()
    const [text, setText] = useState<string | undefined>(props.searchText)

    useEffect(() => {
        if (props.searchText) {
            props?.fetchFunction && props?.fetchFunction(props.searchText)
        } else {
            setText(undefined)
            props?.fetchFunction && props?.fetchFunction()
        }
    }, [props.searchText])

    const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            props.setSearchText && props.setSearchText(text)
        }
    }

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            if (props.searchText) {
                router(`${props.route}?${{ search: props.searchText }}`)
            }
        }
        setText(event.target.value)
    }

    return (
        <div
            className='bg-white w-full mx-auto border border-opacity-25 p-1 hover:border-primary/50 shadow'
        >
            <Input
                allowClear
                bordered={false}
                size="small"
                className="border-b opacity-75"
                // placeholder={`KETIK ${props?.placeholder || 'DATA YANG INGIN DICARI'} DISINI LALU TEKAN ENTER...`}
                placeholder={`${props?.placeholder || 'SEARCH (ketik disini lalu tekan enter)'}`}
                prefix={<i className={`fa fa-search opacity-50 mr-2 text-xs`} />}
                value={text}
                onKeyDown={onSearchKeyDown}
                onChange={onSearchChange}
                disabled={props.disabled || props?.loading}
            />
        </div>
    )
}