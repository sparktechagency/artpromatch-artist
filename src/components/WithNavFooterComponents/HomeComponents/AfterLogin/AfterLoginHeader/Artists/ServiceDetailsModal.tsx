import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setCurrentArtist(selectedArtist || artists[0]);
  }, [selectedArtist, artists]);

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center pb-3 border-b">
        <div className="flex items-center gap-3">
          <Link href={`/artist/${selectedArtist?._id}`}>
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
          {/* <button className="border border-primary px-2 rounded-lg">
            <CiHeart />
          </button> */}
          <Link href={`/message?receiverId=${selectedArtist?.auth?._id}`}>
            <div className="flex justify-center items-center gap-2 text-primary px-3 py-1 border rounded-lg font-bold">
              <AiOutlineMessage /> Message
            </div>
          </Link>
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
    </div>
  );
};

export default ServiceDetailsModal;
