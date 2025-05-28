'use client'
import React, { useState } from 'react'
import { Officer } from '@/interface/officers'
import { OfficerCard } from './OfficerCard' // Adjust the import path as needed
import { officers } from '@/constants/officers/officers'

interface TermDropdownProps {
    startYear: number
    endYear: number
    officers: Officer[]
}

const TermDropdown: React.FC<TermDropdownProps> = ({
    startYear,
    endYear,
    officers,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col items-center border-b border-white">
            <button
                className="w-full text-left py-4 px-4 text-white font-semibold text-sm md:text-xl flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                {startYear}–{endYear}
                <span className="text-white">{isOpen ? '▾' : '▸'}</span>
            </button>
            {isOpen && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-2 md:px-4 pb-6">
                    {officers.map((officer, index) => (
                        <OfficerCard key={index} officer={officer} />
                    ))}
                </div>
            )}
        </div>
    )
}

const PreviousTerms: React.FC = () => {
    const data = [
        {
            startYear: 2024,
            endYear: 2025,
            officers: officers,
        },
        {
            startYear: 2023,
            endYear: 2024,
            officers: officers,
        },
    ]

    return (
        <div className="text-white px-4 py-8">
            <h2 className="text-base md:text-2xl font-bold mb-3 md:mb-6">
                Previous Terms
            </h2>
            <div className="border border-white rounded">
                {data.map((term, index) => (
                    <TermDropdown
                        key={index}
                        startYear={term.startYear}
                        endYear={term.endYear}
                        officers={term.officers}
                    />
                ))}
            </div>
        </div>
    )
}

export default PreviousTerms
