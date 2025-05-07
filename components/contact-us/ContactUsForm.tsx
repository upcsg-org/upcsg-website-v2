'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isAuthenticated && user?.id) {
            setFormData({
                ...formData,
                user: user?.id,
            })
        }

        if (createConcern) {
            createConcern(formData)
        }
    }

    return (
        <div className="flex justify-center mx-3 p-8">
            <div className="flex flex-col w-full md:w-10/12 max-w-[1200px] gap-4">
                <h1 className="font-vietnam font-bold text-3xl md:text-5xl">
                    GOT ANY SUGGESTIONS?
                </h1>
                <p className="font-vietnam font-light text-sm md:text-2xl md:leading-8 max-w-[38ch]">
                    Shoot us your suggestions and concerns to help us create
                    better learning experiences for you! We&apos;ll get back to
                    them as soon as we can.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-1 p-3 gap-5 rounded-lg border-2 border-white bg-secondary-dark">
                            <label htmlFor="name">
                                <FaUser size={25} color="white" />
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-transparent outline-none text-white caret-white"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-1 p-3 gap-5 rounded-lg border-2 border-white bg-secondary-dark">
                            <label htmlFor="name">
                                <MdEmail size={25} color="white" />
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-transparent outline-none text-white caret-white"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <textarea
                        className="w-full h-32 md:h-64 px-4 py-3 rounded-lg border-2 border-white bg-secondary-dark outline-none text-white caret-white"
                        id="content"
                        name="content"
                        placeholder="Write your suggestion here..."
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />

                    <TheButton style="w-fit self-center md:self-end">
                        Submit
                    </TheButton>
                </form>
            </div>
        </div>
    )
}

export default ContactUsForm
