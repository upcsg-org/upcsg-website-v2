'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import AdminSidePanel from '@/components/admin/AdminSidePanel'
import { useAuthStore, initializeAuth } from '@/store/auth'
import { useRouter } from 'next/navigation'

interface PropsInterface {
    children: ReactNode
}

const AdminLayout = (props: PropsInterface) => {
    const { children } = props
    const { isAuthenticated, isLoading } = useAuthStore()
    const router = useRouter()
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        // Initialize auth on component mount
        const init = async () => {
            await initializeAuth()
            setAuthChecked(true)
        }

        init()
    }, [])

    // Only redirect if we've checked auth and user is not authenticated
    useEffect(() => {
        if (authChecked && !isLoading && !isAuthenticated) {
            // TODO: Comment this out when testing UI without auth
            // router.push('/admin/login')
        }
    }, [authChecked, isAuthenticated, isLoading, router])

    // Show loading or content
    if (!authChecked || isLoading) {
        return (
            <div className="min-h-screen w-full bg-main-dark flex items-center justify-center">
                <p className="text-white">Loading...</p>
            </div>
        )
    }

    return (
        <div className="h-[calc(100vh-5rem)] w-full bg-main-dark">
            <AdminSidePanel />
            {children}
        </div>
    )
}

export default AdminLayout
