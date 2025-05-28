import React from 'react'

interface InfoBlockProps {
    title: string
    content: string
    buttonLink: string
}

const LeadershipConstitution = () => {
    return (
        <section
            className="bg-gray-800 py-10 px-4"
            style={{
                backgroundImage: "url('/images/placeholder.png')",
            }}
        >
            <div className="relative z-10 max-w-4xl mx-auto space-y-16">
                {/* Leadership Section */}
                <InfoBlock
                    title="OUR LEADERSHIP"
                    content="The UPCSG is led by the Board of Directors, a dedicated group of student 
                    leaders committed to upholding the values of excellence, integrity, and service. 
                    Led by the Executive Director, each Director works collaboratively to steer the 
                    organization toward its mission of empowering scholars and driving meaningful 
                    impact within the university and beyond. From advocacy campaigns and community 
                    initiatives to academic support and leadership development, they ensure that every 
                    project reflects the needs and aspirations of the UPCSG community."
                    buttonLink="/leadership"
                />

                {/* Constitution Section */}
                <InfoBlock
                    title="OUR CONSTITUTION"
                    content="We, the undergraduate Computer Science students of the University of the
                    Philippines Cebu (UP Cebu), are cognizant of the necessity to forge an organization
                    founded on the tenets of self-government, democratic representation, principles of
                    cooperation to stimulate friendly consultation, to contribute to the promotion of general
                    student interest and welfare, collaboration, and mutual assistance for the wholesome
                    enhancement of the UP Cebu community, do hereby ordain and promulgate this
                    constitution."
                    buttonLink="/constitution"
                />
            </div>
        </section>
    )
}

// Reusable InfoBlock component for each section
const InfoBlock: React.FC<InfoBlockProps> = ({
    title,
    content,
    buttonLink,
}) => {
    return (
        <div className="text-center bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-center mb-6">
                {title}
            </h2>
            <p className="text-sm md:text-base max-w-3xl mx-auto mb-8">
                {content}
            </p>
            <a
                href={buttonLink}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
            >
                Learn More
            </a>
        </div>
    )
}

export default LeadershipConstitution
