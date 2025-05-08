import React from 'react';

interface InfoBlockProps {
    title: string;
    content: string;
    buttonLink: string;
}

const LeadershipConstitution = () => {
  return (
    <section 
        className="bg-gray-800 py-10 px-4"
        style={{
            backgroundImage: "url('/images/placeholder.png')"
        }}>
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-16">
        {/* Leadership Section */}
        <InfoBlock 
          title="OUR LEADERSHIP"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          buttonLink="/leadership"
        />
        
        {/* Constitution Section */}
        <InfoBlock 
          title="OUR CONSTITUTION"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          buttonLink="/constitution"
        />
      </div>
    </section>
  );
};

// Reusable InfoBlock component for each section
const InfoBlock: React.FC<InfoBlockProps> = ({ title, content, buttonLink }) => {
  return (
    <div className="text-center bg-gray-900 bg-opacity-80 rounded-lg p-8 shadow-lg">
      <h2 className="text-3xl tracking-wide text-center mb-6">
        {title}
      </h2>
      <p className="max-w-3xl mx-auto mb-8">
        {content}
      </p>
      <a 
        href={buttonLink} 
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
      >
        Learn More
      </a>
    </div>
  );
};

export default LeadershipConstitution;
