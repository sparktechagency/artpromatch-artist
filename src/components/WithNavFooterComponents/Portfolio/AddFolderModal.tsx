import { Form, FormInstance, Input, Modal, Select, Upload } from 'antd';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { FaFolder, FaPlus } from 'react-icons/fa6';

interface AddImagesInsideAFolderModalProps {
  isModalOpenForCreateNewFolder: boolean;
  handleCancelForCreateNewFolder: () => void;
  form: FormInstance<any>;
  handleCreateNewFolder: (values: any) => void;
  fileListForCreateNewFolder: File[];
  removeImageForCreateNewFolder: (fileToRemove: File) => void;
  handleBeforeUploadForCreateNewFolder: (file: File) => boolean;
  isLoading: boolean;
}

const AddFolderModal: React.FC<AddImagesInsideAFolderModalProps> = ({
  isModalOpenForCreateNewFolder,
  handleCancelForCreateNewFolder,
  form,
  handleCreateNewFolder,
  fileListForCreateNewFolder,
  removeImageForCreateNewFolder,
  handleBeforeUploadForCreateNewFolder,
  isLoading,
}) => {
  const { Option } = Select;

  return (
    <Modal
      open={isModalOpenForCreateNewFolder}
      onCancel={handleCancelForCreateNewFolder}
      footer={null}
      width={900}
      styles={{
        body: { padding: '24px' },
      }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create New Folder
        </h2>
        <p className="text-gray-600">
          Add images to showcase your work in a new folder
        </p>
      </div>

      <Form
        form={form}
        name="addFolder"
        layout="vertical"
        className="w-full"
        onFinish={handleCreateNewFolder}
      >
        <div className="flex flex-col justify-center items-start gap-5 mb-6">
          <Form.Item
            name="folderName"
            className="w-full md:w-[80%]"
            rules={[{ required: true, message: 'Please enter a folder name' }]}
          >
            <Input
              placeholder="Folder Name"
              size="large"
              prefix={<FaFolder className="text-gray-400 mr-2" />}
              className="w-full"
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
        </div>

        <Form.Item
          name="folderImages"
          label={
            <p className="text-md font-medium text-gray-800 mb-2">Add Images</p>
          }
          required
        >
          <div className="border border-dashed border-gray-300 rounded-lg p-5 bg-gray-50">
            <div className="flex gap-4 flex-wrap">
              {fileListForCreateNewFolder.map((file: File, idx: number) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 border rounded-md overflow-hidden group"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-cover"
                    fill
                  />
                  <button
                    type="button"
                    onClick={() => removeImageForCreateNewFolder(file)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaTimes className="text-red-600" />
                  </button>
                </div>
              ))}

              <Upload
                multiple
                showUploadList={false}
                beforeUpload={handleBeforeUploadForCreateNewFolder}
              >
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <FaPlus className="text-xl text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500 text-center">
                    Add Images
                  </span>
                </div>
              </Upload>
            </div>
          </div>
        </Form.Item>

        <div className="flex gap-3 justify-end mt-6 pt-5 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancelForCreateNewFolder}
            className="border border-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            <span className="text-white">
              {isLoading ? 'Creating...' : 'Create Folder'}
            </span>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddFolderModal;
