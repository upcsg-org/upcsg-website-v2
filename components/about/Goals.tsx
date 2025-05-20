import React from 'react'

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
    const leftTranslateX =
        orientation === 'reverse' ? '-translate-x-[20%]' : '-translate-x-[80%]'
    const rightTranslateX =
        orientation === 'reverse' ? '-translate-x-[80%]' : '-translate-x-[20%]'

    return (
        <div className="relative w-full h-[20rem] sm:h-[22rem] md:h-[26rem] lg:h-[28rem]">
            {/* Center Background Rectangle */}
            <div
                className="absolute top-1/2 left-1/2 w-[85%] sm:w-[80%] md:w-[70%] h-[80%] bg-blue-500 z-10 rounded-md transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    background:
                        'linear-gradient(to right, #6EDC46, #4BA761, #28737B, #184348)',
                }}
            />

            {/* Left Text Rectangle */}
            <div
                className={`absolute top-1/2 left-1/2 w-[85%] sm:w-[80%] md:w-[70%] h-[80%] z-20 rounded-md transform ${leftTranslateX} -translate-y-[20%]`}
                style={{
                    background: 'linear-gradient(to bottom, #511A7C, #111120)',
                }}
            >
                <div
                    className={`w-[90%] sm:w-[80%] md:w-[60%] ${orientation === 'reverse' ? 'ml-auto text-right' : ''}`}
                >
                    <h1
                        className={`text-white font-bold pt-4 text-3xl sm:text-4xl md:text-5xl ${
                            orientation === 'reverse' ? 'pr-4' : 'pl-4'
                        }`}
                    >
                        {header}
                    </h1>
                    <div className="w-full max-w-md">
                        <p
                            className={`text-white p-4 break-words text-sm sm:text-base ${
                                orientation === 'reverse' ? 'pr-6' : 'pl-4'
                            }`}
                        >
                            {text}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Image Rectangle */}
            <div
                className={`absolute top-1/2 left-1/2 w-[85%] sm:w-[80%] md:w-[70%] h-[80%] z-20 rounded-md transform ${rightTranslateX} -translate-y-[80%]`}
            >
                <img
                    src={imageUrl}
                    alt="Image"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
        </div>
    )
}

export default Goals
