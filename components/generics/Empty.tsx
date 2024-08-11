import { ReactNode } from 'react'

interface PropsInterface {
    children: ReactNode
}

const Empty = (props: PropsInterface) => {
    const { children } = props

    return <div className="w-full py-32 flex justify-center">{children}</div>
}

export default Empty
