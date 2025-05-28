'use client'

import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/auth'
import { User } from '../../interface/user'
import Image from 'next/image'

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
    isOpen,
    onClose,
}) => {
    const { user, updateProfile, isLoading } = useAuthStore()
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        phone_number: '',
        image_url: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{
        type: 'success' | 'error'
        text: string
    } | null>(null)

    // Initialize form data when modal opens or user changes
    useEffect(() => {
        if (user && isOpen) {
            setFormData({
                username: user.username || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                bio: user.bio || '',
                phone_number: user.phone_number || '',
                image_url: user.image_url || '',
            })
        }
    }, [user, isOpen])

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage(null)

        try {
            // Only send fields that have been changed, but always include username as it's required
            const updatedData: Partial<User> = {
                username: formData.username, // Always include username as it's required by the API
            }

            Object.keys(formData).forEach((key) => {
                const fieldKey = key as keyof typeof formData
                if (
                    key !== 'username' &&
                    formData[fieldKey] !== (user?.[fieldKey] || '')
                ) {
                    updatedData[fieldKey] = formData[fieldKey]
                }
            })

            await updateProfile(updatedData)
            setMessage({
                type: 'success',
                text: 'Profile updated successfully!',
            })

            // Close modal after 2 seconds
            setTimeout(() => {
                onClose()
                setMessage(null)
            }, 2000)
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Failed to update profile. Please try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-secondary-dark rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-csg-blue-400/30">
                {/* Header */}
                <div className="p-6 border-b border-csg-blue-400/20">
                    <h2 className="text-2xl font-bold text-csg-blue-800 tracking-widest uppercase">
                        Edit Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Profile Image */}
                    <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-csg-blue-400/30">
                            {formData.image_url ? (
                                <Image
                                    src={formData.image_url}
                                    alt="Profile"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="h-full w-full bg-csg-blue-600 flex items-center justify-center">
                                    <span className="text-white text-xl font-bold">
                                        {formData.first_name?.charAt(0) ||
                                            user?.username?.charAt(0) ||
                                            '?'}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                                Profile Image URL
                            </label>
                            <input
                                type="url"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 transition-colors"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 border border-csg-blue-400/30 rounded-lg text-gray-400 placeholder-gray-400 cursor-not-allowed"
                            placeholder="Username"
                            readOnly
                            disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Username cannot be changed
                        </p>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 transition-colors"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 transition-colors"
                                placeholder="Enter your last name"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 transition-colors"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 transition-colors"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-bold text-csg-blue-800 tracking-wider uppercase mb-2">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 transition-colors resize-vertical"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    {/* Message */}
                    {message && (
                        <div
                            className={`p-3 rounded-lg text-center font-medium ${
                                message.type === 'success'
                                    ? 'bg-csg-green-100/20 text-csg-green-100 border border-csg-green-100/30'
                                    : 'bg-csg-red-100/20 text-csg-red-100 border border-csg-red-100/30'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold tracking-wider uppercase"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-csg-green-100 text-white rounded-lg hover:bg-csg-green-200 transition-colors font-bold tracking-wider uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfileModal
