'use client'

import { useState, Dispatch, SetStateAction } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

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
        <div className="flex flex-col items-center mx-3  p-8">
            <div className="w-full md:w-10/12 max-w-[1200px]">
                <div className="">
                    <h1 className="font-vietnam font-bold text-3xl md:text-5xl mb-1">
                        GOT ANY SUGGESTIONS?
                    </h1>
                    <p className="font-vietnam font-light text-xl md:text-2xl leading-8 max-w-[38ch] mb-4 md:mb-8">
                        Shoot us your suggestions and concerns to help us create
                        better learning experiences for you! We’ll get back to
                        them as soon as we can.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="inline md:inline-flex mb-2 md:mb-4 w-full lg:w-9/12">
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

                    <div className="">
                        <textarea
                            className="w-full h-32 md:h-64 px-4 py-3 rounded-lg border-2 border-white bg-secondary-dark outline-none text-white caret-white"
                            id="message"
                            name="message"
                            placeholder="Write your suggestion here..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white font-vietnam font-bold text-md md:text-lg w-fit self-center md:self-end py-1 px-3 md:py-3 md:px-8 mt-1 md:mt-2 bg-csg-green-100 rounded-[35px]"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactUsForm
