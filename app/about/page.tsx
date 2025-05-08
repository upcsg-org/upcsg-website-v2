import React from 'react'
import Goals from '../../components/about/Goals'
import LMCard from '../../components/about/LMCard'

const AboutPage = () => {
    return (
        <div className="text-white">
            {/* HEADER SECTION */}
            <section className="text-center py-10 px-4 bg-[conic-gradient(from_180deg_at_50%_50%,_#39A2AE,_#6EDC46,_#8D32D4,_#636AC1)] ">
                <h1 className="text-4xl font-bold mb-4 font-vietnam ">
                    WHAT IS UPCSG?
                </h1>
                <p className="max-w-2xl mx-auto font-vietnam">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla facilisi. Sed viverra diam in nulla aliquet, eu
                    condimentum justo efficitur.
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
                        text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque habitant morbi tristique senectus et netus."
                        imageUrl="put image here"
                        orientation="normal"
                    />
                    <Goals
                        header="Vission"
                        text=" Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque habitant morbi tristique senectus et netus."
                        imageUrl="put image here"
                        orientation="reverse"
                    />
                </div>
            </section>

            {/* OUR LEADERSHIP & CONSTITUTION */}
            <section className="bg-gray-800 py-10 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    OUR LEADERSHIP
                </h2>
                <div className="max-w-4xl mx-auto text-center mb-6">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque habitant morbi tristique senectus et netus.
                    </p>
                </div>
                <h2 className="text-3xl font-semibold text-center mb-4">
                    OUR CONSTITUTION
                </h2>
                <div className="max-w-4xl mx-auto text-center">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque habitant morbi tristique senectus et netus.
                    </p>
                </div>
            </section>

            {/* OUR JOURNEY */}
            <section className="bg-gray-900 py-10 px-4">
                <h2 className="text-3xl font-semibold text-center mb-8">
                    OUR JOURNEY
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="bg-gray-700 p-4 rounded-lg text-center"
                        >
                            <div className="h-32 bg-gray-600 mb-2 rounded"></div>
                            <h4 className="text-lg font-semibold">TITLE</h4>
                        </div>
                    ))}
                </div>
            </section>

            {/* LEARN MORE */}
            <section className="bg-gray-800 py-10 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
                    <div className="flex flex-col h-full">
                        <h2 className="text-3xl font-semibold ml-16 mb-8">
                            LEARN MORE
                        </h2>
                        <div className="flex flex-1 w-full justify-end items-center">
                            <img
                                src="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746736237/e3ef760a8325f33f7d2485ca75952e292d768acd_qp8dlf.png"
                                alt="person"
                                className="w-[75%] h-[75%] object-contain"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746735986/dafa2019d05db1ee59b09d72fb2362711ed366e0_whfqxi.png"
                            title="TITLE"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                            variant="violet"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746736925/8c1347931ebd6e1118082fdeb9ccb2882928ec81_k4nyoe.png"
                            title="TITLE"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                            variant="green"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746737007/d47bc0f4e52811f1456899b6c2504b21c4081b38_exait2.png"
                            title="TITLE"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                            variant="violet"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746737073/281a61c6735781ef86b9ca85d6f3473dc777b0bd_n2zmjt.png"
                            title="TITLE"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                            variant="green"
                        />
                        <LMCard
                            iconUrl="https://res.cloudinary.com/dlz7oiktg/image/upload/v1746737118/bab3010fe3a9bd1deb50ef5cdb8f0e0b3362c934_qqtz1s.png"
                            title="TITLE"
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                            variant="violet"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
