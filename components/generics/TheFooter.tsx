import React from 'react'
import Image from 'next/image'
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

const TheFooter = () => {
    const CSG_EMAIL = 'upcsg.upcebu@gmail.com'
    const CSG_FACEBOOK_LINK = 'https://www.facebook.com/UPCSG'
    const CSG_INSTAGRAM_LINK = 'https://www.instagram.com/upcsg'
    const CSG_LINKEDIN_LINK =
        'https://www.linkedin.com/company/university-of-the-philippines-computer-science-guild-upcsg'

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
                            <p>{CSG_EMAIL}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 justify-center ">
                    <a
                        href={CSG_FACEBOOK_LINK}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaFacebook className="md:h-10 md:w-10 h-7 w-7 hover:scale-125 duration-200" />
                    </a>
                    <a
                        href={CSG_INSTAGRAM_LINK}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaInstagram className="md:h-10 md:w-10 h-7 w-7 hover:scale-125 duration-200" />
                    </a>
                    <a
                        href={CSG_LINKEDIN_LINK}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaLinkedin className="md:h-10 md:w-10 h-7 w-7 hover:scale-125 duration-200" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default TheFooter
