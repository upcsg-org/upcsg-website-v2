import React from 'react'

interface PropsInterface {
    Icon: React.ElementType<{
        className?: string
    }>
    text: string
    count: number

    className?: string
}

const MerchHeaderButton = (props: PropsInterface) => {
    const { Icon, text, count } = props
    const styles = props.className

    return (
        <div
            className={`${styles} h-fill px-1 py-0.5 sm:px-2 sm:py-1 rounded-2xl flex flex-row gap-0.5 sm:gap-1 items-center cursor-pointer hover:text-white/75 transition-colors`}
        >
            <Icon className="text-sm md:text-lg" />
            <span className="uppercase tracking-widest max-sm:hidden text-[10px] lg:text-[11px] xl:text-sm">
                {text}
            </span>
            <span className="text-[10px] lg:text-[11px] xl:text-sm">
                ({count})
            </span>
        </div>
    )
}

export default MerchHeaderButton
