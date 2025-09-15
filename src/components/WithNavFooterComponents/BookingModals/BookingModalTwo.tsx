'use client';

import { useState } from 'react';
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Tag,
  Upload,
} from 'antd';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import ReviewBookingModal from './ReviewBookingModal';

const { Option } = Select;

interface BookingModalTwoProps {
  handleOk: () => void;
  handleCancel: () => void;
}

const BookingModalTwo = ({ handleOk, handleCancel }: BookingModalTwoProps) => {
  const [isModalOpenForReviewBooking, setIsModalOpenForReviewBooking] =
    useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const showModalForReviewBooking = () => setIsModalOpenForReviewBooking(true);
  const handleOkForReviewBooking = () => setIsModalOpenForReviewBooking(false);
  const handleCancelForReviewBooking = () =>
    setIsModalOpenForReviewBooking(false);

  const handleProfilePicUpload = (e: any) => {
    setProfilePic(e.file.originFileObj);
  };

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

      <h1 className="text-2xl font-semibold mb-6">
        Tell Alex About Your Tattoo
      </h1>

      <Form name="bookingStepTwo" layout="vertical" onFinish={onFinish}>
        {/* Body Part */}
        <Form.Item
          name="bodyPart"
          label="Where on your body?"
          rules={[{ required: true, message: 'Please select a body part!' }]}
        >
          <Select placeholder="Select body part">
            <Option value="arm">Arm</Option>
            <Option value="leg">Leg</Option>
            <Option value="back">Back</Option>
          </Select>
        </Form.Item>

        {/* Tattoo Description */}
        <Form.Item
          name="tattooDescription"
          label="Describe your tattoo idea in detail"
          rules={[{ required: true, message: 'Please describe your tattoo!' }]}
        >
          <Input.TextArea rows={4} placeholder="Your idea..." />
        </Form.Item>

        {/* Date and Time */}
        <Form.Item
          name="date"
          label="Date and Time"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Upload Reference Images */}
        <Form.Item name="image" label="Upload Reference Images (Optional)">
          <div className="border border-dashed w-full rounded-full cursor-pointer flex justify-center items-center py-5">
            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleProfilePicUpload}
            >
              <Image
                src={AllImages.upload}
                alt="upload"
                width={30}
                height={30}
              />
            </Upload>
          </div>
        </Form.Item>

        {/* Next Button */}
        <Form.Item>
          <button
            type="button"
            onClick={showModalForReviewBooking}
            className="w-full py-3 bg-primary rounded-xl text-white font-semibold text-lg shadow-lg"
          >
            Next
          </button>
        </Form.Item>
      </Form>

      {/* Review Booking Modal */}
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
          open={isModalOpenForReviewBooking}
          onOk={handleOkForReviewBooking}
          onCancel={handleCancelForReviewBooking}
          footer={false}
        >
          <ReviewBookingModal
            handleOk={handleOkForReviewBooking}
            handleCancel={handleCancelForReviewBooking}
          />
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default BookingModalTwo;
