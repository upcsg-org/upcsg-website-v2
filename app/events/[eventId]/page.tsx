'use client'

import React, { useEffect } from 'react'
import ArticleTemplate from '@/components/generics/ArticleTemplate'
import NotFound from '@/components/generics/NotFound'
import { useEventStore } from '@/store/event'

interface PropsInterface {
    params: {
        eventId: string
    }
}

const IndividualEventPage: React.FC<PropsInterface> = ({ params }) => {
    const { item, loading, error, fetchOne } = useEventStore()
    const eventId = parseInt(params.eventId, 10)

    useEffect(() => {
        if (!isNaN(eventId)) {
            fetchOne?.(eventId)
        }
    }, [eventId, fetchOne])

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
        return <div className="p-4">Loading...</div>
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
