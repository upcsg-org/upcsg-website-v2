'use client'

import { useRouter } from 'next/navigation';
import FormFieldBuilder from "@/components/generics/formField/FormFieldBuilder";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
    handleSubmit: (callback: (data: any) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
    config: any;
}

const LoginFormComponent = ({handleSubmit, config}: LoginFormProps) => {
    const router = useRouter();

    const handleLogin = async () => {
        // Create async login handle then reroute to dashboard
        router.push('/admin/dashboard')
    }

    const handleLoginGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();        
        // Handle google auth
        router.push('/admin/dashboard')
    }
    return (
        <div className="background-blur backdrop-blur-xl rounded-3xl  px-6 md:px-8 lg:px-12 py-12 md:py-20 min-w-[250px] md:min-w-[300px] lg:min-w-[350px] border-[1px] border-black grow"> 
            <div className="flex flex-col justify-center w-full gap-y-2">
                <h1 className="tracking-widest text-3xl md:text-4xl font-bold">
                    LOGIN
                </h1>
                <h3 className="text-sm md:text-base text-[#7881A2]">
                    Kindly enter your login credentials to continue.
                </h3>
                <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-y-5 mt-4 md:mt-7">
                    <FormFieldBuilder formConfig={config} />
                    <div className="flex flex-col gap-y-5">
                        <div className="text-right underline text-csg-green-200">
                            <a href="#"> Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            className="font-bold tracking-widest bg-[#4A8E35] py-2 rounded-lg border-[1px] border-white">
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={handleLoginGoogle}
                            className="font-bold tracking-widest bg-[#9298AD4F] whitespace-nowrap truncate py-2 rounded-lg border-[1px] border-white">
                            <span className="flex items-center justify-center"> 
                                <FcGoogle  size={24}/> Login with Google
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginFormComponent
