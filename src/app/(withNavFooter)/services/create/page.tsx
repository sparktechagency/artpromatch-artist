'use client';

import { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, Select } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { useRouter } from 'next/navigation';
import { TattooBodyParts } from '@/types';
import { toast } from 'sonner';
import { createService } from '@/services/Service';

const { TextArea } = Input;
const { Option } = Select;

const CreatePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
  const [imageFiles, setImageFiles] = useState<UploadFile[]>([]);
  const router = useRouter();

  // Handle thumbnail upload
  const handleThumbnailUpload: UploadProps['onChange'] = ({ fileList }) => {
    setThumbnailFile(fileList);
  };

  // Handle images upload
  const handleImagesUpload: UploadProps['onChange'] = ({ file, fileList }) => {
    if (file.status === 'removed') {
      setImageFiles(prevImageFiles =>
        prevImageFiles.filter(item => item.name !== file.name)
      );
      return;
    }

    if (file.status === 'done' || file.status === 'uploading') {
      setImageFiles(() => {
        return fileList.filter(
          (file, index, fullList) =>
            index === fullList.findIndex(oldFile => oldFile.name === file.name)
        );
      });
    }
  };

  // Before upload validation
  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      toast.error('You can only upload image files!');
    }

    const isLt5M = file.size / 1024 / 1024 < 5;

    if (!isLt5M) {
      toast.error('Image must be smaller than 5MB!');
    }

    return isImage && isLt5M;
  };

  // Submit form
  const handleCreateService = async (values: any) => {
    if (thumbnailFile.length === 0) {
      toast.error('Please upload a thumbnail image!');
      return;
    }

    if (imageFiles.length === 0) {
      toast.error('Please upload at least one service image!');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Append main data
      formData.append(
        'data',
        JSON.stringify({
          title: values.title,
          description: values.description,
          bodyLocation: values.bodyLocation,
          sessionType: values.sessionType,
          price: values.price,
        })
      );

      // Append thumbnail
      if (thumbnailFile[0]?.originFileObj) {
        formData.append('thumbnail', thumbnailFile[0].originFileObj);
      }

      // Append images
      imageFiles.forEach(file => {
        if (file.originFileObj) {
          formData.append('images', file.originFileObj);
        }
      });

      // Send to your API endpoint
      const res = await createService(formData);

      console.log({ res });

      if (res?.success) {
        toast.success(res?.message);
        form.resetFields();
        setThumbnailFile([]);
        setImageFiles([]);
        router.push('/services');
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Service
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateService}
          //    initialValues={{
          //      durationInMinutes: '2h 30m',
          //      bufferTimeInMinutes: '30m',
          //    }}
        >
          {/* Title */}
          <Form.Item
            label={<span className="font-medium">Service Title</span>}
            name="title"
            rules={[
              { required: true, message: 'Please enter a service title!' },
              { min: 3, message: 'Title must be at least 3 characters!' },
            ]}
          >
            <Input
              placeholder="e.g., Neck Tattoo"
              size="large"
              className="rounded-md"
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label={<span className="font-medium">Description</span>}
            name="description"
            rules={[
              { required: true, message: 'Please enter a description!' },
              {
                min: 500,
                message: 'Description must be at least 500 characters!',
              },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Describe your service in detail (minimum 500 characters)..."
              showCount
              maxLength={2000}
              className="rounded-md"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Body Location */}
            <Form.Item
              label={<span className="font-medium">Body Location</span>}
              name="bodyLocation"
              rules={[
                { required: true, message: 'Please select a body location!' },
              ]}
            >
              <Select
                placeholder="Select Body Location"
                size="large"
                className="rounded-md"
              >
                {Object.entries(TattooBodyParts).map(([key, value]) => (
                  <Option key={key} value={value}>
                    {value
                      .replace(/_/g, ' ')
                      .replace(/\b\w/g, c => c.toUpperCase())}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Session Type */}
            <Form.Item
              label={<span className="font-medium">Session Type</span>}
              name="sessionType"
              rules={[
                { required: true, message: 'Please select a session type!' },
              ]}
            >
              <Select
                placeholder="Select Session Type"
                size="large"
                className="rounded-md"
              >
                <Option value="short"> Short</Option>
                <Option value="long"> Long</Option>
              </Select>
            </Form.Item>

            {/* Price */}
            <Form.Item
              label={<span className="font-medium">Price ($)</span>}
              name="price"
              rules={[
                { required: true, message: 'Please enter a price!' },
                {
                  type: 'number',
                  min: 1,
                  message: 'Price must be at least $1!',
                },
              ]}
            >
              <InputNumber<number>
                min={1}
                placeholder="200"
                className="w-full"
                size="large"
                formatter={value =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={value => Number(value?.replace(/\$\s?|(,*)/g, '') || 0)}
              />
            </Form.Item>
          </div>

          <hr className="my-6" />

          {/* Thumbnail Upload */}
          <Form.Item
            label={<span className="font-medium">Thumbnail Image</span>}
            required
          >
            <Upload
              listType="picture-card"
              fileList={thumbnailFile}
              onChange={handleThumbnailUpload}
              beforeUpload={beforeUpload}
              maxCount={1}
              onRemove={() => setThumbnailFile([])}
            >
              {thumbnailFile.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div className="mt-2 text-sm">Upload Thumbnail</div>
                </div>
              )}
            </Upload>
            <p className="text-gray-500 text-sm">
              Main image that represents your service (5MB max)
            </p>
          </Form.Item>

          {/* Service Images Upload */}
          <Form.Item
            label={<span className="font-medium">Service Images</span>}
            required
          >
            <Upload
              listType="picture-card"
              fileList={imageFiles}
              onChange={handleImagesUpload}
              beforeUpload={beforeUpload}
              multiple
              onRemove={file => {
                const newFileList = imageFiles.filter(f => f.uid !== file.uid);
                setImageFiles(newFileList);
              }}
            >
              {imageFiles.length >= 8 ? null : (
                <div>
                  <PlusOutlined />
                  <div className="mt-2 text-sm">Upload Images</div>
                </div>
              )}
            </Upload>
            <p className="text-gray-500 text-sm">
              Upload multiple images showing your work (max 8 images, 5MB each)
            </p>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              icon={<UploadOutlined />}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
            >
              Create Service
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
