import { AllImages } from '@/assets/images/AllImages';
import { useUser } from '@/context/UserContext';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { getDashboardData as getArtistDashboardData } from '@/services/Artists';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { MdNotificationsActive } from 'react-icons/md';

type TDashboardData = {
  totalService: number;
  currentBooking: number;
  artistEarning: number;
  completedOrder: number;
  pendingBooking: number;
};

const ArtistHomePage = () => {
  const { user } = useUser();
  const [dashboardData, setDashboardData] = useState<TDashboardData | null>(
    null
  );

  useEffect(() => {
    if (!user) return;

    const getSetDashboardData = async () => {
      const { data: dashboardData } = await getArtistDashboardData(true);
      setDashboardData(dashboardData);
    };
    getSetDashboardData();
  }, [user]);

  if (!user) return null;

  return (
    <div className=" ">
      <div className="flex flex-col md:flex-row justify-between items-center md:mt-16 md:mb-10">
        <div className="flex justify-start items-center gap-3">
          <Link href="/my-profile">
            <Image
              src={getCleanImageUrl(user?.image)}
              width={50}
              height={50}
              alt="logo"
              className="rounded-full h-18 w-18"
            />
          </Link>
          <div>
            <h1> Welcome Back, {user?.fullName}!</h1>
            <p className="text-secondary">
              Here&apos;s what&apos;s happening with your profile today.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Link href="/profile/update">
            <div className=" px-6 py-2 rounded-lg border">View Profile</div>
          </Link>
          <Link href="/discover">
            <div className="px-6 py-2 rounded-lg border bg-primary text-white">
              Discover
            </div>
          </Link>
        </div>
      </div>
      <div className="md:my-5 grid grid-cols-1 md:grid-cols-4 gap-5 ">
        <div className="border shadow-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Services</h1>
            <h1 className="text-3xl font-bold">
              {dashboardData?.totalService}
            </h1>
            <p>Running Services</p>
          </div>
          <div>
            <Link href="/services">
              <FaRegEye className="bg-primary text-white h-10 w-10 p-1 rounded-lg" />
            </Link>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Current Bookings</h1>
            <h1 className="text-3xl font-bold">
              {dashboardData?.currentBooking}
            </h1>
            <p>Upcoming Appointments</p>
          </div>
          <div>
            <Link href="/bookings">
              <Image
                src={AllImages.AllInOne2}
                width={50}
                height={50}
                alt="logo"
                className="bg-primary p-2 rounded-full"
              />
            </Link>
          </div>
        </div>
        <div className="border shadow-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Earnings</h1>
            <h1 className="text-3xl font-bold">
              {dashboardData?.artistEarning}
            </h1>
            <p>This Month</p>
          </div>
          <div>
            <Link href="/earnings">
              <Image
                src={AllImages.AllInOne6}
                width={50}
                height={50}
                alt="logo"
                className="bg-primary p-2 rounded-full"
              />
            </Link>
          </div>
        </div>
        <div className="border s hadow-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Completed Orders</h1>
            <h1 className="text-3xl font-bold">
              {dashboardData?.completedOrder}
            </h1>
            <p>Done till now</p>
          </div>
          <div>
            <Link href="/bookings">
              <FaRegEye className="bg-primary text-white h-10 w-10 p-1 rounded-lg" />
            </Link>
          </div>
        </div>

        <div className="border s hadow-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Pending Bookings</h1>
            <h1 className="text-3xl font-bold">
              {dashboardData?.pendingBooking}
            </h1>
            <p>to be confirmed</p>
          </div>
          <div>
            <Link href="/bookings">
              <FaRegEye className="bg-primary text-white h-10 w-10 p-1 rounded-lg" />
            </Link>
          </div>
        </div>
        {/* <div className="border shadow-sm rounded-lg p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">New Message</h1>
            <h1 className="text-3xl font-bold">05</h1>
            <p>Unread</p>
          </div>
          <div>
            <Link href="/message">
              <LuMessageCircleMore className="bg-primary text-white h-10 w-10 p-1 rounded-lg" />
            </Link>
          </div>
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="p-5 border rounded-xl">
          <div className="flex justify-between items-center border-0 border-b pb-2 mb-2">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.calender}
                width={50}
                height={50}
                alt="logo"
                className="bg-neutral-100 p-2 rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold">Bookings</h1>
                <p className="text-secondary">
                  Manage your upcoming appointments and track booking requests
                  in one place.
                </p>
              </div>
            </div>
            <Link href="/bookings">
              <IoIosArrowForward className="h-8 w-8" />
            </Link>
          </div>
          <div className="flex justify-between items-center border-0 border-b pb-2 mb-2">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.user}
                width={50}
                height={50}
                alt="logo"
                className="bg-neutral-100 p-2 rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold">Mr Jhon</h1>
                <p className="text-secondary">
                  Dec 10, 2024 - 11:30 AM with John Doe (Realism Tattoo)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 border rounded-xl">
          <div className="flex justify-between items-center border-0 border-b pb-2 mb-2">
            <div className="flex justify-center items-center gap-2">
              <Image
                src={AllImages.notification}
                width={50}
                height={50}
                alt="logo"
                className="bg-neutral-100 p-2 rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold">Notifications</h1>
                <p className="text-secondary">
                  Stay updated with the latest booking requests, client
                  messages, and profile activity.
                </p>
              </div>
            </div>
            <IoIosArrowForward className="h-8 w-8" />
          </div>
          <div className="flex justify-between items-center border-0 border-b pb-2 mb-2">
            <div className="flex justify-center items-center gap-2">
              <MdNotificationsActive className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Booking Request</h1>
                <p className="text-secondary">
                  from Mia Carter for Dec 20, 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHomePage;
