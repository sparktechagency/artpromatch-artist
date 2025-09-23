import { IService } from '@/types';
import { Modal } from 'antd';
import { SetStateAction } from 'react';

type DeleteConfirmationModalProps = {
  isDeleteModalOpen: boolean;
  handleDelete: () => void;
  setIsDeleteModalOpen: (value: SetStateAction<boolean>) => void;
  selectedService: IService | null;
};

const DeleteConfirmationModal = ({
  isDeleteModalOpen,
  handleDelete,
  setIsDeleteModalOpen,
  selectedService,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal
      title="Delete Service"
      open={isDeleteModalOpen}
      onOk={handleDelete}
      onCancel={() => setIsDeleteModalOpen(false)}
      okText="Delete"
      okButtonProps={{ danger: true }}
    >
      <p>
        Are you sure you want to delete the service{' '}
        <b>{selectedService?.title}</b>?
      </p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
