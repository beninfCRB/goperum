import { Form, Spin, message } from 'antd'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetch } from '../../utils/reponse'
import { FormNewPassword } from '../../modules/auth/form'
import { useNewPassword } from '../../modules/auth'
import { StorageName } from '../../static/config'

const NewPasswordIndex = () => {
    const [form] = Form.useForm()
    const { reset_code } = useParams()
    const { isSuccess, isError, error, isLoading, mutateAsync } = useNewPassword()
    const navigate = useNavigate()
    const _fetch = new fetch()

    useEffect(() => {
        if (isSuccess) {
            form.resetFields()
            if (localStorage.getItem(StorageName.ForgotPassword)) {
                localStorage.removeItem(StorageName.ForgotPassword)
            }
            navigate('/login')
            message.success("New password has been applied")
        }
        if (isError) {
            message.error(_fetch.getAxiosMessage(error))
        }
    }, [isSuccess, isError])

    const onSubmit = () => {
        form.validateFields().then(async (values) => {
            await mutateAsync({ reset_code, ...values })
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
                    BUAT KATA SANDI BARU
                    <p className='text-xs'>silahkan masukan kata sandi dan konfirmasi kata sandi baru</p>
                </div>
                <div className="mt-10 text-center">
                    <Spin
                        spinning={isLoading}
                    >
                        <FormNewPassword
                            form={form}
                            onSubmit={onSubmit}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default NewPasswordIndex