'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CreateEventMenu from '@/components/admin/cms/EventCMSMenu'
import CreateEventForm from '@/components/admin/create/content/CreateEventForm'
import { CreateAnnouncementForm } from '@/components/admin/create/content/CreateAnnouncementForm'
import { CreateScholarshipForm } from '@/components/admin/create/content/CreateScholarshipForm'
import { CreateInternshipForm } from '@/components/admin/create/content/CreateInternshipForm'
import { CreateArticleLink } from '@/components/admin/create/content/article/createArticleLink'
import ContentPreview from '@/components/admin/preview/ContentPreview'
import useFormHandler from '@/hooks/FormHooks'
import { FaArrowRight } from 'react-icons/fa'
import TheButton from '@/components/generics/TheButton'

const AdminCreateContent = () => {
    const searchParams = useSearchParams()
    const [contentType, setContentType] = useState('event') // Default to event
    const [currentStep, setCurrentStep] = useState(1)

    // Set content type from URL parameter on initial load
    useEffect(() => {
        const typeParam = searchParams.get('type')
        if (
            typeParam &&
            ['event', 'announcement', 'scholarship', 'internship'].includes(
                typeParam
            )
        ) {
            setContentType(typeParam)
        }
    }, [searchParams])

    // Function to move to next step
    const goToNextStep = () => {
        setCurrentStep(2)
    }

    // Function to go back to previous step
    const goToPreviousStep = () => {
        setCurrentStep(1)
    }

    // Handle step change
    const handleStepChange = (step: number) => {
        setCurrentStep(step)
    }

    // Event form data
    const eventInitialValues = {
        title: '',
        start_date: '',
        end_date: '',
        external_url: '',
        image_url: null,
        body: '',
        location: '',
        article: null,
    }
    const eventForm = useFormHandler(eventInitialValues)

    // Announcement form data
    const announcementInitialValues = {
        title: '',
        summary: '',
        image_url: null,
        external_url: '',
        article: null,
    }
    const announcementForm = useFormHandler(announcementInitialValues)

    // Scholarship form data
    const scholarshipInitialValues = {
        title: '',
        opening_date: '',
        deadline: '',
        requirements: '',
        benefits: '',
        organization: '',
        image_url: null,
        external_url: '',
        article: null,
    }
    const scholarshipForm = useFormHandler(scholarshipInitialValues)

    // Internship form data
    const internshipInitialValues = {
        title: '',
        opening_date: '',
        deadline: '',
        requirements: '',
        benefits: '',
        organization: '',
        image_url: null,
        external_url: '',
        article: null,
    }
    const internshipForm = useFormHandler(internshipInitialValues)

    // Handle content type change from dropdown
    const handleContentTypeChange = (type: string) => {
        setContentType(type)
    }

    // Get current form data based on content type
    const getCurrentFormData = () => {
        switch (contentType) {
            case 'event':
                return eventForm.formData
            case 'announcement':
                return announcementForm.formData
            case 'scholarship':
                return scholarshipForm.formData
            case 'internship':
                return internshipForm.formData
            default:
                return eventForm.formData
        }
    }

    return (
        <div className="ml-[-25px] md:ml-0">
            <CreateEventMenu
                contentType={contentType}
                onContentTypeChange={handleContentTypeChange}
                currentStep={currentStep}
                onStepChange={handleStepChange}
            />
            <section className="py-12 px-12 sm:px-14 lg:px-28">
                {currentStep === 1 && (
                    <>
                        {contentType === 'event' && (
                            <CreateEventForm
                                formData={eventForm.formData}
                                handleChange={eventForm.handleChange}
                                handleImageChange={eventForm.handleImageChange}
                                goToNextStep={goToNextStep}
                            />
                        )}

                        {contentType === 'announcement' && (
                            <CreateAnnouncementForm
                                formData={announcementForm.formData}
                                handleChange={announcementForm.handleChange}
                                handleImageChange={
                                    announcementForm.handleImageChange
                                }
                                goToNextStep={goToNextStep}
                            />
                        )}

                        {contentType === 'scholarship' && (
                            <CreateScholarshipForm
                                formData={scholarshipForm.formData}
                                handleChange={scholarshipForm.handleChange}
                                handleImageChange={
                                    scholarshipForm.handleImageChange
                                }
                                goToNextStep={goToNextStep}
                            />
                        )}

                        {contentType === 'internship' && (
                            <CreateInternshipForm
                                formData={internshipForm.formData}
                                handleChange={internshipForm.handleChange}
                                handleImageChange={
                                    internshipForm.handleImageChange
                                }
                                goToNextStep={goToNextStep}
                            />
                        )}

                        {/* Redirect Setting Component */}
                        <div className="mt-12 mb-12">
                            <h2 className="text-md font-bold mb-6">
                                {contentType.charAt(0).toUpperCase() +
                                    contentType.slice(1)}{' '}
                                Redirect Setting
                            </h2>
                            <CreateArticleLink
                                contentType={
                                    contentType as
                                        | 'event'
                                        | 'announcement'
                                        | 'scholarship'
                                        | 'internship'
                                }
                                initialExternalUrl={
                                    getCurrentFormData().external_url || ''
                                }
                                onExternalUrlChange={(url) => {
                                    // Update the form data with external URL
                                    let formHandler
                                    switch (contentType) {
                                        case 'event':
                                            formHandler = eventForm
                                            break
                                        case 'announcement':
                                            formHandler = announcementForm
                                            break
                                        case 'scholarship':
                                            formHandler = scholarshipForm
                                            break
                                        case 'internship':
                                            formHandler = internshipForm
                                            break
                                        default:
                                            formHandler = eventForm
                                    }

                                    // Update the external_url field
                                    formHandler.setFormData({
                                        ...formHandler.formData,
                                        external_url: url,
                                    })
                                }}
                                onArticleChange={(articleData) => {
                                    // Only update if we have valid article data
                                    if (!articleData) {
                                        // If articleData is null, clear the article field
                                        let formHandler
                                        switch (contentType) {
                                            case 'event':
                                                formHandler = eventForm
                                                break
                                            case 'announcement':
                                                formHandler = announcementForm
                                                break
                                            case 'scholarship':
                                                formHandler = scholarshipForm
                                                break
                                            case 'internship':
                                                formHandler = internshipForm
                                                break
                                            default:
                                                formHandler = eventForm
                                        }

                                        // Set article to null
                                        formHandler.setFormData({
                                            ...formHandler.formData,
                                            article: null,
                                        })
                                        return
                                    }

                                    // Extract only the fields needed for the backend Article model
                                    const articleDataForBackend = {
                                        title: articleData.title,
                                        body: articleData.body,
                                        author: articleData.author,
                                    }

                                    // Update the form data with article information
                                    let formHandler
                                    switch (contentType) {
                                        case 'event':
                                            formHandler = eventForm
                                            break
                                        case 'announcement':
                                            formHandler = announcementForm
                                            break
                                        case 'scholarship':
                                            formHandler = scholarshipForm
                                            break
                                        case 'internship':
                                            formHandler = internshipForm
                                            break
                                        default:
                                            formHandler = eventForm
                                    }

                                    // Manually update the article field
                                    formHandler.setFormData({
                                        ...formHandler.formData,
                                        article: articleDataForBackend,
                                    })
                                }}
                            />
                        </div>

                        {/* Next Button */}
                        <div className="flex justify-end mt-4">
                            <TheButton
                                style={
                                    'w-auto bg-green-600 hover:bg-green-700 rounded-lg py-3 px-5'
                                }
                                onClick={goToNextStep}
                            >
                                <div className="flex items-center">
                                    <h1 className="mr-2">NEXT</h1>
                                    <FaArrowRight />
                                </div>
                            </TheButton>
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <ContentPreview
                        contentType={contentType}
                        formData={getCurrentFormData()}
                        goToPreviousStep={goToPreviousStep}
                    />
                )}
            </section>
        </div>
    )
}

export default AdminCreateContent
