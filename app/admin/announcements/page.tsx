import ContentList from '@/components/admin/ContentList'
import { articles } from '@/constants/admin/articles'
import React from 'react'

const AdminAnnouncements = () => {
    return <ContentList articles={articles} />
}

export default AdminAnnouncements
