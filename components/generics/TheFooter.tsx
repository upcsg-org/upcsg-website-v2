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
                <Image src="/images/footer-bg.png" alt="Footer" fill />
            </div>
            <div className=" bg-csg-green-300 flex flex-col text-white pb-8 gap-y-3 justify-around font-vietnam font-bold tracking-widest">
                <div className="flex flex-col items-center gap-3 text-xs lg:text-base">
                    <p className="md:text-xl text-lg">Connect with Us!</p>
                    <div className="flex flex-row gap-7">
                        <div className="flex gap-3 items-center ">
                            <FaEnvelope className="md:h-6 md:w-6 w-4 h-4" />
                            <p>upcsg mail</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone className="md:h-6 md:w-6 w-4 h-4 scale-x-[-1]" />
                            <p>upcsg phone</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5  justify-center ">
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
