import React from 'react'
import { useRouter } from 'next/navigation'
import TheButton from '../../generics/TheButton'
import { IoClose } from 'react-icons/io5'
import { HiLockClosed } from 'react-icons/hi2'
import { motion } from 'framer-motion'

interface LoginRequiredModalProps {
    onClose: () => void
}

const LoginRequiredModal = ({ onClose }: LoginRequiredModalProps) => {
    const router = useRouter()

    const handleLoginRedirect = () => {
        onClose()
        router.push('/login')
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-main-dark text-white p-8 rounded-2xl max-w-md w-full relative border-csg-blue-400 border-2 shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <IoClose size={24} />
                </button>

                <div className="flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <HiLockClosed className="text-white text-2xl" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-2 font-vietnam">
                            Login Required
                        </h2>
                        <p className="text-gray-300 text-base">
                            Please log in to your account to access the shopping
                            bag and add items to cart.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <TheButton
                            onClick={handleLoginRedirect}
                            style="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex-1"
                        >
                            Login
                        </TheButton>
                        <TheButton
                            onClick={onClose}
                            style="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex-1"
                        >
                            Cancel
                        </TheButton>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default LoginRequiredModal
