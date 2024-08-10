import { Officer, OfficerRank } from '@/interface/officers'
import React from 'react'
import { HEAD, MEMBER } from '@/constants/officers/officerRanks'
import {
    TRANSPARENT_TO_CYAN,
    TRANSPARENT_TO_VIOLET,
} from '@/constants/generic/colorGradients'

interface PropsInterface {
    officer: Officer
    className?: string
    style?: React.CSSProperties
}

export const OfficerCard = (props: PropsInterface) => {
    const { officer, className, style } = props
    const { firstName, lastName, role, rank } = officer

    const OFFICER_IMAGE = 'url(/images/placeholder.png)'

    const getBackgroundColor = (rank: OfficerRank) => {
        if (rank === HEAD) {
            return TRANSPARENT_TO_CYAN
        } else if (rank === MEMBER) {
            return TRANSPARENT_TO_VIOLET
        }
        return TRANSPARENT_TO_VIOLET
    }

    return (
        <div
            className="w-36 h-[13rem] md:w-52 md:h-[18rem] lg:w-72 lg:h-[25rem] min-[1200px]:w-80 min-[1200px]:h-[25rem] rounded-xl  flex flex-col md:p-4 p-3 tracking-widest bg-cover bg-top"
            style={{
                backgroundImage: `${getBackgroundColor(rank)},${OFFICER_IMAGE}`,
            }}
        >
            <span className="mt-auto font-bold lg:text-xl md:text-base text-[0.65rem]">
                {firstName}
            </span>
            <span className="font-bold lg:text-xl  md:text-base text-[0.65rem]">
                {lastName}
            </span>
            <span className="lg:text-sm md:text-xs text-[0.45rem]">{role}</span>
        </div>
    )
}
