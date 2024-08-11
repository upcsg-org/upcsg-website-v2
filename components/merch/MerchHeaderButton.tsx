import React from 'react'

interface PropsInterface {
    Icon: React.ElementType<{
        className?: string
    }>
    text: string
    count: number

    clickEvent?: () => void

    className?: string
}

const MerchHeaderButton = (props: PropsInterface) => {
    const { Icon, text, count, clickEvent } = props
    const styles = props.className

    return (
        <button
            className={`${styles} h-fill px-2 py-1 rounded-2xl flex flex-row gap-0.5 sm:gap-1 items-center cursor-pointer hover:text-white/75 transition-colors`}
            onClick={clickEvent}
        >
            <Icon className="text-sm md:text-lg" />
            <span className="uppercase tracking-widest max-sm:hidden text-[10px] lg:text-[11px] xl:text-sm">
                {text}
            </span>
            <span className="text-[10px] lg:text-[11px] xl:text-sm">
                ({count})
            </span>
        </button>
    )
}

export default MerchHeaderButton
