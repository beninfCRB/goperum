import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

const Login = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const login = useStore((state) => state.login)
    const onSubmit = (values: any) => {
        form.validateFields().then((values) => {
            login(form).then(() => {
                message.success('Berhasil login')
                navigate('/dashboard')
            })
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
                <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
                    <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Login</div>
                    <div className="mt-10">
                        <Form
                            form={form}
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
                                        message: 'Please input your Email!',
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
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item className='text-center'>
                                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login