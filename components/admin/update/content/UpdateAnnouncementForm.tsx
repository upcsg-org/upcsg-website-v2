import React, { useState, useEffect, useRef } from 'react'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import { useSearchParams } from 'next/navigation'
import { useAnnouncementStore } from '@/store/announcement'
import Image from 'next/image'

interface UpdateAnnouncementFormProps {
    formData: {
        title: string
        summary: string
        image_url: File | string | null
    }
    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

export const UpdateAnnouncementForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
    setFormData,
}: UpdateAnnouncementFormProps) => {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)

    const imageInputRef = useRef<HTMLInputElement>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    const { fetchOne, item } = useAnnouncementStore()
    useEffect(() => {
        const id = searchParams.get('id')
        if (id && fetchOne) {
            fetchOne(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, fetchOne])

    useEffect(() => {
        if (!item) return

        setFormData({
            title: item.title || '',
            summary: item.summary || '',
            external_url: item.external_url || null,
            image_url: item.image_url || null,
            article: item.article || null,
        })

        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item])

    useEffect(() => {
        if (formData.image_url) {
            if (typeof formData.image_url === 'string') {
                // If image_url is a string, it's an existing URL
                setImagePreview(formData.image_url)
            } else if (formData.image_url instanceof File) {
                // If image_url is a File, create a preview URL
                const objectUrl = URL.createObjectURL(formData.image_url)
                setImagePreview(objectUrl)

                // Clean up the URL when component unmounts or image changes
                return () => URL.revokeObjectURL(objectUrl)
            }
        } else {
            setImagePreview(null)
        }
    }, [formData.image_url])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            {/* Announcement Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Announcement Title Update
                </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Input your title here."
                    className="w-full border rounded-xl bg-secondary-dark p-3 mt-2"
                />
            </div>

            {/* Announcement Summary */}
            <div className="mb-6">
                <label className="mb-1 font-semibold tracking-wide">
                    Announcement Summary
                </label>
                <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    placeholder="Input your summary here."
                    className="w-full border rounded-xl resize-none bg-secondary-dark p-3 mt-2"
                    rows={8}
                />
            </div>

            {/* Announcement Image */}
            <div className="my-6 inline-flex flex-col">
                <label className="mb-1 font-semibold">Announcement Image</label>
                <div className="flex items-center">
                    <TheButton style={'w-auto'} onClick={handleImageUpload}>
                        <div className="flex items-center">
                            <h1 className="mr-6">UPLOAD IMAGE</h1>
                            <FaImage />
                        </div>
                    </TheButton>
                    <input
                        type="file"
                        ref={imageInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {formData.image_url instanceof File && (
                        <p className="ml-5 sm:self-start">
                            {formData.image_url.name}
                        </p>
                    )}
                </div>
            </div>

            {/* Image Preview */}
            {imagePreview && (
                <div className="mt-4">
                    <p className="text-sm mb-2">Image Preview:</p>
                    <div
                        className="w-full max-w-md overflow-hidden rounded-lg border border-gray-300 relative"
                        style={{ height: '250px' }}
                    >
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    )
}
