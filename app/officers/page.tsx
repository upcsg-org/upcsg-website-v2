import React from 'react'
import { OfficerCard } from '@/components/generics/OfficerCard'
import { officers } from '@/constants/officers'

/* green 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(65, 160, 30,0.7), rgba(65, 160, 30,1))' */
/*  skyblue 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1))' */
/* violet 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1))' */

const Officers = () => {
    const officerCount = officers.length

    const backgroundStyles = [
        {
            background:
                'linear-gradient(to bottom, rgba(65, 160, 60,1), rgba(65, 160, 60,0.9), rgba(57, 162, 174,0.9), rgba(57, 162, 174,1))',
        },
        {
            background:
                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1))',
        },
        {
            background:
                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1))',
        },
    ]

    return (
        <div>
            <div
                className="w-full text-center py-12 "
                style={backgroundStyles[0]}
            >
                <h1 className="uppercase md:text-4xl lg:text-6xl min-[1200px]:text-7xl font-bold tracking-widest">
                    Meet your <br />
                    <span className="min-[1200px]:text-8xl lg:text-7xl md:text-5xl text-xl">
                        board of directors
                    </span>
                </h1>
            </div>
            <section className="grid md:grid-cols-3 grid-cols-2 gap-y-8  md:gap-y-16 justify-items-center mt-16">
                <div className="md:col-span-3 col-span-2">
                    <OfficerCard
                        firstName={officers[0].FirstName}
                        lastName={officers[0].LastName}
                        title={officers[0].title}
                        bgStyle={{
                            backgroundImage:
                                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1)),url(/images/placeholder.png)',
                        }}
                    />
                </div>
                {officers.slice(1, officerCount - 1).map((officer, index) => (
                    <OfficerCard
                        key={officer.title}
                        firstName={officer.FirstName}
                        lastName={officer.LastName}
                        title={officer.title}
                        className="col-span-1"
                        bgStyle={{
                            backgroundImage:
                                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1)),url(/images/placeholder.png)',
                        }}
                    />
                ))}
                <div className="md:col-span-3 col-span-2">
                    <OfficerCard
                        firstName={officers[officerCount - 1].FirstName}
                        lastName={officers[officerCount - 1].LastName}
                        title={officers[officerCount - 1].title}
                        bgStyle={{
                            backgroundImage:
                                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1)),url(/images/placeholder.png)',
                        }}
                    />
                </div>
            </section>
        </div>
    )
}

export default Officers
