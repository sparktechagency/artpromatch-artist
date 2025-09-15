'use client';

import { BiEdit } from 'react-icons/bi';
import { useState } from 'react';
import { Modal } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';

const LeftSideBar = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const users = [
    {
      name: 'Luci Santos',
      lastMessage: 'Goodbye',
      time: '1 day',
      img: AllImages.user,
    },
    {
      name: 'John Doe',
      lastMessage: 'See you soon',
      time: '2 days',
      img: AllImages.user,
    },
    {
      name: 'Jane Smith',
      lastMessage: 'Hello',
      time: '3 days',
      img: AllImages.user,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center gap-2 border-b mb-5 pb-5">
        <h1 className="text-2xl font-bold">Messages</h1>
        <BiEdit onClick={showModal} className="text-3xl cursor-pointer" />
      </div>

      <p className="text-textSecondary mb-3">Unread(1)</p>

      {users.map((user, index) => (
        <Link
          key={index}
          href="#"
          className="flex justify-between items-center text-textColor mb-5 px-5 py-1"
        >
          <div className="flex items-center gap-2">
            <Image
              src={user.img}
              alt=""
              width={40}
              height={48}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold text-textSecondary">
                {user.name}
              </h3>
              <p className="text-textSecondary">{user.lastMessage}</p>
            </div>
          </div>
          <p className="text-textSecondary">{user.time}</p>
        </Link>
      ))}

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        title="New Message"
      >
        <input
          type="text"
          placeholder="Search users"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {users.map((user, index) => (
          <Link
            key={index}
            href="#"
            className="flex justify-between items-center text-textColor mb-5 px-5 py-1"
          >
            <div className="flex items-center gap-2">
              <Image
                src={user.img}
                alt=""
                width={40}
                height={48}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-textSecondary">
                  {user.name}
                </h3>
                <p className="text-textSecondary">{user.lastMessage}</p>
              </div>
            </div>
            <p className="text-textSecondary">{user.time}</p>
          </Link>
        ))}
      </Modal>
    </div>
  );
};

export default LeftSideBar;
