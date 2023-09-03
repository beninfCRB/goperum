import { Form, Spin, message } from 'antd'
import React, { useEffect } from 'react'
import { useForgotPassword } from '../../modules/auth'
import { FormForgotPassword } from '../../modules/auth/form'
import { useNavigate } from 'react-router-dom'
import { fetch } from '../../utils/reponse'

const ForgotPassword = () => {
    const [form] = Form.useForm()
    const { isSuccess, isError, error, isLoading, mutateAsync } = useForgotPassword()
    const navigate = useNavigate()
    const _fetch = new fetch()

    useEffect(() => {
        if (isSuccess) {
            form.resetFields()
            navigate('/welldone-forgot-password')
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xs">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Lupa Kata Sandi</div>
                <div className="mt-10 text-center">
                    <Spin
                        spinning={isLoading}
                    >
                        <FormForgotPassword
                            form={form}
                            onSubmit={onSubmit}
                        />
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword