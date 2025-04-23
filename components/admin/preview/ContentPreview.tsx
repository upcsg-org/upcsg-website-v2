'use client'
import React from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'

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
    const getTitle = () => {
        switch (contentType) {
            case 'event':
                return formData.eventTitle || 'Event Title'
            case 'announcement':
                return formData.announcementTitle || 'Announcement Title'
            case 'scholarship':
                return formData.scholarshipTitle || 'Scholarship Title'
            case 'internship':
                return formData.internshipTitle || 'Internship Title'
            default:
                return 'Content Title'
        }
    }

    const getDate = () => {
        if (contentType === 'event') {
            const day = formData.eventDay || 'Day'
            const month = formData.eventMonth || 'Month'
            const year = formData.eventYear || 'Year'
            return `${month} ${day}, ${year}`
        } else if (contentType === 'announcement') {
            return new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            })
        } else {
            // For scholarship and internship
            const openingDate = formData.applicationOpeningDate
                ? new Date(formData.applicationOpeningDate).toLocaleDateString(
                      'en-US',
                      {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                      }
                  )
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
                return (
                    formData.announcementSummary ||
                    'Announcement summary goes here...'
                )
            case 'scholarship':
            case 'internship':
                return (
                    formData.requirementsSummary ||
                    'Requirements summary goes here...'
                )
            case 'event':
                return `${formData.eventLocation || 'Event Location'} at ${
                    formData.startTime || 'Start Time'
                } - ${formData.endTime || 'End Time'}`
            default:
                return 'Content description goes here...'
        }
    }

    const getImageSrc = () => {
        if (formData.image) {
            return URL.createObjectURL(formData.image)
        }
        return '/placeholder-image.jpg' // Fallback image
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Article Card</h1>
            <div className="w-full max-w-sm bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-12">
                <img
                    className="w-full h-40 object-cover"
                    src={getImageSrc()}
                    alt={getTitle()}
                />
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

            <h1 className="text-2xl font-bold mb-6">Article Page</h1>
            <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-12">
                <div className="w-full h-64 bg-gray-800 relative">
                    <img
                        className="w-full h-full object-cover"
                        src={getImageSrc()}
                        alt={getTitle()}
                    />
                </div>

                <div className="p-8">
                    <h1 className="text-4xl font-bold mb-6">{getTitle()}</h1>
                    <p className="text-lg text-gray-300 mb-6">
                        by{' '}
                        <span className="font-bold">
                            &#60;WRITER&apos;S NAME&#62;
                        </span>{' '}
                        upmail@up.edu.ph
                    </p>
                    <p className="text-sm text-gray-400 mb-8">BSCS YRLVL - A</p>

                    <div className="prose text-gray-300 max-w-none mb-12">
                        <p>
                            Nulla eleifend lacus ac elit accumsan molestia. Orci
                            varius natoque penatibus et magnis dis parturient
                            montes, nascetur ridiculus mus. Vivamus volutpat id
                            ipsum eget commodo. In porta in nunc quis sagittis.
                            Morbi nec tellus labortis, vehicula tellus eu,
                            faucibus est. Sed ac ipirm. Integer semper vulputate
                            turpis eget tincidunt. Nam maximus eget ligula
                            feugiat.
                        </p>
                        <p className="mt-4">
                            In laoreet magna vel odio pulvinar viverra. Morbi
                            elementum quam vel leo mattis, a consectetur quam
                            rhoncus. Etiam ultricies porttitor dolor, ac
                            tincidunt erat fringilla at. Pellentesque erat
                            lectus, sollicitudin et neque eget, pulvinar porta
                            tellus. Donec faucibus quis tellus sit amet
                            placerat.
                        </p>
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-6">
                Article Admin Dashboard Preview
            </h1>
            <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg p-4 mb-12 flex items-center">
                <img
                    className="w-32 h-24 object-cover rounded"
                    src={getImageSrc()}
                    alt={getTitle()}
                />
                <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold">{getTitle()}</h3>
                    <p className="text-sm text-gray-400">
                        {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-300 mt-1 truncate">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam...
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
                    onClick={() => console.log('Published')}
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
