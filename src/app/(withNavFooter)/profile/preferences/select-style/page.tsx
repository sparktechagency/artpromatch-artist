'use client';

import { expertiseServicesList } from '@/constants';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SelectStyle = () => {
  const router = useRouter();
  const [UpdatedSelectedArt, setUpdatedSelectedArt] = useState<string[]>([]);

  useEffect(() => {
    if (UpdatedSelectedArt.length > 0) {
      localStorage.setItem(
        'UpdatedSelectedArt',
        JSON.stringify(UpdatedSelectedArt)
      );
    }
  }, [UpdatedSelectedArt]);

  const handleSubmit = () => {
    router.back();
  };

  const handleSelect = (value: string) => {
    setUpdatedSelectedArt(prevSelectedArt =>
      prevSelectedArt.includes(value)
        ? prevSelectedArt.filter(item => item !== value)
        : [...prevSelectedArt, value]
    );
  };

  // const onChange = (value: number) => {
  //   setCurrent(value);
  // };

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
        // onFinish={onFinish}
        name="select-preference"
        initialValues={{ remember: true }}
        layout="vertical"
        className="mb-10 w-full bg-white px-2 rounded-2xl"
      >
        {/* Buttons in groups of 4 */}
        <div className="flex flex-col gap-4">
          {Array.from(
            { length: Math.ceil(expertiseServicesList.length / 8) },
            (_, i) => (
              <div
                key={i}
                className="flex justify-start items-center gap-4 flex-wrap"
              >
                {expertiseServicesList.slice(i * 8, i * 8 + 8).map(style => (
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

        <div className=" flex justify-end items-end">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white py-3 px-6 rounded-lg clear-start"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SelectStyle;
