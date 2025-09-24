'use client';

import { useState } from 'react';
import {
  Table,
  Tabs,
  Avatar,
  ConfigProvider,
  Form,
  Modal,
  DatePicker,
  TimePicker,
} from 'antd';
import { IBooking } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { confirmBookingByArtist, createSession } from '@/services/Booking';
import { div } from 'framer-motion/client';

const Bookings = ({ bookings = [] }: { bookings: IBooking[] }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [form] = Form.useForm();

  const byStatus = (status: string) =>
    bookings
      ?.filter(booking => booking.status === status)
      .map(item => ({ ...item, key: item._id }));

  // Modal confirm button clicked
  const handleAddSessionClick = (booking: IBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  // Submit session
  const handleCreateSession = async () => {
    if (!selectedBooking) {
      return toast.error('Must select a booking to create session!');
    }

    try {
      const values = await form.validateFields();
      const payload = {
        date: values.date.startOf('day').toISOString(),
        startTime: values.startTime.format('hh:mm A'),
        endTime: values.endTime.format('hh:mm A'),
      };

      const res = await createSession(selectedBooking?._id, payload);

      if (res?.success) {
        toast.success(res?.message);
        setIsModalOpen(false);
        form.resetFields();
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleCancelCreateSession = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleConfirmBookingByArtist = async (bookingId: string) => {
    try {
      const res = await confirmBookingByArtist(bookingId);

      console.log({ res });

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const baseColumns = [
    {
      title: 'Client',
      dataIndex: 'clients',
      key: 'client',
      render: (text: string, booking: IBooking) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={getCleanImageUrl(booking?.client?.image)}
            style={{ marginRight: 8 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: 'Service',
      key: 'service',
      render: (_: any, booking: IBooking) => booking.service?.title || 'N/A',
    },
    {
      title: 'Session Length',
      key: 'sessionType',
      render: (_: any, booking: IBooking) => {
        if (!booking.sessions || booking.sessions.length === 0) return 'N/A';

        // Count unique days
        const uniqueDays = new Set(
          booking.sessions.map(s => new Date(s.date).toDateString())
        );
        const totalDays = uniqueDays.size;

        // Sum total hours (with minutes)
        const totalHours = booking.sessions.reduce((sum, s) => {
          const start = dayjs(s.startTime, 'hh:mm A');
          const end = dayjs(s.endTime, 'hh:mm A');
          const diffInHours = end.diff(start, 'minute') / 60;
          return sum + diffInHours;
        }, 0);

        const dayText = totalDays === 1 ? 'day' : 'days';
        const hourText = totalHours === 1 ? 'hour' : 'hours';

        return `${totalDays} ${dayText} of total ${totalHours} ${hourText}`;
      },
    },
    {
      title: 'Scheduled Date & Time',
      key: 'scheduledTime',
      render: (_: any, booking: IBooking) => {
        if (!booking.sessions || booking.sessions.length === 0) return 'N/A';

        return (
          <div className="flex flex-col gap-1">
            {booking.sessions
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .map((s, index) => (
                <div key={index}>
                  {booking.sessions.length > 1 ? `${index + 1}. ` : ''}
                  {dayjs(s.date).format('YYYY-MM-DD')} ({s.startTime} -{' '}
                  {s.endTime})
                </div>
              ))}
          </div>
        );
      },
    },
    {
      title: 'Deposit Paid',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Payment Status',
      // dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (_: any, booking: IBooking) => (
        <span className="capitalize">{booking.paymentStatus || 'N/A'}</span>
      ),
    },
    {
      title: 'Booking Status',
      // dataIndex: 'status',
      key: 'status',
      render: (_: any, booking: IBooking) => (
        <span className="capitalize">{booking.status || 'N/A'}</span>
      ),
    },
  ];

  const pendingColumns = [
    ...baseColumns,
    {
      title: 'Action',
      key: 'action',
      render: (_: any, booking: IBooking) => (
        <div className="flex justify-center items-center gap-2">
          <div
            className="py-2 px-6 rounded-2xl bg-primary text-white w-fit"
            onClick={() => handleAddSessionClick(booking)}
          >
            Add Session
          </div>

          <div
            className="py-2 px-6 rounded-2xl bg-primary text-white w-fit"
            onClick={() => handleConfirmBookingByArtist(booking?._id)}
          >
            Confirm
          </div>
        </div>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'pending',
      label: 'Pending Appointments',
      children: (
        <Table
          columns={pendingColumns}
          dataSource={byStatus('pending')}
          pagination={false}
        />
      ),
    },
    {
      key: 'confirmed',
      label: 'Confirmed Appointments',
      children: (
        <Table
          columns={baseColumns}
          dataSource={byStatus('confirmed')}
          pagination={false}
        />
      ),
    },
    {
      key: 'in_progress',
      label: 'In-Progress Appointments',
      children: (
        <Table
          columns={baseColumns}
          dataSource={byStatus('in_progress')}
          pagination={false}
        />
      ),
    },
    {
      key: 'ready_for_completion',
      label: 'Ready for Completion Appointments',
      children: (
        <Table
          columns={baseColumns}
          dataSource={byStatus('ready_for_completion')}
          pagination={false}
        />
      ),
    },
    {
      key: 'completed',
      label: 'Completed Appointments',
      children: (
        <Table
          columns={baseColumns}
          dataSource={byStatus('completed')}
          pagination={false}
        />
      ),
    },
    {
      key: 'cancelled',
      label: 'Cancelled or No-Show Appointments',
      children: (
        <Table
          columns={baseColumns}
          dataSource={byStatus('cancelled')}
          pagination={false}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-secondary">
          View and manage your confirmed appointments.
        </p>
      </div>
      <div className="my-5">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemColor: '#816a6b',
                itemHoverColor: '#6a5454',
                itemActiveColor: '#6a5454',
                inkBarColor: '#6a5454',
              },
            },
          }}
        >
          <Tabs
            activeKey={activeTabKey}
            onChange={setActiveTabKey}
            className="text-primary hover:text-primary"
            items={tabItems}
          />
        </ConfigProvider>
      </div>

      {/* Modal */}
      <Modal
        title="Create Session"
        open={isModalOpen}
        onOk={handleCreateSession}
        onCancel={handleCancelCreateSession}
        okText="Confirm"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="date"
            label="Select Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={current =>
                current && current < dayjs().startOf('day')
              }
            />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please select start time' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: 'Please select end time' }]}
          >
            <TimePicker format="HH:mm" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Bookings;
