import { Button, message } from 'antd'
import React, { useEffect } from 'react'
import { useVerifyEmail } from '../../modules/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { fetch } from '../../utils/reponse'

const VerifyEmail = () => {
    const {isSuccess,isError,error,isLoading,mutateAsync} = useVerifyEmail()
    const { verification_code } = useParams()
    const navigate = useNavigate()
    const _fetch = new fetch()

    const verify = () => {
        mutateAsync(verification_code)
    }

    useEffect(() => {
        if (isSuccess) {
            message.success("Verify email successfully")
            navigate('/')
        }
        if (isError) {
            message.error(_fetch.getAxiosMessage(error))
        }
    }, [isSuccess, isError])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-xs">
                <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Verifikasi Email</div>
                <div className="mt-10 text-center">
                    <Button type='primary' onClick={verify}>Verifikasi</Button>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail