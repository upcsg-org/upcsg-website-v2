'use client'

import React, { useEffect } from 'react'
import AdminDashboardCard from './AdminDashboardCard'
import Image from 'next/image'
import { useDashboardStore } from '@/store/dashboard'
import { useRouter } from 'next/navigation'
import Loader from '@/components/ui/Loader'

const CMSDashboardSummary: React.FC = () => {
    const router = useRouter()
    const { fetchData, dashboardData } = useDashboardStore()

    useEffect(() => {
        // Fetch dashboard data when component mounts
        fetchData()
    }, []) // Removed fetchData from dependencies - only run on mount

    // Display a loading state if dashboardData is null
    if (!dashboardData) {
        return (
            <div className="p-4 h-fit m-7 bg-main-dark flex justify-center items-center">
                <Loader
                    size="lg"
                    text="Loading dashboard data..."
                    className="text-white"
                />
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row py-6 md:px-16 xl:px-48 h-fit m-7 bg-main-dark items-center justify-center">
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
                    <h2 className="text-center md:text-left text-xl md:text-2xl lg:text-3xl font-bold mb-4 font-vietnam">
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
                    <div className="bg-[#1d2146] p-6 md:p-8 rounded-b-2xl flex flex-col font-vietnam h-full">
                        <div className="text-sm md:text-xl font-vietnam font-semibold tracking-wide opacity-75">
                            ANNOUNCEMENT
                        </div>
                        <div className="mt-3 text-lg md:text-2xl lg:text-3xl font-bold tracking-wide text-justify">
                            {dashboardData.announcement.most_recent.title}
                        </div>
                        <div className="mt-4 text-md md:text-base whitespace-pre-line">
                            {dashboardData.announcement.most_recent.summary}
                        </div>

                        <div className="mt-auto flex flex-col md:flex-row gap-3 justify-between">
                            <div className="text-xs md:text-md mt-4">
                                {new Date(
                                    dashboardData.announcement.most_recent.date_created
                                ).toLocaleDateString()}
                            </div>

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
