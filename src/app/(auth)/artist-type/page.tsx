'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Typography, Radio } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const userRoles = [
  {
    value: 1,
    label: 'Tattoo Artist',
    description: 'Create and showcase stunning tattoos in various styles.',
  },
  {
    value: 2,
    label: 'Piercer',
    description:
      'Specialize in professional body piercings and unique placements.',
  },
];

const ArtistType = () => {
  const [value, setValue] = useState(1);
  const router = useRouter();

  // Save artist type to localStorage only in the browser
  useEffect(() => {
    const selectedArtistType = userRoles.find(type => type.value === value);
    if (selectedArtistType) {
      localStorage.setItem('artistType', selectedArtistType.label);
    }
  }, [value]);

  const handleNext = () => {
    router.push(`/preference-selection`);
  };

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center">
      <div className="pt-32 pb-16">
        <div className="w-[450px]">
          <Form
            name="select-user-type"
            layout="vertical"
            className="w-full md:w-[600px] bg-white px-2 rounded-2xl"
            onFinish={handleNext}
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                What Kind of Artist Are You?
              </h2>
              <Typography.Text className="text-center text-base">
                Choose your primary focus so we can tailor your profile and
                features.
              </Typography.Text>
            </div>

            <div className="flex flex-col gap-4">
              <Radio.Group
                onChange={e => setValue(e.target.value)}
                value={value}
              >
                {userRoles.map(role => (
                  <Radio
                    key={role.value}
                    value={role.value}
                    className="!w-full"
                  >
                    <div
                      className={`border rounded-lg p-6 mb-5 ${
                        value === role.value
                          ? 'border-primary shadow-md'
                          : 'hover:border-primary'
                      }`}
                    >
                      <h1 className="text-xl font-bold">{role.label}</h1>
                      <p className="text-sm text-gray-600">
                        {role.description}
                      </p>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg mt-5"
            >
              Continue
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ArtistType;
