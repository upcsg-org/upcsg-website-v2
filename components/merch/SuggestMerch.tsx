'use client'

import { useState } from 'react';
import SuggestMerchForm from './SuggestMerchForm';
import Image from 'next/image';

const SuggestMerch = () => {

    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm);
    }


    return (
    <div className='w-full h-fit bg-[#090C0F] pb-[80px] lg:pb-[300px] pt-10 md:pt-14 relative'>
        {showForm && <SuggestMerchForm handleClick={handleClick} />}
        <div className='relative flex flex-col items-center h-fit z-10'>
            <h1 className='font-press-start text-2xl md:text-6xl text-[#6E7E95] max-w-[20ch] text-center'>
                Have a tech-savvy design in mind?
            </h1>
            <p className='font-vietnam text-lg md:text-3xl text-[#3B4247] max-w-[32ch] text-center mt-4'>
                Submit your binary brilliance and see it featured on our merch! Turn your computer science creativity into wearable art!
            </p>
            <button
                onClick={handleClick}
                className='bg-black text-[#5F6566] font-vietnam text-lg md:text-xl py-1 md:py-2 px-12 border-white border-2 mt-4 rounded-3xl'
            >
                SUBMIT HERE
            </button>
        </div>
        <div className='bg-[#090C0F] flex items-center justify-center absolute  bottom-[-150px] w-full z-1'>
            <Image
                src={'/images/suggest-merch-bg.png'}
                alt='Suggest Merch'
                height={1375}
                width={785}
                className='object-cover object-top w-full h-full max-w-[300px] md:max-w-[450px] lg:max-w-[700px]'
            />
        </div>
    </div>
    );
};

export default SuggestMerch;
