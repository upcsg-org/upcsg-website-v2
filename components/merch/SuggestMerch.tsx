'use client'

import { useState } from 'react';
import SuggestMerchForm from './SuggestMerchForm';

const SuggestMerch = () => {

    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm);
    }


    return (
        <div className='w-full'>
            {showForm && <SuggestMerchForm handleClick={handleClick} />}
            <div className='flex flex-col items-center h-fit'>
                <h1 className='font-press-start text-2xl md:text-6xl text-white max-w-[20ch] text-center'>Have a tech-savvy design in mind?</h1>
                <p className='font-vietnam text-lg md:text-3xl text-csg-gray max-w-[32ch] text-center mt-4'>Submit your binary brilliance and see it featured on our merch! Turn your computer science creativity into wearable art!</p>
                <button
                onClick={handleClick}
                className='bg-main-dark text-white font-vietnam text-lg md:text-xl py-1 md:py-2 px-3 md:px-6 border-white border-2 mt-4 rounded-3xl'
                >
                SUBMIT HERE
                </button>
            </div>
        </div>
    );
};

export default SuggestMerch;
