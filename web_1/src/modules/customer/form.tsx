import { Form, FormInstance, Input } from 'antd'
export interface customerFormProps {
    form: FormInstance;
}

const CustomerForm = (props: customerFormProps) => {
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
                rules={[
                    {
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

export default CustomerForm