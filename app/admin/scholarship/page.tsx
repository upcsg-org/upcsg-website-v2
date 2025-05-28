'use client'

import ContentList from '@/components/admin/ContentList'
import { useScholarshipStore } from '@/store/scholarship'
import React, { useEffect } from 'react'

const AdminScholarships = () => {
    const { items, loading, error, fetchAll } = useScholarshipStore()

    useEffect(() => {
        if (fetchAll) {
            fetchAll()
        }
    }, [])

    return <ContentList items={items} />
}

export default AdminScholarships
