import { MailOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
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

interface verificationEmailFormType {
    form: FormInstance;
    onSubmit: () => void;
}


interface reverificationEmailFormType {
    form: FormInstance;
    success: boolean;
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
                <Link replace to={'/forgot-password'}><small>lupa kata sandi?</small></Link>
            </div>


            <Form.Item className='text-center mt-4'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    MASUK
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
            <div className='mt-0 text-right'>
                <Link replace to={'/login'}><small>sudah punya akun?</small></Link>
            </div>

            <Form.Item className='text-center'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    DAFTAR
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
            <div className='mt-0 text-right'>
                <Link to={'/login'}><small>kembali ke login</small></Link>
            </div>


            <Form.Item className='text-center'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    {props.success ? 'KIRIM ULANG' : 'KIRIM'}
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
                    KIRIM
                </Button>
            </Form.Item>
        </Form>
    )
}


export const FormVerificationEmail = (props: verificationEmailFormType) => {
    return (
        <Form
            form={props.form}
            layout='vertical'
            name="normal_verificationEmail"
            className="login-form box"
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                name="verification_code"
                label='Kode'
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Masukan Kode!',
                    },
                ]}
            >
                <Input prefix={<KeyOutlined className="site-form-item-icon" />} placeholder="Kode" />
            </Form.Item>
            <div className='mt-0 text-right'>
                <Link to={'/re-verify-email'}><small>kirim ulang kode verifikasi</small></Link>
            </div>

            <Form.Item className='text-center mt-4'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    KIRIM
                </Button>
            </Form.Item>
        </Form>
    )
}

export const FormReVerificationEmail = (props: reverificationEmailFormType) => {
    return (
        <Form
            form={props.form}
            layout='vertical'
            name="normal_reverificationEmail"
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
            <div className='mt-0 text-right'>
                <Link to={'/verify-email'}><small>sudah punya kode verifikasi email ?</small></Link>
            </div>

            <Form.Item className='text-center mt-4'>
                <Button type="primary" htmlType="submit" onClick={props.onSubmit}>
                    {props.success ? 'KIRIM ULANG' : 'KIRIM'}
                </Button>
            </Form.Item>
        </Form>
    )
}