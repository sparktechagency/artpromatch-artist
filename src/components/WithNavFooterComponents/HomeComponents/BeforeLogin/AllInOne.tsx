import { AllImages } from '@/assets/images/AllImages';
import Image from 'next/image';

const AllInOne = () => {
  return (
    <div className="container mx-auto px-2 md:px-0 mt-20">
      <div className="flex flex-col justify-center items-center  ">
        <div
          className="text-center bg-[#f3f1f1] text-black py-3 px-6 
                rounded-lg"
        >
          Our Features
        </div>
        <h1 className="text-center md:text-5xl font-bold py-8 md:py-10">
          All-In-One Platform for Artists.
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:mb-20">
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src={AllImages.AllInOne1}
            width={500}
            height={500}
            alt="logo"
            className="bg-[#392d2d] h-10 w-10 rounded-xl flex justify-center items-center p-2"
          />
          <h1 className="text-xl font-bold py-2">Showcase Your Talent</h1>
          <p className="text-secondary">
            Upload your best work and let your art speak for itself. Attract
            clients with a stunning portfolio in your style
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src={AllImages.AllInOne2}
            width={500}
            height={500}
            alt="logo"
            className="bg-[#392d2d] h-10 w-10 rounded-xl flex justify-center items-center p-2"
          />
          <h1 className="text-xl font-bold py-2">Manage Your Bookings</h1>
          <p className="text-secondary">
            Stay in control of your schedule with an intuitive calendar. Accept
            bookings and manage client requests seamlessly.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src={AllImages.AllInOne3}
            width={500}
            height={500}
            alt="logo"
            className="bg-[#392d2d] h-10 w-10 rounded-xl flex justify-center items-center p-2"
          />
          <h1 className="text-xl font-bold py-2">Connect with Clients</h1>
          <p className="text-secondary">
            Chat directly with clients, share ideas, and bring their vision to
            life with smooth, two-way communication.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src={AllImages.AllInOne4}
            width={500}
            height={500}
            alt="logo"
            className="bg-[#392d2d] h-10 w-10 rounded-xl flex justify-center items-center p-2"
          />
          <h1 className="text-xl font-bold py-2">Showcase Your Talent</h1>
          <p className="text-secondary">
            Take your art on the road. Advertise guest spots in different cities
            and connect with new clients wherever you go.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllInOne;
