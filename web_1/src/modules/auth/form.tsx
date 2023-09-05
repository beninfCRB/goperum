import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input } from 'antd'
import { UserType } from '../profile';
import { Link } from 'react-router-dom';

interface loginFormType {
    form: FormInstance;
    user: UserType;
    onSubmit: () => void;
}

interface registerFormType {
    form: FormInstance;
    onSubmit: () => void;
}

interface forgotPasswordFormType {
    form: FormInstance;
    success: boolean;
    onSubmit: () => void;
}

interface newPasswordFormType {
    form: FormInstance;
    onSubmit: () => void;
}

export const FormLogin = (props: loginFormType) => {
    return (
        <Form
            form={props.form}
            name="normal_login"
            className="login-form box"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: "email",
                        required: true,
                        message: 'Masukan Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Masukan Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <div className='mt-0 text-right'>
                <Link to={'forgot-password'}>Lupa password?</Link>
            </div>


            <Form.Item className='text-center mt-4'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}

export const FormRegister = (props: registerFormType) => {
    return (
        <Form
            form={props.form}
            layout='vertical'
            name="normal_register"
            className="login-form box"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="name"
                label='Nama'
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Nama!',
                    },
                ]}
            >
                <Input placeholder="Nama" />
            </Form.Item>
            <Form.Item
                name="email"
                label='Email'
                hasFeedback
                rules={[
                    {
                        type: "email",
                        required: true,
                        message: 'Masukan Email!',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                label='Kata Sandi'
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Kata Sandi!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Kata Sandi"
                />
            </Form.Item>
            <Form.Item
                name="confirm_password"
                label="Konfirmasi Kata Sandi"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Konfirmasi Kata Sandi!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Kata sandi baru yang Anda masukkan tidak cocok!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Form.Item className='text-center'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export const FormForgotPassword = (props: forgotPasswordFormType) => {
    return (
        <Form
            form={props.form}
            layout='vertical'
            name="normal_forgotpassword"
            className="login-form box"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="email"
                label='Email'
                hasFeedback
                rules={[
                    {
                        type: "email",
                        required: true,
                        message: 'Masukan Email!',
                    },
                ]}
            >
                <Input disabled={props.success} prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>


            <Form.Item className='text-center'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    {props.success ? 'Resend' : 'Submit'}
                </Button>
            </Form.Item>
        </Form>
    )
}

export const FormNewPassword = (props: newPasswordFormType) => {
    return (
        <Form
            form={props.form}
            layout='vertical'
            name="normal_newpassword"
            className="login-form box"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="password"
                label='Kata Sandi'
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Kata Sandi!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Kata Sandi"
                />
            </Form.Item>
            <Form.Item
                name="confirm_password"
                label="Konfirmasi Kata Sandi"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Konfirmasi Kata Sandi!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Kata sandi baru yang Anda masukkan tidak cocok!'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <Form.Item className='text-center'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}