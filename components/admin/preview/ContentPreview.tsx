'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import NotificationModal from '@/components/generics/NotificationModal'
import { useCreateUpdateDeleteEventStore } from '@/store/event'
import { useCreateUpdateDeleteAnnouncementStore } from '@/store/announcement'
import { useCreateUpdateDeleteScholarshipStore } from '@/store/scholarship'
import { useCreateUpdateDeleteInternshipStore } from '@/store/internship'
import { useRouter, usePathname } from 'next/navigation'
import Loader from '@/components/ui/Loader'

interface ContentPreviewProps {
    contentType: string
    formData: any
    goToPreviousStep: () => void
    redirectSetting: string
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
    contentType,
    formData,
    goToPreviousStep,
    redirectSetting,
}) => {
    const router = useRouter()
    const pathname = usePathname()
    const isUpdateMode = pathname.includes('/admin/update')
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [isUploading, setIsUploading] = useState(false)
    const [notification, setNotification] = useState<{
        isOpen: boolean
        type: 'success' | 'error' | 'warning' | 'info'
        title: string
        message: string
    }>({
        isOpen: false,
        type: 'info',
        title: '',
        message: '',
    })

    const { create: createEvent, update: updateEvent } =
        useCreateUpdateDeleteEventStore()
    const { create: createAnnouncement, update: updateAnnouncement } =
        useCreateUpdateDeleteAnnouncementStore()
    const { create: createScholarship, update: updateScholarship } =
        useCreateUpdateDeleteScholarshipStore()
    const { create: createInternship, update: updateInternship } =
        useCreateUpdateDeleteInternshipStore()

    const showNotification = (
        type: 'success' | 'error' | 'warning' | 'info',
        title: string,
        message: string
    ) => {
        setNotification({
            isOpen: true,
            type,
            title,
            message,
        })
    }

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, isOpen: false }))
    }

    const getTitle = () => {
        switch (contentType) {
            case 'event':
            case 'announcement':
            case 'scholarship':
            case 'internship':
                return formData.title || 'Title'
            default:
                return 'Content Title'
        }
    }

    const getDate = () => {
        if (contentType === 'event') {
            return formData.start_date || 'Start Date'
        } else if (contentType === 'announcement') {
            return new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
        } else {
            // For scholarship and internship
            const openingDate = formData.opening_date
                ? new Date(formData.opening_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                  })
                : 'Opening Date'
            return openingDate
        }
    }

    const getContentType = () => {
        return contentType.toUpperCase()
    }

    const getDescription = () => {
        switch (contentType) {
            case 'announcement':
                return formData.summary || 'Announcement summary goes here...'
            case 'scholarship':
            case 'internship':
                return formData.requirements || 'Requirements go here...'
            case 'event':
                return formData.body || 'Event details go here...'
            default:
                return 'Content description goes here...'
        }
    }

    const getImageSrc = () => {
        if (formData.image_url) {
            return typeof formData.image_url === 'object'
                ? URL.createObjectURL(formData.image_url)
                : formData.image_url
        }
        return '/images/placeholder-standard.svg'
    }

    const uploadImageToCloudinary = async (file: File): Promise<string> => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append(
                'upload_preset',
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                    'upcsg_preset'
            )

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            )

            if (!response.ok) {
                throw new Error('Failed to upload image')
            }

            const data = await response.json()
            return data.secure_url
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    const publishContent = async () => {
        setIsUploading(true)

        try {
            // Prepare data based on content type
            let data = { ...formData }

            // Handle image upload if it's a File object
            if (formData.image_url && typeof formData.image_url === 'object') {
                const imageUrl = await uploadImageToCloudinary(
                    formData.image_url
                )
                data.image_url = imageUrl
            }

            // Set external_url and article based on redirectSetting
            switch (redirectSetting) {
                case 'none':
                    data.external_url = null
                    data.article = null
                    break
                case 'link':
                    data.article = null
                    break
                case 'article':
                    data.external_url = null
                    data.article = {
                        title: formData.article?.title || '',
                        body: formData.article?.body || '',
                        author: formData.article?.author || '',
                    }
                    break
                default:
                    // Fallback in case of unexpected value
                    data.external_url = null
                    data.article = null
            }

            console.log(`Publishing ${contentType}:`, data)

            if (contentType === 'event' && createEvent && updateEvent) {
                if (isUpdateMode) {
                    if (!id) {
                        console.error('No ID provided for update.')
                        showNotification(
                            'error',
                            'Update Failed',
                            'Missing ID. Cannot update the content.'
                        )
                        return
                    }
                    await updateEvent(id, data)
                } else {
                    await createEvent(data)
                }
            } else if (
                contentType === 'announcement' &&
                createAnnouncement &&
                updateEvent
            ) {
                if (isUpdateMode) {
                    if (!id) {
                        console.error('No ID provided for update.')
                        showNotification(
                            'error',
                            'Update Failed',
                            'Missing ID. Cannot update the content.'
                        )
                        return
                    }
                    if (!updateAnnouncement) {
                        console.error('updateAnnouncement is undefined.')
                        showNotification(
                            'error',
                            'Update Failed',
                            'Update function is not available.'
                        )
                        return
                    }
                    await updateAnnouncement(id, data)
                } else {
                    if (!createAnnouncement) {
                        console.error('createAnnouncement is undefined.')
                        showNotification(
                            'error',
                            'Create Failed',
                            'Create function is not available.'
                        )
                        return
                    }
                    await createAnnouncement(data)
                }
            } else if (
                contentType === 'scholarship' &&
                createScholarship &&
                updateScholarship
            ) {
                if (isUpdateMode) {
                    if (!id) {
                        console.error('No ID provided for update.')
                        showNotification(
                            'error',
                            'Update Failed',
                            'Missing ID. Cannot update the content.'
                        )
                        return
                    }
                    await updateScholarship(id, data)
                } else {
                    await createScholarship(data)
                }
            } else if (
                contentType === 'internship' &&
                createInternship &&
                updateInternship
            ) {
                if (isUpdateMode) {
                    if (!id) {
                        console.error('No ID provided for update.')
                        showNotification(
                            'error',
                            'Update Failed',
                            'Missing ID. Cannot update the content.'
                        )
                        return
                    }
                    await updateInternship(id, data)
                } else {
                    await createInternship(data)
                }
            }

            router.push(`/admin/${contentType}`)
        } catch (error) {
            console.error('Error publishing content:', error)
            showNotification(
                'error',
                'Publish Failed',
                'Failed to publish content. Please try again.'
            )
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Article Card</h1>
            <div className="w-full max-w-sm bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-12 mx-auto">
                <div className="relative w-full h-60">
                    <Image
                        className="object-cover"
                        src={getImageSrc()}
                        alt={getTitle()}
                        fill
                        sizes="(max-width: 768px) 100vw, 384px"
                    />
                </div>
                <div className="p-4">
                    <span className="text-sm text-blue-400 font-bold">
                        {getContentType()}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{getTitle()}</h3>
                    <p className="text-gray-300 text-sm mt-2">
                        {getDescription()}
                    </p>
                    <p className="text-gray-400 text-sm mt-4">{getDate()}</p>
                </div>
            </div>

            {formData.article && (
                <>
                    <h1 className="text-2xl font-bold mb-6">Article Page</h1>
                    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-12">
                        <div className="w-full h-96 bg-gray-800 relative">
                            <Image
                                className="object-cover"
                                src={getImageSrc()}
                                alt={getTitle()}
                                fill
                                sizes="(max-width: 768px) 100vw, 1024px"
                            />
                        </div>

                        <div className="p-8">
                            <h1 className="text-4xl font-bold mb-6">
                                {formData.article.title}
                            </h1>
                            <p className="text-lg text-gray-300 mb-6">
                                {new Date().toLocaleDateString()}
                            </p>
                            <p className="text-lg text-gray-300 mb-6">
                                by{' '}
                                <span className="font-bold">
                                    {formData.article.author}
                                </span>{' '}
                            </p>

                            <div className="prose text-gray-300 max-w-none mb-12">
                                {formData.article.body}
                            </div>
                        </div>
                    </div>
                </>
            )}

            <h1 className="text-2xl font-bold mb-6">
                Article Admin Dashboard Preview
            </h1>
            <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg p-4 mb-12 flex items-center">
                <div className="relative w-48 h-36 rounded overflow-hidden flex-shrink-0">
                    <Image
                        className="object-cover"
                        src={getImageSrc()}
                        alt={getTitle()}
                        fill
                        sizes="(max-width: 768px) 100vw, 192px"
                    />
                </div>
                <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold"> {formData.title} </h3>
                    <p className="text-sm text-gray-400">
                        {contentType === 'announcement' ? (
                            <p>{new Date().toLocaleDateString()}</p>
                        ) : contentType === 'event' ? (
                            <p>
                                {formData.start_date} to {formData.end_date}
                            </p>
                        ) : contentType === 'scholarship' ||
                          contentType === 'internship' ? (
                            <p>
                                {formData.opening_date} to {formData.deadline}
                            </p>
                        ) : (
                            ''
                        )}
                    </p>
                    <p className="text-sm text-gray-300 mt-1 truncate">
                        {contentType === 'announcement' ? (
                            formData.summary
                        ) : contentType === 'event' ? (
                            formData.body
                        ) : contentType === 'scholarship' ||
                          contentType === 'internship' ? (
                            <p>
                                {formData.requirements}
                                <br></br>
                                {formData.benefits}
                            </p>
                        ) : (
                            formData.body
                        )}
                    </p>
                </div>
                <div className="flex-shrink-0 ml-4">
                    <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                        <FaEdit className="text-white" />
                    </button>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <TheButton style={'w-auto'} onClick={goToPreviousStep}>
                    <div className="flex items-center">
                        <FaArrowLeft className="mr-2" />
                        <h1>PREVIOUS</h1>
                    </div>
                </TheButton>

                <TheButton
                    style={`w-auto bg-green-600 hover:bg-green-700 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={isUploading ? () => {} : publishContent}
                >
                    <div className="flex items-center">
                        <h1>
                            {isUploading ? (
                                <Loader
                                    size="sm"
                                    text="UPLOADING..."
                                    showText={true}
                                    className="text-white"
                                />
                            ) : isUpdateMode ? (
                                'UPDATE'
                            ) : (
                                'PUBLISH'
                            )}
                        </h1>
                    </div>
                </TheButton>
            </div>

            <NotificationModal
                isOpen={notification.isOpen}
                onClose={closeNotification}
                type={notification.type}
                title={notification.title}
                message={notification.message}
            />
        </>
    )
}

export default ContentPreview
