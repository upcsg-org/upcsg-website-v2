import ContentList from '@/components/admin/ContentList'
import { articles } from '@/constants/admin/articles'
import React from 'react'

const AdminScholarships = () => {
    return <ContentList articles={articles} />
}

export default AdminScholarships
