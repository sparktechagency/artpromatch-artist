import { AllImages } from '@/assets/images/AllImages';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { getOwnArtistData } from '@/services/Auth';
import { AuthUser } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SlCalender } from 'react-icons/sl';

const ArtistProfileHeader = ({ user }: { user: AuthUser | null }) => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0 my-5">
        <div className="flex flex-col lg:flex-row justify-start items-center gap-2">
          <Image
            src={getCleanImageUrl(user?.image)}
            alt="logo"
            height={160}
            width={160}
            className="h-40 w-40 md:h-32 md:w-32 xl:h-52 xl:w-52 top-56 md:top-48 lg:top-56 xl:top-64   rounded-full border-2 border-white lg:absolute  absolute"
          />
          <div className="mt-24 md:mt-16 lg:mt-0 lg:ml-36 xl:ml-56">
            <h1 className="text-xl font-bold">{user?.fullName}</h1>
            <h4 className="text-sm text-neutral-500">{user?.stringLocation}</h4>
          </div>
          <div className="flex justify-center items-center gap-2 bg-green-50 text-black px-4 py-2 rounded-3xl ">
            <div className="h-2 w-2 bg-green-600 rounded-full"></div>
            <div> Available Now</div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-2">
          <div className="px-3 py-1 rounded-xl border flex justify-center items-center gap-2 bg-primary text-white">
            Available Now
          </div>

          <Link href="/availability">
            <button className="px-3 py-1 rounded-xl  flex justify-center items-center gap-2 border border-primary text-primary">
              <SlCalender className="h-4 w-4 " />
              Set Availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfileHeader;
