'use client'
import { officers } from '@/constants/officers/officers'
import React, { useState } from 'react'
import { Officer } from '@/interface/officers'
import { AdminOfficerCard } from '@/components/admin/officer/AdminOfficerCard'
import { AdminAddNewOfficerCard } from './AdminAddNewOfficerCard'
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi'
import { TiWarning } from 'react-icons/ti'
import { RxCross1 } from 'react-icons/rx'

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
    const [isEditing, setIsEditing] = useState(false)
    const [term, setTerm] = useState({ startYear, endYear })
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTerm((prev) => ({
            ...prev,
            [name]: Number(value),
        }))
    }

    return (
        <>
            <div className="flex flex-col items-center border-b border-white">
                <div className="w-full py-4 px-4 text-white font-semibold text-sm md:text-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {isEditing ? (
                            <>
                                <input
                                    type="number"
                                    name="startYear"
                                    value={term.startYear}
                                    onChange={handleChange}
                                    className="w-20 bg-transparent border border-white/30 px-2 py-1 rounded text-sm text-white"
                                />
                                <span>–</span>
                                <input
                                    type="number"
                                    name="endYear"
                                    value={term.endYear}
                                    onChange={handleChange}
                                    className="w-20 bg-transparent border border-white/30 px-2 py-1 rounded text-sm text-white"
                                />
                                <button
                                    onClick={() => setIsEditing(false)}
                                    title="Save"
                                >
                                    <FiCheck
                                        className="text-white hover:opacity-80"
                                        size={18}
                                    />
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    title="Cancel"
                                >
                                    <RxCross1
                                        className="text-red-400 hover:text-red-600"
                                        size={18}
                                    />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    title="Edit"
                                >
                                    <FiEdit
                                        className="text-white hover:opacity-80"
                                        size={18}
                                    />
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    title="Delete"
                                >
                                    <FiTrash2
                                        className="text-red-400 hover:text-red-600"
                                        size={18}
                                    />
                                </button>
                                <span>
                                    {term.startYear}–{term.endYear}
                                </span>
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white"
                    >
                        {isOpen ? '▾' : '▸'}
                    </button>
                </div>

                {isOpen && (
                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-12 px-2 md:px-4 pb-6 place-items-center my-2 md:my-6">
                        {officers.map((officer, index) => (
                            <AdminOfficerCard key={index} officer={officer} />
                        ))}
                        <AdminAddNewOfficerCard />
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-[#0B1120] text-white p-6 rounded-lg max-w-md w-full shadow-xl space-y-4">
                        <div className="flex flex-row gap-2">
                            <TiWarning className="text-red-500" size={24} />
                            <h3 className="text-lg font-bold text-red-500">
                                Warning!
                            </h3>
                        </div>

                        <p>
                            Are you sure you want to delete this term?{' '}
                            <strong>
                                All of the officers in this term will be wiped
                                from the database.
                            </strong>
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false)
                                    alert('Term deleted!')
                                }}
                                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

const AdminPreviousTerms: React.FC = () => {
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

export default AdminPreviousTerms
