'use client';

import { CiClock2 } from 'react-icons/ci';
import { Card, Button, List, Space, Modal, Form, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { AllImages } from '@/assets/images/AllImages';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { toast } from 'sonner';
// import { useSetTimeOffApiMutation } from '@/redux/api/features/availablityApi/availablityApi';

interface GuestSpot {
  date: string;
  location: string;
  booked: number;
  total: number;
}

interface BookedHour {
  date: string;
  reason: string;
}

interface SetTimeOffFormValues {
  from: Dayjs;
  to: Dayjs;
}

const weeklySchedule = [
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
  { day: 'Thursday' },
  { day: 'Friday' },
  { day: 'Saturday' },
  { day: 'Sunday' },
];

const guestSpots: GuestSpot[] = [
  {
    date: 'Dec 10-15, 2024',
    location: 'Manhattan, NY (Rivera Ink Studio)',
    booked: 4,
    total: 10,
  },
  {
    date: 'Dec 10-15, 2024',
    location: 'Manhattan, NY (Rivera Ink Studio)',
    booked: 4,
    total: 10,
  },
  {
    date: 'Dec 10-15, 2024',
    location: 'Manhattan, NY (Rivera Ink Studio)',
    booked: 4,
    total: 10,
  },
];

const bookedHours: BookedHour[] = [
  { date: 'Dec 20-25, 2024', reason: 'Holiday' },
  { date: 'Feb 1-4, 2025', reason: 'Personal Time' },
];

const AvailablityPage: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalForSetOffTime, setOpenModalForSetOffTime] = useState(false);
  const [form] = Form.useForm<SetTimeOffFormValues>();

  // const [setTimeOffApi] = useSetTimeOffApiMutation();

  const showModal = () => setOpenModal(true);
  const handleOk = () => setOpenModal(false);
  const handleCancel = () => setOpenModal(false);

  const showModalForSetOffTime = () => setOpenModalForSetOffTime(true);
  const handleOkForSetOffTime = () => setOpenModalForSetOffTime(false);
  const handleCancelForSetOffTime = () => setOpenModalForSetOffTime(false);

  const onFinish = async (values: SetTimeOffFormValues) => {
    const fromDate = dayjs(values.from).format('YYYY-MM-DD');
    const toDate = dayjs(values.to).format('YYYY-MM-DD');

    const payload = {
      dates: [fromDate, toDate],
    };

    console.log(payload);
    // const res = await setTimeOffApi(payload).unwrap();
    // toast.success(res?.message);
    form.resetFields();
    setOpenModalForSetOffTime(false);
  };

  const handleDelete = () => {
    toast.success('Deleted Successfully');
  };

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">
          Manage Your Availability and Tour Dates
        </h1>
        <p className="text-textSecondary">
          Keep your calendar up-to-date so clients can easily book with you.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Schedule */}
        <Card
          title="Set Your Weekly Schedule"
          extra={
            <Link
              href="/availability/set-specific-availability"
              className="text-primary hover:text-primary font-bold"
            >
              Set Specific Availability
            </Link>
          }
          className="shadow-md"
        >
          {weeklySchedule.map(({ day }) => (
            <div key={day} className="flex justify-between items-center py-2">
              <span className="font-medium">{day}</span>
              <div className="flex gap-2">
                <div className="flex gap-2 px-4 py-1 border rounded">
                  <CiClock2 className="text-primary h-5 w-5" />
                  <p>09:00 - 10:00</p>
                </div>
                <div className="flex gap-2 px-4 py-1 border rounded">
                  <CiClock2 className="text-primary h-5 w-5" />
                  <p>09:00 - 10:00</p>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Guest Spots */}
        <Card
          title="Manage Your Guest Spots"
          extra={
            <Link
              href="/add-guest-spots"
              className="text-primary hover:text-primary font-bold"
            >
              Add Guest Spots
            </Link>
          }
          className="shadow-md"
        >
          <List
            dataSource={guestSpots}
            renderItem={item => (
              <List.Item className="border p-3 rounded-lg shadow-sm mb-2">
                <div className="flex-1 p-5">
                  <p className="font-semibold">{item.date}</p>
                  <p className="text-sm text-gray-600">{item.location}</p>
                  <p className="text-sm text-gray-500">
                    Slots Booked: {item.booked} of {item.total} Available
                  </p>
                </div>
                <Space className="p-2">
                  <Button onClick={showModal} icon={<EditOutlined />} />
                  <Button
                    onClick={handleDelete}
                    icon={<DeleteOutlined />}
                    danger
                  />
                </Space>
              </List.Item>
            )}
          />
        </Card>

        {/* Set Time Off */}
        <Card
          title="Set Time Off / Manually Booked Hours"
          extra={
            <button
              onClick={showModalForSetOffTime}
              className="text-primary hover:text-primary font-bold cursor-pointer"
            >
              Block New Date
            </button>
          }
          className="shadow-md"
        >
          <List
            dataSource={bookedHours}
            renderItem={item => (
              <List.Item className="border rounded-md shadow-sm mb-2">
                <p className="font-medium px-2">
                  {item.date}{' '}
                  <span className="text-gray-500">({item.reason})</span>
                </p>
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* Guest Spot Modal */}
      <Modal open={openModal} onOk={handleOk} onCancel={handleCancel}>
        {[1, 2].map(i => (
          <div
            key={i}
            className="flex justify-between items-center mb-4 border-0 border-b"
          >
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
          </div>
        ))}
      </Modal>

      {/* Set Off Time Modal */}
      <Modal
        open={openModalForSetOffTime}
        onOk={handleOkForSetOffTime}
        onCancel={handleCancelForSetOffTime}
      >
        <div>
          <h3 className="text-2xl font-semibold">Block New Date</h3>
          <p className="text-gray-500 text-sm">
            By adding this, you&apos;ll set your unavailability on selected date
          </p>
        </div>

        <Form<SetTimeOffFormValues>
          name="setOffTime"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item name="from" label="From">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="to" label="To">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="submit">
            <button className="bg-primary text-white w-full py-3 rounded-md">
              Set Time Off
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AvailablityPage;
