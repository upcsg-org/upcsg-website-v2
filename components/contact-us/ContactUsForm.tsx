'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { FaUser, FaCheckCircle } from 'react-icons/fa'
import { MdEmail, MdClose } from 'react-icons/md'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import TheButton from '../generics/TheButton'

import { useConcernStore } from '@/store/help'
import { useAuthStore } from '@/store/auth'
import { Concern } from '@/interface/help'
interface PropsInterface {
    setIsContactUsModalOpen: Dispatch<SetStateAction<boolean>>
}

const ContactUsForm = (props: PropsInterface) => {
    const { isAuthenticated, user } = useAuthStore()
    const { create: createConcern } = useConcernStore()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<Concern>({
        name: '',
        email: '',
        content: '',
        user: null,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        let submissionData = { ...formData }

        if (isAuthenticated && user?.id) {
            submissionData = {
                ...submissionData,
                user: user?.id,
            }
        }

        if (createConcern) {
            try {
                await createConcern(submissionData)
                setShowConfirmation(true)
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    content: '',
                    user: null,
                })
            } catch (error) {
                console.error('Error submitting concern:', error)
            } finally {
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
        }
    }

    const handleCloseConfirmation = () => {
        setShowConfirmation(false)
        props.setIsContactUsModalOpen(false)
    }

    return (
        <>
            <div className="flex justify-center mx-3 p-8">
                <div className="flex flex-col w-full md:w-10/12 max-w-[1200px] gap-4">
                    <h1 className="font-vietnam font-bold text-3xl md:text-5xl">
                        GOT ANY SUGGESTIONS?
                    </h1>
                    <p className="font-vietnam font-light text-sm md:text-2xl md:leading-8 max-w-[38ch]">
                        Shoot us your suggestions and concerns to help us create
                        better learning experiences for you! We&apos;ll get back
                        to them as soon as we can.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-1 p-3 gap-5 rounded-lg border-2 border-white bg-secondary-dark">
                                <label htmlFor="name">
                                    <FaUser size={25} color="white" />
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="bg-transparent outline-none text-white caret-white w-full"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="flex flex-1 p-3 gap-5 rounded-lg border-2 border-white bg-secondary-dark">
                                <label htmlFor="email">
                                    <MdEmail size={25} color="white" />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-transparent outline-none text-white caret-white w-full"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <textarea
                            className="w-full h-32 md:h-64 px-4 py-3 rounded-lg border-2 border-white bg-secondary-dark outline-none text-white caret-white resize-none"
                            id="content"
                            name="content"
                            placeholder="Write your suggestion here..."
                            value={formData.content}
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-fit self-center md:self-end px-6 py-3 rounded-lg font-vietnam font-semibold transition-all duration-200 ${
                                isLoading
                                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary-dark text-white hover:scale-105'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <AiOutlineLoading3Quarters
                                        size={20}
                                        className="animate-spin"
                                    />
                                    <span>Submitting...</span>
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-secondary-dark rounded-lg p-8 max-w-md w-full mx-4 relative border-2 border-white">
                        <button
                            onClick={handleCloseConfirmation}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                        >
                            <MdClose size={24} />
                        </button>

                        <div className="flex flex-col items-center text-center gap-4">
                            <FaCheckCircle
                                size={64}
                                className="text-green-500"
                            />
                            <h2 className="font-vietnam font-bold text-2xl text-white">
                                Thank You!
                            </h2>
                            <p className="font-vietnam text-white text-lg">
                                Your suggestion has been submitted successfully.
                                We&apos;ll review it and get back to you soon!
                            </p>
                            <TheButton
                                style="mt-4"
                                onClick={handleCloseConfirmation}
                            >
                                Close
                            </TheButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ContactUsForm
