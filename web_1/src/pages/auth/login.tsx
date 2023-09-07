import { useEffect } from 'react';
import { Form, Spin, message } from 'antd'
import { useLogin } from '../../modules/auth';
import { useNavigate } from 'react-router-dom';
import { fetch } from '../../utils/reponse';
import { FormLogin } from '../../modules/auth/form';
import { UserType } from '../../modules/profile';

const Login = () => {
    const [form] = Form.useForm()
    const { isError, isSuccess, error, isLoading, mutateAsync } = useLogin();
    const navigate = useNavigate();
    const user: UserType = JSON.parse(localStorage.getItem('user') as string)
    const _fetch = new fetch()

    useEffect(() => {
        if (localStorage.getItem('authorize')) {
            navigate('/admin/dashboard')
        }
    })

    useEffect(() => {
        if (isSuccess) {
            message.success("Login successfully")
        }
        if (isError) {
            message.error(_fetch.getAxiosMessage(error))
        }
    }, [isSuccess, isError])

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await mutateAsync(values)
        }).catch((errorInfo) => {
            Object.keys(errorInfo.errorFields).map((error) => {
                return form.scrollToField(errorInfo.errorFields[error].name[0])
            })
        });
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 bg-[url('assets/image/bg-login.jpeg')] bg-cover bg-center">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xs">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 text-center">
                    SELAMAT DATANG
                    <p className='text-xs'>silahkan masuk ke akun</p>
                </div>
                <div className="mt-10">
                    <Spin
                        spinning={isLoading}
                    >
                        <FormLogin
                            form={form}
                            user={user}
                            onSubmit={onSubmit}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default Login