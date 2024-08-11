import React from 'react'
import { OfficerCard } from '@/components/officers/OfficerCard'
import { officers } from '@/constants/officers/officers'
import { LIGHT_GREEN_TO_CYAN } from '@/constants/generic/colorGradients'

const Officers = () => {
    const officerCount = officers.length

    const HEADER_BACKGROUND = LIGHT_GREEN_TO_CYAN

    return (
        <div>
            <div
                className="w-full text-center py-12 "
                style={{ background: HEADER_BACKGROUND }}
            >
                <h1 className="uppercase md:text-4xl lg:text-6xl min-[1200px]:text-7xl font-bold tracking-widest">
                    Meet your <br />
                    <span className="min-[1200px]:text-8xl lg:text-7xl md:text-5xl text-xl">
                        board of directors
                    </span>
                </h1>
            </div>
            <section className="grid md:grid-cols-3 grid-cols-2 gap-y-8  md:gap-y-16 justify-items-center mt-16">
                <div className="md:col-span-3 col-span-2">
                    <OfficerCard officer={officers[0]} />
                </div>
                {officers.slice(1, officerCount - 1).map((officer, index) => (
                    <OfficerCard
                        key={index + officer.firstName + officer.lastName}
                        officer={officer}
                        className="col-span-1"
                    />
                ))}
                <div className="md:col-span-3 col-span-2">
                    <OfficerCard officer={officers[officerCount - 1]} />
                </div>
            </section>
        </div>
    )
}

export default Officers
