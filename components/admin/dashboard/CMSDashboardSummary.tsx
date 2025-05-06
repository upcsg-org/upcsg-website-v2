'use client'

import React, { useEffect } from 'react'
import AdminDashboardCard from './AdminDashboardCard'
import Image from 'next/image'
import { useDashboardStore } from '@/store/dashboard'
import { useRouter } from 'next/navigation'

const CMSDashboardSummary: React.FC = () => {
    const router = useRouter()
    const { fetchData, dashboardData } = useDashboardStore()

    useEffect(() => {
        // Fetch dashboard data when component mounts
        fetchData()
    }, [fetchData])

    // Display a loading state if dashboardData is null
    if (!dashboardData) {
        return (
            <div className="p-6 h-fit m-7 bg-[#0e0e1a] flex justify-center items-center">
                Loading dashboard data...
            </div>
        )
    }

    return (
        <div className="p-6 h-fit m-7 bg-[#0e0e1a]">
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
                <div className="flex flex-col gap-6 md:gap-8 md:w-1/3 grow justify-between">
                    {/* Announcements Card */}
                    <AdminDashboardCard
                        count={dashboardData.announcement.count}
                        countDescription="announcement/s"
                        recentTitle={
                            dashboardData.announcement.most_recent.title
                        }
                        recentAuthor={
                            dashboardData.announcement.most_recent.article
                                ?.author || ''
                        }
                        cardTitle="ANNOUNCEMENTS"
                        cardTitleBackgroundColor="#1d2146"
                        cardBodyBackgroundColor="#2d325e"
                    />

                    {/* Events Card */}
                    <AdminDashboardCard
                        count={dashboardData.event?.count || 0}
                        countDescription="event/s"
                        recentTitle={
                            dashboardData.event?.most_recent?.title ||
                            'No events'
                        }
                        recentAuthor=""
                        cardTitle="EVENTS"
                        cardTitleBackgroundColor="#1d2146"
                        cardBodyBackgroundColor="#2d325e"
                    />

                    {/* Scholarships Card */}
                    <AdminDashboardCard
                        count={dashboardData.scholarship?.count || 0}
                        countDescription="scholarship/s"
                        recentTitle={
                            dashboardData.scholarship?.most_recent?.title ||
                            'No scholarships'
                        }
                        recentAuthor=""
                        cardTitle="SCHOLARSHIPS"
                        cardTitleBackgroundColor="#1d2146"
                        cardBodyBackgroundColor="#2d325e"
                    />

                    {/* Internships Card */}
                    <AdminDashboardCard
                        count={dashboardData.internship?.count || 0}
                        countDescription="internship/s"
                        recentTitle={
                            dashboardData.internship?.most_recent?.title ||
                            'No internships'
                        }
                        recentAuthor=""
                        cardTitle="INTERNSHIPS"
                        cardTitleBackgroundColor="#1d2146"
                        cardBodyBackgroundColor="#2d325e"
                    />
                </div>
                <div className="block md:hidden my-2 text-center mt-6 text-base tracking-wider w-full font-vietnam font-bold">
                    OVERVIEW
                </div>
                <div className="flex flex-col basis-96 md:basis-1/2 flex-shrink text-ellipsis gap-0">
                    <h2 className="text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-vietnam tracking-widest">
                        LATEST ANNOUNCEMENT
                    </h2>
                    <div className="w-full h-60 relative overflow-hidden rounded-t-2xl">
                        <Image
                            className="rounded-t-2xl"
                            src={
                                dashboardData.announcement.most_recent
                                    .image_url &&
                                dashboardData.announcement.most_recent
                                    .image_url !== ''
                                    ? dashboardData.announcement.most_recent
                                          .image_url
                                    : '/images/placeholder-standard.svg'
                            }
                            fill={true}
                            alt="Announcement picture"
                            objectFit="cover"
                        />
                    </div>
                    <div className="bg-[#1d2146] p-6 md:p-8 rounded-b-2xl flex flex-col flex-grow font-vietnam">
                        <div className="text-xl md:text-2xl font-vietnam font-semibold tracking-wide">
                            ANNOUNCEMENT
                        </div>
                        <div className="mt-3 text-lg md:text-2xl lg:text-3xl font-bold tracking-wide">
                            {dashboardData.announcement.most_recent.title}
                        </div>
                        <div className="mt-4 text-base md:text-lg whitespace-pre-line">
                            {dashboardData.announcement.most_recent.summary}
                        </div>
                        <div className="text-base md:text-lg mt-4">
                            {
                                dashboardData.announcement.most_recent
                                    .date_created
                            }
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() =>
                                    router.push('/admin/announcement')
                                }
                                className="bg-[#3a3c59] hover:bg-[#4a4e89] py-2 px-6 rounded-lg text-sm"
                            >
                                View All Announcements
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CMSDashboardSummary
