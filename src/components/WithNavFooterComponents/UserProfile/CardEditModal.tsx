'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Input } from 'antd';
import Image from 'next/image';

interface CardEditModalProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const CardEditModal = ({ handleOk, handleCancel }: CardEditModalProps) => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
    handleOk(); // Call after successful submit
  };

  return (
    <div>
      <Form name="payment" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Card Number"
          name="cardNumber"
          rules={[{ required: true }]}
        >
          <Input placeholder="1234 1234 1234 1234" maxLength={19} />
        </Form.Item>

        <div className="flex gap-2 mb-4">
          <Image
            src={AllImages.visa}
            alt="visa"
            width={56}
            height={20}
            className="object-contain"
          />
          <Image
            src={AllImages.Mastercard}
            alt="mastercard"
            width={56}
            height={20}
            className="object-contain"
          />
          <Image
            src={AllImages.AMEX}
            alt="amex"
            width={56}
            height={20}
            className="object-contain"
          />
          <Image
            src={AllImages.Discover}
            alt="discover"
            width={56}
            height={20}
            className="object-contain"
          />
        </div>

        <div className="flex gap-2">
          <Form.Item label="Expiry" name="expiry" rules={[{ required: true }]}>
            <Input placeholder="MM/YY" />
          </Form.Item>

          <Form.Item label="CVC" name="cvc" rules={[{ required: true }]}>
            <Input placeholder="000" />
          </Form.Item>
        </div>

        <div className="flex gap-2">
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true }]}
          >
            <Input placeholder="Country" />
          </Form.Item>

          <Form.Item
            label="Zip Code"
            name="zipCode"
            rules={[{ required: true }]}
          >
            <Input placeholder="000" />
          </Form.Item>
        </div>

        <Form.Item>
          <button
            type="submit"
            className="w-full py-2 bg-primary rounded-xl text-white font-semibold shadow-lg"
          >
            Pay & Confirm Booking
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CardEditModal;
