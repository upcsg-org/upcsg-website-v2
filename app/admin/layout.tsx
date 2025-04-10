import React, { ReactNode } from 'react'
import AdminSidePanel from '@/components/admin/AdminSidePanel'

interface PropsInterface {
    children: ReactNode
}

const AdminLayout = (props: PropsInterface) => {
    const { children } = props

    return (
        <div className="min-h-screen w-full bg-main-dark">
            <AdminSidePanel />
            {children}
        </div>
    )
}

export default AdminLayout
