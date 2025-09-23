'use client';

import { useState } from 'react';
import { AllImages } from '@/assets/images/AllImages';
import { DatePicker, Form, Input, InputNumber, Modal, Tag } from 'antd';
import Image from 'next/image';
import ConfirmModal from './ConfirmModal';

interface PaymentModalProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const PaymentModal = ({ handleOk, handleCancel }: PaymentModalProps) => {
  const [isModalOpenForConfirm, setIsModalOpenForConfirm] = useState(false);

  const showModalForConfirm = () => setIsModalOpenForConfirm(true);
  const handleOkForConfirm = () => setIsModalOpenForConfirm(false);
  const handleCancelForConfirm = () => setIsModalOpenForConfirm(false);

  const onFinish = (values: any) => {
    console.log('Payment form values:', values);
  };

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

      {/* Booking Info */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Secure Your Booking</h1>
          <p>A deposit is required to secure your appointment.</p>
        </div>
        <h1 className="text-xl font-bold text-primary">$50.00</h1>
      </div>

      {/* Payment Options */}
      <div className="flex justify-start items-center gap-5 border-b mb-5 pb-2">
        <div className="border p-2 rounded-xl h-16 w-20 flex flex-col justify-center items-center hover:border-primary cursor-pointer">
          <Image
            src={AllImages.VisaMastercard}
            alt="Card"
            className="object-contain h-5 w-14"
          />
          <p>Card</p>
        </div>
        <div className="border p-2 rounded-xl h-16 w-20 flex flex-col justify-center items-center hover:border-primary cursor-pointer">
          <Image
            src={AllImages.Paypal}
            alt="Paypal"
            className="object-contain h-5 w-14"
          />
          <p>Paypal</p>
        </div>
      </div>

      {/* Payment Form */}
      <Form layout="vertical" onFinish={onFinish}>
        {/* Card Number */}
        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[{ required: true, message: 'Please enter your card number' }]}
        >
          <InputNumber
            placeholder="1234 1234 1234 1234"
            className="w-full rounded-xl"
          />
        </Form.Item>

        {/* Expiry and CVC */}
        <div className="flex gap-2">
          <Form.Item
            name="expiry"
            label="Expiry"
            rules={[{ required: true, message: 'Select expiry date' }]}
            className="flex-1"
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="cvc"
            label="CVC"
            rules={[{ required: true, message: 'Enter CVC' }]}
            className="flex-1"
          >
            <Input placeholder="000" />
          </Form.Item>
        </div>

        {/* Country and Zip */}
        <div className="flex gap-2">
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'Enter your country' }]}
            className="flex-1"
          >
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item
            name="zipCode"
            label="Zip Code"
            rules={[{ required: true, message: 'Enter zip code' }]}
            className="flex-1"
          >
            <Input placeholder="000" />
          </Form.Item>
        </div>

        {/* Submit */}
        <Form.Item>
          <button
            type="button"
            onClick={showModalForConfirm}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-lg"
          >
            Pay & Confirm Booking
          </button>
        </Form.Item>
      </Form>

      {/* Confirm Modal */}
      <Modal
        open={isModalOpenForConfirm}
        onOk={handleOkForConfirm}
        onCancel={handleCancelForConfirm}
        footer={null}
      >
        <ConfirmModal />
      </Modal>
    </div>
  );
};

export default PaymentModal;
