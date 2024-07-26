'use client'

import { useState } from 'react';
import { FaCloudArrowUp } from 'react-icons/fa6';
import { FaXmark } from 'react-icons/fa6';

type SuggestMerchFormProps = {
  handleClick: () => void;
};

const SuggestMerchForm = ( { handleClick }: SuggestMerchFormProps ) => {
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        course: '',
        email: '',
        number:'',
        productname: '',
        description: '',
        type: '',
      });
    
    const [selectedYear, setSelectedYear] = useState('1st year');
    const [selectedType, setSelectedType] = useState('PIN');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Removed later used for testing
        console.log(formData);
        // Handle form submission
        handleClick();
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name == 'year') {
            setSelectedYear(value);
            setFormData({
                ...formData,
                year: value,
            });
        } else if (name == 'type') {
            setSelectedType(value);
            setFormData({
                ...formData,
                type: value,
            });
        }
    };

    return (
        <div className="fixed top-0 left-0 flex justify-center items-center m-auto w-full z-50 h-full bg-main-dark bg-opacity-80" >
            <div className="bg-[#090C0F] p-6 rounded-lg w-full lg:w-9/12 xl:w-3/5 mx-5 h-fit max-h-screen overflow-auto">
                <form onSubmit={handleSubmit} className=''>
                  
                        <div className='font-vietnam font-bold'>
                            <h1 className='text-2xl md:text-4xl text-white tracking-widest flex flex-row justify-between items-center'>
                                SUBMISSION FORM
                                <button onClick={handleClick} className='bg-transparent border-none'>
                                    <FaXmark className='w-6 h-6 md:w-8 md:h-8 lg:w-8 lg:h-8'/>
                                </button>
                            </h1>
                            <h3 className='text-base md:text-xl text-[#6E7E95]'>
                                SUBMITTER'S INFORMATION
                            </h3>
                        </div>

                    <div className='flex flex-wrap items-center gap-2 md:gap-6'>

                        <div className='flex flex-col gap-1 md:gap-2 w-full md:w-5/12 flex-1 text-base min-w-[265px] max-w-[450px] text-[#171A33]'>
                            <div>
                                <label htmlFor="name" className='text-white font-light text-[#8E8E8E]'>NAME</label>
                                <input
                                type="text"
                                id="name"
                                name='name'
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none bg-white p-1 md:p-2 rounded-lg'
                                />
                            </div>

                            <div className='flex w-full flex-wrap gap-4'>
                                <div className='flex flex-col w-4/12 grow'>
                                    <label htmlFor="year" className='text-white font-light text-[#8E8E8E] whitespace-nowrap truncate'>YEAR (optional)</label>
                                    <select 
                                    id='year'
                                    name='year'
                                    value={selectedYear}
                                    onChange={handleDropdownChange}
                                    className='p-1 md:p-2 rounded-lg bg-white h-10'
                                    >
                                        <option  value="1st year">1st year</option>
                                        <option  value="2nd year">2nd year</option>
                                        <option  value="3rd year">3rd year</option>
                                        <option  value="4th year">4th year</option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>
                                <div className='w-7/12 grow'>
                                    <label htmlFor="course" className='text-white font-light text-[#8E8E8E]'>COURSE (optional)</label>
                                    <input
                                    type="text"
                                    id="course"
                                    name='course'
                                    onChange={handleChange}
                                    className='w-full bg-transparent outline-none bg-white p-1 md:p-2 rounded-lg'
                                    />
                                </div>
                            </div>

                            <div className=''>
                                <label htmlFor="email" className='text-white font-light text-[#8E8E8E]'>EMAIL</label>
                                <input
                                type="email"
                                id="email"
                                name='email'
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none bg-white p-1 md:p-2 rounded-lg'
                                />
                            </div>

                            <div>
                                <label htmlFor="number" className='text-white font-light text-[#8E8E8E]'>PHONE NUMBER</label>
                                <input
                                type="text"
                                id="number"
                                name='number'
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none bg-white p-1 md:p-2 rounded-lg'
                                />
                            </div>

                            <div>
                                <label htmlFor="productname" className='text-white font-light text-[#8E8E8E]'>NAME OF PRODUCT</label>
                                <input
                                type="text"
                                id="productname"
                                name='productname'
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none bg-white p-1 md:p-2 rounded-lg'
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className='text-white font-light text-[#8E8E8E]'>SHORT DESCRIPTION</label>
                                <input
                                type="text"
                                id="description"
                                name='description'
                                onChange={handleChange}
                                className='w-full bg-transparent outline-none bg-white p-1 md:p-2 rounded-lg'
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="type" className='text-white font-light text-[#8E8E8E]'>PRODUCT TYPE</label>
                                <select className='p-1 md:p-2 rounded-lg bg-white w-4/12'
                                id='type'
                                name='type'
                                value={selectedType}
                                onChange={handleDropdownChange}>
                                    <option  value="PIN">PIN</option>
                                    <option  value="T-SHIRT">T-SHIRT</option>
                                    <option  value="TOTE BAG">TOTE BAG</option>
                                    <option  value="STICKERS">STICKERS</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className='w-full md:w-8/12 bg-[#D8DCDF] flex-1 h-[190px] md:h-[500px] flex items-center justify-center overflow-hidden relative rounded-lg min-w-[255px]'>
                            <input type="file" id="file-upload" className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' />
                            <label htmlFor="file-upload" className='w-full h-full flex flex-col items-center justify-center cursor-pointer text-[#525252]'>
                                <FaCloudArrowUp color='#525252' className='w-16 h-16 md:w-32 md:h-32 lg:w-32 lg:h-32'/>
                                <span className='text-2xl font-bold font-vietnam tracking-widest'>UPLOAD FILE</span>
                            </label>
                        </div>
                    </div>
                    <button 
                    type='submit'
                    className='w-5/12 bg-csg-blue-400 text-white font-vietnam font-bold text-md md:text-lg py-1 px-3 md:py-3 md:px-8 mt-3 md:mt-4 rounded-[35px] tracking-widest'
                    >
                    SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SuggestMerchForm;
