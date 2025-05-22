'use client'
import React from 'react'

interface RedirectState {
    type: string
}

interface ChooseRedirectProps {
    redirectState: string
    setRedirectState: (value: string) => void
}

export const ChooseRedirect: React.FC<ChooseRedirectProps> = ({
    redirectState,
    setRedirectState,
}) => {
    const handleRedirectChange = (value: string) => {
        setRedirectState(value)
    }

    return (
        <div className="font-vietnam space-y-2">
            <h1 className="font-semibold text-md">Redirect Setting</h1>
            <div className="flex justify-around md:w-[50%] lg:w-[40%] uppercase bg-black rounded-lg text-xs md:text-base tracking-widest">
                <button
                    className={`rounded-lg w-full h-full p-2 text-center uppercase ${redirectState === 'none' ? 'bg-csg-green-100' : ''}`}
                    onClick={() => handleRedirectChange('none')}
                >
                    none
                </button>
                <button
                    className={`rounded-lg w-full h-full p-2 text-center uppercase ${redirectState === 'link' ? 'bg-csg-green-100' : ''}`}
                    onClick={() => handleRedirectChange('link')}
                >
                    link
                </button>
                <button
                    className={`rounded-lg  w-full h-full p-2 text-center uppercase ${redirectState === 'article' ? 'bg-csg-green-100' : ''}`}
                    onClick={() => handleRedirectChange('article')}
                >
                    article
                </button>
            </div>
        </div>
    )
}
