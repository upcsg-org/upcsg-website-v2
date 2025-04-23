'use client'

import React, { useEffect } from 'react'
import { useAuthStore } from '../../../store/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
    const { user, isAuthenticated, isLoading, getProfile, logout } =
        useAuthStore()
    const router = useRouter()

    useEffect(() => {
        const init = async () => {
            await getProfile()
        }

        init()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl">Loading profile...</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-red-500">Failed to load profile</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
                <div className="bg-gray-100 p-6">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:mr-6 mb-4 md:mb-0">
                            {user.image_url ? (
                                <div className="h-32 w-32 rounded-full overflow-hidden">
                                    <Image
                                        src={user.image_url}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        width={128}
                                        height={128}
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-32 w-32 rounded-full flex items-center justify-center">
                                    <span className="text-3xl text-gray-600">
                                        {user.first_name.charAt(0)}
                                        {user.last_name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-2xl font-bold text-black">
                                {user.first_name} {user.last_name}
                            </h1>
                            <p className="text-gray-600">@{user.username}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => logout()}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-3">Bio</h2>
                    <p className="text-gray-700 mb-6">
                        {user.bio || 'No bio provided'}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-3">
                                Contact Information
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    <span className="font-medium">Phone:</span>{' '}
                                    {user.phone_number || 'Not provided'}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">
                                        Date of Birth:
                                    </span>{' '}
                                    {user.date_of_birth
                                        ? 'Provided'
                                        : 'Not provided'}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">
                                        Member Since:
                                    </span>{' '}
                                    {new Date(
                                        user.date_joined
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-3">
                                Account Status
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    <span className="font-medium">Status:</span>
                                    <span
                                        className={`ml-2 px-2 py-1 rounded ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                    >
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">
                                        Account Type:
                                    </span>
                                    <span className="ml-2">
                                        {user.is_superuser === 'True'
                                            ? 'Administrator'
                                            : user.is_staff
                                              ? 'Staff'
                                              : 'Regular User'}
                                    </span>
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-medium">
                                        Last Login:
                                    </span>{' '}
                                    {new Date(user.last_login).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
