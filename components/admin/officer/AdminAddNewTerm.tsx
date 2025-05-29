'use client'
import React, { useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { AdminAddNewOfficerCard } from './AdminAddNewOfficerCard'
import { AdminOfficerCard } from './AdminOfficerCard'
import { useCreateUpdateDeleteTermStore } from '@/store/officers'
import Image from 'next/image'

const AdminAddNewTerm: React.FC = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [isAddingOfficer, setIsAddingOfficer] = useState(false)
    const [officers, setOfficers] = useState<any[]>([]) // Stores locally added officers
    const imageInputRef = useRef<HTMLInputElement>(null)

    const [term, setTerm] = useState({
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 1,
    })
    const { create } = useCreateUpdateDeleteTermStore()

    const [officerFormData, setOfficerFormData] = useState({
        name: '',
        position: '',
        yearLevel: '',
        image_url: '',
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setOfficerFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setOfficerFormData((prev) => ({
                ...prev,
                image_url: imageUrl,
            }))
        }
    }

    const handleSaveOfficer = () => {
        setOfficers((prev) => [...prev, officerFormData])
        setOfficerFormData({
            name: '',
            position: '',
            yearLevel: '',
            image_url: '',
        })
        setIsAddingOfficer(false)
    }

    const handleSaveTerm = async () => {
        if (!create) {
            alert('Error: Unable to create term. Try reloading the page.')
            return
        }

        try {
            const newTerm = await create({
                startYear: term.startYear,
                endYear: term.endYear,
                officers: officers.map((officer) => ({
                    ...officer,
                })),
            })

            if (!newTerm) {
                throw new Error('New term is undefined.')
            }

            alert(`Term ${newTerm.startYear}-${newTerm.endYear} created!`)
            setIsAdding(false)
            setOfficers([])
        } catch (error) {
            console.error('Failed to create term:', error)
            alert('Failed to create new term. Please try again.')
        }
    }

    return (
        <div
            className={`rounded mt-6 mx-4 ${
                isAdding
                    ? 'bg-transparent border-csg-blue-200 text-white border-2'
                    : 'bg-csg-blue-300 hover:border-csg-blue-200 border-csg-blue-300 text-black border-4'
            }`}
        >
            {!isAdding ? (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full py-4 px-4 text-white font-semibold text-sm md:text-xl flex items-center justify-center gap-2 hover:bg-white/10"
                >
                    <FiPlus size={20} />
                    Add New Term
                </button>
            ) : (
                <div className="flex flex-col items-center border-b border-white">
                    <div className="w-full py-4 px-4 text-white font-semibold text-sm md:text-xl flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            SET SY:{' '}
                            <input
                                type="number"
                                name="startYear"
                                value={term.startYear}
                                onChange={(e) =>
                                    setTerm((prev) => ({
                                        ...prev,
                                        startYear:
                                            parseInt(e.target.value) ||
                                            new Date().getFullYear(),
                                    }))
                                }
                                className="w-20 bg-transparent border border-white/30 px-2 py-1 rounded text-sm text-white"
                            />
                            <span>–</span>
                            <input
                                type="number"
                                name="endYear"
                                value={term.endYear}
                                onChange={(e) =>
                                    setTerm((prev) => ({
                                        ...prev,
                                        endYear:
                                            parseInt(e.target.value) ||
                                            new Date().getFullYear() + 1,
                                    }))
                                }
                                className="w-20 bg-transparent border border-white/30 px-2 py-1 rounded text-sm text-white"
                            />
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-12 px-2 md:px-4 pb-6 place-items-center my-2 md:my-6">
                        {officers.map((officer, index) => (
                            <AdminOfficerCard
                                key={index}
                                officer={officer}
                                onDelete={() =>
                                    setOfficers((prev) =>
                                        prev.filter((_, i) => i !== index)
                                    )
                                }
                            />
                        ))}
                        <AdminAddNewOfficerCard
                            onClick={() => setIsAddingOfficer(true)}
                        />
                    </div>

                    {isAddingOfficer && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
                            <div className="bg-[#0B1120] text-white rounded-xl p-4 md:p-8 w-full max-w-sm md:max-w-2xl lg:max-w-3xl shadow-xl">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold">
                                        Add Officer
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setIsAddingOfficer(false)
                                        }
                                        className="text-white text-xl font-bold"
                                    >
                                        &times;
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                    <div className="flex flex-col items-center md:items-start gap-4">
                                        <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border border-white/30 overflow-hidden">
                                            {officerFormData.image_url ? (
                                                <Image
                                                    src={
                                                        officerFormData.image_url
                                                    }
                                                    alt="Profile"
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/10 flex items-center justify-center text-xs text-white/50">
                                                    No image
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={imageInputRef}
                                            onChange={handleImageUpload}
                                            hidden
                                        />
                                        <button
                                            onClick={() =>
                                                imageInputRef.current?.click()
                                            }
                                            className="w-full bg-[#30b8c4] hover:bg-[#2aa0aa] text-csg-blue-500 px-3 py-2 rounded text-sm"
                                        >
                                            UPLOAD IMAGE
                                        </button>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold mb-1">
                                                Name
                                            </label>
                                            <input
                                                className="w-full bg-transparent border border-white/30 px-3 py-2 rounded-md text-sm"
                                                name="name"
                                                value={officerFormData.name}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold mb-1">
                                                Position
                                            </label>
                                            <input
                                                className="w-full bg-transparent border border-white/30 px-3 py-2 rounded-md text-sm"
                                                name="position"
                                                value={officerFormData.position}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold mb-1">
                                                Year Level
                                            </label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={4}
                                                className="w-full bg-transparent border border-white/30 px-3 py-2 rounded-md text-sm"
                                                name="yearLevel"
                                                value={
                                                    officerFormData.yearLevel
                                                }
                                                onChange={handleFormChange}
                                            />
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                className="bg-csg-blue-200 hover:bg-csg-blue-300 text-black font-semibold px-4 py-2 rounded-md mt-2"
                                                onClick={handleSaveOfficer}
                                            >
                                                Save Officer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="w-full flex text-justify items-center gap-4 mb-8 px-2 md:px-16 text-xs md:text-base">
                        <b className="self-start">NOTE:</b>Terms with the latest
                        end year will be set as the current term. Keep this in
                        mind when adding new terms, since the current term will
                        be reflected as the current Board of Directors in the
                        website page.
                    </div>

                    <div className="px-4 md:px-8 pb-4 self-end">
                        <button
                            onClick={handleSaveTerm}
                            className="px-4 py-2 rounded bg-csg-blue-300 text-black font-bold hover:bg-csg-blue-200 transition-colors duration-200 mr-2"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminAddNewTerm
