import React from 'react'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'
import TheButton from '../generics/TheButton'

const FacultySection = () => {
    const DCS_FACULTY_PAGE_LINK =
        'https://cs.upcebu.edu.ph/faculty-members/#dcs-faculty'

    return (
        <div className="flex flex-col basis-96 md:flex-row-reverse w-full">
            <figure className="min-h-96 md:w-5/12 relative object-contain bg-[url('https://res.cloudinary.com/dc7anycov/image/upload/v1723341056/faculty_kmyfmt.png')]">
                <Image
                    src="https://res.cloudinary.com/dc7anycov/image/upload/v1723341056/faculty_kmyfmt.png"
                    alt="Faculty Section"
                    fill
                    className="object-contain backdrop-blur-md"
                />
            </figure>

            <div className="bg-secondary-light md:w-7/12 md:min-w-96 flex flex-col items-center md:items-start gap-6 md:gap-10 p-6 md:p-16 font-vietnam text-center md:text-left">
                <h2 className="mb-4 md:mb-8 text-md md:text-5xl font-semibold tracking-widest">
                    YOUR GUIDING LIGHT IN YOUR JOURNEY
                </h2>
                <h3 className="md:w-2/3 text-sm md:text-3xl font-semibold tracking-wider">
                    The Department of Computer Science Faculty
                </h3>
                <p className="md:w-2/3 tracking-wide max-sm:text-xs">
                    As the backbone of the Computer Science Department, our
                    professors and lecturers are dedicated to nurturing the next
                    generation of computer scientists. With a wealth of
                    knowledge and experience, they provide a solid foundation in
                    both theory and practice, guiding students through the
                    complexities of the field. Their commitment to excellence in
                    teaching and research is instrumental in shaping the future
                    of computer science.
                </p>

                <TheButton
                    link={DCS_FACULTY_PAGE_LINK}
                    style="flex items-center justify-center gap-x-2 w-fit"
                >
                    <span>Know More</span>
                    <FaLongArrowAltRight />
                </TheButton>
            </div>
        </div>
    )
}

export default FacultySection
