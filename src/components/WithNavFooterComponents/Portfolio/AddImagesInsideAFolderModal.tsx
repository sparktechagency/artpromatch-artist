import { Button, Modal, Upload } from 'antd';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';

interface AddImagesInsideAFolderModalProps {
  isAddImagesInsideAFolder: boolean;
  setIsAddImagesInsideAFolder: Dispatch<SetStateAction<boolean>>;
  setSelectedFolderIdForImages: Dispatch<SetStateAction<string | null>>;
  imagesFilesForExistingFolder: File[];
  setImagesFilesForExistingFolder: Dispatch<SetStateAction<File[]>>;
  handleAddImagesInsideAFolder: () => void;
  isLoading: boolean;
  selectImagesForAddingImagesInsideAFolder: (file: File) => void;
  removeASelectedImageForAddingImagesInsideAFolder: (file: File) => void;
}

const AddImagesInsideAFolderModal: React.FC<AddImagesInsideAFolderModalProps> = ({
  isAddImagesInsideAFolder,
  setIsAddImagesInsideAFolder,
  setSelectedFolderIdForImages,
  imagesFilesForExistingFolder,
  setImagesFilesForExistingFolder,
  handleAddImagesInsideAFolder,
  isLoading,
  selectImagesForAddingImagesInsideAFolder,
  removeASelectedImageForAddingImagesInsideAFolder,
}) => {
  return (
    <Modal
      open={isAddImagesInsideAFolder}
      onCancel={() => {
        setIsAddImagesInsideAFolder(false);
        setSelectedFolderIdForImages(null);
        setImagesFilesForExistingFolder([]);
      }}
      title={`Add Images to Folder`}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setIsAddImagesInsideAFolder(false);
            setSelectedFolderIdForImages(null);
            setImagesFilesForExistingFolder([]);
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleAddImagesInsideAFolder}
          loading={isLoading}
          disabled={imagesFilesForExistingFolder.length === 0}
        >
          Add Images
        </Button>,
      ]}
      width={700}
    >
      <div className="mb-4">
        <p className="text-gray-600">Select images to add to this folder</p>
      </div>

      <div className="border border-dashed border-gray-300 rounded-lg p-5 bg-gray-50">
        <div className="flex gap-4 flex-wrap">
          {imagesFilesForExistingFolder.map((file: File, idx: number) => (
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
                onClick={() =>
                  removeASelectedImageForAddingImagesInsideAFolder(file)
                }
                className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs shadow-md hover:bg-gray-100"
              >
                <FaTimes className="text-red-600" />
              </button>
            </div>
          ))}

          <Upload
            multiple
            showUploadList={false}
            beforeUpload={(file: File) => {
              selectImagesForAddingImagesInsideAFolder(file);
              return false; // prevent auto upload
            }}
          >
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <FaPlus className="text-xl text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 text-center">
                Add Images
              </span>
            </div>
          </Upload>
        </div>

        {imagesFilesForExistingFolder.length > 0 && (
          <p className="text-sm text-gray-500 mt-3">
            {imagesFilesForExistingFolder.length} image
            {imagesFilesForExistingFolder.length !== 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    </Modal>
  );
};

export default AddImagesInsideAFolderModal;
