'use client';

import { expertisePiercingsServicesList } from '@/constants';
import { Form } from 'antd';
import { useEffect, useState } from 'react';

const SelectPiercingStyles = ({ profileData }: { profileData: any }) => {
  console.log({ profileData });
  const [selectedPiercing, setSelectedPiercing] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPiercing.length > 0) {
      localStorage.setItem(
        'selectedPiercing',
        JSON.stringify(selectedPiercing)
      );
    }
  }, [selectedPiercing]);

  // handleSubmit
  const handleSubmit = () => {};

  // handleSelect
  const handleSelect = (value: string) => {
    setSelectedPiercing(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">Select Your Favorite Piercings</h1>
        <p className="text-secondary">Pick the ones that match your vibe.</p>
      </div>

      <Form
        name="select-piercing"
        initialValues={{ remember: true }}
        layout="vertical"
        className="mb-10 w-full"
      >
        <div className="flex flex-col gap-4">
          {Array.from(
            { length: Math.ceil(expertisePiercingsServicesList.length / 7) },
            (_, i) => (
              <div
                key={i}
                className="flex justify-start items-center gap-4 flex-wrap"
              >
                {expertisePiercingsServicesList
                  .slice(i * 7, i * 7 + 7)
                  .map((piercing: string) => (
                    <button
                      key={piercing}
                      type="button"
                      onClick={() => handleSelect(piercing)}
                      className={`px-8 py-2 rounded-3xl border transition-colors ${
                        selectedPiercing.includes(piercing)
                          ? 'border-primary text-primary font-semibold'
                          : 'hover:border-primary'
                      }`}
                    >
                      {piercing}
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

export default SelectPiercingStyles;
