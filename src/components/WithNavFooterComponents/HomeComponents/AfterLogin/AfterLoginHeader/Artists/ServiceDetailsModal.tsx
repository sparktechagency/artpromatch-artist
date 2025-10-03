import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import Link from 'next/link';
import { IArtist } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

interface ServiceDetailsModalProps {
  artists: IArtist[];
  selectedArtist: IArtist;
}

const ServiceDetailsModal = ({
  selectedArtist,
  artists,
}: ServiceDetailsModalProps) => {
  const [currentArtist, setCurrentArtist] = useState(
    selectedArtist || artists[0]
  );

  const handlePrev = () => {
    const currentIndex = artists.findIndex(
      artist => artist._id === currentArtist?._id
    );
    const prevArtist =
      artists[currentIndex - 1] || artists[artists?.length - 1];
    setCurrentArtist(prevArtist);
  };

  const handleNext = () => {
    const currentIndex = artists.findIndex(
      artist => artist._id === currentArtist?._id
    );
    const nextArtist = artists[currentIndex + 1] || artists[0];
    setCurrentArtist(nextArtist);
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center pb-3 border-b">
        <div className="flex items-center gap-3">
          <Link href="/profile-page">
            <Image
              src={getCleanImageUrl(selectedArtist?.auth?.image)}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <div>
            <h1 className="font-bold">{currentArtist?.auth?.fullName}</h1>
            {/* <p className="text-sm text-gray-500">
              {currentArtist?.auth?.fullName}
            </p> */}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="border border-primary px-2 rounded-lg">
            <CiHeart />
          </button>
          <div className="flex justify-center items-center gap-2 text-primary px-3 py-1 border rounded-lg font-bold">
            <AiOutlineMessage /> Message
          </div>
          {/* <div className="px-3 py-1 bg-primary text-white rounded-lg">
            Book Now
          </div> */}
        </div>
      </div>

      <div className="flex justify-center items-center py-4 relative">
        <Image
          src={getCleanImageUrl(currentArtist?.auth?.image)}
          alt={currentArtist?.auth?.fullName}
          width={400}
          height={400}
          className="rounded-lg w-full"
        />
      </div>
      <div className="flex justify-center items-center gap-5 text-center text-gray-500">
        <button onClick={handlePrev} className=" bg-gray-200 p-2 rounded-full">
          <FaChevronLeft />
        </button>
        <p className="pt-3">
          {artists?.findIndex(artist => artist?._id === currentArtist?._id) + 1}{' '}
          / {artists?.length}
        </p>
        <button onClick={handleNext} className=" bg-gray-200 p-2 rounded-full">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;
