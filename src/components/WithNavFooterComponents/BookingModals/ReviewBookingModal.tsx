'use client';

import { AllImages } from '@/assets/images/AllImages';
import { ConfigProvider, Modal, Tag } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa6';
import PaymentModal from './PaymentModal';

interface ReviewBookingModalProps {
  handleOk: () => void;
  handleCancel: () => void;
  onEdit?: () => void; 
}

const ReviewBookingModal = ({
  handleOk,
  handleCancel,
  onEdit,
}: ReviewBookingModalProps) => {
  const [isModalOpenForPayment, setIsModalOpenForPayment] = useState(false);

  const showModalForPayment = () => setIsModalOpenForPayment(true);
  const handleOkForPayment = () => setIsModalOpenForPayment(false);
  const handleCancelForPayment = () => setIsModalOpenForPayment(false);

  return (
    <div>
      {/* User Info */}
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div className="flex items-center gap-3">
          <Image
            src={AllImages.user}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">Alex Rivera</h3>
            <p className="text-gray-500 text-sm">Brooklyn, NY</p>
          </div>
        </div>
        <Tag color="green">Available Now</Tag>
      </div>

      <h1 className="text-2xl font-bold mb-4">Review Booking</h1>

      {/* Booking Details */}
      <div className="my-5">
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Artist:</p>
          <p>Alex Rivera</p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Service</p>
          <p className="flex items-center gap-2">
            <FaPen
              onClick={onEdit}
              className="bg-primary text-white p-1 rounded-full h-5 w-5 cursor-pointer"
            />
            Realism Tattoo
          </p>
        </div>
        <div className="flex justify-between items-center border-b mb-2 pb-2">
          <p>Date & Time</p>
          <p className="flex items-center gap-2">
            <FaPen
              onClick={onEdit}
              className="bg-primary text-white p-1 rounded-full h-5 w-5 cursor-pointer"
            />
            Dec 10, 2024, at 11:30 AM
          </p>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <p>Estimated Cost</p>
          <p>$400 (2 hours)</p>
        </div>
      </div>

      <button
        onClick={showModalForPayment}
        className="w-full py-2 bg-primary rounded-xl text-white font-semibold md:text-xl shadow-lg"
      >
        Proceed to Payment
      </button>

      {/* Payment Modal */}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: 'rgb(47,84,235)',
              defaultHoverColor: 'rgb(47,84,235)',
              defaultBorderColor: 'rgb(47,84,235)',
            },
          },
        }}
      >
        <Modal
          open={isModalOpenForPayment}
          onOk={handleOkForPayment}
          onCancel={handleCancelForPayment}
          footer={null}
        >
          <PaymentModal
            handleOk={handleOkForPayment}
            handleCancel={handleCancelForPayment}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ReviewBookingModal;
