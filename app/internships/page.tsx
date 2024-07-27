import InternshipOpportunityCard from '@/components/internships/InternshipOpportunityCard'
import React from 'react'

const testValues = [
    {
        title: 'API Generation with Postman workshop this Wednesday',
        dateOfPosting: new Date('2023-09-19'),
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'API Generation with Postman workshop this Wednesday',
        dateOfPosting: new Date('2023-09-19'),
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'API Generation with Postman workshop this Wednesday',
        dateOfPosting: new Date('2023-09-19'),
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'API Generation with Postman workshop this Wednesday, Another Title that is A Bit Longer for Test.',
        dateOfPosting: new Date('2023-09-19'),
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'API Generation with Postman workshop this Wednesday',
        dateOfPosting: new Date('2023-09-19'),
        imageURL: '/images/placeholder.png',
    },
]

function page() {
    return (
        <div>
            <div
                className="flex w-full items-center justify-center text-center bg-gradient-to-r
                            from-csg-blue-600/25 to-csg-blue-600/25 via-csg-blue-600 h-28 sm:h-36 xl:h-56
                            tracking-widest font-vietnam font-bold text-white text-xl sm:text-4xl xl:text-6xl"
            >
                INTERNSHIP
                <br />
                OPPORTUNITIES
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                {testValues.map((item, index) => (
                    <InternshipOpportunityCard
                        key={index}
                        title={item.title}
                        dateOfPosting={item.dateOfPosting}
                        imageURL={item.imageURL}
                    />
                ))}
            </div>
        </div>
    )
}

export default page
