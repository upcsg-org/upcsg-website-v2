import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

interface Props {
    onClose: () => void
}

const CancelPop: React.FC<Props> = ({ onClose }) => {
    const [showConfetti, setShowConfetti] = useState(true)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 2000)

        return () => clearTimeout(timer)
    }, [onClose])

    useEffect(() => {
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false)
        }, 2000)

        return () => clearTimeout(confettiTimer)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {showConfetti && (
                <Confetti width={windowSize.width} height={windowSize.height} />
            )}
            <motion.div
                className="bg-csg-blue-700 rounded-lg flex flex-col items-center border-csg-blue-400 border-2 w-96"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="mb-4 font-vietnam text-8xl font-bold text-[#7EB9FF]">
                    !
                </div>
                <p className="text-csg-blue-800 font-vietnam text-xl font-bold">
                    CONFIRM CANCELLATION?
                </p>
                <div className="flex w-full mt-4">
                    <button className=" bg-[#1D1D4F] text-[#6868A4] py-2 rounded-l-md hover:bg-indigo-800 w-full">
                        YES
                    </button>
                    <button className=" bg-[#0C0C3A] text-[#2C2C8C] py-2 rounded-r-md hover:bg-blue-600 w-full">
                        NO
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default CancelPop
