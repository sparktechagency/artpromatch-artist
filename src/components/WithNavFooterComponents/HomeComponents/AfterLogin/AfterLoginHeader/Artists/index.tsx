'use client';

import { Modal, Select } from 'antd';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FaDollarSign, FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import Mapview from '../MapView/MapView';
import ServiceDetailsModal from './ServiceDetailsModal';
import { ExpertiseType, IArtist } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { useUser } from '@/context/UserContext';
import { SiGoogletasks } from 'react-icons/si';
import { useRouter, useSearchParams } from 'next/navigation';

type ViewMode = 'list' | 'map';

const ALL = 'All';

const Artists = ({ artists = [] }: { artists: IArtist[] }) => {
  console.log({ artists });

  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive filters safely
  const { artistTypes, tattooCategories } = useMemo(() => {
    const types = Array.from(
      new Set(
        artists
          .map(artist => artist?.type)
          .filter(v => Boolean(v && String(v).trim()))
      )
    );
    const categories = Array.from(
      new Set(
        artists
          .flatMap(artist => artist?.expertise || [])
          .filter(v => Boolean(v && String(v).trim()))
      )
    );
    return {
      artistTypes: [ALL, ...types],
      tattooCategories: [ALL, ...categories],
    };
  }, [artists]);

  // UI state
  const [artistType, setArtistType] = useState<string>(artistTypes[0] ?? ALL);
  const [tattooCategory, setTattooCategory] = useState<string>(
    tattooCategories[0] ?? ALL
  );
  const [isShowServiceModalOpen, setIsShowServiceModalOpen] =
    useState<boolean>(false);
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [view, setView] = useState<ViewMode>('list');

  // ✅ Sync filters from URL on reload or URL change
  useEffect(() => {
    const urlArtistType = searchParams.get('artistType') || ALL;
    const urlTattooCategory = searchParams.get('tattooCategory') || ALL;

    setArtistType(urlArtistType);
    setTattooCategory(urlTattooCategory);
  }, [searchParams]);

  // Apply both filters consistently
  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const byType = artistType === ALL ? true : artist?.type === artistType;
      const byCategory =
        tattooCategory === ALL
          ? true
          : (artist?.expertise || []).includes(tattooCategory as ExpertiseType);
      return byType && byCategory;
    });
  }, [artists, artistType, tattooCategory]);

  const openModal = (id: string) => {
    const artist = artists?.find(artist => artist._id === id) || null;
    setSelectedArtist(artist);
    setIsShowServiceModalOpen(true);
  };

  // helper function
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === ALL) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const newUrl = `?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="container mx-auto md:my-8">
      <div className="flex justify-between items-center">
        <Select
          value={artistType}
          style={{ width: 180 }}
          // onChange={(v: string) => setArtistType(v)}
          onChange={(v: string) => {
            setArtistType(v);
            updateQuery('artistType', v);
          }}
          options={artistTypes.map(t => ({ label: t, value: t }))}
        />

        <div>
          {tattooCategories.map(category => (
            <button
              key={category}
              type="button"
              // onClick={() => setTattooCategory(category)}
              onClick={() => {
                setTattooCategory(category);
                updateQuery('tattooCategory', category);
              }}
              className={`py-2 px-4 rounded-3xl border ${
                tattooCategory === category
                  ? 'bg-slate-100 text-primary border-primary'
                  : 'hover:bg-slate-50 hover:text-primary border-transparent'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="my-8 flex justify-between items-center">
        <p>
          {filteredArtists.length} {tattooCategory}
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
                className="cursor-pointer w-full h-60 object-cover rounded-lg"
              />

              <div className="flex items-center gap-2">
                <Link href={`/artist/${artist?._id}`}>
                  <Image
                    src={getCleanImageUrl(artist?.auth?.image)}
                    alt={artist?.auth?.fullName}
                    height={50}
                    width={50}
                    className="rounded-full h-12 w-12"
                  />
                </Link>

                <div className="py-5">
                  <h1 className="text-xl font-semibold">
                    {artist?.auth?.fullName}{' '}
                    {user?.id === artist?.auth?._id && '(me)'}
                  </h1>
                  <div className="text-secondary whitespace-nowrap">
                    {((artist?.distance ?? 0) / 1000).toFixed(2)} km
                  </div>
                </div>
              </div>
              <div className="text-xs text-neutral-500">
                {artist?.stringLocation}
              </div>

              <div className="flex justify-between items-center gap-2 my-5">
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
                  <SiGoogletasks />
                  <div>({artist?.totalCompletedService})</div>
                </div>

                {artist?.avgRating > 0 && (
                  <div className="flex gap-1 text-amber-600">
                    <FaStar />
                    {artist?.avgRating.toFixed(1)} ({artist?.totalReviewCount})
                  </div>
                )}
                <div className="flex items-center text-primary font-bold gap-1">
                  <FaDollarSign />
                  {artist?.hourlyRate}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Mapview artists={filteredArtists} />
      )}

      <Modal
        open={isShowServiceModalOpen}
        footer={null}
        onCancel={() => {
          setIsShowServiceModalOpen(false);
        }}
        centered
        width={800}
      >
        {selectedArtist && (
          <ServiceDetailsModal
            selectedArtist={selectedArtist}
            artists={artists}
            // onClose={() => {
            // setIsModalOpen(false);
            // }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Artists;
