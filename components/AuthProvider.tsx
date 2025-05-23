'use client'

import { initializeAuth } from '@/store/auth'
import React, { useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth'

// Routes that don't require authentication
const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/about',
    '/contact-us',
    '/educ-and-dev',
    '/events',
    '/internships',
    '/scholarships',
    '/learning',
    '/merch',
    '/my-purchases',
    '/officers',
    // Add more public routes as needed
]

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authStore = useAuthStore()
    const { isAuthenticated, isLoading } = authStore
    const router = useRouter()
    const pathname = usePathname()
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        // Initialize auth on component mount
        const init = async () => {
            await initializeAuth()
            setAuthChecked(true)
        }

        init()
    }, [])

    // Only redirect if we've checked auth and user is not authenticated and the route is not public
    useEffect(() => {
        if (
            authStore &&
            authChecked &&
            !isLoading &&
            !isAuthenticated &&
            !publicRoutes.includes(pathname)
        ) {
            // TODO: Comment this out when testing UI without auth
            router.push('/login')
        }
    }, [authChecked, isAuthenticated, isLoading, router, pathname, authStore])

    return <>{children}</>
}

export default AuthProvider
