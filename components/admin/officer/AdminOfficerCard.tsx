import React, { useState } from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { Officer } from '@/interface/officers'
import {
    TRANSPARENT_TO_CYAN,
    TRANSPARENT_TO_VIOLET,
} from '@/constants/generic/colorGradients'
import Image from 'next/image'

interface PropsInterface {
    officer: Officer
    className?: string
    style?: React.CSSProperties
    onEdit?: () => void
    onDelete?: () => void
}

const numberToRoman = (num: number): string => {
    const romanMap: { [key: number]: string } = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X',
    }
    return romanMap[num] || ''
}

export const AdminOfficerCard = (props: PropsInterface) => {
    const { officer, className, style, onEdit, onDelete } = props
    const { firstName, lastName, image, role, yearLevel } = officer

    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        firstName,
        role,
        yearLevel,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const getBackgroundColor = (role: string) => {
        return role === 'Executive Director'
            ? TRANSPARENT_TO_CYAN
            : TRANSPARENT_TO_VIOLET
    }

    return (
        <>
            <div
                className={`relative w-full h-[13rem] md:w-52 md:h-[18rem] lg:w-72 lg:h-[25rem] min-[1200px]:w-80 min-[1200px]:h-[25rem] rounded-xl flex flex-col p-2 md:p-4 tracking-widest bg-cover bg-top ${className}`}
                style={{
                    backgroundImage: `${getBackgroundColor(role)}, url(${image})`,
                    ...style,
                }}
            >
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-csg-blue-300 hover:bg-csg-blue-400 p-1 md:p-2 rounded-full shadow-lg shadow-black"
                        title="Edit"
                    >
                        <FiEdit size={20} color="white" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-csg-red-100 hover:bg-csg-red-200 p-1 md:p-2 rounded-full"
                        title="Delete"
                    >
                        <FiTrash size={20} color="white" />
                    </button>
                </div>

                <span className="mt-auto font-bold lg:text-xl md:text-base text-[0.65rem]">
                    {firstName}
                </span>
                <span className="font-bold lg:text-xl md:text-base text-[0.65rem]">
                    {lastName}
                </span>
                <span className="lg:text-sm md:text-xs text-[0.45rem] italic">
                    {role}
                </span>
                <span className="lg:text-sm md:text-xs text-[0.45rem]">
                    BS Computer Science {numberToRoman(yearLevel)}
                </span>
            </div>

            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
                    <div className="bg-[#0B1120] text-white rounded-xl p-4 md:p-8 w-full max-w-sm md:max-w-2xl lg:max-w-3xl shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Edit Officer</h2>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-white text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            <div className="flex flex-col items-center md:items-start gap-4">
                                <Image
                                    src={officer.image}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full md:w-full md:h-full md:rounded-none border border-white/30 object-cover"
                                    width={80}
                                    height={80}
                                />
                                <button
                                    onClick={() => console.log('Upload Image')}
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
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1">
                                        Role
                                    </label>
                                    <input
                                        className="w-full bg-transparent border border-white/30 px-3 py-2 rounded-md text-sm"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
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
                                        value={formData.yearLevel}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        className="bg-csg-blue-200 hover:bg-csg-blue-300 text-black font-semibold px-4 py-2 rounded-md mt-2"
                                        onClick={() => {
                                            setIsEditing(false)
                                            if (onEdit) onEdit()
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
