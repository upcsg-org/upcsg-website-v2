import React from 'react'
import Goals from '../../components/about/Goals'
import LeadershipConstitution from '@/components/about/LeadershipConstitution'

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
            <LeadershipConstitution />

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
                <h2 className="text-3xl font-semibold text-center mb-8">
                    LEARN MORE
                </h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className={`p-4 rounded-lg ${item % 2 === 0 ? 'bg-green-600' : 'bg-purple-700'}`}
                        >
                            <h4 className="text-lg font-semibold mb-1">
                                TITLE
                            </h4>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default AboutPage
