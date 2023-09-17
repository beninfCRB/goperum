import { Form, FormInstance, Input } from 'antd'
export interface AreaFormProps {
    form: FormInstance;
}

const AreaForm = (props: AreaFormProps) => {
    return (
        <Form
            key={'AreaForm'}
            layout='vertical'
            form={props.form}
            initialValues={{ layout: 'vertical' }}
        >
            <Form.Item
                label='Blok'
                name={'blok'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Blok'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan Blok'
                />
            </Form.Item>
            <Form.Item
                label='Kavling'
                name={'kavling'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Kavling'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan Kavling'
                />
            </Form.Item>
            <Form.Item
                label='No Sertifikat'
                name={'sertifikat'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan No Sertifikat'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan No Sertifikat'
                />
            </Form.Item>
        </Form>
    )
}

export default AreaForm