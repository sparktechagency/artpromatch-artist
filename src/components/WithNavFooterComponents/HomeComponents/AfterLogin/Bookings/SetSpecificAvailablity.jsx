'use client'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import Link from 'next/link';
import { SlCalender } from 'react-icons/sl';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

const localizer = momentLocalizer(moment);

const events = [
    { title: '09:00 - 10:00', start: new Date(2024, 11, 27, 9, 0), end: new Date(2024, 11, 27, 10, 0) },
    { title: '13:00 - 14:00', start: new Date(2024, 11, 27, 13, 0), end: new Date(2024, 11, 27, 14, 0) },
    { title: '09:00 - 10:00', start: new Date(2024, 11, 28, 9, 0), end: new Date(2024, 11, 28, 10, 0) },
    { title: '13:00 - 14:00', start: new Date(2024, 11, 28, 13, 0), end: new Date(2024, 11, 28, 14, 0) },
    { title: '13:00 - 14:00', start: new Date(2024, 11, 29, 13, 0), end: new Date(2024, 11, 29, 14, 0) },
    { title: '08:00 - 10:00', start: new Date(2024, 11, 1, 8, 0), end: new Date(2024, 11, 1, 10, 0) },
];

const SetSpecificAvailablity = () => {
    const [view, setView] = useState('month');

    return (
        <div className='container mx-auto'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0 my-5 border-0 border-b'>
                <div className='flex flex-col lg:flex-row justify-start items-center gap-2'>
                    <div className='flex justify-start items-start gap-2 p-5'>
                        <Image src={AllImages.user} alt='logo' height={160} width={160} className="h-20 w-20    "></Image>
                        <div>
                            <h1 className='text-xl font-bold'>Alisha John</h1>
                            <h4 className='text-sm text-neutral-500'>Brooklyn, NY</h4>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <div>
                        <h1 className='text-xl font-bold'>Type</h1>
                        <h4 className='text-sm text-primary flex items-center gap-2'>On Location <IoIosArrowDown className='h-4 w-4 ' /></h4>
                    </div>
                    <div>
                        <h1 className='text-xl font-bold'>Time zone</h1>
                        <h4 className='text-sm text-primary flex items-center gap-2'>Eastern Time - US & Canada <IoIosArrowDown className='h-4 w-4 ' /></h4>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center my-6'>
                <div>
                    <h1 className='text-2xl font-bold'>December 2024</h1>
                    <p p className='text-sm text-neutral-500'>Check Alex availability</p>
                </div>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
                    <button className='px-3 py-1 rounded-xl border flex justify-center items-center gap-2 border-primary text-primary'>Specific Availability</button>
                    <button className='px-3 py-1 rounded-xl border flex justify-center items-center gap-2 border-dashed text-red-500'>Set Time off</button>
                    <IoIosArrowBack className='h-8 w-8 border p-1' />
                    <IoIosArrowForward className='h-8 w-8 border p-1' />
                </div>
            </div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600, background: 'white', padding: '10px', borderRadius: '8px' }}
                views={['month']}
                defaultView={view}
                onView={(newView) => setView(newView)}
                eventPropGetter={() => ({ style: { backgroundColor: '#e3fcef', color: '#097969', borderRadius: '5px', padding: '2px' } })}
            />
        </div>
    );
};

export default SetSpecificAvailablity;
