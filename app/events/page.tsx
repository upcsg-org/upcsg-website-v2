import React from 'react'
import EventPage from '@/components/events/EventPage'

const EventsPage = () => {
    return (
        <div>
            <div
                className="flex w-full items-center justify-center text-center bg-gradient-to-r
                            from-csg-blue-600/25 to-csg-blue-600/25 via-csg-blue-600 h-28 sm:h-36 xl:h-56
                            tracking-widest font-vietnam font-bold text-white text-xl sm:text-4xl xl:text-6xl"
            >
                ORGANIZATION
                <br />
                EVENTS
            </div>
            <EventPage />
        </div>
    )
}

export default EventsPage
