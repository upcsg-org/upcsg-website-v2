import React from 'react'
import { FaPlus } from 'react-icons/fa'

export const AdminAddNewOfficerCard = ({
    onClick,
}: {
    onClick: () => void
}) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center justify-center relative w-full h-[13rem] md:w-52 md:h-[18rem] lg:w-72 lg:h-[25rem] min-[1200px]:w-80 min-[1200px]:h-[25rem] rounded-xl p-2 md:p-4
        tracking-widest bg-cover bg-top border-4 md:border-8 border-csg-blue-300 cursor-pointer hover:bg-csg-blue-100/[0.1]"
        >
            <button
                className="bg-csg-blue-300 text-black p-1 md:p-2 rounded-full shadow-lg shadow-black mb-2 md:mb-4"
                title="Edit"
            >
                <FaPlus size={20} color="white" />
            </button>
            <p className="text-center text-xs md:text-base">ADD NEW OFFICER</p>
        </div>
    )
}
