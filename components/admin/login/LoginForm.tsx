'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import { useAuthStore } from '@/store/auth'
import { useApi } from '@/components/ApiProvider'
import Link from 'next/link'

interface LoginFormProps {
    handleSubmit: (
        callback: (data: any) => void
    ) => (e: React.FormEvent<HTMLFormElement>) => void
    config: any
    formData: { username: string; password: string }
}

const LoginFormComponent = ({
    handleSubmit,
    config,
    formData,
}: LoginFormProps) => {
    const router = useRouter()
    const { login, isLoading, error } = useAuthStore()
    const { isInitialized } = useApi()
    const [loginError, setLoginError] = useState<string | null>(null)

    const handleLogin = async (data: any) => {
        if (!isInitialized) {
            setLoginError('API not initialized. Please try again later.')
            return
        }

        setLoginError(null)
        try {
            await login(formData.username, formData.password)
            router.push('/')
        } catch (err) {
            setLoginError('Invalid credentials. Please try again.')
            console.error('Login error:', err)
        }
    }

    return (
        <div className="background-blur backdrop-blur-xl rounded-3xl px-6 md:px-8 lg:px-12 py-12 md:py-20 min-w-[250px] md:min-w-[350px] lg:min-w-[400px] border-[1px] border-gray-700 grow shadow-2xl">
            <div className="flex flex-col justify-center w-full gap-y-3">
                <h1 className="tracking-widest text-3xl md:text-4xl font-bold text-white">
                    LOGIN
                </h1>
                <h3 className="text-sm md:text-base text-gray-300">
                    Enter your credentials to access the merch and other
                    personalized features
                </h3>
                <form
                    onSubmit={handleSubmit(handleLogin)}
                    className="flex flex-col gap-y-6 mt-6 md:mt-8"
                >
                    <FormFieldBuilder formConfig={config} />

                    {(loginError || error) && (
                        <div className="bg-red-900/50 text-red-200 py-2 px-3 rounded-md text-sm">
                            Something went wrong. Please try again.
                        </div>
                    )}

                    <div className="flex flex-col gap-y-5">
                        <div className="flex justify-between items-center">
                            <div className="text-center text-sm text-gray-300">
                                No account?{' '}
                                <Link
                                    href="/register"
                                    className="text-csg-green-200 hover:text-csg-green-100 transition-colors duration-200"
                                >
                                    Register here
                                </Link>
                            </div>
                            <a
                                href="#"
                                className="text-csg-green-200 hover:text-csg-green-100 text-sm transition-colors duration-200"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !isInitialized}
                            className="font-bold tracking-widest bg-[#4A8E35] hover:bg-[#3A7025] py-3 rounded-lg border-[1px] border-white/20 transition-colors duration-200 flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                'LOGIN'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginFormComponent
