import { ReactNode } from 'react'

interface PropsInterface {
    children?: ReactNode
}

const NotFound = (props: PropsInterface) => {
    const { children = 'PAGE DOES NOT EXIST' } = props
    return (
        <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-5xl xs:text-7xl font-economica italic text-csg-green-100 font-bold text-center px-4">
                {children}
            </h1>
        </div>
    )
}

export default NotFound
