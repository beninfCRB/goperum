import { Col, Form, FormInstance, Input, InputNumber, Row } from 'antd'
import { FunctionComponent } from 'react';
import UploadFile from '../../../components/upload';

export interface ProductFormProps {
    form: FormInstance;
    formData: FormData;
    reset: boolean;
    Blob?: File
}

const ProductForm: FunctionComponent<ProductFormProps> = (props) => {

    const span = {
        xs: 24,
        md: 24,
        lg: 12
    }


    return (
        <Form
            key={'ProductForm'}
            layout='vertical'
            form={props.form}
            initialValues={{ layout: 'vertical' }}
        >
            <Row
                gutter={[10, 10]}
            >
                <Col
                    {...span}
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
                >
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
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Gambar'
                        name={'image'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Gambar'
                            }
                        ]}
                    >
                        <UploadFile
                            name='image'
                            form={props.form}
                            formData={props.formData}
                            reset={props.reset}
                            blob={props.Blob}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default ProductForm