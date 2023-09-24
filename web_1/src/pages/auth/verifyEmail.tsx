import { Form, Spin, message } from 'antd'
import { useEffect } from 'react'
import { useVerifyEmail } from '../../modules/auth'
import { useNavigate } from 'react-router-dom'
import { fetch } from '../../utils/reponse'
import { FormVerificationEmail } from '../../modules/auth/form'
import { StorageName } from '../../static/config'

const VerifyEmail = () => {
    const [form] = Form.useForm()
    const { isLoading, isSuccess, isError, error, mutateAsync } = useVerifyEmail()
    const navigate = useNavigate()
    const _fetch = new fetch()

    useEffect(() => {
        if (isSuccess) {
            if (localStorage.getItem(StorageName.VerificationEmail)) {
                localStorage.removeItem(StorageName.VerificationEmail)
            }
            navigate('/login')
            message.success("Verify email successfully")
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
                    Verifikasi Email
                    <p className='text-xs'>silahkan masukan kode verifikasi</p>
                </div>
                <div className="mt-10 text-center">
                    <Spin
                        spinning={isLoading}
                    >
                        <FormVerificationEmail
                            form={form}
                            onSubmit={onSubmit}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail