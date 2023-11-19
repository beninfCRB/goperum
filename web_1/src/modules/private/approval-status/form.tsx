import { Form, FormInstance, Input } from 'antd'
import { FunctionComponent } from 'react';
import { SelectRoleUser } from '../role-user';

export interface ApprovalStatusFormProps {
    form: FormInstance;
}

const ApprovalStatusForm: FunctionComponent<ApprovalStatusFormProps> = (props) => {
    return (
        <Form
            key={'ApprovalStatusForm'}
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
            <Form.Item
                label='Assign'
                name={'role_user_id'}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Assign'
                    }
                ]}
            >
                <SelectRoleUser
                    placeholder='Masukan Nama'
                />
            </Form.Item>
        </Form>
    )
}

export default ApprovalStatusForm