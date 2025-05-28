'use client'

import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/auth'
import { User } from '../../interface/user'
import Image from 'next/image'
import { uploadImageToCloudinary } from '../../hooks/cloudinary'

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
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        await processImageFile(file)
    }

    const processImageFile = async (file: File) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            setMessage({
                type: 'error',
                text: 'Please select a valid image file (JPG, PNG, or GIF).',
            })
            return
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            setMessage({
                type: 'error',
                text: 'Image size must be less than 5MB.',
            })
            return
        }

        setIsUploadingImage(true)
        setMessage(null)

        try {
            const imageUrl = await uploadImageToCloudinary(file)
            setFormData((prev) => ({
                ...prev,
                image_url: imageUrl,
            }))
            setMessage({
                type: 'success',
                text: 'Image uploaded successfully!',
            })
        } catch (error) {
            console.error('Error uploading image:', error)
            setMessage({
                type: 'error',
                text: 'Failed to upload image. Please try again.',
            })
        } finally {
            setIsUploadingImage(false)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)

        const files = e.dataTransfer.files
        if (files.length > 0) {
            processImageFile(files[0])
        }
    }

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            image_url: '',
        }))
        setMessage(null)
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
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-csg-blue-800 tracking-wider uppercase mb-4">
                                Profile Image
                            </h3>

                            {/* Current Image Preview */}
                            <div className="flex justify-center mb-6">
                                <div className="relative group">
                                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-csg-blue-400/30 shadow-lg">
                                        {formData.image_url ? (
                                            <Image
                                                src={formData.image_url}
                                                alt="Profile"
                                                width={128}
                                                height={128}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-csg-blue-600 to-csg-blue-800 flex items-center justify-center">
                                                <span className="text-white text-3xl font-bold">
                                                    {formData.first_name?.charAt(
                                                        0
                                                    ) ||
                                                        user?.username?.charAt(
                                                            0
                                                        ) ||
                                                        '?'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Remove Image Button */}
                                    {formData.image_url && (
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-lg"
                                            title="Remove image"
                                        >
                                            <span className="text-sm">×</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                                    isDragOver
                                        ? 'border-csg-green-100 bg-csg-green-100/10'
                                        : 'border-csg-blue-400/30 hover:border-csg-green-100/50'
                                } ${isUploadingImage ? 'opacity-50 pointer-events-none' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    disabled={isUploadingImage}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    id="image-upload"
                                />

                                <div className="text-center space-y-4">
                                    {isUploadingImage ? (
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-csg-green-100"></div>
                                            <p className="text-csg-green-100 font-medium">
                                                Uploading your image...
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="text-6xl text-csg-blue-400/50 mb-4">
                                                📷
                                            </div>
                                            <div>
                                                <p className="text-white font-medium text-lg mb-2">
                                                    Drop your image here, or{' '}
                                                    <span className="text-csg-green-100 underline cursor-pointer">
                                                        browse
                                                    </span>
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    Supports JPG, PNG, GIF up to
                                                    5MB
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center my-6">
                                <div className="flex-1 border-t border-csg-blue-400/20"></div>
                                <span className="px-4 text-gray-400 text-sm font-medium">
                                    OR
                                </span>
                                <div className="flex-1 border-t border-csg-blue-400/20"></div>
                            </div>

                            {/* URL Input */}
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-csg-blue-800 tracking-wider uppercase">
                                    Image URL
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-main-dark border border-csg-blue-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-csg-green-100 focus:ring-2 focus:ring-csg-green-100/20 transition-all"
                                        placeholder="https://example.com/your-image.jpg"
                                        disabled={isUploadingImage}
                                    />
                                    {formData.image_url && (
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors"
                                            title="Clear URL"
                                        >
                                            <span className="text-lg">×</span>
                                        </button>
                                    )}
                                </div>
                            </div>
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
