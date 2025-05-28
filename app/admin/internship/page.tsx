'use client'

import ContentList from '@/components/admin/ContentList'
import { useInternshipStore } from '@/store/internship'
import React, { useEffect } from 'react'

const AdminInternships = () => {
    const { items, loading, error, fetchAll } = useInternshipStore()

    useEffect(() => {
        if (fetchAll) {
            fetchAll()
        }
    }, [])

    return <ContentList items={items} />
}

export default AdminInternships
