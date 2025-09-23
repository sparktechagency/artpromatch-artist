import { IFolder } from '@/types';
import { Button, Form, FormInstance, Input, Modal, Select } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { FaFolder } from 'react-icons/fa6';

interface UpdateAFolderModalProps {
  isEditFolderModalOpen: boolean;
  setIsEditFolderModalOpen: Dispatch<SetStateAction<boolean>>;
  editForm: FormInstance<any>;
  handleUpdateAFolder: (values: any) => Promise<void>;
  selectedFolder: IFolder | null;
  isLoading: boolean;
}

const UpdateAFolderModal: React.FC<UpdateAFolderModalProps> = ({
  isEditFolderModalOpen,
  setIsEditFolderModalOpen,
  editForm,
  handleUpdateAFolder,
  selectedFolder,
  isLoading,
}) => {
  const { Option } = Select;

  return (
    <Modal
      open={isEditFolderModalOpen}
      onCancel={() => setIsEditFolderModalOpen(false)}
      footer={null}
      title="Edit Folder Name"
    >
      <Form
        form={editForm}
        layout="vertical"
        onFinish={handleUpdateAFolder}
        initialValues={{
          name: selectedFolder?.name,
          For: selectedFolder?.for,
        }}
      >
        <Form.Item
          name="name"
          label="Folder Name"
          rules={[{ required: true, message: 'Please enter a folder name!' }]}
        >
          <Input
            prefix={<FaFolder className="text-gray-400" />}
            placeholder="Enter folder name"
          />
        </Form.Item>

        <Form.Item
          name="for"
          label="Folder For"
          rules={[
            {
              required: true,
              message: 'Please select an option as folder for!',
            },
          ]}
        >
          <Select placeholder="Select folder For">
            <Option value="flash">Flash</Option>
            <Option value="portfolio">Portfolio</Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-3">
          <Button onClick={() => setIsEditFolderModalOpen(false)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateAFolderModal;
