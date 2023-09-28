import { Form, Spin, message } from 'antd';
import { useEffect } from 'react'
import { useRegisterPublic } from '../../modules/auth';
import { fetch } from '../../utils/reponse';
import { FormRegister } from '../../modules/auth/form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form] = Form.useForm()
    const { isError, isSuccess, error, isLoading, mutateAsync } = useRegisterPublic();
    const navigate = useNavigate()
    const _fetch = new fetch()

    useEffect(() => {
        if (isSuccess) {
            form.resetFields()
            navigate('/verify-email')
            message.success("Verification code email have been sent, please check email")
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
                    REGISTRASI
                    <p className='text-xs'>silahkan masukan data diri</p>
                </div>
                <div className="mt-10">
                    <Spin
                        spinning={isLoading}
                    >
                        <FormRegister
                            form={form}
                            onSubmit={onSubmit}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default Register