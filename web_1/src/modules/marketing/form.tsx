import { Form, FormInstance, Input } from 'antd'
import { FunctionComponent } from 'react';
export interface customerFormProps {
    form: FormInstance;
}

const MarketingForm: FunctionComponent<customerFormProps> = (props) => {
    return (
        <Form
            key={'customerForm'}
            layout='vertical'
            form={props.form}
            initialValues={{ layout: 'vertical' }}
        >
            <Form.Item
                label='Nik'
                name={'nik'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan nomor kependudukan'
                    }
                ]}
                normalize={value => (value || '').replace(/[^0-9\.]+/g, '')}
            >
                <Input
                    placeholder='Masukan nomor kependudukan'
                />
            </Form.Item>
            <Form.Item
                label='Nama Lengkap'
                name={'name'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan nama lengkap'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan nama lengkap'
                />
            </Form.Item>
            <Form.Item
                label='Alamat'
                name={'address'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan alamat'
                    }
                ]}
            >
                <Input.TextArea
                    rows={3}
                    placeholder='Masukan alamat'
                />
            </Form.Item>
            <Form.Item
                label='Nomor Telepon'
                name={'handphone'}
                hasFeedback
                rules={[
                    {
                        min: 11,
                        required: true,
                        message: 'Masukan nomor telepone'
                    }
                ]}
                normalize={value => (value || '').replace(/[^0-9\.]+/g, '')}
            >
                <Input
                    placeholder='Masukan nomor telepone'
                />
            </Form.Item>
            <Form.Item
                label='Pekerjaan'
                name={'work'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan pekerjaan'
                    }
                ]}

            >
                <Input
                    placeholder='Masukan pekerjaan'
                />
            </Form.Item>
        </Form>
    )
}

export default MarketingForm