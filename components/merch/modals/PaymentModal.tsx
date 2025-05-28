import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { FaUpload } from 'react-icons/fa'

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (paymentMethod: string, proofOfPayment?: File) => void
    totalPrice: number
}

const PaymentModal: React.FC<PaymentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    totalPrice,
}) => {
    const [paymentMethod, setPaymentMethod] = useState<string>('cash')
    const [proofOfPayment, setProofOfPayment] = useState<File | null>(null)
    const [dragActive, setDragActive] = useState(false)

    if (!isOpen) return null

    const handleFileUpload = (file: File) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, GIF)')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB')
            return
        }

        setProofOfPayment(file)
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0])
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0])
        }
    }

    const handleConfirm = () => {
        if (paymentMethod === 'Online' && !proofOfPayment) {
            alert('Please upload proof of payment for online payment')
            return
        }
        onConfirm(paymentMethod, proofOfPayment || undefined)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
            <div className="bg-main-dark text-white p-6 rounded-2xl max-w-md w-full relative border-csg-blue-400 border-2">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                    <IoClose size={24} />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-vietnam mb-2">
                        PAYMENT METHOD
                    </h2>
                    <p className="text-[#6479CB] text-lg font-semibold">
                        Total: PHP {totalPrice.toFixed(2)}
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-3">
                        Select Payment Method:
                    </label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#18182c] text-white border border-[#23234a] focus:border-csg-blue-400 focus:outline-none"
                    >
                        <option value="cash">Cash</option>
                        <option value="online">Online Payment</option>
                    </select>
                </div>

                {paymentMethod === 'Online' && (
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-3">
                            Upload Proof of Payment:
                        </label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                dragActive
                                    ? 'border-csg-blue-400 bg-[#18182c]'
                                    : 'border-[#23234a] hover:border-[#6479CB]'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {proofOfPayment ? (
                                <div className="text-green-400">
                                    <FaUpload
                                        className="mx-auto mb-2"
                                        size={24}
                                    />
                                    <p className="text-sm font-semibold">
                                        {proofOfPayment.name}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {(
                                            proofOfPayment.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{' '}
                                        MB
                                    </p>
                                    <button
                                        onClick={() => setProofOfPayment(null)}
                                        className="mt-2 text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="text-[#888]">
                                    <FaUpload
                                        className="mx-auto mb-2"
                                        size={24}
                                    />
                                    <p className="text-sm">
                                        Drag and drop your proof of payment
                                        here, or{' '}
                                        <label className="text-csg-blue-400 cursor-pointer hover:underline">
                                            browse files
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </p>
                                    <p className="text-xs mt-1">
                                        Supports: JPEG, PNG, GIF (Max 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 px-4 bg-[#b53629] text-white rounded-lg hover:bg-red-700 transition font-semibold"
                    >
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentModal
