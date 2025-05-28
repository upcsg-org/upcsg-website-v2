'use client'
import React, { useEffect, useState } from 'react'

interface GoalsProps {
    header: string
    text: string
    imageUrl: string
    orientation?: 'normal' | 'reverse'
}

const Goals: React.FC<GoalsProps> = ({
    header,
    text,
    imageUrl,
    orientation = 'normal',
}) => {
    const scalePresets = {
        ps: 0.8,
        xs: 0.85,
        ms: 0.9,
        ls: 0.95,
        '3xl': 1,
        default: 1,
    }
    const [scale, setScale] = useState(scalePresets.default)

    useEffect(() => {
        function updateScale() {
            if (window.matchMedia('(min-width: 2560px)').matches) {
                setScale(scalePresets['3xl'])
            } else if (window.matchMedia('(min-width: 948px)').matches) {
                setScale(scalePresets['ls'])
            } else if (window.matchMedia('(min-width: 648px)').matches) {
                setScale(scalePresets['ms'])
            } else if (window.matchMedia('(min-width: 500px)').matches) {
                setScale(scalePresets['xs'])
            } else if (window.matchMedia('(min-width: 372px)').matches) {
                setScale(scalePresets['ps'])
            } else {
                setScale(scalePresets.default)
            }
        }

        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [])
    const leftTranslateX =
        orientation === 'reverse' ? '-translate-x-[20%]' : '-translate-x-[80%]'
    const rightTranslateX =
        orientation === 'reverse' ? '-translate-x-[80%]' : '-translate-x-[20%]'

    return (
        <div
            className="w-full flex justify-center items-center"
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
            }}
        >
            <div className="relative w-full min-h-[24rem] pb-8">
                {/* Center Background Rectangle */}
                <div
                    className="absolute top-1/2 left-1/2 w-[85%] ps:w-[80%] md:w-[70%] h-[80%] bg-blue-500 z-10 rounded-md transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background:
                            'linear-gradient(to right, #6EDC46, #4BA761, #28737B, #184348)',
                    }}
                />

                {/* Left Text Rectangle */}
                <div
                    className={`absolute left-1/2 top-1/2 min-h-[80%] w-[85%] ps:w-[80%] md:w-[70%] z-20 rounded-md transform ${leftTranslateX} -translate-y-[20%]`}
                    style={{
                        background:
                            'linear-gradient(to bottom, #511A7C, #111120)',
                    }}
                >
                    <div
                        className={`flex flex-col w-[90%] ps:w-[80%] md:w-[60%] py-6 ${
                            orientation === 'reverse'
                                ? 'items-end text-right ml-auto'
                                : ''
                        }`}
                    >
                        <h1
                            className={`text-white font-bold pt-4 text-3xl sm:text-4xl md:text-5xl ${
                                orientation === 'reverse' ? 'pr-4' : 'pl-4'
                            }`}
                        >
                            {header}
                        </h1>
                        <div className="w-full ps:w-[80%] md:w-full">
                            <p
                                className={`text-white p-4 break-words text-base sm:text-xs md:text-base ${
                                    orientation === 'reverse' ? 'pr-4' : 'pl-4'
                                }`}
                            >
                                {text}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Image Rectangle */}
                <div
                    className={`absolute top-1/2 left-1/2 w-[85%] ps:w-[80%] md:w-[70%] h-[80%] z-20 rounded-md transform ${rightTranslateX} -translate-y-[80%]`}
                >
                    <img
                        src={imageUrl}
                        alt="Image"
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>
            </div>
        </div>
    )
}

export default Goals
