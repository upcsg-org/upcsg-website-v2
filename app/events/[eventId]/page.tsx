import React from 'react'
import ArticleTemplate from '@/components/generics/ArticleTemplate'
import { events } from '@/constants/events'
import { Event } from '@/interface/event'
import NotFound from '@/components/generics/NotFound'

interface PropsInterface {
    params: {
        eventId: string
    }
}

const IndividualEventPage: React.FC<PropsInterface> = (props) => {
    const { params } = props

    const event: Event | undefined = events.find(
        (event) => event.id === parseInt(params.eventId, 10)
    )

    return event ? (
        <ArticleTemplate article={event.article} />
    ) : (
        <section className="h-[calc(100vh-6rem)]">
            <NotFound>Article Does Not Exist</NotFound>
        </section>
    )
}

export default IndividualEventPage
