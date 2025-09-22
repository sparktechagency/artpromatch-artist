'use client';

import { useState } from 'react';
import { Table, Avatar, ConfigProvider, Button, Form, UploadFile } from 'antd';
import { IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import EditModal from './EditModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'sonner';
import { deleteAService, updateAService } from '@/services/Service';
import Link from 'next/link';

const Services = ({ services = [] }: { services: IService[] }) => {

  console.log({ services });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [editForm] = Form.useForm();

  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
  // const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);

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
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-3xl font-bold mb-2">Services</h1>
        <p className="text-gray-500">View and manage your created services.</p>
      </div>

      <Link href="/services/create" className="flex justify-end mb-5">
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
