import React from 'react'

interface LMCardProps {
    iconUrl: string // image URL for the icon
    title: string
    content: string
    variant?: 'green' | 'violet' // optional variant prop
}

const LMCard: React.FC<LMCardProps> = ({
    iconUrl,
    title,
    content,
    variant = 'green',
}) => {
    const gradientBackground =
        variant === 'green'
            ? 'linear-gradient(to bottom, #6EDC46, #28737B)'
            : 'linear-gradient(to bottom, #636AC1, #511A7C)'

    return (
        <div
            className="flex items-center rounded-lg shadow-md p-4 w-full max-w-md"
            style={{ background: gradientBackground }}
        >
            {/* Icon on the left */}
            <div className="w-24 h-24 mr-4">
                <img
                    src={iconUrl}
                    alt={`${title} icon`}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Title and content on the right */}
            <div>
                <h3 className="text-lg font-semibold mb-1 font-vietnam text-white">
                    {title}
                </h3>
                <p className="text-white font-vietnam">{content}</p>
            </div>
        </div>
    )
}

export default LMCard
