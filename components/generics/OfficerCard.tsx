import React from 'react'

interface OfficerCardProps {
    firstName: string
    lastName: string
    title: string
    className?: string
    style?: React.CSSProperties
    bgStyle: React.CSSProperties
}

export const OfficerCard: React.FC<OfficerCardProps> = ({
    firstName,
    lastName,
    title,
    className,
    style,
    bgStyle,
}) => {
    return (
        <div
            className="w-52 h-[17rem] md:w-52 md:h-[18rem] lg:w-72 lg:h-[25rem] min-[1200px]:w-80 min-[1200px]:h-[25rem] rounded-xl  flex flex-col p-4 tracking-widest bg-cover bg-top"
            style={bgStyle}
        >
            <span className="mt-auto font-bold lg:text-xl md:text-base">
                {firstName}
            </span>
            <span className="font-bold lg:text-xl  md:text-base">
                {lastName}
            </span>
            <span className="lg:text-sm text-xs">{title}</span>
        </div>
    )
}
