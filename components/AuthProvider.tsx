'use client'

import { initializeAuth } from '@/store/auth'
import React, { useEffect, useState, ReactNode, useRef } from 'react'
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
    '/events/[eventId]',
    '/announcements/[announcementId]',
    '/scholarships/[scholarshipId]',
    '/internships/[internshipId]',
    // Add more public routes as needed
]

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const authStore = useAuthStore()
    const { isAuthenticated, isLoading, user } = authStore
    const router = useRouter()
    const pathname = usePathname()
    const [authChecked, setAuthChecked] = useState(false)
    const lastRedirectRef = useRef<string>('')

    useEffect(() => {
        // Initialize auth on component mount
        const init = async () => {
            await initializeAuth()
            setAuthChecked(true)
        }

        init()
    }, [])

    // Check if the current path matches any public route pattern
    const isPublicRoute = (path: string) => {
        return publicRoutes.some((route) => {
            // Convert route pattern to regex
            const pattern = route.replace(/\[.*?\]/g, '[^/]+')
            const regex = new RegExp(`^${pattern}$`)
            return regex.test(path)
        })
    }

    // Combined auth and admin check effect
    useEffect(() => {
        // Don't do anything while auth is loading or not checked yet
        if (!authChecked || isLoading) {
            return
        }

        // Prevent redirect loops by checking if we just redirected to this path
        if (lastRedirectRef.current === pathname) {
            return
        }

        const isAdminRoute = pathname.startsWith('/admin')

        // Handle unauthenticated users
        if (!isAuthenticated && !isPublicRoute(pathname)) {
            console.log('Redirecting unauthenticated user to login:', pathname)
            lastRedirectRef.current = '/login'
            // router.push('/login')
            return
        }

        // Handle authenticated users on admin routes
        if (isAuthenticated && user && isAdminRoute) {
            if (!user.is_superuser) {
                console.log(
                    'Access denied: User is not a superuser, redirecting to root'
                )
                lastRedirectRef.current = '/'
                // router.push('/')
                return
            }
        }

        // Clear the last redirect if we're successfully on a valid route
        lastRedirectRef.current = ''
    }, [authChecked, isLoading, isAuthenticated, user, pathname, router])

    return <>{children}</>
}

export default AuthProvider
