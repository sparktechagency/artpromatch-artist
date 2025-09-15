'use client';

import { Collapse, Input } from 'antd';

const { Search } = Input;

const HelpPage: React.FC = () => {
  const onSearch = (value: string) => {
    console.log('Search input: ', value);
  };

  const faqItems = [
    {
      key: '1',
      label: 'How do I book an appointment with an artist?',
      children: (
        <p>
          Visit the artist's profile, select 'Book Now,' and follow the steps to
          choose a date, time, and service.
        </p>
      ),
    },
    {
      key: '2',
      label: 'What is the cancellation policy?',
      children: <p>Lorem ipsum dolor sit amet.</p>,
    },
    {
      key: '3',
      label: 'How do I contact an artist directly?',
      children: <p>Lorem ipsum dolor sit amet.</p>,
    },
  ];

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-textSecondary">
          Find answers, manage issues, or get in touch with us
        </p>
      </div>

      <div className="mt-4 md:mt-0">
        <Search
          allowClear
          placeholder="Search articles"
          onSearch={onSearch}
          enterButton
        />
      </div>

      <div className="mt-8">
        <Collapse accordion items={faqItems} />
      </div>

      <div className="mt-8 flex flex-col justify-center items-center p-5 bg-[#faf7f7] rounded-xl">
        <h1 className="text-2xl font-bold mb-2">Still have questions?</h1>
        <p className="text-textSecondary">
          Can't find the answer you're looking for? Please chat to our friendly
          team.
        </p>
        <button className="px-6 py-2 rounded-xl bg-primary text-white">
          Get in touch
        </button>
      </div>
    </div>
  );
};

export default HelpPage;
