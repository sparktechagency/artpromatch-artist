import { AllImages } from '@/assets/images/AllImages';
import { Typography } from 'antd';
import Image from 'next/image';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Link from 'next/link';
import AllInOne from './AllInOne';
import TakeATour from './TakeATour';
import Testimonials from './Testimonials';
import SteadyHands from './SteadyHands';
import { IBooking } from '@/types';

const BeforeLogin = ({ bookings = [] }: { bookings: IBooking[] }) => {
  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="relative">
        <Image
          src={AllImages.Background}
          width={500}
          height={500}
          alt="logo"
          className="w-full h-96 md:h-auto "
        />
      </div>
      <div
        className=" flex flex-col justify-center items-center text-center  
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Image
          src={AllImages.logo}
          width={50}
          height={50}
          alt="logo"
          className="mt-10 md:mt-0"
        />
        <h2 className="text-center lg:text-5xl font-bold mt-6 mb-2 ">
          Your art. Your clients. Your Income. <br /> Your schedule.
        </h2>
        <Typography.Text className="md:text-xl text-center text-primary mt-3 md:mb-10 ">
          Showcase your talent, manage bookings, and connect with clients
          effortlessly.
        </Typography.Text>
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-5 mb-20">
          <Link href="/dashboard">
            <div className="bg-black text-white py-3 px-6 rounded-lg mt-5 flex  items-center gap-2">
              Get Started
              <MdKeyboardArrowRight />
            </div>
          </Link>
        </div>
      </div>
      <AllInOne />
      <TakeATour />
      <Testimonials bookings={bookings} />
      <SteadyHands />
    </div>
  );
};

export default BeforeLogin;
