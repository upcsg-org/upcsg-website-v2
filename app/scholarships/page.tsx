import ScholarshipOpportunityCard from '@/components/scholarships/ScholarshipOpportunityCard'
import React from 'react'

const testValues = [
    {
        title: 'DOST Scholarship Program | Now Accepting Applicants 2024',
        benefits: '₱40,000 and other benefits',
        GWAreq: 'GWA of 83% or its equivalent',
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'DOST Scholarship Program | Now Accepting Applicants 2024',
        benefits: '₱40,000 and other benefits',
        GWAreq: 'GWA of 83% or its equivalent',
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'DOST Scholarship Program | Now Accepting Applicants 2024',
        benefits: '₱40,000 and other benefits',
        GWAreq: 'GWA of 83% or its equivalent',
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'DOST Scholarship Program | Now Accepting Applicants 2024',
        benefits: '₱40,000 and other benefits',
        GWAreq: 'GWA of 83% or its equivalent',
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'DOST Scholarship Program | Now Accepting Applicants 2024',
        benefits: '₱40,000 and other benefits',
        GWAreq: 'GWA of 83% or its equivalent',
        imageURL: '/images/placeholder.png',
    },
    {
        title: 'DOST Scholarship Program | Now Accepting Applicants 2024',
        benefits: '₱40,000 and other benefits',
        GWAreq: 'GWA of 83% or its equivalent',
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
                SCHOLARSHIP
                <br />
                OPPORTUNITIES
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 3xl:mx-[13.5vw]">
                {testValues.map((item, index) => (
                    <ScholarshipOpportunityCard
                        key={index}
                        title={item.title}
                        benefits={item.benefits}
                        GWAreq={item.GWAreq}
                        imageURL={item.imageURL}
                    />
                ))}
            </div>
        </div>
    )
}

export default page
