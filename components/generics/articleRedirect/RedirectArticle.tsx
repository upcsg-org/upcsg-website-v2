import React, { useState } from 'react'
import { BsImage } from 'react-icons/bs'

interface ArticleForm {
    title: string
    content: string
    author: string
    authorSchoolEmail: string
    authorTitle: string
    articleImage: File | null
}

interface RedirectArticleProps {
    contentType?: 'event' | 'announcement' | 'scholarship' | 'internship'
}

export const RedirectArticle: React.FC<RedirectArticleProps> = ({
    contentType = 'event',
}) => {
    const [formData, setFormData] = useState<ArticleForm>({
        title: '',
        content: '',
        author: '',
        authorSchoolEmail: '',
        authorTitle: '',
        articleImage: null,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement

        if (name === 'articleImage' && files && files.length > 0) {
            const file = files[0]
            console.log('Selected image file:', file)
            setFormData({
                ...formData,
                articleImage: file,
            })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('Form Submitted:', formData)
    }

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
                    htmlFor="content"
                    className="font-semibold text-base md:text-lg lg:text-xl"
                >
                    Article Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
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

            <div className="md:flex space-y-5 md:space-y-0 w-full justify-between">
                <div className="md:w-[45%] space-y-1">
                    <label
                        htmlFor="authorSchoolEmail"
                        className="font-semibold text-base md:text-lg lg:text-xl"
                    >
                        Author School - Email
                    </label>
                    <input
                        type="email"
                        id="authorSchoolEmail"
                        name="authorSchoolEmail"
                        value={formData.authorSchoolEmail}
                        onChange={handleChange}
                        className="bg-secondary-dark w-full px-6 py-2 border rounded-lg placeholder:text-xs"
                        placeholder="upmail@up.edu.ph"
                    />
                </div>

                <div className="md:w-[40%] space-y-1">
                    <label
                        htmlFor="authorTitle"
                        className="font-semibold text-base md:text-lg lg:text-xl"
                    >
                        Author Title
                    </label>
                    <input
                        type="text"
                        id="authorTitle"
                        name="authorTitle"
                        value={formData.authorTitle}
                        onChange={handleChange}
                        className="bg-secondary-dark w-full px-6 py-2 border rounded-lg placeholder:text-xs"
                        placeholder="YRLVL - A"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="articleImage"
                    className="font-semibold text-base md:text-lg lg:text-xl"
                >
                    Article Image
                </label>

                <input
                    type="file"
                    id="articleImage"
                    name="articleImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                />

                <label
                    htmlFor="articleImage"
                    className="bg-csg-green-100 text-white font-semibold px-4 py-4 rounded-lg flex items-center justify-around cursor-pointer w-[100%] sm:w-[50%] md:w-[30%] lg:w-[17%]"
                >
                    <span className="uppercase"> Upload Image </span>
                    <BsImage />
                </label>
            </div>
        </form>
    )
}
