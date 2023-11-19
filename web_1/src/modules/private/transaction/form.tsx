import { Col, Form, FormInstance, Input, InputNumber, Row } from 'antd'
import SelectCustomer from '../customer/select';
import SelectMarketing from '../marketing/select';
import SelectProduct from '../product/select';
import SelectPurchaseMethod from '../purchase-method/select';
import SelectTypeDP from '../type-dp/select';
export interface TransactionFormProps {
    form: FormInstance;
}

const TransactionForm = (props: TransactionFormProps) => {

    const span = {
        xs: 24,
        md: 24,
        lg: 12
    }

    return (
        <Form
            key={'TransactionForm'}
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
                        label='Kode'
                        name={'code'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Kode'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Masukan Kode'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Pelanggan'
                        name={'customer_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Pelanggan'
                            }
                        ]}
                    >
                        <SelectCustomer
                            placeholder='Masukan Pelanggan'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Marketing'
                        name={'marketing_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Marketing'
                            }
                        ]}
                    >
                        <SelectMarketing
                            placeholder='Masukan Marketing'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Produk'
                        name={'product_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Produk'
                            }
                        ]}
                    >
                        <SelectProduct
                            placeholder='Masukan Produk'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Metode Pembelian'
                        name={'purchase_method_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Metode Pembelian'
                            }
                        ]}
                    >
                        <SelectPurchaseMethod
                            placeholder='Masukan Metode Pembelian'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Uang Muka / DP'
                        name={'down_payment'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Uang Muka / DP'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonBefore='Rp.'
                            placeholder='Masukan Uang Muka / DP'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Jenis DP'
                        name={'type_down_payment_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Jenis DP'
                            }
                        ]}
                    >
                        <SelectTypeDP
                            placeholder='Masukan Jenis DP'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Lama Angsuran DP'
                        name={'length_installments_dp'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Lama Angsuran DP'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonAfter='Bulan'
                            placeholder='Masukan Lama Angsuran DP'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Angsuran DP Bulanan'
                        name={'monthly_installments_dp'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Angsuran DP Bulanan'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonBefore='Rp.'
                            addonAfter='per Bulan'
                            placeholder='Masukan Angsuran DP Bulanan'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Angsuran Pokok'
                        name={'principal'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Angsuran Pokok'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonBefore='Rp.'
                            placeholder='Masukan Angsuran Pokok'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Lama Angsuran Pokok'
                        name={'length_principal'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Lama Angsuran Pokok'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonAfter='Bulan'
                            placeholder='Masukan Lama Angsuran Pokok'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Angsuran Pokok Bulanan'
                        name={'monthly_principal'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Angsuran Pokok Bulanan'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonBefore='Rp.'
                            addonAfter='per Bulan'
                            placeholder='Masukan Angsuran Pokok Bulanan'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Total Tagihan'
                        name={'total_bill'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Total Tagihan'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonBefore='Rp.'
                            placeholder='Masukan Total Tagihan'
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default TransactionForm