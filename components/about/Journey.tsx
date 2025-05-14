"use client";

import React from 'react';

const Journey = () => {
  // Sample journey data - replace with your actual data
  const journeyEvents = [
    {
      title: "MILESTONE",
      date: "December 20, 2023",
      description: "Brief description of this milestone. This explains what happened during this period and why it was significant to our journey.",
      image: "/images/placeholder.png",
    },
    {
      title: "MILESTONE",
      date: "September 20, 2023",
      description: "Brief description of this milestone. This explains what happened during this period and why it was significant to our journey.",
      image: "/images/placeholder.png",
    },
    {
      title: "MILESTONE",
      date: "January 20, 2023",
      description: "Brief description of this milestone. This explains what happened during this period and why it was significant to our journey.",
      image: "/images/placeholder.png",
    },
    {
      title: "MILESTONE",
      date: "November 20, 2023",
      description: "Brief description of this milestone. This explains what happened during this period and why it was significant to our journey.",
      image: "/images/placeholder.png",
    }
  ];

  // Sort events by date (most recent first)
  const sortedEvents = [...journeyEvents].sort((a, b) => 
    Date.parse(b.date) - Date.parse(a.date)
  );

  return (
    <section className="bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl tracking-wide text-center text-white mb-16">
          OUR JOURNEY
        </h2>

        {/* Vertical Timeline */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-600"></div>
          
          <div className="relative">
            {sortedEvents.map((event, index) => {
              const position = index % 2 === 0 ? 'left' : 'right';
              return (
                <div key={index} className="mb-24 relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-green-600 z-10"></div>
                  
                  <div className={`flex ${position === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${position === 'left' ? 'pr-12' : 'pl-12'} ${position === 'left' ? 'text-right' : 'text-left'}`}>
                      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-left">
                        <div className="mb-4 overflow-hidden rounded-lg">
                          <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-48 object-cover object-center"
                          />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">{event.title}</h3>
                        <p className="text-gray-300">{event.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-1/2">
                      <p className={`text-sm font-medium text-gray-300 whitespace-nowrap ${position === 'left' ? 'text-left pl-8' : 'text-right pr-8'}`}>
                          {event.date}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
