import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';
import React from 'react';
import { FaPen, FaPlug, FaPlus, FaTrash } from 'react-icons/fa6';

const PortfolioPage = () => {
    return (
        <div className='container mx-auto md:my-20'>
            <div className='flex flex-col justify-center items-center '>
                <h1 className='text-3xl font-bold'>Showcase Your Talent!</h1>
                <p className='text-textSecondary mb-8'>Upload your best work to let clients see your unique style and expertise.</p>
                <div className='flex justify-center items-center gap-5'>
                    <button className='border py-3 px-6 rounded-lg'>Reorganize</button>
                    {/* <button className='border bg-primary text-white py-3 px-6 rounded-lg'>Add New Portfolio</button> */}

                </div>


            </div>
            <div className='md:my-10 grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='relative'>
                    <Image src={AllImages.image1} alt="" width={500} height={500}></Image>
                    <div className='flex justify-center items-center gap-3 absolute top-2 right-2'>
                        <FaPen className='h-8 w-8 bg-neutral-100  p-1'></FaPen>
                        <FaTrash className='h-8 w-8 bg-neutral-100  p-1'></FaTrash>
                    </div>
                </div>
                <div className='relative'>
                    <Image src={AllImages.image2} alt="" width={500} height={500}></Image>
                    <div className='flex justify-center items-center gap-3 absolute top-2 right-2'>
                        <FaPen className='h-8 w-8 bg-neutral-100  p-1'></FaPen>
                        <FaTrash className='h-8 w-8 bg-neutral-100  p-1'></FaTrash>
                    </div>
                </div>
                <div className='relative'>
                    <Image src={AllImages.image3} alt="" width={500} height={500}></Image>
                    <div className='flex justify-center items-center gap-3 absolute top-2 right-2'>
                        <FaPen className='h-8 w-8 bg-neutral-100  p-1'></FaPen>
                        <FaTrash className='h-8 w-8 bg-neutral-100  p-1'></FaTrash>
                    </div>
                </div>
                <div className='relative'>
                    <Image src={AllImages.image5} alt="" width={500} height={500}></Image>
                    <div className='flex justify-center items-center gap-3 absolute top-2 right-2'>
                        <FaPen className='h-8 w-8 bg-neutral-100  p-1'></FaPen>
                        <FaTrash className='h-8 w-8 bg-neutral-100  p-1'></FaTrash>
                    </div>
                </div>
                <div className='relative'>
                    <Image src={AllImages.image6} alt="" width={500} height={500}></Image>
                    <div className='flex justify-center items-center gap-3 absolute top-2 right-2'>
                        <FaPen className='h-8 w-8 bg-neutral-100  p-1'></FaPen>
                        <FaTrash className='h-8 w-8 bg-neutral-100  p-1'></FaTrash>
                    </div>
                </div>
                <div className='h-auto border-2 border-dashed flex justify-center items-center rounded-lg'>
                    <div className='flex flex-col justify-center items-center'>
                        <FaPlus className='h-8 w-8 text-primary'></FaPlus>
                        <p className='text-primary'>Add new portfolio</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;