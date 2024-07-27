import { OfficerCard } from '@/components/generics/OfficerCard'
import React from 'react'
/* green 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(65, 160, 30,0.7), rgba(65, 160, 30,1))' */
/*  skyblue 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1))' */
/* violet 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1))' */
const Officers = () => {
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

    const UPCSGofficers = [
        {
            FirstName: 'BAZER TIMOTHY',
            LastName: 'NUÑEZ',
            title: 'Executive Director',
        },
        { FirstName: 'TRISHIA MAE', LastName: 'BASMAYOR', title: 'Secretary' },
        {
            FirstName: 'CHRISTIAN JAMES',
            LastName: 'BAYADOG',
            title: 'Co-Finance: Treasurer',
        },
        {
            FirstName: 'CEFERINO',
            LastName: 'JUMAO-AS V',
            title: 'Co-Finance: Auditor',
        },
        {
            FirstName: 'ISHAH NICHOLEI',
            LastName: 'BAUTISTA',
            title: 'Marketing Director',
        },
        {
            FirstName: 'CHRISTINE MAE',
            LastName: 'BAGAZIN',
            title: 'Partnerships & Linkages Director',
        },
        {
            FirstName: 'MON ANDREW',
            LastName: 'RETUYA',
            title: 'Communication & Logistics Director',
        },
        {
            FirstName: 'JAMES GABRIEL',
            LastName: 'ELIJAH TY',
            title: 'Education & Development Director ',
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
            <section
                className="md:grid md:grid-cols-3 flex flex-col items-center  gap-y-8 md:gap-y-16 justify-items-center mt-16"
                style={{
                    gridTemplateAreas: `'first first first' 'second second second ' 'third third third' 'fourth fourth fourth'`,
                }}
            >
                <div className="col-span-3" style={{ gridArea: 'first' }}>
                    <OfficerCard
                        firstName={UPCSGofficers[0].FirstName}
                        lastName={UPCSGofficers[0].LastName}
                        title={UPCSGofficers[0].title}
                        bgStyle={{
                            backgroundImage:
                                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1)),url(/images/placeholder.png)',
                        }}
                    />
                </div>
                {UPCSGofficers.slice(1, UPCSGofficers.length - 1).map(
                    (officer, index) => (
                        <OfficerCard
                            key={officer.title}
                            firstName={officer.FirstName}
                            lastName={officer.LastName}
                            title={officer.title}
                            className="col-span-1 "
                            style={{ gridArea: `officer${index + 1}` }}
                            bgStyle={{
                                backgroundImage:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1)),url(/images/placeholder.png)',
                            }}
                        />
                    )
                )}
                <div className="col-span-3" style={{ gridArea: 'fourth' }}>
                    <OfficerCard
                        firstName={
                            UPCSGofficers[UPCSGofficers.length - 1].FirstName
                        }
                        lastName={
                            UPCSGofficers[UPCSGofficers.length - 1].LastName
                        }
                        title={UPCSGofficers[UPCSGofficers.length - 1].title}
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
