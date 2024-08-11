import React from 'react'
import { motion } from 'framer-motion'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { getDateString, getTimeString, getDayOfWeek } from '@/utils/datetime'
import { Event } from '@/interface/event'

interface PropsInterface extends Event {}

const EventCard = (props: PropsInterface) => {
    const { id, image, title, schedule, backgroundStyle, link, article } = props

    // Prioritizes articles over external links
    const eventPath = article ? `/events/${id}` : (link ?? '/')

    return (
        <motion.button
            className="relative overflow-hidden rounded-2xl max-md:w-[90%] w-full h-52 md:h-64 text-left bg-cover bg-center"
            style={{
                backgroundImage: `${backgroundStyle}, url('${image}')`,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => (location.href = eventPath)}
        >
            <div className="flex flex-col justify-between h-full p-4">
                <div>
                    <p className="text-lg font-vietnam font-extrabold text-white">
                        {title}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center">
                        <FaRegCalendarAlt className="h-4 w-4" />
                        <div className="pl-2">
                            <p className="text-sm font-bold font-vietnam text-white">
                                {getDateString(schedule.start)}
                            </p>
                            {getTimeString(schedule.start) &&
                                getTimeString(schedule.end) && (
                                    <p className="text-sm font-thin font-vietnam text-white">
                                        {getTimeString(schedule.start)} -{' '}
                                        {getTimeString(schedule.end)}
                                    </p>
                                )}
                        </div>
                    </div>
                    {getDayOfWeek(schedule.start) && (
                        <p className="text-sm font-thin text-white mb-2">
                            {getDayOfWeek(schedule.start)}
                        </p>
                    )}
                </div>
            </div>
        </motion.button>
    )
}

export default EventCard
