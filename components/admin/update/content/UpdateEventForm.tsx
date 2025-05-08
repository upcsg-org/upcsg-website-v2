import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { FaImage } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import { useEventStore } from '@/store/event'
import Image from 'next/image'

interface Article {
    title: string
    date_created: string
    date_updated: string
    body: string
    author?: string | null
}

interface UpdateEventFormProps {
    formData: {
        title: string
        start_date: string
        end_date: string
        external_url: string
        body: string
        image_url: File | string | null
        location: string
        article: Article
    }

    handleChange: (e: any) => void
    handleImageChange: (e: any) => void
    goToNextStep: () => void
    setFormData: React.Dispatch<React.SetStateAction<any>>
}

const UpdateEventForm = ({
    formData,
    handleChange,
    handleImageChange,
    goToNextStep,
    setFormData,
}: UpdateEventFormProps) => {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)

    const imageInputRef = useRef<HTMLInputElement>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const handleImageUpload = (): void => {
        imageInputRef.current?.click()
    }

    const { fetchOne, item } = useEventStore()
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
            start_date: item.start_date || '',
            end_date: item.end_date || '',
            external_url: item.external_url || null,
            image_url: item.image_url || null,
            body: item.body || '',
            location: item.location || '',
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
            {/* Event Title */}
            <div className="mb-6">
                <label className="mb-1 font-semibold">Event Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter event title"
                    className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                />
            </div>

            {/* Event Duration */}
            <div className="mb-6 flex flex-col lg:flex-row lg:space-x-3">
                <div className="flex-1 mb-4 lg:mb-0">
                    <label className="mb-1 font-semibold">Start Date</label>
                    <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                    />
                </div>
                <div className="flex-1">
                    <label className="mb-1 font-semibold">End Date</label>
                    <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                    />
                </div>
            </div>

            {/* Event Location */}
            <div className="mb-6">
                <label className="mb-1 font-semibold">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter event location"
                    className="w-full p-3 border rounded-xl bg-secondary-dark mt-2"
                />
            </div>

            {/* Event Body */}
            <div className="mb-6">
                <label className="mb-1 font-semibold">Description</label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Enter event description"
                    className="w-full p-3 border rounded-xl resize-none bg-secondary-dark mt-2"
                    rows={6}
                />
            </div>

            {/* Event Image */}
            <div className="w-full my-6 inline-flex flex-col">
                <label className="mb-1 font-semibold">Event Image</label>
                <div className="w-full flex-col md:flex-row items-center break-words mt-2">
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

export default UpdateEventForm
