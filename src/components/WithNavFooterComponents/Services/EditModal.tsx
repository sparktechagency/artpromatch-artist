'use client';

import { IService, TattooBodyParts } from '@/types';
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SetStateAction, useEffect, Dispatch, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { getCleanImageUrl, makeImageUrl } from '@/lib/getCleanImageUrl';
import { toast } from 'sonner';

const { Option } = Select;

type TEditModalProps = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (value: SetStateAction<boolean>) => void;
  selectedService: IService | null;
  editForm: FormInstance<any>;
  handleEditService: (
    values: any,
    existingImages: string[],
    newFiles: File[],
    thumbnailFile?: File | undefined
  ) => Promise<string | number | undefined>;
  thumbnailFile: UploadFile[];
  setThumbnailFile: Dispatch<SetStateAction<UploadFile[]>>;
  //   imageFiles: UploadFile[];
  //   setImageFiles: Dispatch<SetStateAction<UploadFile[]>>;
};

const EditModal = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedService,
  editForm,
  handleEditService,
}: TEditModalProps) => {
  // Hybrid state: existing image URLs and new files
  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  //   const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (selectedService) {
      editForm.setFieldsValue({
        title: selectedService.title,
        description: selectedService.description,
        bodyLocation: selectedService.bodyLocation,
        sessionType: selectedService.sessionType,
        price: selectedService.price,
      });

      // Thumbnail
      if (selectedService.thumbnail) {
        setThumbnailFile([
          {
            uid: '-1',
            name: 'thumbnail',
            status: 'done',
            url: getCleanImageUrl(selectedService.thumbnail),
          },
        ]);
      }

      // Existing images from DB
      if (selectedService.images && selectedService.images.length > 0) {
        //  setExistingImages(selectedService.images);
        setImageFiles(
          selectedService.images.map((img, index) => ({
            uid: `img-${index}`,
            name: `image-${index}`,
            status: 'done',
            url: getCleanImageUrl(img),
            originFileObj: undefined, // mark as DB image
          }))
        );
      }
    }
  }, [selectedService, editForm]);

  //   // Remove handler: remove both from state and existingImages if DB image
  //   const handleRemoveImage = (file: UploadFile) => {
  //     setImageFiles(prev => prev.filter(f => f.uid !== file.uid));

  //     // If this is an existing image (no originFileObj), remove from existingImages
  //     if (!file.originFileObj && file.url) {
  //       setExistingImages(prev =>
  //         prev.filter(img => getCleanImageUrl(img) !== file.url)
  //       );
  //     }
  //   };

  const handleThumbnailUpload: UploadProps['onChange'] = ({ fileList }) => {
    setThumbnailFile(fileList);
  };

  const handleImagesUpload: UploadProps['onChange'] = ({ fileList }) => {
    setImageFiles(fileList);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) toast.error('Only images are allowed!');
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) toast.error('Image must be smaller than 5MB!');
    return isImage && isLt5M;
  };

  const onFinish = async (values: any) => {
    // Separate new files and existing URLs
    const newFiles = imageFiles
      .filter(f => f.originFileObj)
      .map(f => f.originFileObj!) as File[];

    const existingImages = imageFiles
      .filter(f => !f.originFileObj && f.url)
      .map(f => makeImageUrl(f.url!));

    if (existingImages.length + newFiles.length < 1) {
      return toast.error('At least one service image is required!');
    }

    const thumbnailToSend = thumbnailFile[0]?.originFileObj as File | undefined;

    await handleEditService(values, existingImages, newFiles, thumbnailToSend);
  };

  return (
    <Modal
      title="Edit Service"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={null}
    >
      {selectedService && (
        <Form form={editForm} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Body Location"
            name="bodyLocation"
            rules={[{ required: true }]}
          >
            <Select>
              {Object.entries(TattooBodyParts).map(([key, value]) => (
                <Option key={key} value={value}>
                  {value
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, c => c.toUpperCase())}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Session Type"
            name="sessionType"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="short">Short</Option>
              <Option value="long">Long</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>

          {/* Thumbnail */}
          <Form.Item label="Thumbnail">
            <Upload
              listType="picture-card"
              fileList={thumbnailFile}
              onChange={handleThumbnailUpload}
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              {thumbnailFile.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          {/* Service Images */}
          <Form.Item label="Service Images">
            <Upload
              listType="picture-card"
              fileList={imageFiles}
              onChange={handleImagesUpload}
              beforeUpload={beforeUpload}
              multiple
            >
              {imageFiles.length >= 8 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Images</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditModal;
