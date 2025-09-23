import { Button, Modal } from 'antd';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

interface DeleteImageFromAFolderConfirmationModalProps {
  isDeleteImageModalOpen: boolean;
  setIsDeleteImageModalOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  handleDeleteImage: MouseEventHandler<HTMLElement>;
}

const DeleteImageFromAFolderConfirmationModal: React.FC<
  DeleteImageFromAFolderConfirmationModalProps
> = ({
  isDeleteImageModalOpen,
  setIsDeleteImageModalOpen,
  isLoading,
  handleDeleteImage,
}) => {
  return (
    <Modal
      open={isDeleteImageModalOpen}
      onCancel={() => setIsDeleteImageModalOpen(false)}
      title="Delete Image"
      footer={[
        <Button
          key="cancelDeleteImage"
          onClick={() => setIsDeleteImageModalOpen(false)}
        >
          Cancel
        </Button>,
        <Button
          key="deleteImage"
          danger
          onClick={handleDeleteImage}
          loading={isLoading}
        >
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete this image? This action cannot be
        undone.
      </p>
    </Modal>
  );
};

export default DeleteImageFromAFolderConfirmationModal;
