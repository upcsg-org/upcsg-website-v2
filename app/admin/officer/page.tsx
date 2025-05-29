'use client'

import React, { useEffect, useState } from 'react'
import { AdminOfficerCard } from '@/components/admin/officer/AdminOfficerCard'
import AdminPreviousTerms from '@/components/admin/officer/AdminPreviousTerms'
import { AdminAddNewOfficerCard } from '@/components/admin/officer/AdminAddNewOfficerCard'
import AdminCurrentTermSection from '@/components/admin/officer/AdminCurrentTermSection'
import AdminAddNewTerm from '@/components/admin/officer/AdminAddNewTerm'
import { useTermStore } from '@/store/officers'
import { Term } from '@/store/officers'

const AdminOfficers = () => {
    const { items: terms, fetchAll } = useTermStore()
    const [currentTerm, setCurrentTerm] = useState<Term | null>(null)

    useEffect(() => {
        const loadTerms = async () => {
            if (fetchAll) {
                fetchAll()
            }
        }

        loadTerms()
    }, [fetchAll])

    useEffect(() => {
        const sorted = terms.sort((a, b) => b.endYear - a.endYear)
        console.log(sorted[0])
        setCurrentTerm(sorted[0])
    }, [terms])

    return (
        <div>
            {currentTerm && (
                <>
                    <AdminCurrentTermSection
                        startYear={currentTerm.startYear}
                        endYear={currentTerm.endYear}
                    />

                    <h2 className="text-base md:text-2xl font-bold mb-3 md:mb-6 text-center">
                        CURRENT BOARD OF DIRECTORS
                    </h2>

                    <section className="grid grid-cols-2 md:grid-cols-3 px-4 gap-x-4 gap-y-8 md:gap-y-16 justify-items-center mt-8">
                        {currentTerm.officers &&
                            currentTerm.officers.length > 0 && (
                                <>
                                    <div className="md:col-span-3 col-span-2">
                                        <AdminOfficerCard
                                            officer={currentTerm.officers[0]}
                                        />
                                    </div>
                                    {currentTerm.officers
                                        .slice(1)
                                        .map((officer, index) => (
                                            <AdminOfficerCard
                                                key={officer.id}
                                                officer={officer}
                                            />
                                        ))}
                                </>
                            )}
                        <AdminAddNewOfficerCard />
                    </section>
                </>
            )}

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
