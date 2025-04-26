'use client'
import React from 'react'
import Image from 'next/image'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'
import { useCreateUpdateDeleteEventStore } from '@/store/event'
import { useCreateUpdateDeleteAnnouncementStore } from '@/store/announcement'
import { useCreateUpdateDeleteScholarshipStore } from '@/store/scholarship'
import { useCreateUpdateDeleteInternshipStore } from '@/store/internship'
import { useRouter } from 'next/navigation'
interface ContentPreviewProps {
    contentType: string
    formData: any
    goToPreviousStep: () => void
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
    contentType,
    formData,
    goToPreviousStep,
}) => {
    const router = useRouter()

    const { create: createEvent } = useCreateUpdateDeleteEventStore()
    const { create: createAnnouncement } =
        useCreateUpdateDeleteAnnouncementStore()
    const { create: createScholarship } =
        useCreateUpdateDeleteScholarshipStore()
    const { create: createInternship } = useCreateUpdateDeleteInternshipStore()

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

    const publishContent = () => {
        // Prepare data based on content type
        const prepareData = () => {
            let data = { ...formData }

            // Handle image upload if it's a File object
            if (formData.image_url && typeof formData.image_url === 'object') {
                // In a real implementation, you would upload the image here
                // and set the URL from the response
                console.log('Image needs to be uploaded to get a URL')
                // For now, we'll just note that this would happen
                data.image_url = 'URL would be set after upload'
            }

            // Handle article data formatting for backend
            if (formData.article) {
                // Extract only the fields needed for the backend Article model
                const articleData = {
                    title: formData.article.title,
                    body: formData.article.body,
                    author: formData.article.author,
                }

                console.log('Article data to be created:', articleData)

                // In a real implementation, you would:
                // 1. Create the article first with a POST request
                // 2. Get the article ID from the response
                // 3. Set the article field to the returned ID

                // For demonstration, we'll just keep the reference for now
                data.article = articleData
            }

            return data
        }

        const data = prepareData()
        console.log(`Publishing ${contentType}:`, data)

        if (contentType === 'event' && createEvent) {
            createEvent(data)
        } else if (contentType === 'announcement' && createAnnouncement) {
            createAnnouncement(data)
        } else if (contentType === 'scholarship' && createScholarship) {
            createScholarship(data)
        } else if (contentType === 'internship' && createInternship) {
            createInternship(data)
        }

        router.push(`/admin/${contentType}`)
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
                    style={'w-auto bg-green-600 hover:bg-green-700'}
                    onClick={publishContent}
                >
                    <div className="flex items-center">
                        <h1>PUBLISH</h1>
                    </div>
                </TheButton>
            </div>
        </>
    )
}

export default ContentPreview
