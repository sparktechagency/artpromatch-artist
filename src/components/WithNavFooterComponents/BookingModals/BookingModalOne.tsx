'use client';

import { useState } from 'react';
import { ConfigProvider, DatePicker, Form, Select, Tag, Modal } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { AllImages } from '@/assets/images/AllImages';
import BookingModalTwo from './BookingModalTwo';

const { Option } = Select;

interface BookingModalOneProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const BookingModalOne = ({ handleOk, handleCancel }: BookingModalOneProps) => {
  const [isModalOpenForStepTwo, setIsModalOpenForStepTwo] = useState(false);

  const showModalForStepTwo = () => setIsModalOpenForStepTwo(true);
  const handleOkForStepTwo = () => setIsModalOpenForStepTwo(false);
  const handleCancelForStepTwo = () => setIsModalOpenForStepTwo(false);

  const onFinish = (values: any) => {
    console.log('Form values:', values);
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

      <h1 className="text-2xl font-bold mb-6">Book Your Session</h1>

      <Form
        name="bookingForm"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ service: '', serviceType: '' }}
      >
        <Form.Item
          name="service"
          label="Choose a Service"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Service">
            <Option value="service1">Service 1</Option>
            <Option value="service2">Service 2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="serviceType"
          label="Service Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Service Type">
            <Option value="type1">Service Type 1</Option>
            <Option value="type2">Service Type 2</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label={
            <div className="flex justify-between items-center">
              <span>Date and Time</span>
              <Link href="/booking-availablity">
                <span className="text-primary underline">
                  Check Availability
                </span>
              </Link>
            </div>
          }
          rules={[{ required: true }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Time Slots */}
        {['Morning', 'Afternoon', 'Evening'].map(slot => (
          <div
            key={slot}
            className="flex justify-between items-center gap-2 mb-2"
          >
            <span>{slot}</span>
            <span className="flex justify-center items-center border border-dashed px-2 py-1 rounded-lg">
              10:00 AM - 11:30 AM
            </span>
          </div>
        ))}

        <Form.Item>
          <button
            type="button"
            onClick={showModalForStepTwo}
            className="w-full py-3 bg-primary rounded-xl text-white font-semibold text-lg shadow-lg"
          >
            Next
          </button>
        </Form.Item>
      </Form>

      {/* Step 2 Modal */}
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
          open={isModalOpenForStepTwo}
          onOk={handleOkForStepTwo}
          onCancel={handleCancelForStepTwo}
          footer={false}
        >
          <BookingModalTwo
            handleOk={handleOkForStepTwo}
            handleCancel={handleCancelForStepTwo}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default BookingModalOne;
