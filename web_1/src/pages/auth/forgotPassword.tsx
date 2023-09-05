import { Form, Spin, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForgotPassword } from '../../modules/auth'
import { FormForgotPassword } from '../../modules/auth/form'
// import { useNavigate } from 'react-router-dom'
import { fetch } from '../../utils/reponse'
import moment from 'moment'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const ForgotPassword = () => {
    const [form] = Form.useForm()
    const { isSuccess, isError, error, isLoading, data: response, mutateAsync } = useForgotPassword()
    const _fetch = new fetch()
    const [getTime, setTime] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (isSuccess) {
            const timer = moment.duration(moment(response?.data?.Data?.expired_at).diff(moment())).asSeconds()
            setTime(timer)
            setVisible(true)
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

    const children: (props: { remainingTime: number }) => React.ReactNode = ({
        remainingTime,
    }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60

        return `${minutes}:${seconds}`
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xs">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Lupa Kata Sandi</div>
                <div className="mt-10">
                    {visible ? (
                        <div className='grid text-center gap-4'>
                            <h4 className=' text-slate-400'>Kirim ulang email setelah waktu habis</h4>
                            <div
                                className='place-self-center'
                            >
                                <CountdownCircleTimer
                                    size={120}
                                    strokeWidth={10}
                                    isPlaying
                                    duration={getTime}
                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                    colorsTime={[7, 5, 2, 0]}
                                    onComplete={() => setVisible(false)}
                                >
                                    {children}
                                </CountdownCircleTimer>
                            </div>
                        </div>

                    ) : (
                        <Spin
                            spinning={isLoading}
                        >
                            <FormForgotPassword
                                form={form}
                                success={isSuccess}
                                onSubmit={onSubmit}
                            />
                        </Spin>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword