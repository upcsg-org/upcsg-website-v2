import { Author } from '@/interface/article'
import React from 'react'

interface PropsInterface {
    content: string
    author: Author
}

export const ArticleBody = (props: PropsInterface) => {
    const { content, author } = props
    const { name, email = '', jobTitle = '' } = author
    return (
        <div className="w-full flex justify-center mt-8 md:mt-12">
            <div className="gap-4 md:gap-8 w-[85%] flex flex-col text-justify text-xs md:text-lg ">
                <p className="whitespace-pre-line">{content}</p>
                <p className="flex flex-col">
                    <span>{name}</span>
                    {email && <span>{email}</span>}
                    {jobTitle && <span>{jobTitle}</span>}
                </p>
            </div>
        </div>
    )
}
