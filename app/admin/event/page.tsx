'use client'

import ContentList from '@/components/admin/ContentList'
import { useEventStore } from '@/store/event'
import React, { useEffect } from 'react'

const AdminEvents = () => {
    const { items, loading, error, fetchAll } = useEventStore()

    useEffect(() => {
        if (fetchAll) {
            fetchAll()
        }
    }, [])

    return <ContentList items={items} />
}

export default AdminEvents
