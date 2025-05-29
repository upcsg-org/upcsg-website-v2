'use client'

import React from 'react'

const Journey = () => {
    // Sample journey data - replace with your actual data
    const journeyEvents = [
        {
            title: 'HISTORY OF UPCSG',
            date: '1996',
            description: (
                <>
                    <strong>Dr. Rachel Onate-Roxas</strong> was incharge of the
                    Outreach and Extension Division in charge of implementing
                    the BSCS programs in the different campuses.
                    <br />
                    <br />
                    Thus in <strong>1996</strong>, with the support of the UP
                    System and UPLB, UP Cebu offered the BS Computer Science
                    Program.
                </>
            ),
            image: '/images/roxas.png',
        },
        {
            title: 'UP CEBU PROGRAM PIONEERING FACILITY',
            date: '1996 - 2023',
            description: (
                <>
                    ~ Vic Caluag <br />
                    ~ Robert Roxas <br />
                    ~ Pauline Wade <br />
                    ~ Josephine Garcia <br />
                    ~ Ralph Laviste <br />
                    ~ Rey Joseph Fernandez <br />
                    ~ Francis Talam <br />
                    ~ Paul Cabral <br />
                    ~ Roel Lauron <br />
                    ~ Jenny Codenera - Yap <br />
                </>
            ),
            image: '/images/faculty.png',
        },
        {
            title: 'UP COMPUTER SCIENCE GUILD',
            date: '1996',
            description: (
                <>
                    Among the first batch of students is{' '}
                    <strong>Rey Joseph Fernandez</strong>.
                    <br />
                    <br />
                    He insisted that a separate organization be created for the
                    BS Computer Science students, leading the way for the
                    establishment of the
                    <strong> UP Computer Science Guild (UPCSG)</strong>.
                </>
            ),
            image: '/images/guild.png',
        },
        {
            title: 'FIRST BATCH (ON-TIME) GRADUATES',
            date: '1996',
            description: (
                <>
                    First batch of students who graduated on time were{' '}
                    <strong>
                        all hired by NEC-Telecom Software Philippines:
                    </strong>
                    <br />
                    <br />
                    ~ Gloridel Malingin <br />
                    ~ Lizelle Lingo <br />
                    ~ Roel Reales <br />~ Adrian Bono
                </>
            ),
            image: '/images/batch.png',
        },
    ]

    // Sort events by date (most recent first)
    const sortedEvents = [...journeyEvents].sort(
        (a, b) => Date.parse(b.date) - Date.parse(a.date)
    )

    return (
        <section className="bg-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-center text-white mb-16">
                    OUR JOURNEY
                </h2>

                {/* Vertical Timeline */}
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-600"></div>

                    <div className="relative">
                        {sortedEvents.map((event, index) => {
                            const position = index % 2 === 0 ? 'left' : 'right'
                            return (
                                <div key={index} className="mb-24 relative">
                                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-green-600 z-10"></div>

                                    <div
                                        className={`flex flex-col md:${position === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
                                    >
                                        <div
                                            className={`w-full md:w-1/2 ${position === 'left' ? 'md:pr-12' : 'md:pl-12'} ${position === 'left' ? 'md:text-right' : 'md:text-left'}`}
                                        >
                                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
                                                <div className="mb-4 overflow-hidden rounded-lg">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-48 object-cover object-center"
                                                    />
                                                </div>
                                                <h3 className="text-lg md:text-2xl font-bold mb-2 text-white">
                                                    {event.title}
                                                </h3>
                                                <p className="text-sm md:text-base text-gray-300">
                                                    {event.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
                                            <p
                                                className={`text-sm font-medium text-gray-300 whitespace-nowrap ${position === 'left' ? 'text-left pl-8' : 'text-right pr-8'}`}
                                            >
                                                {event.date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Journey
