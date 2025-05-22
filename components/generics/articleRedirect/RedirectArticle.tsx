import React, { useState, useRef, useEffect } from 'react'

// Updated to match backend Article model and simplified
interface ArticleForm {
    title: string
    body: string
    author: string
}

interface RedirectArticleProps {
    contentType?: 'event' | 'announcement' | 'scholarship' | 'internship'
    onArticleDataChange?: (data: ArticleForm) => void
    initialArticleData?: ArticleForm | null
}

export const RedirectArticle: React.FC<RedirectArticleProps> = ({
    contentType = 'event',
    onArticleDataChange,
    initialArticleData,
}) => {
    // Using ref to track changes and avoid excessive updates
    const initialRender = useRef(true)

    const [formData, setFormData] = useState<ArticleForm>(
        initialArticleData ?? {
            title: '',
            body: '',
            author: '',
        }
    )

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        let updatedData: ArticleForm = {
            ...formData,
            [name]: value,
        }

        setFormData(updatedData)

        // Directly notify parent of change, without using useEffect
        if (onArticleDataChange) {
            onArticleDataChange(updatedData)
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Form Submitted:', formData)
    }

    useEffect(() => {
        if (initialArticleData) {
            const { title, body, author } = initialArticleData
            setFormData({ title, body, author })
        }
    }, [initialArticleData])

    return (
        <form onSubmit={handleSubmit} className="space-y-5 tracking-wider">
            <div className="space-y-1">
                <label
                    htmlFor="title"
                    className="font-semibold text-base md:text-lg lg:text-xl "
                >
                    Article Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-secondary-dark w-full px-6 py-2 border rounded-lg placeholder:text-xs"
                    placeholder="Input your title here."
                />
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="body"
                    className="font-semibold text-base md:text-lg lg:text-xl"
                >
                    Article Content
                </label>
                <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    className="bg-secondary-dark w-full rounded-lg border px-6 py-3 placeholder:text-xs resize-none"
                    placeholder="Input your content here."
                    rows={12}
                />
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="author"
                    className="font-semibold text-base md:text-lg lg:text-xl"
                >
                    Article Author
                </label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="bg-secondary-dark w-full px-6 py-2 border rounded-lg placeholder:text-xs"
                    placeholder="Writer's Name"
                />
            </div>
        </form>
    )
}
