import React from 'react'

interface AdminDashboardCardProps {
    count: number
    countDescription: string
    recentTitle: string
    recentAuthor: string
    cardTitle: string
    cardTitleBackgroundColor: string
    cardBodyBackgroundColor: string
}

const AdminDashboardCard: React.FC<AdminDashboardCardProps> = ({
    count,
    countDescription,
    recentTitle,
    recentAuthor,
    cardTitle,
    cardTitleBackgroundColor,
    cardBodyBackgroundColor,
}) => {
    const cardLinks: Record<string, string> = {
        announcements: '/admin/announcement',
        events: '/admin/event',
        scholarships: '/admin/scholarship',
        internships: '/admin/internship',
    }

    const lowerTitle = cardTitle.toLowerCase()
    const href = cardLinks[lowerTitle] || '/admin'

    return (
        <div className="gap-0">
            <a
                href={href}
                className="block rounded-t-2xl text-center py-4 transition-colors duration-200 hover:opacity-75"
                style={{ backgroundColor: cardTitleBackgroundColor }}
            >
                <div className="font-bold text-xs md:text-sm lg:text-xl font-vietnam underline sm:no-underline sm:hover:underline underline-offset-2">
                    {cardTitle.toUpperCase()}
                </div>
            </a>

            <div
                style={{ backgroundColor: cardBodyBackgroundColor }}
                className={`flex flex-col gap-3 md:gap-2 sm:flex-row w-full text-white p-4 md:p-6 md:pt-4 pb-7 rounded-b-2xl`}
            >
                <div className="flex flex-col w-full  md:basis-1/3 lg:basis-1/2 lg:flex-row gap-2 md:gap-0.5 lg:gap-2 flex-wrap">
                    <div className="text-3xl md:text-3xl lg:text-4xl font-bold self-center md:self-start lg:self-center">
                        {count}
                    </div>
                    <div className="text-xs md:text-sm self-center md:self-start lg:self-center lg:text-base h-fit text-center md:text-left whitespace-pre-line">
                        {countDescription}
                    </div>
                </div>
                <div className="flex-col text-center md:text-left w-full md:basis-1/2 font-vietnam flex-grow">
                    <div className="text-lg md:text-xl lg:text-xl font-vietnam font-semibold text-[#ffcf81] p-0 m-0">
                        most recent:
                    </div>
                    <div className="">
                        <a
                            href="/"
                            className="underline sm:no-underline sm:hover:underline underline-offset-2 text-xs md:text-sm lg:text-lg font-vietnam p-0"
                        >
                            {recentTitle}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardCard
