import React from 'react'
import { ArticleImage } from '@/components/generics/ArticleImage'
import { ArticleBody } from '@/components/generics/ArticleBody'
import EventSection from '@/components/events/EventSection'
import { Article } from '@/interface/article'

interface PropsInterface {
    article: Article
    image: string
}

const ArticleTemplate = (props: PropsInterface) => {
    const { article, image } = props
    const { title, date_updated, body, author } = article

    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <ArticleImage title={title} date={date_updated} image={image} />
            </section>
            <section>
                <ArticleBody content={body} author={author} />
            </section>
            <section className="mt-16 mb-24">
                <EventSection />
            </section>
        </>
    )
}

export default ArticleTemplate
