import { Form, Spin, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useReVerifyEmail } from '../../modules/auth'
import { FormReVerificationEmail } from '../../modules/auth/form'
import { useNavigate } from 'react-router-dom'
import { fetch } from '../../utils/reponse'
import moment from 'moment'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Link } from 'react-router-dom'
import { StorageName } from '../../static/config'

const ResendVerficationEmailIndex = () => {
    const [form] = Form.useForm()
    const { isSuccess, isError, error, isLoading, data: response, mutateAsync } = useReVerifyEmail()
    const navigate = useNavigate()
    const _fetch = new fetch()
    const [getTime, setTime] = useState<number>(0)

    useEffect(() => {
        const storage = localStorage.getItem(StorageName.VerificationEmail)
        if (storage) {
            const timer = moment.duration(moment(storage).diff(moment())).asSeconds()
            setTime(timer)
        }
    }, [localStorage.getItem(StorageName.VerificationEmail)])

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem(StorageName.VerificationEmail, response?.data?.Data?.expired_at)
            navigate(0)
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 bg-[url('assets/image/bg-login.jpeg')] bg-cover bg-center">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xs tex-center">
                <div className="font-medium self-center text-xl sm:text-xl uppercase text-gray-800 text-center">
                    KIRIM ULANG KODE VERIFIKASI EMAIL
                    <p className='text-xs'>silahkan masukan email</p>
                </div>
                <div className="mt-10">
                    {getTime ? (
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
                                    onComplete={() => {
                                        localStorage.removeItem(StorageName.VerificationEmail)
                                        navigate(0)
                                    }}
                                >
                                    {children}
                                </CountdownCircleTimer>
                            </div>
                            <div className='mt-0'>
                                <Link className='no-underline hover:text-red-400' to={'/verify-email'}><small>sudah punya kode verifikasi email ?</small></Link>
                            </div>
                        </div>

                    ) : (
                        <Spin
                            spinning={isLoading}
                        >
                            <FormReVerificationEmail
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

export default ResendVerficationEmailIndex