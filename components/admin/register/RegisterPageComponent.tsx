'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useFormHandler from '@/hooks/FormHooks'
import getRegisterFormConfig from '../../../configs/registerFormConfig'
import RegisterFormComponent from './RegisterFormComponent'

const RegisterPageComponent = () => {
    const [showErrorBanner, setShowErrorBanner] = useState(false)

    const initVal = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const { formData, handleChange, handleImageChange, handleSubmit } =
        useFormHandler(initVal)
    const config = getRegisterFormConfig(
        formData,
        handleChange,
        handleImageChange
    )

    return (
        <div className="w-full min-h-screen p-6 md:p-12 lg:p-16 bg-[url('/images/login-bg.png')] bg-cover bg-center">
            {showErrorBanner && (
                <div className="fixed top-0 left-0 w-full bg-red-600 text-white p-3 text-center font-medium z-50">
                    API Connection Error. Please try again later.
                    <button
                        onClick={() => setShowErrorBanner(false)}
                        className="ml-3 bg-white text-red-600 px-2 py-0.5 rounded-sm text-sm"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            <div className="flex flex-col md:flex-row min-h-full">
                <div className="grow z-30 pt-7 md:pr-8 lg:pr-16">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-xs md:text-sm font-bold transition-transform duration-300 hover:opacity-80"
                    >
                        <figure className="relative aspect-square w-8 md:w-12 hover:-translate-y-1 duration-200">
                            <Image
                                src="/logo/upcsg-logo.png"
                                alt="upcsg-logo"
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <p className="hover:-translate-y-1 duration-200 tracking-widest">
                            UP COMPUTER <br /> SCIENCE GUILD
                        </p>
                    </Link>

                    <div className="mt-8 md:mt-16 lg:mt-24">
                        <h1
                            className="font-vietnam font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl md:max-w-[12ch] text-[#C6E0FF] tracking-widest leading-tight"
                            style={{
                                textShadow: '5px 7px 32px rgba(0,106,231,0.9)',
                            }}
                        >
                            JOIN US TODAY!
                        </h1>
                        <p className="text-gray-300 mt-4 md:mt-6 max-w-md text-sm md:text-base">
                            Create an account to access exclusive member
                            features and benefits.
                        </p>
                    </div>
                </div>

                <div className="mt-8 md:mt-0 flex items-center justify-center">
                    <RegisterFormComponent
                        handleSubmit={handleSubmit}
                        config={config}
                        formData={formData}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterPageComponent
