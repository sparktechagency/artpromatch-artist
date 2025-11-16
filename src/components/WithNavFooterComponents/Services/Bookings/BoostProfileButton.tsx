'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'sonner';
import { artistBoostHisProfile } from '@/services/Artists';
import { useRouter } from 'next/navigation';

const BoostProfileButton = ({ profileData }: { profileData: any }) => {
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [boostLoading, setBoostLoading] = useState(false);
  const router = useRouter();

  const handleBoostProfileConfirm = async () => {
    try {
      setBoostLoading(true);
      const res = await artistBoostHisProfile();

      if (res?.success) {
        toast.success(res?.message || 'Complete the payment quickly!');
        router.push(res?.data);
        setIsBoostModalOpen(false);
      } else {
        toast.error(res?.message || 'Failed to boost profile!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while boosting profile');
    } finally {
      setBoostLoading(false);
    }
  };

  const isBoosted = !!profileData?.boost.isActive;

  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (!isBoosted) {
              setIsBoostModalOpen(true);
            }
          }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold shadow transition-colors
          ${
            isBoosted
              ? 'bg-emerald-600 hover:bg-emerald-600 cursor-default'
              : 'bg-primary hover:bg-primary/90'
          }`}
        >
          <span className="text-white">
            {isBoosted
              ? 'Profile already boosted'
              : 'Boost Profile for 12 hours'}
          </span>
        </button>
      </div>

      <Modal
        title="Boost Profile"
        open={isBoostModalOpen}
        onOk={handleBoostProfileConfirm}
        onCancel={() => setIsBoostModalOpen(false)}
        okText="Confirm Boost"
        confirmLoading={boostLoading}
      >
        <p className="text-secondary">
          For <span className="font-semibold text-red-500">$1</span>, your
          profile will be boosted for{' '}
          <span className="font-semibold text-red-500">12 hours</span>, helping
          you get more visibility and bookings.
        </p>
      </Modal>
    </>
  );
};

export default BoostProfileButton;
