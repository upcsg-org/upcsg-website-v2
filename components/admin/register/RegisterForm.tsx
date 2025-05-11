'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormFieldBuilder from '@/components/generics/formField/FormFieldBuilder'
import { useAuthStore, RegisterData } from '@/store/auth'
import { useApi } from '@/components/ApiProvider'
import Link from 'next/link'

interface RegisterFormProps {
    handleSubmit: (
        callback: (data: any) => void
    ) => (e: React.FormEvent<HTMLFormElement>) => void
    config: any
    formData: {
        username: string
        email: string
        password: string
        confirmPassword: string
    }
}

const RegisterFormComponent = ({
    handleSubmit,
    config,
    formData,
}: RegisterFormProps) => {
    const router = useRouter()
    const { register, isLoading, error } = useAuthStore()
    const { isInitialized } = useApi()
    const [registerError, setRegisterError] = useState<string | null>(null)

    const handleRegister = async (data: any) => {
        if (!isInitialized) {
            setRegisterError('API not initialized. Please try again later.')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setRegisterError('Passwords do not match. Please try again.')
            return
        }

        setRegisterError(null)
        try {
            const registerData: RegisterData = {
                email: formData.email,
                password1: formData.password,
                password2: formData.confirmPassword,
            }

            await register(registerData)
            router.push('/login')
        } catch (err) {
            setRegisterError('Registration failed. Please try again.')
            console.error('Registration error:', err)
        }
    }

    return (
        <div className="background-blur backdrop-blur-xl rounded-3xl px-6 md:px-8 lg:px-12 py-12 md:py-20 min-w-[250px] md:min-w-[350px] lg:min-w-[400px] border-[1px] border-gray-700 grow shadow-2xl">
            <div className="flex flex-col justify-center w-full gap-y-3">
                <h1 className="tracking-widest text-3xl md:text-4xl font-bold text-white">
                    REGISTER
                </h1>
                <h3 className="text-sm md:text-base text-gray-300">
                    Create an account to join our community
                </h3>
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="flex flex-col gap-y-6 mt-6 md:mt-8"
                >
                    <FormFieldBuilder formConfig={config} />

                    {(registerError || error) && (
                        <div className="bg-red-900/50 text-red-200 py-2 px-3 rounded-md text-sm">
                            {registerError || (error && error.message)}
                        </div>
                    )}

                    <div className="flex flex-col gap-y-5">
                        <div className="text-center text-sm text-gray-300">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-csg-green-200 hover:text-csg-green-100 transition-colors duration-200"
                            >
                                Login here
                            </Link>
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
                                    Registering...
                                </span>
                            ) : (
                                'REGISTER'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterFormComponent
