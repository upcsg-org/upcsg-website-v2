import { ReactNode } from 'react'
import Link from 'next/link'

interface PropsInterface {
    link?: string
    children: ReactNode
    className?: string // Renamed from style to className for clarity
    onClick?: () => void
}

const TheButton = (props: PropsInterface) => {
    const { link = '', className = '', children, onClick = () => {} } = props

    const isExternalLink = (link: string) => !link.startsWith('/')

    // Combine default classes with any external className passed as a prop
    const combinedClassName = 
        'hover:-translate-y-1 duration-200 md:hover:scale-100 rounded-3xl uppercase md:text-sm px-4 py-3 ' + 
        (className ? className + ' ' : ''); 

    if (link) {
        if (isExternalLink(link)) {
            return (
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className={combinedClassName}
                    onClick={onClick}
                >
                    {children}
                </a>
            )
        } else {
            return (
                <Link href={link} onClick={onClick}>
                    <div className={combinedClassName}>{children}</div>
                </Link>
            )
        }
    } else {
        return (
            <button onClick={onClick} className={combinedClassName} type="submit">
                {children}
            </button>
        )
    }
}

export default TheButton
