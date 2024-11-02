import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

interface LikedPopProps {
    onClose: () => void
}

const LikedPop: React.FC<LikedPopProps> = ({ onClose }) => {
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
            transition={{ duration: 0.3 }}
        >
            {showConfetti && (
                <Confetti width={windowSize.width} height={windowSize.height} />
            )}
            <motion.div
                className="bg-csg-blue-700 rounded-lg p-6 flex flex-col items-center border-csg-blue-400 border-2 w-80"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="mb-4 relative">
                    <FaHeart className="w-28 h-16 text-red-900" />
                    <FaHeart className="w-28 h-16 text-red-500 absolute top-0 left-0 fill-none stroke-current stroke-[28]" />
                </div>
                <p className="text-csg-blue-800 font-vietnam text-xl font-bold">
                    ADDED TO MY LIKES
                </p>
            </motion.div>
        </motion.div>
    )
}

export default LikedPop
