import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getDateString } from '@/utils/datetime'

interface PropsInterface {
    image: string
    title: string
    date: Date
}

const AnnouncementCard = (props: PropsInterface) => {
    const { image, title, date } = props

    return (
        <motion.button
            className="bg-csg-blue-400 overflow-hidden w-full max-w-64 h-80 text-left"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => (location.href = '/coming-soon')}
        >
            <div className="relative h-40 w-full">
                <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <div className="p-3 relative h-40">
                <h2 className="text-xs sm:text-base font-thin font-vietnam mb-1 text-white">
                    ANNOUNCEMENT
                </h2>
                <p className="text-sm sm:text-base font-semibold mb-1 text-white">
                    {title}
                </p>
                <p className="text-xs sm:text-base text-white absolute bottom-4">
                    {getDateString(date)}
                </p>
            </div>
        </motion.button>
    )
}

export default AnnouncementCard
