'use client';

import { useState } from 'react';
import { Table, Tabs, Avatar, ConfigProvider } from 'antd';
import { IBooking } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

const Bookings = ({ bookings = [] }: { bookings: IBooking[] }) => {
  const [activeTabKey, setActiveTabKey] = useState<string>('confirmed');

  const pendingAppointments: IBooking[] = bookings
    ?.filter(booking => booking.status === 'pending')
    .map(item => ({
      ...item,
      key: item._id,
    }));

  const confirmedAppointments: IBooking[] = bookings
    ?.filter(booking => booking.status === 'confirmed')
    .map(item => ({
      ...item,
      key: item._id,
    }));

  const inProgressAppointments: IBooking[] = bookings
    ?.filter(booking => booking.status === 'in_progress')
    .map(item => ({
      ...item,
      key: item._id,
    }));

  const readyForcompletionAppointments: IBooking[] = bookings
    ?.filter(booking => booking.status === 'ready_for_completion')
    .map(item => ({
      ...item,
      key: item._id,
    }));

  const completedAppointments: IBooking[] = bookings
    ?.filter(booking => booking.status === 'completed')
    .map(item => ({
      ...item,
      key: item._id,
    }));

  const cancelledAppointments: IBooking[] = bookings
    ?.filter(booking => booking.status === 'cancelled')
    .map(item => ({
      ...item,
      key: item._id,
    }));

  const columns = [
    {
      title: 'Client',
      dataIndex: 'clients',
      key: 'client',
      render: (text: string, record: IBooking) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={getCleanImageUrl(record?.client?.image)}
            style={{ marginRight: 8 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: 'Service',
      key: 'service',
      render: (_: any, record: IBooking) => record.service?.title || 'N/A',
    },
    {
      title: 'Session Length',
      key: 'sessionType',
      render: (_: any, record: IBooking) => {
        if (!record.sessions || record.sessions.length === 0) return 'N/A';

        // Count unique days
        const uniqueDays = new Set(
          record.sessions.map(s => new Date(s.date).toDateString())
        );

        const totalDays = uniqueDays.size;

        // Sum total hours
        const totalHours = record.sessions.reduce((sum, s) => {
          const start = parseInt(s.startTime.split(':')[0], 10);
          const end = parseInt(s.endTime.split(':')[0], 10);
          return sum + (end - start);
        }, 0);

        const dayText = totalDays === 1 ? 'day' : 'days';
        const hourText = totalHours === 1 ? 'hour' : 'hours';

        return `${totalDays} ${dayText} * ${totalHours} ${hourText}`;
      },
    },
    //     {
    //       title: 'Scheduled Date & Time',
    //       key: 'scheduledTime',
    //       render: (_: any, record: IBooking) => {
    //         if (!record.sessions || record.sessions.length === 0) return 'N/A';

    //         const sortedSessions = record.sessions.sort(
    //           (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    //         );

    //         const firstDate = new Date(
    //           sortedSessions[0]?.date
    //         ).toLocaleDateString();

    //         const lastDate = new Date(
    //           sortedSessions[sortedSessions.length - 1]?.date
    //         ).toLocaleDateString();

    //         return firstDate === lastDate
    //           ? firstDate
    //           : `${firstDate} - ${lastDate}`;
    //       },
    //     },
    {
      title: 'Scheduled Date & Time',
      key: 'scheduledTime',
      render: (_: any, record: IBooking) => {
        if (!record.sessions || record.sessions.length === 0) return 'N/A';

        return record.sessions
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map(
            s =>
              `${new Date(s.date).toLocaleDateString()} (${s.startTime} - ${
                s.endTime
              })`
          )
          .join(', ');
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
      render: (_: any, record: IBooking) => (
        <span className="capitalize">{record.paymentStatus || 'N/A'}</span>
      ),
    },
    {
      title: 'Booking Status',
      // dataIndex: 'status',
      key: 'status',
      render: (_: any, record: IBooking) => (
        <span className="capitalize">{record.status || 'N/A'}</span>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'pending',
      label: 'Pending Appointments',
      children: (
        <Table
          columns={columns}
          dataSource={pendingAppointments}
          pagination={false}
        />
      ),
    },
    {
      key: 'confirmed',
      label: 'Confirmed Appointments',
      children: (
        <Table
          columns={columns}
          dataSource={confirmedAppointments}
          pagination={false}
        />
      ),
    },
    {
      key: 'in_progress',
      label: 'In-Progress Appointments',
      children: (
        <Table
          columns={columns}
          dataSource={inProgressAppointments}
          pagination={false}
        />
      ),
    },
    {
      key: 'ready_for_completion',
      label: 'Ready for Completion Appointments',
      children: (
        <Table
          columns={columns}
          dataSource={readyForcompletionAppointments}
          pagination={false}
        />
      ),
    },
    {
      key: 'completed',
      label: 'Completed Appointments',
      children: (
        <Table
          columns={columns}
          dataSource={completedAppointments}
          pagination={false}
        />
      ),
    },
    {
      key: 'cancelled',
      label: 'Cancelled or No-Show Appointments',
      children: (
        <Table
          columns={columns}
          dataSource={cancelledAppointments}
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
    </div>
  );
};

export default Bookings;
