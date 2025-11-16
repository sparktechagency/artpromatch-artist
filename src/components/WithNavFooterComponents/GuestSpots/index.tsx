'use client';

import {
  Card,
  // List,
  Modal,
  Form,
  DatePicker,
  InputNumber,
  TimePicker,
  Tag,
} from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'sonner';
import {
  createGuestSpotByArtist,
  getSingleGuestSpotByArtist,
  updateGuestSpotByArtist,
} from '@/services/GuestSpot';
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  // Star,
  Edit3,
  // Trash2,
} from 'lucide-react';
import { GuestSpot } from '@/types';

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
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingSpot, setLoadingSpot] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [createForm] = Form.useForm<CreateGuestSpotFormValues>();

  const handleSubmitGuestSpot = async (values: CreateGuestSpotFormValues) => {
    try {
      setSubmitting(true);

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
        const res =
          editing && selectedSpotId
            ? await updateGuestSpotByArtist(selectedSpotId, payload)
            : await createGuestSpotByArtist(payload);

        if (res?.success) {
          toast.success(res?.message);
          setOpenCreateModal(false);
          setEditing(false);
          setSelectedSpotId(null);
          createForm.resetFields();
        } else {
          toast.error(res?.message);
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong while saving.');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Unable to save guest spot');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditing(false);
    setSelectedSpotId(null);
    createForm.resetFields();
    setOpenCreateModal(true);
  };

  const handleEditGuestSpot = async (id: string) => {
    try {
      setLoadingSpot(true);
      setEditing(true);
      setSelectedSpotId(id);
      setOpenCreateModal(true);

      const res = await getSingleGuestSpotByArtist(id);
      const data = res?.data;

      if (!data) {
        toast.error('Unable to load guest spot details');
        return;
      }

      createForm.setFieldsValue({
        latitude: data.location?.coordinates?.[1],
        longitude: data.location?.coordinates?.[0],
        currentLocationUntil: data.location?.until
          ? dayjs(data.location.until)
          : undefined,
        startDate: data.startDate ? dayjs(data.startDate) : undefined,
        endDate: data.endDate ? dayjs(data.endDate) : undefined,
        startTime: data.startTime ? dayjs(data.startTime, 'h:mm a') : undefined,
        endTime: data.endTime ? dayjs(data.endTime, 'h:mm a') : undefined,
        offDaysStartDate: data.offDays?.startDate
          ? dayjs(data.offDays.startDate)
          : null,
        offDaysEndDate: data.offDays?.endDate
          ? dayjs(data.offDays.endDate)
          : null,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to load guest spot details');
    } finally {
      setLoadingSpot(false);
    }
  };

  const formatCoordinates = (coords: [number, number]) => {
    return `${coords[0].toFixed(4)}, ${coords[1].toFixed(4)}`;
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'green' : 'gray';
  };

  const getDaysRemaining = (until: string) => {
    const now = dayjs();
    const untilDate = dayjs(until);
    const days = untilDate.diff(now, 'day');
    return days > 0 ? `${days} days left` : 'Expired';
  };

  return (
    <div className="container mx-auto md:my-20">
      {/* <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Manage Your Availability and Tour Dates
        </h1>
        <p className="text-secondary text-lg mt-3 text-center max-w-2xl">
          Keep your calendar up-to-date so clients can easily book with you.
          Showcase your availability with beautiful, interactive cards.
        </p>
      </div> */}

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">
          Manage Your Availability and Tour Dates
        </h1>
        <p className="text-secondary">
          Keep your calendar up-to-date so clients can easily book with you.
        </p>
      </div>

      <div className="p-6">
        {/* Guest Spots - Updated UI */}
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50/50">
          <div className="p-8 border-b border-gray-100 bg-white/80">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  Your Guest Spots
                </h2>
                <p className="text-gray-600 mt-1">
                  Manage your locations and availability periods
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-white flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Add New Spot
                </span>
              </button>
            </div>
          </div>

          {guestSpots.length === 0 ? (
            <div className="text-center py-16 px-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Guest Spots Yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start by adding your first guest spot to let clients know where
                and when you're available.
              </p>
              <button
                type="button"
                onClick={() => setOpenCreateModal(true)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Your First Spot
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
              {guestSpots.map(item => {
                const dateRange = `${dayjs(item.startDate).format(
                  'MMM D, YYYY'
                )} - ${dayjs(item.endDate).format('MMM D, YYYY')}`;
                const until = dayjs(item.location.until).format(
                  'MMM D, YYYY h:mm A'
                );
                const daysRemaining = getDaysRemaining(item.location.until);

                return (
                  <div
                    key={item._id}
                    className="group relative bg-white rounded-2xl border border-gray-200/80 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4 z-10">
                      <Tag
                        color={getStatusColor(item.isActive)}
                        className="font-semibold px-3 py-1 rounded-full border-0 shadow-sm"
                      >
                        {item.isActive ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Active
                          </div>
                        ) : (
                          'Inactive'
                        )}
                      </Tag>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              Guest Location
                            </h3>
                            <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {daysRemaining}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Coordinates */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Navigation className="w-4 h-4" />
                          <span className="font-medium">Coordinates</span>
                        </div>
                        <p className="font-mono text-gray-800 text-sm">
                          {formatCoordinates(item.location.coordinates)}
                        </p>
                      </div>

                      {/* Date Range */}
                      <div className="flex items-center gap-3 text-gray-600 mb-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{dateRange}</span>
                      </div>

                      {/* Active Until */}
                      <div className="flex items-center justify-between text-sm p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200">
                        <span className="text-gray-600 font-medium">
                          Active Until
                        </span>
                        <span className="text-gray-800 font-semibold">
                          {until}
                        </span>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {/* <Star className="w-4 h-4 text-yellow-500" /> */}
                        <span className="text-sm text-gray-600">Actions:</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditGuestSpot(item._id)}
                          className="p-2 hover:bg-white rounded-lg transition-colors duration-200 group/edit"
                        >
                          <Edit3 className="w-4 h-4 text-gray-400 group-hover/edit:text-primary" />
                        </button>
                        {/* <button className="p-2 hover:bg-white rounded-lg transition-colors duration-200 group/delete">
                          <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-500" />
                        </button> */}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Create / Edit Guest Spot Modal */}
      <Modal
        open={openCreateModal}
        onCancel={() => setOpenCreateModal(false)}
        onOk={() => createForm.submit()}
        confirmLoading={submitting || loadingSpot}
        title={editing ? 'Edit Guest Spot' : 'Add Guest Spot'}
      >
        <Form<CreateGuestSpotFormValues>
          form={createForm}
          layout="vertical"
          onFinish={handleSubmitGuestSpot}
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
                const min = today.add(1, 'day');
                const until = createForm.getFieldValue('currentLocationUntil');

                if (!until) {
                  return (
                    current.startOf('day').isSame(today, 'day') ||
                    current.startOf('day').isBefore(today, 'day')
                  );
                }

                const max = dayjs(until).startOf('day');
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
                const min = today.add(1, 'day');
                const until = createForm.getFieldValue('currentLocationUntil');

                if (!until) {
                  return (
                    current.startOf('day').isSame(today, 'day') ||
                    current.startOf('day').isBefore(today, 'day')
                  );
                }

                const max = dayjs(until).startOf('day');
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
