import { Form, FormInstance, Input } from 'antd'
import { FunctionComponent } from 'react';

export interface PurchaseMethodFormProps {
    form: FormInstance;
}

const PurchaseMethodForm: FunctionComponent<PurchaseMethodFormProps> = (props) => {
    return (
        <Form
            key={'PurchaseMethodForm'}
            layout='vertical'
            form={props.form}
            initialValues={{ layout: 'vertical' }}
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
        </Form>
    )
}

export default PurchaseMethodForm