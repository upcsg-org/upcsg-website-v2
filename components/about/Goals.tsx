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
    // Calculate translate-x values based on orientation
    const leftTranslateX =
        orientation === 'reverse' ? '-translate-x-[20%]' : '-translate-x-[80%]'
    const rightTranslateX =
        orientation === 'reverse' ? '-translate-x-[80%]' : '-translate-x-[20%]'

    return (
        <div className="relative w-full h-96">
            {/* Center Background Rectangle */}
            <div
                className="absolute top-1/2 left-1/2 w-[70%] h-[80%] bg-blue-500 z-10 rounded-md transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    background:
                        'linear-gradient(to right, #6EDC46, #4BA761, #28737B, #184348)',
                }}
            />

            {/* Left Text Rectangle */}
            <div
                className={`absolute top-1/2 left-1/2 w-[70%] h-[80%] bg-green-500 z-20 rounded-md transform ${leftTranslateX} -translate-y-[20%]`}
                style={{
                    background: 'linear-gradient(to bottom, #511A7C, #111120)',
                }}
            >
                <div
                    className={`w-[60%] ${orientation === 'reverse' ? 'ml-auto text-right' : ''}`}
                >
                    <h1 className="text-white font-bold pl-4 pt-4 text-5xl">
                        {header}
                    </h1>
                    <p className="text-white p-4 mr-12">{text}</p>
                </div>
            </div>

            {/* Right Image Rectangle */}
            <div
                className={`absolute top-1/2 left-1/2 w-[70%] h-[80%] bg-gray-500 z-20 rounded-md transform ${rightTranslateX} -translate-y-[80%]`}
            >
                {/* <img
                    src={imageUrl}
                    alt="Image"
                    className="w-full h-full object-cover rounded-md"
                /> */}
                <h1 className="text-black font-bold text-center">{imageUrl}</h1>
            </div>
        </div>
    )
}

export default Goals
