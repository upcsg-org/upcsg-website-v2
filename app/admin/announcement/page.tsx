'use client'

import ContentList from '@/components/admin/ContentList'
import { useAnnouncementStore } from '@/store/announcement'
import React, { useEffect } from 'react'

const AdminAnnouncements = () => {
    const { items, loading, error, fetchAll } = useAnnouncementStore()

    useEffect(() => {
        if (fetchAll) {
            fetchAll()
        }
    }, [])

    return <ContentList items={items} />
}

export default AdminAnnouncements
