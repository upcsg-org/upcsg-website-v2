import React from 'react'
import { ArticleImage } from '@/components/generics/ArticleImage'
import { ArticleBody } from '@/components/generics/ArticleBody'
import EventSection from '@/components/events/EventSection'
import { Article } from '@/interface/article'

interface PropsInterface {
    article: Article
}

const ArticleTemplate = (props: PropsInterface) => {
    const { article } = props
    const { title, date, body, author, image } = article

    return (
        <>
            <section className="h-[calc(100vh-3rem)]">
                <ArticleImage title={title} date={date} image={image} />
            </section>
            <section>
                <ArticleBody content={body} author={author} />
            </section>
            <section className="mt-8">
                <EventSection />
            </section>
        </>
    )
}

export default ArticleTemplate
