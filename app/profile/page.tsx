'use client'

import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import EditProfileModal from '../../components/profile/EditProfileModal'

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading, getProfile, logout } =
        useAuthStore()
    const router = useRouter()
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        const init = async () => {
            if (getProfile) {
                await getProfile()
            }
        }

        init()
    }, [getProfile])

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-main-dark">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-csg-green-100 mx-auto mb-4"></div>
                    <p className="text-xl text-csg-blue-800 font-vietnam">
                        Loading profile...
                    </p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-main-dark">
                <div className="text-center">
                    <p className="text-xl text-csg-red-100 mb-4 font-vietnam">
                        Failed to load profile
                    </p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-2 bg-csg-green-100 text-white rounded-lg hover:bg-csg-green-200 transition-colors font-vietnam font-bold"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-main-dark py-8 font-vietnam">
            <div className="container mx-auto px-4">
                <div className="bg-secondary-dark rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto border border-csg-blue-400/30">
                    {/* Header Section */}
                    <div
                        className="p-8 text-white"
                        style={{
                            background:
                                'linear-gradient(to right, #39A2AE, #6EDC46, #7B00C6)',
                        }}
                    >
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:mr-8 mb-6 md:mb-0">
                                {user.image_url ? (
                                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <Image
                                            src={user.image_url}
                                            alt={`${user.first_name} ${user.last_name}`}
                                            width={128}
                                            height={128}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-32 w-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white flex items-center justify-center shadow-lg">
                                        <span className="text-4xl font-bold">
                                            {user.first_name
                                                ?.charAt(0)
                                                .toUpperCase() ||
                                                user.username
                                                    ?.charAt(0)
                                                    .toUpperCase() ||
                                                '?'}
                                            {user.last_name
                                                ?.charAt(0)
                                                .toUpperCase() || ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h1 className="text-3xl font-bold mb-2 tracking-widest">
                                    {user.first_name && user.last_name
                                        ? `${user.first_name} ${user.last_name}`.toUpperCase()
                                        : user.username.toUpperCase()}
                                </h1>
                                <p className="text-blue-100 text-lg mb-1">
                                    @{user.username}
                                </p>
                                <p className="text-blue-100">{user.email}</p>
                                <div className="mt-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            user.is_active
                                                ? 'bg-csg-green-100 text-white'
                                                : 'bg-csg-red-100 text-white'
                                        }`}
                                    >
                                        {user.is_active
                                            ? '✓ ACTIVE'
                                            : '✗ INACTIVE'}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-0">
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setShowEditModal(true)}
                                        className="px-6 py-2 bg-csg-blue-600 text-white rounded-lg hover:bg-csg-blue-700 transition-all duration-200 font-bold tracking-wider uppercase text-sm"
                                    >
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={() => logout()}
                                        className="px-6 py-2 bg-csg-red-100 text-white rounded-lg hover:bg-csg-red-200 transition-all duration-200 font-bold tracking-wider uppercase text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 bg-main-dark">
                        {/* Bio Section */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-csg-blue-800 mb-4 flex items-center tracking-widest uppercase">
                                <span className="w-1 h-6 bg-csg-green-100 rounded-full mr-3"></span>
                                About
                            </h2>
                            <div className="bg-secondary-dark rounded-lg p-6 border border-csg-blue-400/20">
                                <p className="text-gray-300 leading-relaxed">
                                    {user.bio ||
                                        'No bio provided yet. Tell us about yourself!'}
                                </p>
                            </div>
                        </div>

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Contact Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-csg-blue-800 flex items-center tracking-widest uppercase">
                                    <span className="w-1 h-5 bg-csg-violet-100 rounded-full mr-3"></span>
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-csg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                📧
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Email
                                            </p>
                                            <p className="font-medium text-white">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-csg-green-100 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                📱
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Phone
                                            </p>
                                            <p className="font-medium text-white">
                                                {user.phone_number ||
                                                    'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-csg-violet-100 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                🎂
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Date of Birth
                                            </p>
                                            <p className="font-medium text-white">
                                                {user.date_of_birth
                                                    ? 'Provided'
                                                    : 'Not provided'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-csg-blue-800 flex items-center tracking-widest uppercase">
                                    <span className="w-1 h-5 bg-csg-pink-100 rounded-full mr-3"></span>
                                    Account Information
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-csg-blue-300 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                👤
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Username
                                            </p>
                                            <p className="font-medium text-white">
                                                @{user.username}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-csg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                🏷️
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Account Type
                                            </p>
                                            <p className="font-medium text-white">
                                                {user.is_superuser
                                                    ? 'ADMINISTRATOR'
                                                    : user.is_staff
                                                      ? 'STAFF MEMBER'
                                                      : 'REGULAR USER'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                📅
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Member Since
                                            </p>
                                            <p className="font-medium text-white">
                                                {new Date(
                                                    user.date_joined
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center p-4 bg-secondary-dark rounded-lg border border-csg-blue-400/20">
                                        <div className="w-10 h-10 bg-csg-orange-100 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white font-bold">
                                                🕒
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-csg-blue-800 font-bold tracking-wider uppercase">
                                                Last Login
                                            </p>
                                            <p className="font-medium text-white">
                                                {new Date(
                                                    user.last_login
                                                ).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
            />
        </div>
    )
}

export default ProfilePage
