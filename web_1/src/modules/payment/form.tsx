import { Col, DatePicker, Form, FormInstance, Input, InputNumber, Row } from 'antd'
import SelectTransaction from '../transaction/select';
import SelectApprovalStatus from '../approval-status/select';
import SelectPaymentMethod from '../payment-method/select';
import SelectBank from '../bank/select';
export interface PaymentFormProps {
    form: FormInstance;
}

const PaymentForm = (props: PaymentFormProps) => {

    const span = {
        xs: 24,
        md: 24,
        lg: 12
    }

    return (
        <Form
            key={'PaymentForm'}
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
                        label='Tanggal Konfirmasi'
                        name={'confirm_date'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Tanggal Konfirmasi'
                            }
                        ]}
                    >
                        <DatePicker
                            className='w-full'
                            format={'D/M/YYYY'}
                            placeholder='Masukan Tanggal Konfirmasi'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Transaksi'
                        name={'transaction_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Transaksi'
                            }
                        ]}
                    >
                        <SelectTransaction
                            placeholder='Masukan Transaksi'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Total Pembayaran'
                        name={'total_payment'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Total Pembayaran'
                            }
                        ]}
                    >
                        <InputNumber
                            className='w-full'
                            addonBefore='Rp.'
                            addonAfter='per Bulan'
                            placeholder='Masukan Total Pembayaran'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Informasi'
                        name={'information'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Informasi'
                            }
                        ]}
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder='Masukan Informasi'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Status Persetujuan'
                        name={'approval_status_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Status Persetujuan'
                            }
                        ]}
                    >
                        <SelectApprovalStatus
                            placeholder='Masukan Status Persetujuan'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Metode Pembayaran'
                        name={'payment_method_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Metode Pembayaran'
                            }
                        ]}
                    >
                        <SelectPaymentMethod
                            placeholder='Masukan Metode Pembayaran'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Bank'
                        name={'bank_id'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Bank'
                            }
                        ]}
                    >
                        <SelectBank
                            placeholder='Masukan Bank'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Nama Rekening'
                        name={'account_name'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Nama Rekening'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Masukan Nama Rekening'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Nomor Rekening'
                        name={'account_number'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Nomor Rekening'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Masukan Nomor Rekening'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Rekening Penerima'
                        name={'account_receivable'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Rekening Penerima'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Masukan Rekening Penerima'
                        />
                    </Form.Item>
                </Col>
                <Col
                    {...span}
                >
                    <Form.Item
                        label='Prof Pembayaran'
                        name={'prof_payment'}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Masukan Prof Pembayaran'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Masukan Prof Pembayaran'
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default PaymentForm