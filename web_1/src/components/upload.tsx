import { FormInstance } from 'antd'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { urlStaticImage } from '../static/config'

interface UploadFileProps {
    name: string
    form: FormInstance
    formData: FormData
}

const UploadFile: FunctionComponent<UploadFileProps> = ({ ...props }) => {
    const [file, setFile] = useState<File | null>(null)

    console.log('props.name=====>', props.name);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0) {
            props.formData.append(props.name, new File([e.target.files[0] as Blob], props.name, { type: e.target.files[0].type }))
            props.form.setFieldValue(props.name, e.target.files[0].name)
            setFile(e.target.files[0])
        }
    };

    useEffect(() => {
        if (!props.form.getFieldValue(props.name)) {
            setFile(null)
        } else {
            const src = `${urlStaticImage}${props.form.getFieldValue(props.name)}`
            setFile(new File([src], props.form.getFieldValue(props.name)))
        }
    }, [props.form])

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