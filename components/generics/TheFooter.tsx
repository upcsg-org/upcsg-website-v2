import React from 'react'
import Image from 'next/image'
import {
    FaEnvelope,
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaPhone,
} from 'react-icons/fa'

const TheFooter = () => {
    return (
        <footer className="flex flex-col bg-main-dark">
            <div className="relative w-full h-[10rem] md:h-[18rem] aspect-[1920/900]">
                <Image
                    src="/images/footer-bg.png"
                    alt="Footer"
                    fill
                    className=""
                />
            </div>
            <div className=" bg-csg-green-300 flex flex-col md:flex-row  text-white pb-8 md:gap-y-0 gap-y-3 justify-around font-vietnam font-bold tracking-widest">
                <div className="flex flex-col items-center md:items-start gap-3 text-xs lg:text-base">
                    <p className="md:text-xl text-lg">Contact Us!</p>
                    <div className="flex flex-col gap-3 md:*:ps-12">
                        <div className="flex gap-3 items-center ">
                            <FaEnvelope className="md:h-6 md:w-6 w-4 h-4" />
                            <p>upcsg.upcebu@gmail.com</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone className="md:h-6 md:w-6 w-4 h-4 scale-x-[-1]" />
                            <p>096969696969</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5  justify-center md:justify-start">
                    <a href="/" target="_blank" rel="noreferrer">
                        <FaFacebook className="md:h-10 md:w-10 h-7 w-7 hover:scale-125 duration-200" />
                    </a>
                    <a href="/" target="_blank" rel="noreferrer">
                        <FaInstagram className="md:h-10 md:w-10 h-7 w-7 hover:scale-125 duration-200" />
                    </a>
                    <a href="/" target="_blank" rel="noreferrer">
                        <FaYoutube className="md:h-10 md:w-10 h-7 w-7 hover:scale-125 duration-200" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default TheFooter
