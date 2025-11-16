'use client';

import { useEffect, useState } from 'react';
import { Table, Avatar, ConfigProvider, Button, Form, UploadFile } from 'antd';
import { IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import EditModal from './EditModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'sonner';
import { deleteAService, updateAService } from '@/services/Service';
import { artistCreateHisOnboardingAccount } from '@/services/Artists';
import Link from 'next/link';
import BoostProfileButton from './Bookings/BoostProfileButton';

const Services = ({
  services = [],
  profile,
}: {
  services: IService[];
  profile: any;
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [editForm] = Form.useForm();

  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
  // const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  const [hideStripeBanner, setHideStripeBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isStripeConnected = profile?.stripeAccountId && profile?.isStripeReady;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = window.localStorage.getItem('services_stripe_banner_hidden');
    if (stored === 'true') {
      setHideStripeBanner(true);
    }

    setMounted(true);
  }, []);

  const handleConnectStripe = async () => {
    try {
      const res = await artistCreateHisOnboardingAccount();

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error('Failed to create Stripe onboarding account:', error);
      toast.error('Failed to create Stripe onboarding account');
    }
  };

  const handleDismissStripeBanner = () => {
    setHideStripeBanner(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('services_stripe_banner_hidden', 'true');
    }
  };

  const openEditModal = (service: IService) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
    editForm.setFieldsValue({
      title: service.title,
      description: service.description,
      price: service.price,
      bodyLocation: service.bodyLocation,
      sessionType: service.sessionType,
    });
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
      render: (text: string, record: IService) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={getCleanImageUrl(record.thumbnail)}
            style={{ marginRight: 8 }}
          />
          {text}
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Body Location',
      dataIndex: 'bodyLocation',
      key: 'bodyLocation',
      render: (value: string) => <span className="capitalize">{value}</span>,
    },
    {
      title: 'Session Type',
      dataIndex: 'sessionType',
      key: 'sessionType',
      render: (value: string) => <span className="capitalize">{value}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => `$${value}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IService) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="default" danger onClick={() => openDeleteModal(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // handleEditService
  const handleEditService = async (
    values: any,
    existingImages: string[],
    newFiles: File[],
    thumbnailFile?: File
  ) => {
    if (!selectedService || !selectedService?._id) {
      return toast.error('Must select a service to update!');
    }

    try {
      const formData = new FormData();

      formData.append(
        'data',
        JSON.stringify({
          ...values,
          images: existingImages,
        })
      );

      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      newFiles.forEach(file => {
        formData.append('images', file);
      });

      const res = await updateAService(selectedService?._id, formData);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsEditModalOpen(false);
    }
  };

  // openDeleteModal
  const openDeleteModal = (service: IService) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  // handleDeleteAService
  const handleDeleteAService = async () => {
    if (!selectedService || !selectedService?._id) {
      return toast.error('Must select a service to delete!');
    }

    try {
      const res = await deleteAService(selectedService?._id);

      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto md:my-20 px-4">
      {/* Stripe Connection Status */}
      <div className="mb-6">
        {mounted && !isStripeConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-800 font-semibold">
                  Stripe Not Connected
                </h3>
                <p className="text-yellow-600 text-sm">
                  Connect your Stripe account to accept payments
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleConnectStripe}
                className="px-4 py-2 rounded-md bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition-colors"
              >
                Connect Stripe
              </button>
            </div>
          </div>
        )}

        {mounted && isStripeConnected && !hideStripeBanner && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">
                  Stripe Connected
                </h3>
                <p className="text-green-600 text-sm">
                  Your account is ready to accept payments
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDismissStripeBanner}
              className="absolute top-2 right-2 text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-3xl font-bold mb-2">Services</h1>
        <p className="text-gray-500">View and manage your created services.</p>
      </div>

      <BoostProfileButton profileData={profile} />

      <Link href="/services/create" className="flex justify-end my-5">
        <div className="px-6 py-2 w-fit rounded-lg border bg-primary text-white">
          + Create Service
        </div>
      </Link>

      <ConfigProvider
        theme={{
          components: { Table: { headerBg: '#f5f5f5' } },
        }}
      >
        <Table
          columns={columns}
          dataSource={services.map(service => ({
            ...service,
            key: service._id,
          }))}
          pagination={false}
          scroll={{ x: 900 }}
        />
      </ConfigProvider>

      {/* Edit Modal */}
      <EditModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedService={selectedService}
        editForm={editForm}
        handleEditService={handleEditService}
        thumbnailFile={thumbnailFile}
        setThumbnailFile={setThumbnailFile}
        // imageFiles={imageFiles}
        // setImageFiles={setImageFiles}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleDelete={handleDeleteAService}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Services;
