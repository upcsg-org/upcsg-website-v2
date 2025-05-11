import React from 'react'
import { motion } from 'framer-motion'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { getDateString, getDayOfWeek } from '@/utils/datetime'
import { Event } from '@/interface/event'

interface PropsInterface extends Event {}

const customNeonGradients = [
    '#41A01E',
    '#7B00C6',
    '#39A2AE',
    '#001eff',
    '#8900ff',
    '#ff008d',
]

const EventCard = (props: PropsInterface) => {
    const {
        id,
        image_url,
        title,
        start_date,
        article,
        external_url,
        location,
    } = props

    const eventPath = article ? `/events/${id}` : (external_url ?? '/')

    const neonGradient =
        customNeonGradients[
            String(id).charCodeAt(0) % customNeonGradients.length
        ]

    return (
        <motion.button
            className="relative overflow-hidden rounded-2xl max-md:w-[90%] w-full h-52 md:h-64 text-left bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${image_url}')`,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => (window.location.href = eventPath)}
        >
            {/* Top black gradient */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10" />

            {/* Bottom custom neon hex gradient */}
            <div
                className="absolute bottom-0 left-0 w-full h-full h-24 z-10"
                style={{
                    background: `linear-gradient(to top, ${neonGradient}, transparent, transparent)`,
                }}
            />

            {/* Content */}
            <div className="flex flex-col justify-between h-full p-4 relative z-20">
                <div>
                    <p className="text-lg font-vietnam font-extrabold text-white">
                        {title}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    {start_date && (
                        <div className="flex items-center">
                            <FaRegCalendarAlt className="h-4 w-4 text-white" />
                            <div className="pl-2">
                                <p className="text-sm font-bold font-vietnam text-white">
                                    {getDateString(new Date(start_date))}
                                </p>
                            </div>
                        </div>
                    )}
                    {start_date && (
                        <p className="text-sm font-thin text-white mb-2">
                            {getDayOfWeek(new Date(start_date))}
                        </p>
                    )}
                </div>
            </div>
        </motion.button>
    )
}

export default EventCard
