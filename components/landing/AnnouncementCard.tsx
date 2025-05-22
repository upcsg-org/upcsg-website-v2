import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Announcement } from '@/interface/announcement'
import { getDateString } from '@/utils/datetime'

interface PropsInterface extends Announcement {}

const AnnouncementCard = (props: PropsInterface) => {
    const dateObj = new Date(props.date_updated)
    const formattedDate = getDateString(dateObj)

    const articlePath = props.article
        ? `/announcements/${props.id}`
        : props.external_url
          ? props.external_url
          : null

    const isClickable = !!articlePath

    return (
        <motion.button
            className={`bg-csg-blue-400 overflow-hidden w-full max-w-64 min-w-64 h-80 text-left ${
                isClickable
                    ? 'cursor-pointer hover:scale-[1.02] hover:bg-csg-blue-600/50 duration-200'
                    : 'cursor-default'
            }`}
            whileHover={isClickable ? { scale: 1.05 } : undefined}
            transition={{ duration: 0.3 }}
            onClick={() => {
                if (isClickable && articlePath) {
                    window.location.href = articlePath
                }
            }}
        >
            <div className="relative h-40 w-full">
                <Image
                    src={props.image_url ?? '/images/placeholder-standard.svg'}
                    alt={props.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-3 relative h-40">
                <h2 className="text-xs sm:text-base font-thin font-vietnam mb-1 text-white">
                    ANNOUNCEMENT
                </h2>
                <p className="text-sm sm:text-base font-semibold mb-1 text-white">
                    {props.title}
                </p>
                <p className="text-xs sm:text-base text-white absolute bottom-4">
                    {formattedDate}
                </p>
            </div>
        </motion.button>
    )
}

export default AnnouncementCard
