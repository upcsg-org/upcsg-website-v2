import React, { useState, useEffect, useRef } from 'react'

interface LinkForm {
    external_url: string
}

interface RedirectLinkProps {
    onExternalUrlChange?: (url: string) => void
    initialUrl?: string
}

export const RedirectLink: React.FC<RedirectLinkProps> = ({
    onExternalUrlChange,
    initialUrl = '',
}) => {
    // Use ref to prevent update on first render
    const isFirstRender = useRef(true)

    const [formData, setFormData] = useState<LinkForm>({
        external_url: initialUrl,
    })

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            external_url: initialUrl || '',
        }))
    }, [initialUrl])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Call parent handler directly instead of in useEffect
        if (onExternalUrlChange) {
            onExternalUrlChange(value)
        }
    }

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('External URL Submitted:', formData)
    }

    return (
        <form onSubmit={handleSubmit} className="tracking-wider">
            <div className="space-y-1">
                <label
                    htmlFor="external_url"
                    className="font-semibold text-base md:text-lg lg:text-xl"
                >
                    External URL
                </label>
                <input
                    type="url"
                    id="external_url"
                    name="external_url"
                    value={formData.external_url}
                    onChange={handleChange}
                    className="bg-secondary-dark w-full px-6 py-2 border rounded-lg placeholder:text-xs"
                    placeholder="https://example.com"
                />
            </div>
        </form>
    )
}
