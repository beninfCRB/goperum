import { FormInstance } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { urlStaticImage } from '../static/config'

interface UploadFileProps {
    name: string
    form: FormInstance
    formData: FormData
    reset: boolean
    blob?: File
}

const UploadFile: FunctionComponent<UploadFileProps> = ({ ...props }) => {
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            const file = e.target.files[0];
            props.formData.append(props.name, file);
            props.form.setFieldValue(props.name, file.name);
            setFile(file);
        }
    };

    useEffect(() => {
        setFile(null)
    }, [])

    useEffect(() => {
        if (props.form.getFieldValue(props.name)) {
            const src = `${urlStaticImage}${props.form.getFieldValue(props.name)}`
            setFile(new File([src], props.form.getFieldValue(props.name)))
        } else {
            setFile(null)
        }
    }, [props.form])

    useEffect(() => {
        if (props.reset) {
            setFile(null)
        }
    }, [props.reset])

    useEffect(() => {
        if (props.blob) {
            setFile(new File([props.blob], props.blob.arrayBuffer.name))
        }
    }, [props.blob])

    return (
        <div className='flex flex-col w-full gap-4'>
            <input id={props.name} type="file" onChange={handleFileChange} />
            {file && (
                <div className='flex items-center justify-center'>
                    {file.type.includes('image') && (
                        <img src={URL.createObjectURL(file)} alt={file.name} className='w-32 h-auto object-containt rounded-2xl' />
                    )}
                </div>
            )}
        </div>
    )
}

export default UploadFile