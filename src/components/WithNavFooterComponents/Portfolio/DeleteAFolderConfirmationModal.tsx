import { IFolder } from '@/types';
import { Button, Modal } from 'antd';
import { Dispatch, MouseEventHandler, SetStateAction } from 'react';

interface DeleteAFolderConfirmationModalProps {
  isDeleteAFolderModalOpen: boolean;
  setIsDeleteAFolderModalOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  handleDeleteAFolder: MouseEventHandler<HTMLElement>;
  selectedFolder: IFolder | null;
}

const DeleteAFolderConfirmationModal: React.FC<
  DeleteAFolderConfirmationModalProps
> = ({
  isDeleteAFolderModalOpen,
  setIsDeleteAFolderModalOpen,
  isLoading,
  handleDeleteAFolder,
  selectedFolder,
}) => {
  return (
    <Modal
      open={isDeleteAFolderModalOpen}
      onCancel={() => setIsDeleteAFolderModalOpen(false)}
      title="Delete Folder"
      footer={[
        <Button
          key="cancelDeleteFolder"
          onClick={() => setIsDeleteAFolderModalOpen(false)}
        >
          Cancel
        </Button>,
        <Button
          key="deleteFolder"
          danger
          onClick={handleDeleteAFolder}
          loading={isLoading}
        >
          Delete
        </Button>,
      ]}
    >
      <p>
        Are you sure you want to delete the folder "{selectedFolder?.name}
        "? This action cannot be undone.
      </p>
    </Modal>
  );
};

export default DeleteAFolderConfirmationModal;
