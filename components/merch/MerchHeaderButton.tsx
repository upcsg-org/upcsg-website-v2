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
            className={`${styles} px-2 py-1 rounded-2xl flex flex-row gap-1 items-center`}
        >
            <Icon className="" />
            <span className="uppercase tracking-widest">{text}</span>
            <span>({count})</span>
        </div>
    )
}

export default MerchHeaderButton
