'use client'

import React from 'react'
import { AdminOfficerCard } from '@/components/admin/officer/AdminOfficerCard'
import { officers } from '@/constants/officers/officers'
import { LIGHT_GREEN_TO_CYAN } from '@/constants/generic/colorGradients'
import AdminPreviousTerms from '@/components/admin/officer/AdminPreviousTerms'
import { AdminAddNewOfficerCard } from '@/components/admin/officer/AdminAddNewOfficerCard'
import AdminCurrentTermSection from '@/components/admin/officer/AdminCurrentTermSection'
import AdminAddNewTerm from '@/components/admin/officer/AdminAddNewTerm'

const AdminOfficers = () => {
    const officerCount = officers.length

    const HEADER_BACKGROUND = LIGHT_GREEN_TO_CYAN

    return (
        <div>
            <AdminCurrentTermSection startYear={2024} endYear={2025} />

            <h2 className="text-base md:text-2xl font-bold mb-3 md:mb-6 text-center">
                CURRENT BOARD OF DIRECTORS
            </h2>

            <section className="grid grid-cols-2 md:grid-cols-3 px-4 gap-x-4 gap-y-8 md:gap-y-16 justify-items-center mt-8">
                <div className="md:col-span-3 col-span-2">
                    <AdminOfficerCard officer={officers[0]} />
                </div>
                {officers.slice(1).map((officer, index) => (
                    <AdminOfficerCard
                        key={index + officer.firstName + officer.lastName}
                        officer={officer}
                    />
                ))}
                <AdminAddNewOfficerCard />
            </section>

            <section className="md:px-20 mt-12">
                <AdminPreviousTerms />
            </section>

            <section className="md:px-20 mt-12 mb-32">
                <AdminAddNewTerm />
            </section>
        </div>
    )
}

export default AdminOfficers
