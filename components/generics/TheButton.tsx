import { ReactNode } from 'react'
import Link from 'next/link'

interface PropsInterface {
    link?: string
    children: ReactNode
    style?: string
    onClick?: () => void
}

const TheButton = (props: PropsInterface) => {
    const { link = '', style = '', children, onClick = () => {} } = props

    const isExternalLink = (link: string) => !link.startsWith('/')

    const className ='hover:-translate-y-1 duration-200 md:hover:scale-110 bg-csg-green-100 rounded-xl uppercase text-xs md:text-sm px-4 py-3 ' +  style

    if (link) {
        if (isExternalLink(link)) {
            return (
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                    onClick={onClick}
                >
                    {children}
                </a>
            )
        } else {
            return (
                <Link href={link} className="gap-4 md:border-lg" onClick={onClick}>
                    <div className={className}>{children}</div>
                </Link>
            )
        }
    } else {
        return (
            <button onClick={onClick} className={className} type="submit">
                {children}
            </button>
        )
    }
}

export default TheButton
