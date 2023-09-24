import { Form, FormInstance, Input, InputNumber } from 'antd'
import { FunctionComponent } from 'react';

export interface ProductFormProps {
    form: FormInstance;
}

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {
    return (
        <Form
            key={'ProductForm'}
            layout='vertical'
            form={props.form}
            initialValues={{ layout: 'vertical' }}
        >
            <Form.Item
                label='Nama'
                name={'name'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Nama'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan Nama'
                />
            </Form.Item>
            <Form.Item
                label='Model'
                name={'model'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Model'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan Model'
                />
            </Form.Item>
            <Form.Item
                label='Tipe'
                name={'type'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Tipe'
                    }
                ]}
            >
                <Input
                    placeholder='Masukan Tipe'
                />
            </Form.Item>
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
            <Form.Item
                label='Harga'
                name={'price'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Harga'
                    }
                ]}
            >
                <InputNumber
                    className='w-full'
                    placeholder='Masukan Harga'
                    addonBefore='Rp.'
                />
            </Form.Item>
            <Form.Item
                label='Stok'
                name={'stock'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Stok'
                    }
                ]}
            >
                <InputNumber
                    className='w-full'
                    placeholder='Masukan Stok'
                />
            </Form.Item>
            <Form.Item
                label='Deskripsi'
                name={'description'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Deskripsi'
                    }
                ]}
            >
                <Input.TextArea
                    rows={3}
                    placeholder='Masukan Deskripsi'
                />
            </Form.Item>
        </Form>
    )
}

export default ProductForm