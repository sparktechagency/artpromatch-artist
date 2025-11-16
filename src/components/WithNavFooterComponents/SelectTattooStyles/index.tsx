'use client';

import { expertiseTattooServicesList } from '@/constants';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SelectTattooStyles = ({ profileData }: { profileData: any }) => {
  console.log({ profileData });
  const [UpdatedSelectedArt, setUpdatedSelectedArt] = useState<string[]>([]);

  // Load previously selected data from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('UpdatedSelectedArt');
    if (stored) {
      try {
        setUpdatedSelectedArt(JSON.parse(stored));
      } catch {
        setUpdatedSelectedArt([]);
      }
    }
  }, []);

  // Save updated selections to localStorage
  useEffect(() => {
    if (UpdatedSelectedArt.length > 0) {
      localStorage.setItem(
        'UpdatedSelectedArt',
        JSON.stringify(UpdatedSelectedArt)
      );
    } else {
      localStorage.removeItem('UpdatedSelectedArt');
    }
  }, [UpdatedSelectedArt]);

  // handleSubmit
  const handleSubmit = () => {};

  // handleSelect
  const handleSelect = (value: string) => {
    setUpdatedSelectedArt(prevSelectedArt =>
      prevSelectedArt.includes(value)
        ? prevSelectedArt.filter(item => item !== value)
        : [...prevSelectedArt, value]
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">
          Select Your Favorite Tattoo Styles
        </h1>
        <p className="text-secondary">
          Choose the tattoo styles you love the most.
        </p>
      </div>

      <Form
        name="select-preference"
        initialValues={{ remember: true }}
        layout="vertical"
        className="mb-10 w-full bg-white px-2 rounded-2xl"
      >
        <div className="flex flex-col gap-4">
          {Array.from(
            { length: Math.ceil(expertiseTattooServicesList.length / 8) },
            (_, i) => (
              <div
                key={i}
                className="flex justify-start items-center gap-4 flex-wrap"
              >
                {expertiseTattooServicesList
                  .slice(i * 8, i * 8 + 8)
                  .map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleSelect(style)}
                      className={`px-4 py-2 rounded-3xl border ${
                        UpdatedSelectedArt.includes(style)
                          ? 'border-primary text-primary font-semibold'
                          : 'hover:border-primary'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
              </div>
            )
          )}
        </div>

        <div className="flex justify-end items-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-primary py-3 px-6 rounded-lg"
          >
            <span className="text-white">Save</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SelectTattooStyles;
