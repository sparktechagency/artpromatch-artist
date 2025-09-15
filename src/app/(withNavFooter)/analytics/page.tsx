import BarChartComponents from '@/components/WithNavFooterComponents/AnalyticsComponents/BarChartComponents';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

const Analyticspage = () => {
  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-textSecondary mb-8">
          Understand how your profile is performing and track your growth.
        </p>
      </div>
      <BarChartComponents />
      <div className="mt-28 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Client Interactions</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">New Favorites</h1>
              <h1 className="text-3xl font-bold">122</h1>
              <p className="flex items-center gap-2 text-green-500">
                <IoMdArrowDropup />
                42% from last week
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Messages Received</h1>
              <h1 className="text-3xl font-bold">57</h1>
              <p className="flex items-center gap-2 text-red-500">
                <IoMdArrowDropdown />
                12% from last week
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Booking Inquiries</h1>
              <h1 className="text-3xl font-bold">12</h1>
              <p className="flex items-center gap-2 text-green-500">
                <IoMdArrowDropup />
                62% from last week
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Earnings Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Total Earnings</h1>
              <h1 className="text-3xl font-bold">$ 2122</h1>
              <p className="flex items-center gap-2 text-green-500">
                <IoMdArrowDropup />
                42% from last week
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Upcoming Deposits</h1>
              <h1 className="text-3xl font-bold">$ 57</h1>
              <p className="flex items-center gap-2 text-red-500">
                <IoMdArrowDropdown />
                from 3 bookings
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Completed Sessions</h1>
              <h1 className="text-3xl font-bold">$ 55 12</h1>
              <p className="flex items-center gap-2 text-green-500">
                <IoMdArrowDropup />
                62% from last week
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold">Your Booking Stats</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Total Bookings</h1>
              <h1 className="text-3xl font-bold">122</h1>
              <p className="flex items-center gap-2 text-green-500">
                <IoMdArrowDropup />
                42% from last week
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Upcoming Bookings</h1>
              <h1 className="text-3xl font-bold">57</h1>
              <p className="flex items-center gap-2 text-red-500">
                <IoMdArrowDropdown />
                12% from last week
              </p>
            </div>
            <div className="border rounded-xl p-4">
              <h1 className="text-xl">Cancelled or No Show Appointments</h1>
              <h1 className="text-3xl font-bold">12</h1>
              <p className="flex items-center gap-2 text-green-500">
                <IoMdArrowDropup />3 cancelled from last week
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyticspage;
