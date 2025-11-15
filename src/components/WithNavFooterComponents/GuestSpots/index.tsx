'use client';

import {
  Card,
  List,
  Modal,
  Form,
  DatePicker,
  InputNumber,
  TimePicker,
} from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'sonner';
import { createGuestSpotByArtist } from '@/services/GuestSpot';

interface GuestSpot {
  _id: string;
  startDate: string;
  endDate: string;
}

interface CreateGuestSpotFormValues {
  latitude: number;
  longitude: number;
  currentLocationUntil: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  startTime: Dayjs;
  endTime: Dayjs;
  offDaysStartDate?: Dayjs | null;
  offDaysEndDate?: Dayjs | null;
}

const GuestSpots = ({ guestSpots = [] }: { guestSpots: GuestSpot[] }) => {

  console.log({ guestSpots });
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm] = Form.useForm<CreateGuestSpotFormValues>();

  const handleCreateGuestSpot = async (values: CreateGuestSpotFormValues) => {
    try {
      setCreating(true);

      const startTimeStr = values.startTime?.format('h:mm a');
      const endTimeStr = values.endTime?.format('h:mm a');

      const payload = {
        currentLocation: {
          coordinates: [values.longitude, values.latitude] as [number, number],
          currentLocationUntil: values.currentLocationUntil?.toISOString(),
        },
        startDate: values.startDate?.toISOString(),
        endDate: values.endDate?.toISOString(),
        startTime: startTimeStr,
        endTime: endTimeStr,
        offDays:
          values.offDaysStartDate || values.offDaysEndDate
            ? {
                startDate: values.offDaysStartDate?.toISOString() ?? null,
                endDate: values.offDaysEndDate?.toISOString() ?? null,
              }
            : undefined,
      };

      try {
        const res = await createGuestSpotByArtist(payload);
        if (res?.success) {
          toast.success(res?.message);
          setOpenCreateModal(false);
          createForm.resetFields();
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong while adding.');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Unable to create guest spot');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">
          Manage Your Availability and Tour Dates
        </h1>
        <p className="text-secondary">
          Keep your calendar up-to-date so clients can easily book with you.
        </p>
      </div>

      <div className="p-6">
        {/* Guest Spots */}
        <Card
          title="Manage Your Guest Spots"
          extra={
            <button
              type="button"
              onClick={() => setOpenCreateModal(true)}
              className="text-primary hover:text-primary font-bold"
            >
              Add Guest Spots
            </button>
          }
          className="shadow-md"
        >
          <List
            dataSource={guestSpots}
            locale={{ emptyText: 'No active guest spots yet' }}
            renderItem={item => {
              const dateRange = `${dayjs(item.startDate).format(
                'MMM D, YYYY'
              )} - ${dayjs(item.endDate).format('MMM D, YYYY')}`;

              return (
                <List.Item className="border p-3 rounded-lg shadow-sm mb-2">
                  <div className="flex-1 p-5">
                    <p className="font-semibold">{dateRange}</p>
                  </div>
                </List.Item>
              );
            }}
          />
        </Card>
      </div>

      {/* Create Guest Spot Modal */}
      <Modal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onOk={() => createForm.submit()}
        confirmLoading={creating}
        title="Add Guest Spot"
      >
        <Form<CreateGuestSpotFormValues>
          form={createForm}
          layout="vertical"
          onFinish={handleCreateGuestSpot}
        >
          <Form.Item
            label="Guest Location's Latitude"
            name="latitude"
            rules={[{ required: true, message: 'Latitude is required' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="40.7128" />
          </Form.Item>

          <Form.Item
            label="Guest Location's Longitude"
            name="longitude"
            rules={[{ required: true, message: 'Longitude is required' }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="-74.0060" />
          </Form.Item>

          <Form.Item
            label="Guest Location Until"
            name="currentLocationUntil"
            rules={[
              { required: true, message: 'Current location until is required' },
            ]}
          >
            <DatePicker
              showTime
              style={{ width: '100%' }}
              disabledDate={current => {
                if (!current) return false;
                const today = dayjs().startOf('day');
                // disable today and any past date
                return (
                  current.startOf('day').isSame(today, 'day') ||
                  current.startOf('day').isBefore(today, 'day')
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Start date is required' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={current => {
                if (!current) return false;
                const today = dayjs().startOf('day');
                const min = today.add(1, 'day'); // tomorrow
                const until = createForm.getFieldValue('currentLocationUntil');

                if (!until) {
                  // until na thakle sudhu today ar past disable
                  return (
                    current.startOf('day').isSame(today, 'day') ||
                    current.startOf('day').isBefore(today, 'day')
                  );
                }

                const max = dayjs(until).startOf('day');

                // allow only [tomorrow, currentLocationUntil]
                return (
                  current.startOf('day').isBefore(min, 'day') ||
                  current.startOf('day').isAfter(max, 'day')
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'End date is required' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={current => {
                if (!current) return false;
                const today = dayjs().startOf('day');
                const min = today.add(1, 'day'); // tomorrow
                const until = createForm.getFieldValue('currentLocationUntil');

                if (!until) {
                  // until na thakle sudhu today ar past disable
                  return (
                    current.startOf('day').isSame(today, 'day') ||
                    current.startOf('day').isBefore(today, 'day')
                  );
                }

                const max = dayjs(until).startOf('day');

                // allow only [tomorrow, currentLocationUntil]
                return (
                  current.startOf('day').isBefore(min, 'day') ||
                  current.startOf('day').isAfter(max, 'day')
                );
              }}
            />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: 'Start time is required' }]}
          >
            <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: 'End time is required' }]}
          >
            <TimePicker use12Hours format="h:mm a" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Off Days Start" name="offDaysStartDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Off Days End" name="offDaysEndDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GuestSpots;
