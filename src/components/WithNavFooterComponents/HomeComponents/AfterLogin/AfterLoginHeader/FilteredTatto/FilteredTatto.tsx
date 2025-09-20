'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Modal, Select } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { FaCalendarDay, FaDollarSign } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import Mapview from '../MapView/MapView';
import TattoDetailsModal from './TattoDetailsModal';
import { ExpertiseType, IArtist, IMeta } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

const FilteredTatto = ({ artists = [] }: { artists: IArtist[] }) => {
  const tattooCategories = [
    ...new Set(artists?.flatMap(artist => artist.expertise)),
  ];

  const [selectedTab, setSelectedTab] = useState<string>(tattooCategories[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [view, setView] = useState<'list' | 'map'>('list');

  const filteredArtists = artists?.filter(artist =>
    artist.expertise.includes(selectedTab as ExpertiseType)
  );

  const openModal = (id: string) => {
    const artist = artists?.find(artist => artist._id === id) || null;
    setSelectedArtist(artist);
    setIsModalOpen(true);
  };

  const handleChange = (value: string) => {
    console.log('Selected:', value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto md:my-8">
      <div className="flex justify-between items-center">
        <Select
          defaultValue="Tattoo Artists"
          style={{ width: 150 }}
          onChange={handleChange}
          options={[
            { value: 'Tattoo Artists', label: 'Tattoo Artists' },
            { value: 'Piercing Artists', label: 'Piercing Artists' },
          ]}
        />

        <div>
          {tattooCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedTab(category)}
              className={`py-2 px-4 rounded-3xl ${
                selectedTab === category
                  ? 'bg-slate-200 text-primary'
                  : 'hover:bg-slate-50 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="my-8 flex justify-between items-center">
        <p>
          {filteredArtists.length} {selectedTab}
        </p>
        <div className="flex gap-2">
          <div
            onClick={() => setView('list')}
            className={`py-2 px-6 rounded-2xl ${
              view === 'list'
                ? 'bg-primary text-white'
                : 'border border-primary text-primary'
            }`}
          >
            List View
          </div>
          <div
            onClick={() => setView('map')}
            className={`py-2 px-6 rounded-2xl ${
              view === 'map'
                ? 'bg-primary text-white'
                : 'border border-primary text-primary'
            }`}
          >
            Map View
          </div>
        </div>
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredArtists.map(artist => (
            <div
              key={artist?._id}
              className="border rounded-xl border-gray-300/50 p-2"
            >
              <Image
                onClick={() => openModal(artist._id)}
                src={getCleanImageUrl(artist?.auth?.image)}
                alt={artist?.auth?.fullName}
                height={300}
                width={500}
                className="cursor-pointer"
              />
              <div className="flex justify-between items-center my-3 gap-4">
                <div className="flex items-center gap-2">
                  <Link href="/other-artist-profile">
                    <Image
                      src={getCleanImageUrl(artist?.auth?.image)}
                      alt={artist?.auth?.fullName}
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                  </Link>
                  <div>
                    <h1 className="text-xl font-semibold">
                      {artist?.auth?.fullName}
                    </h1>
                    <div className="text-xs text-neutral-500">
                      {artist?.stringLocation}
                    </div>
                  </div>
                </div>
                <div className="text-secondary whitespace-nowrap">
                  {(artist?.distance! / 1000).toFixed(2)} km
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 mb-5">
                {artist?.expertise
                  ?.slice(0, 2)
                  ?.map((exp: string, index: number) => (
                    <div
                      key={index}
                      className="bg-neutral-200 px-3 py-2 rounded-3xl font-medium text-sm truncate"
                    >
                      {exp}
                    </div>
                  ))}

                <div className="text-secondary">
                  +{artist?.expertise?.length - 2}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex  gap-1 items-center">
                  <FaCalendarDay />
                  <div className="text-sm">{artist?.totalCompletedService}</div>
                </div>
                <div className="flex items-center text-primary font-bold gap-1">
                  <FaDollarSign />
                  {artist?.hourlyRate}
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Mapview artists={artists} />
      )}

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        centered
        width={800}
      >
        {selectedArtist && (
          <TattoDetailsModal
            selectedArtist={selectedArtist}
            artists={artists}
            // onClose={handleCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default FilteredTatto;
