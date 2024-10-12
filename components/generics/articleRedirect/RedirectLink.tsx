import React, { useState } from 'react'

interface LinkForm {
    url: string
}

export const RedirectLink: React.FC = () => {
    const [formData, setFormData] = useState<LinkForm>({
        url: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Form Submitted:', formData)
    }

    return (
        <form onSubmit={handleSubmit} className=" tracking-wider">
            <div className="space-y-1">
                <label
                    htmlFor="url"
                    className="font-semibold text-base md:text-lg lg:text-xl "
                >
                    Link URL
                </label>
                <input
                    type="url"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    className="bg-secondary-dark w-full px-6 py-2 border rounded-lg placeholder:text-xs "
                    placeholder="Input your URL here."
                />
            </div>
        </form>
    )
}
