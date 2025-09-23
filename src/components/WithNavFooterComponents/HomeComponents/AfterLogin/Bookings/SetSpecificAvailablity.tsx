'use client';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: '09:00 - 10:00',
    start: new Date(2024, 11, 27, 9, 0),
    end: new Date(2024, 11, 27, 10, 0),
  },
  {
    title: '13:00 - 14:00',
    start: new Date(2024, 11, 27, 13, 0),
    end: new Date(2024, 11, 27, 14, 0),
  },
  {
    title: '09:00 - 10:00',
    start: new Date(2024, 11, 28, 9, 0),
    end: new Date(2024, 11, 28, 10, 0),
  },
  {
    title: '13:00 - 14:00',
    start: new Date(2024, 11, 28, 13, 0),
    end: new Date(2024, 11, 28, 14, 0),
  },
  {
    title: '13:00 - 14:00',
    start: new Date(2024, 11, 29, 13, 0),
    end: new Date(2024, 11, 29, 14, 0),
  },
  {
    title: '08:00 - 10:00',
    start: new Date(2024, 11, 1, 8, 0),
    end: new Date(2024, 11, 1, 10, 0),
  },
];

type CalendarView = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

const SetSpecificAvailability = () => {
  const [view, setView] = useState<CalendarView>('month');

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0 my-5 border-b pb-5">
        <div className="flex items-center gap-4">
          <Image
            src={AllImages.user}
            alt="Profile"
            height={80}
            width={80}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">Alisha John</h1>
            <h4 className="text-sm text-neutral-500">Brooklyn, NY</h4>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <h1 className="text-xl font-bold">Type</h1>
            <h4 className="text-sm text-primary flex items-center gap-2">
              On Location <IoIosArrowDown className="h-4 w-4" />
            </h4>
          </div>
          <div>
            <h1 className="text-xl font-bold">Time Zone</h1>
            <h4 className="text-sm text-primary flex items-center gap-2">
              Eastern Time - US & Canada <IoIosArrowDown className="h-4 w-4" />
            </h4>
          </div>
        </div>
      </div>

      {/* Calendar Actions */}
      <div className="flex justify-between items-center my-6">
        <div>
          <h1 className="text-2xl font-bold">December 2024</h1>
          <p className="text-sm text-neutral-500">Check Alex availability</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-xl border border-primary text-primary">
            Specific Availability
          </button>
          <button className="px-3 py-1 rounded-xl border border-dashed text-red-500">
            Set Time Off
          </button>
          <IoIosArrowBack className="h-8 w-8 border p-1 cursor-pointer" />
          <IoIosArrowForward className="h-8 w-8 border p-1 cursor-pointer" />
        </div>
      </div>

      {/* Calendar */}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day', 'agenda']}
        defaultView={view}
        onView={(newView: CalendarView) => setView(newView)}
        style={{
          height: 600,
          background: 'white',
          padding: '10px',
          borderRadius: '8px',
        }}
        eventPropGetter={() => ({
          style: {
            backgroundColor: '#e3fcef',
            color: '#097969',
            borderRadius: '5px',
            padding: '2px',
          },
        })}
      />
    </div>
  );
};

export default SetSpecificAvailability;
