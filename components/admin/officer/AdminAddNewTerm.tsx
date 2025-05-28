'use client'
import React, { useState } from 'react'
import { FiPlus, FiCheck } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'
import { AdminAddNewOfficerCard } from './AdminAddNewOfficerCard'

const AdminAddNewTerm: React.FC = () => {
    const [isAdding, setIsAdding] = useState(false)
    const [term, setTerm] = useState({
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 1,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTerm((prev) => ({
            ...prev,
            [name]: Number(value),
        }))
    }

    const handleSave = () => {
        alert(`Term ${term.startYear}-${term.endYear} created!`)
        setIsAdding(false)
    }

    return (
        <div
            className={`rounded mt-6 mx-4  ${
                isAdding
                    ? 'bg-transparent border-csg-blue-200 text-white border-2'
                    : 'bg-csg-blue-300 hover:border-csg-blue-200 border-csg-blue-300 text-black border-4'
            } `}
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
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-12 px-2 md:px-4 pb-6 place-items-center my-2 md:my-6">
                        <AdminAddNewOfficerCard />
                    </div>

                    <div className="w-full flex text-justify items-center gap-4 mb-8 px-2 md:px-16 text-xs md:text-base">
                        <b className="self-start">NOTE:</b>Terms with the latest
                        end year will be set as the current term. Keep this in
                        mind when adding new terms, since the current term will
                        be reflected as the current Board of Directors in the
                        website page.
                    </div>

                    <div className="px-4 md:px-8 pb-4 self-end">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 rounded bg-csg-blue-300 text-black font-bold hover:bg-csg-blue-200 transition-colors duration-200 mr-2"
                        >
                            Add
                        </button>
                        <button
                            onClick={() => {
                                setIsAdding(false)
                            }}
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
