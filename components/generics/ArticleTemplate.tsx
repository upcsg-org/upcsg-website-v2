'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ArticleImage } from '@/components/generics/ArticleImage'
import { ArticleBody } from '@/components/generics/ArticleBody'
import EventSection from '@/components/events/EventSection'
import AnnouncementSection from '@/components/landing/AnnouncementSection'
import { Article } from '@/interface/article'

interface PropsInterface {
    article: Article
    image: string
}

const ArticleTemplate = (props: PropsInterface) => {
    const { article, image } = props
    const { title, date_updated, body, author } = article

    const pathname = usePathname()

    const isEventPage = pathname.startsWith('/events')
    const isAnnouncementPage = pathname.startsWith('/announcements')

    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <ArticleImage title={title} date={date_updated} image={image} />
            </section>
            <section>
                <ArticleBody content={body} author={author} />
            </section>
            <section className="mt-16 mb-24">
                {isEventPage && <EventSection />}
                {isAnnouncementPage && <AnnouncementSection />}
            </section>
        </>
    )
}

export default ArticleTemplate
