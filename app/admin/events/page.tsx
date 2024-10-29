import ContentList from '@/components/admin/ContentList'
import { articles } from '@/constants/admin/articles'
import React from 'react'

const AdminEvents = () => {
    return <ContentList articles={articles} />
}

export default AdminEvents
