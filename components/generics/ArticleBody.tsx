import React from 'react'

interface PropsInterface {
    content: string
    author: string
}

export const ArticleBody = (props: PropsInterface) => {
    const { content, author } = props
    return (
        <div className="w-full flex justify-center mt-8 md:mt-12 px-4 sm:px-6 md:px-12">
            <div className="gap-4 md:gap-8 w-[85%] flex flex-col text-justify text-xs md:text-lg ">
                <p className="whitespace-pre-line">{content}</p>
                <p className="flex flex-col">
                    Authored by <span className="font-bold">{author}</span>
                </p>
            </div>
        </div>
    )
}
