'use client'

import React, { useEffect } from 'react'
import ArticleTemplate from '@/components/generics/ArticleTemplate'
import NotFound from '@/components/generics/NotFound'
import { useAnnouncementStore } from '@/store/announcement'
import Loader from '@/components/ui/Loader'

interface PropsInterface {
    params: {
        announcementId: string
    }
}

const IndividualEventPage: React.FC<PropsInterface> = ({ params }) => {
    const { item, loading, error, fetchOne } = useAnnouncementStore()
    const announcementId = parseInt(params.announcementId, 10)

    useEffect(() => {
        if (!isNaN(announcementId)) {
            fetchOne?.(announcementId)
        }
    }, [announcementId, fetchOne])

    useEffect(() => {
        console.log('Item:', item)
    }, [item])

    if (item && item.article)
        return (
            <ArticleTemplate
                article={item.article}
                image={
                    item.image_url
                        ? item.image_url
                        : '/images/placeholder_standard.svg'
                }
            />
        )

    if (loading || !item) {
        return (
            <div className="p-4">
                <Loader
                    size="lg"
                    text="Loading announcement..."
                    className="text-white"
                />
            </div>
        )
    }

    if (error || !item.article) {
        return (
            <section className="h-[calc(100vh-6rem)]">
                <NotFound>Article Does Not Exist</NotFound>
            </section>
        )
    }
}

export default IndividualEventPage
