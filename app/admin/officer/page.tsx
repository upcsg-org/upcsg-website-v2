'use client'

import React from 'react'
import { AdminOfficerCard } from '@/components/admin/officer/AdminOfficerCard'
import { officers } from '@/constants/officers/officers'
import { LIGHT_GREEN_TO_CYAN } from '@/constants/generic/colorGradients'
import AdminPreviousTerms from '@/components/admin/officer/AdminPreviousTerms'
import { AdminAddNewOfficerCard } from '@/components/admin/officer/AdminAddNewOfficerCard'

const AdminOfficers = () => {
    const officerCount = officers.length

    const HEADER_BACKGROUND = LIGHT_GREEN_TO_CYAN

    return (
        <div>
            <section className="grid grid-cols-2 md:grid-cols-3 px-4 gap-x-4 gap-y-8 md:gap-y-16 justify-items-center mt-16">
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

            <section className="md:p-20 mt-12">
                <AdminPreviousTerms />
            </section>
        </div>
    )
}

export default AdminOfficers
