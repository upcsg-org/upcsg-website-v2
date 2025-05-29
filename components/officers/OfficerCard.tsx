import { Officer } from '@/interface/officers'
import React from 'react'
import {
    TRANSPARENT_TO_CYAN,
    TRANSPARENT_TO_VIOLET,
} from '@/constants/generic/colorGradients'

interface PropsInterface {
    officer: Officer
    className?: string
    style?: React.CSSProperties
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

export const OfficerCard = (props: PropsInterface) => {
    const { officer, className, style } = props
    const { name, image_url, position, yearLevel } = officer

    const getBackgroundColor = (position: string) => {
        if (position === 'Executive Director') {
            return TRANSPARENT_TO_CYAN
        }
        return TRANSPARENT_TO_VIOLET
    }

    return (
        <div
            className={`w-full h-[13rem] md:w-52 md:h-[18rem] lg:w-72 lg:h-[25rem] min-[1200px]:w-80 min-[1200px]:h-[25rem] rounded-xl flex flex-col p-2 md:p-4 tracking-widest bg-cover bg-top ${className}`}
            style={{
                backgroundImage: `${getBackgroundColor(position)},url(${image_url})`,
                ...style,
            }}
        >
            <span className="mt-auto font-bold lg:text-xl md:text-base text-[0.65rem]">
                {name}
            </span>
            <span className="lg:text-sm md:text-xs text-[0.45rem] italic">
                {position}
            </span>
            <span className="lg:text-sm md:text-xs text-[0.45rem]">
                BS Computer Science {numberToRoman(yearLevel)}
            </span>
        </div>
    )
}
