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
    const authorLabel =
        cardTitle === 'internships'
            ? `at ${recentAuthor}`
            : `by ${recentAuthor}`
    return (
        <div className="gap-0">
            <div
                style={{ backgroundColor: cardTitleBackgroundColor }}
                className={`font-vietnam rounded-t-2xl underline underline-offset-2 text-center p-2 text-xs md:text-sm lg:text-xl`}
            >
                {cardTitle.toUpperCase()}
            </div>
            <div
                style={{ backgroundColor: cardBodyBackgroundColor }}
                className={`flex flex-col grow gap-3 md:gap-5 sm:flex-row text-white p-4 md:p-6 lg:p-8 rounded-b-2xl`}
            >
                <div className="flex flex-col basis-1/2 md:flex-row gap-1">
                    <div className="text-3xl md:text-6xl lg:text-8xl font-bold self-center">
                        {count}
                    </div>
                    <div className="text-xs md:text-base lg:text-xl h-fit text-center md:text-left whitespace-pre-line">
                        {countDescription}
                    </div>
                </div>
                <div className="flex-col text-center md:text-left basis-1/2 font-vietnam">
                    <div className="text-base md:text-xl lg:text-3xl font-vietnam font-semibold text-[#ffcf81] p-0 m-0">
                        most recent:
                    </div>
                    <div className="">
                        <a
                            href="/"
                            className="underline underline-offset-2 text-xs md:text-sm lg:text-2xl font-vietnam p-0"
                        >
                            {recentTitle}
                        </a>
                    </div>
                    <div className="text-xs lg:text-xl">{authorLabel}</div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardCard
