import React from 'react'
import AdminDashboardCard from './AdminDashboardCard'
import { dashboardData, latestAnnouncement } from './AdminDashboardMockValues'
import Image from 'next/image'

const CMSDashboardSummary: React.FC = () => {
    const { imgPath, title, description, date } = latestAnnouncement
    return (
        <div className="p-8 h-fit m-7">
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 basis-1/4">
                <div className="flex flex-col gap-8 flex-1 basis-1 grow justify-between">
                    {dashboardData.map((item, index) => (
                        <AdminDashboardCard
                            key={index}
                            count={item.count}
                            countDescription={item.countDescription}
                            recentTitle={item.recentTitle}
                            recentAuthor={item.recentAuthor}
                            cardTitle={item.cardTitle}
                            cardTitleBackgroundColor={
                                item.cardTitleBackgroundColor
                            }
                            cardBodyBackgroundColor={
                                item.cardBodyBackgroundColor
                            }
                        />
                    ))}
                </div>
                <div className="block md:hidden my-2 text-center mt-6 text-base tracking-wider w-full font-vietnam font-bold">
                    OVERVIEW
                </div>
                <div className="flex flex-col flex-1 basis-96 flex-shrink text-ellipsis gap-0">
                    <h2 className="text-center md:text-left text-base md:text-lg lg:text-4xl font-semibold mb-4 font-vietnam tracking-wider">
                        LATEST ANNOUNCEMENT
                    </h2>
                    <div className="w-full h-1/2 relative overflow-hidden">
                        <Image
                            className="rounded-t-2xl"
                            src={imgPath}
                            fill={true}
                            alt="Announcement picture"
                            objectFit="cover"
                        />
                    </div>
                    <div className="bg-[#2b3163] p-4 md:p-6 lg:p-8 rounded-b-2xl flex flex-col flex-grow">
                        <div className="text-center md:text-left text-sm md:text-xl lg:text-2xl font-light tracking-wide">
                            ANNOUNCEMENT
                        </div>
                        <div className="mt-4 text-xs md:text-sm lg:text-xl font-bold tracking-wide">
                            {title}
                        </div>
                        <div className="mt-2 text-xs md:text-sm lg:text-xl whitespace-pre-line">
                            {description}
                        </div>
                        <div className="text-xs md:text-sm lg:text-xl mb-1 mt-2">
                            {date}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CMSDashboardSummary
