'use client'

import ScholarshipOpportunityCard from '@/components/scholarships/ScholarshipOpportunityCard'
import { useScholarshipStore } from '@/store/scholarship'
import React, { useEffect } from 'react'

const ScholarshipsPage: React.FC = () => {
    const { items, loading, error, fetchAll } = useScholarshipStore()

    useEffect(() => {
        if (!items || items.length === 0) {
            fetchAll?.()
        }
    }, [items, fetchAll])

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
                {items.map((item, index) => (
                    <ScholarshipOpportunityCard
                        key={index + item.title}
                        id={item.id}
                        article={item.article}
                        title={item.title}
                        benefits={item.benefits ?? ''}
                        external_url={item.external_url}
                        image_url={item.image_url ?? ''}
                    />
                ))}
            </div>
        </div>
    )
}

export default ScholarshipsPage
