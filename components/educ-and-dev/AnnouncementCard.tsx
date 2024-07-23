// AnnouncementCard.tsx
import React from 'react'
import { motion } from 'framer-motion'

interface AnnouncementCardProps {
    image: string
    title: string
    date: string
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
    image,
    title,
    date,
}) => {
    return (
        <motion.button
            className="bg-csg-blue-400 overflow-hidden w-full max-w-64 h-80 text-left"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <img src={image} alt={title} className="w-full h-40 object-cover" />
            <div className="p-3 relative h-40">
                <h2 className="text-xs sm:text-base font-thin font-vietnam mb-1 text-white">
                    ANNOUNCEMENT
                </h2>
                <p className="text-sm sm:text-base font-semibold mb-1 text-white">
                    {title}
                </p>
                <p className="text-xs sm:text-base text-white absolute bottom-4">{date}</p>
            </div>
        </motion.button>
    )
}

export default AnnouncementCard