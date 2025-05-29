import React from 'react'
import {
    IoClose,
    IoCheckmarkCircle,
    IoWarning,
    IoInformationCircle,
} from 'react-icons/io5'

interface NotificationModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
    type,
    title,
    message,
}) => {
    if (!isOpen) return null

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <IoCheckmarkCircle className="text-green-400" size={32} />
                )
            case 'error':
                return <IoWarning className="text-red-400" size={32} />
            case 'warning':
                return <IoWarning className="text-yellow-400" size={32} />
            case 'info':
                return (
                    <IoInformationCircle className="text-blue-400" size={32} />
                )
            default:
                return (
                    <IoInformationCircle className="text-blue-400" size={32} />
                )
        }
    }

    const getBorderColor = () => {
        switch (type) {
            case 'success':
                return 'border-green-400'
            case 'error':
                return 'border-red-400'
            case 'warning':
                return 'border-yellow-400'
            case 'info':
                return 'border-blue-400'
            default:
                return 'border-blue-400'
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[70] p-4">
            <div
                className={`bg-main-dark text-white p-6 rounded-2xl max-w-md w-full relative border-2 ${getBorderColor()}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                    <IoClose size={24} />
                </button>

                <div className="flex items-center mb-4">
                    {getIcon()}
                    <h2 className="text-xl font-bold font-vietnam ml-3">
                        {title}
                    </h2>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="py-2 px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotificationModal
