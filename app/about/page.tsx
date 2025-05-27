import React from 'react'
import Goals from '../../components/about/Goals'
import LMCard from '../../components/about/LMCard'
import LeadershipConstitution from '@/components/about/LeadershipConstitution'
import Journey from '@/components/about/Journey'

const AboutPage = () => {
    return (
        <div className="text-white">
            {/* HEADER SECTION */}
            <section className="text-center py-10 px-4 bg-[conic-gradient(from_180deg_at_50%_50%,_#39A2AE,_#6EDC46,_#8D32D4,_#636AC1)] ">
                <h1 className="text-4xl font-bold mb-4 font-vietnam ">
                    WHAT IS UPCSG?
                </h1>
                <p className="max-w-2xl mx-auto font-vietnam">
                    A diverse and dynamic community nurturing the next
                    generation of trailblazing technology leaders.
                </p>
            </section>

            {/* OUR GOALS */}
            <section className="bg-gray-900 py-10 px-4 ">
                <h2 className="text-3xl font-semibold text-center mb-12 mt-8">
                    OUR GOALS
                </h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-rows-2 gap-[180px] pt-16 pb-16">
                    <Goals
                        header="Mission"
                        text="The UPCSG is committed to empowering students to reach their 
                        full potential as Iskolars ng Bayan. Our goal is to create a vibrant
                        and supportive environment where students can connect with industry 
                        professionals, and develop the skills they need to become successful
                        innovators, scientists, engineers, designers, and more in their own 
                        right and expertise, contributing to the holistic growth of the UP 
                        Cebu community."
                        imageUrl="/images/placeholder.png"
                        orientation="normal"
                    />
                    <Goals
                        header="Vision"
                        text="The UPCSG envisions a vibrant and dynamic community of computer 
                        science students at UP Cebu, united in their pursuit of knowledge, 
                        innovation, and excellence in the field of Computer Science. We 
                        aspire to be a premier organization that empowers its members to 
                        become leaders, collaborators, innovators, and change-makers in the 
                        tech industry and beyond. By fostering a culture of integrity, 
                        inclusivity, and academic excellence, we aim to create a lasting 
                        impact within our university and the broader society."
                        imageUrl="/images/placeholder.png"
                        orientation="reverse"
                    />
                </div>
            </section>

            {/* OUR LEADERSHIP & CONSTITUTION */}
            <LeadershipConstitution />

            {/* OUR JOURNEY */}
            <Journey />

            {/* LEARN MORE */}
            <section className="bg-gray-800 py-10 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Column - Hidden on small screens */}
                    <div className="flex flex-col h-full md:block hidden">
                        <h2 className="text-3xl font-semibold ml-16 mb-8">
                            LEARN MORE
                        </h2>
                        <div className="flex flex-col flex-1 w-full h-full justify-end items-center ">
                            <img
                                src="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746736237/e3ef760a8325f33f7d2485ca75952e292d768acd_qp8dlf.png"
                                alt="person"
                                className="w-[75%] h-[75%] object-contain"
                            />
                        </div>
                    </div>

                    {/* Second Column - Always visible */}
                    <div className="p-4 flex flex-col gap-4 items-center">
                        <h2 className="text-3xl font-semibold mb-4 block md:hidden text-center">
                            LEARN MORE
                        </h2>
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746735986/dafa2019d05db1ee59b09d72fb2362711ed366e0_whfqxi.png"
                            title="COMMUNITY"
                            content="Connect with fellow CS students through shared interests, support systems, and collaborative spaces."
                            variant="violet"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746736925/8c1347931ebd6e1118082fdeb9ccb2882928ec81_k4nyoe.png"
                            title="EVENTS"
                            content="Join exciting activities like hackathons, workshops, and socials that foster learning and fun."
                            variant="green"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746737007/d47bc0f4e52811f1456899b6c2504b21c4081b38_exait2.png"
                            title="NETWORKING"
                            content="Meet industry professionals, alumni, and peers to build meaningful connections for your future."
                            variant="violet"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746737073/281a61c6735781ef86b9ca85d6f3473dc777b0bd_n2zmjt.png"
                            title="ACADEMICS"
                            content="Access resources, study groups, and peer support to help you thrive in your CS journey."
                            variant="green"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746737118/bab3010fe3a9bd1deb50ef5cdb8f0e0b3362c934_qqtz1s.png"
                            title="MERCH"
                            content="Show your Guild pride with exclusive UP CSG apparel and accessories."
                            variant="violet"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
