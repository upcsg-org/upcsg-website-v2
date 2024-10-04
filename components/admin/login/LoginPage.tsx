'use client'

import Image from 'next/image'
import Link from 'next/link'
import useFormHandler from '@/hooks/FormHooks'
import getFormConfig from './formconfig'
import LoginFormComponent from './LoginForm'

const LoginPageComponent = () => {
    const initVal = {
        username: '',
        password: '',
    }

    const { formData, handleChange, handleImageChange, handleSubmit } =
        useFormHandler(initVal)
    const config = getFormConfig(formData, handleChange, handleImageChange)

    return (
        <div className="w-full h-full p-8 md:p-12 lg:p-16 bg-[url('/images/login-bg.png')] bg-cover bg-center">
            <div className="flex flex-col md:flex-row h-full">
                <div className="grow z-30">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-xs font-bold"
                    >
                        <figure className="relative aspect-square w-8 md:w-14 hover:-translate-y-1 duration-200">
                            <Image
                                src="/logo/upcsg-logo.png"
                                alt="upcsg-logo"
                                fill
                                className="object-cover"
                            />
                        </figure>
                        <p className="hover:-translate-y-1 duration-200  tracking-widest">
                            UP COMPUTER <br /> SCIENCE GUILD
                        </p>
                    </Link>
                    <h1
                        className="font-vietnam font-bold text-5xl my-5 mr-5 lg:text-7xl xl:text-8xl md:max-w-[10ch] text-[#C6E0FF] h-full tracking-widest"
                        style={{
                            textShadow: '5px 7px 32px rgba(0,106,231,0.9)',
                        }}
                    >
                        WELCOME BACK, ADMIN !
                    </h1>
                </div>
                <LoginFormComponent
                    handleSubmit={handleSubmit}
                    config={config}
                />
            </div>
        </div>
    )
}

export default LoginPageComponent
