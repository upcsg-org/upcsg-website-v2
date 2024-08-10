'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import TheButton from './TheButton'

interface PropsInterface {
    setIsContactUsModalOpen: Dispatch<SetStateAction<boolean>>
}

const ContactUsForm = (props: PropsInterface) => {
    const { setIsContactUsModalOpen } = props
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
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
        setIsContactUsModalOpen(true)
    }

    return (
        <div className="flex justify-center mx-3 p-8">
            <div className="flex flex-col w-full md:w-10/12 max-w-[1200px] gap-4">
                <h1 className="font-vietnam font-bold text-3xl md:text-5xl">
                    GOT ANY SUGGESTIONS?
                </h1>
                <p className="font-vietnam font-light text-xl md:text-2xl leading-8 max-w-[38ch]">
                    Shoot us your suggestions and concerns to help us create
                    better learning experiences for you! We&apos;ll get back to
                    them as soon as we can.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="inline md:inline-flex w-full lg:w-9/12">
                        <div className="flex flex-1 p-3 rounded-lg border-2 border-white md:mr-4 bg-secondary-dark md:max-w-[400px]">
                            <label htmlFor="name" className="mr-2 md:mr-5">
                                <FaUser size={25} color="white" />
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-transparent outline-none text-white caret-white"
                                placeholder="Name..."
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-1 p-3 rounded-lg border-2 border-white bg-secondary-dark md:max-w-[400px]">
                            <label htmlFor="name" className="mr-2 md:mr-5">
                                <MdEmail size={25} color="white" />
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-transparent outline-none text-white caret-white"
                                placeholder="Email..."
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <textarea
                        className="w-full h-32 md:h-64 px-4 py-3 rounded-lg border-2 border-white bg-secondary-dark outline-none text-white caret-white"
                        id="message"
                        name="message"
                        placeholder="Write your suggestion here..."
                        value={formData.message}
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
