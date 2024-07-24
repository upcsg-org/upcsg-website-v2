import React from 'react'
import { motion } from 'framer-motion'
import { FaRegCalendarAlt } from 'react-icons/fa'

interface EventCardProps {
    image: string
    title: string
    date: string
    time: string
    dayOfWeek: string
    backgroundStyle: string
}

const EventCard: React.FC<EventCardProps> = ({
    image,
    title,
    date,
    time,
    dayOfWeek,
    backgroundStyle,
}) => {
    return (
        <motion.button
            className="relative overflow-hidden rounded-2xl w-full max-w-80 h-64 text-left bg-cover bg-center"
            style={{
                backgroundImage: `${backgroundStyle}, url('${image}')`,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex flex-col justify-between h-full p-4">
                <div>
                    <p className="text-lg font-vietnam font-extrabold text-white">
                        {title}
                    </p>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex justify-between">
                        <FaRegCalendarAlt className="h-4 w-4 mt-3" />
                        <div className="pl-2">
                            <p className="text-sm font-bold font-vietnam text-white">
                                {date}
                            </p>
                            <p className="text-sm font-thin font-vietnam text-white">
                                {time}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm font-thin text-white mb-2">
                        {dayOfWeek}
                    </p>
                </div>
            </div>
        </motion.button>
    )
}

export default EventCard
