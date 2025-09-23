'use client';

import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import {
  createFolder,
  updateFolder,
  addImagesToFolder,
  removeAnImageFromAFolder,
  removeAFolder,
} from '@/services/Folder';
import { IFolder } from '@/types';
import { Form } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPen, FaPlus, FaTrash, FaFolder } from 'react-icons/fa6';
import { toast } from 'sonner';

// Modals
import DeleteAFolderConfirmationModal from './DeleteAFolderConfirmationModal';
import AddImagesInsideAFolderModal from './AddImagesInsideAFolderModal';
import DeleteImageFromAFolderConfirmationModal from './DeleteImageFromAFolderConfirmationModal';
import UpdateAFolderModal from './UpdateAFolderModal';
import AddFolderModal from './AddFolderModal';

const PortfolioComponent = ({ folders = [] }: { folders: IFolder[] }) => {
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);

  // ---------------- CREATE NEW FOLDER ----------------
  const [isModalOpenForCreateNewFolder, setIsModalOpenForCreateNewFolder] =
    useState(false);
  const [fileListForCreateNewFolder, setFileListForCreateNewFolder] = useState<
    File[]
  >([]);
  const [form] = Form.useForm();

  // ---------------- UPDATE A FOLDER ----------------
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [selectedFolderForAllTask, setSelectedFolderForAllTask] =
    useState<IFolder | null>(null);
  const [editForm] = Form.useForm();

  // ---------------- ADD IMAGES TO FOLDER ----------------
  const [isAddImagesInsideAFolder, setIsAddImagesInsideAFolder] =
    useState(false);
  const [selectedFolderIdForImages, setSelectedFolderIdForImages] = useState<
    string | null
  >(null);
  const [imagesFilesForExistingFolder, setImagesFilesForExistingFolder] =
    useState<File[]>([]);

  // ---------------- DELETE IMAGE FROM FOLDER ----------------
  const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    path: string;
    folderId: string;
  } | null>(null);

  // ---------------- DELETE A FOLDER ----------------
  const [isDeleteAFolderModalOpen, setIsDeleteAFolderModalOpen] =
    useState(false);

  // ---------------- COMMON ----------------
  const [isLoading, setIsLoading] = useState(false);

  // ---------------- USE EFFECT ----------------
  useEffect(() => {
    if (isEditFolderModalOpen && selectedFolderForAllTask) {
      editForm.setFieldsValue({
        name: selectedFolderForAllTask.name,
        for: selectedFolderForAllTask.for,
      });
    }
  }, [isEditFolderModalOpen, selectedFolderForAllTask, editForm]);

  // ---------------- CREATE NEW FOLDER HANDLERS ----------------
  const showModalForCreateNewFolder = () =>
    setIsModalOpenForCreateNewFolder(true);
  const hideModalForCreateNewFolder = () =>
    setIsModalOpenForCreateNewFolder(false);

  const handleBeforeUploadForCreateNewFolder = (file: File) => {
    setFileListForCreateNewFolder(prevList => [...prevList, file]);
    return false;
  };
  const removeImageForCreateNewFolder = (fileToRemove: File) => {
    setFileListForCreateNewFolder(prevList =>
      prevList.filter(file => file !== fileToRemove)
    );
  };
  const handleCreateNewFolder = async (value: any) => {
    const data = { name: value.folderName, for: value.for };
    const formData = new FormData();

    fileListForCreateNewFolder.forEach(file => formData.append('files', file));
    formData.append('data', JSON.stringify(data));

    try {
      setIsLoading(true);

      const res = await createFolder(formData);
      if (res?.success) {
        toast.success(res?.message);
        form.resetFields();
        setFileListForCreateNewFolder([]);
        setIsModalOpenForCreateNewFolder(false);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- UPDATE FOLDER HANDLERS ----------------
  const showUpdateFolderModal = (folder: IFolder) => {
    setSelectedFolderForAllTask(folder);
    editForm.setFieldsValue({ folderName: folder.name });
    setIsEditFolderModalOpen(true);
  };
  const handleUpdateAFolder = async (values: any) => {
    if (!selectedFolderForAllTask) return;
    try {
      setIsLoading(true);
      const res = await updateFolder(selectedFolderForAllTask._id, values);
      if (res?.success) {
        toast.success(res?.message);
        setIsEditFolderModalOpen(false);
        setSelectedFolderForAllTask(null);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- ADD IMAGES HANDLERS ----------------
  const handleOpenFreshModalForAddingImagesToAFolder = (folderId: string) => {
    setSelectedFolderIdForImages(folderId);
    setImagesFilesForExistingFolder([]);
    setIsAddImagesInsideAFolder(true);
  };
  const selectImagesForAddingImagesInsideAFolder = (file: File) => {
    setImagesFilesForExistingFolder(prevList => {
      const filtered = prevList.filter(f => f.name !== file.name);
      return [...filtered, file];
    });
  };
  const removeASelectedImageForAddingImagesInsideAFolder = (file: File) => {
    setImagesFilesForExistingFolder(prevList =>
      prevList.filter(f => f !== file)
    );
  };
  const handleAddImagesInsideAFolder = async () => {
    if (!selectedFolderIdForImages) return;
    const formData = new FormData();
    imagesFilesForExistingFolder.forEach(file =>
      formData.append('files', file)
    );

    try {
      setIsLoading(true);
      const res = await addImagesToFolder(selectedFolderIdForImages, formData);
      if (res?.success) {
        toast.success(res?.message);
        setImagesFilesForExistingFolder([]);
        setIsAddImagesInsideAFolder(false);
        setSelectedFolderIdForImages(null);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- DELETE IMAGE HANDLERS ----------------
  const showDeleteImageModal = (imagePath: string, folderId: string) => {
    setSelectedImage({ path: imagePath, folderId });
    setIsDeleteImageModalOpen(true);
  };
  const handleRemoveImageFromAFolder = async () => {
    if (!selectedImage) return;
    try {
      setIsLoading(true);
      const res = await removeAnImageFromAFolder(
        selectedImage.path,
        selectedImage.folderId
      );
      if (res?.success) {
        toast.success(res?.message);
        setIsDeleteImageModalOpen(false);
        setSelectedImage(null);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- DELETE FOLDER HANDLERS ----------------
  const showDeleteAFolderModal = (folder: IFolder) => {
    setSelectedFolderForAllTask(folder);
    setIsDeleteAFolderModalOpen(true);
  };
  const handleDeleteAFolder = async () => {
    if (!selectedFolderForAllTask) return;
    try {
      setIsLoading(true);
      const res = await removeAFolder(selectedFolderForAllTask._id);
      if (res?.success) {
        toast.success(res?.message);
        setIsDeleteAFolderModalOpen(false);
        setSelectedFolderForAllTask(null);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- UI RENDER ----------------
  return (
    <div className="container mx-auto md:my-20 px-4">
      {/* HEADER */}
      <div className="flex flex-col justify-center items-center text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Showcase Your Talent!
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Upload your best work to let clients see your unique style and
          expertise.
        </p>
      </div>

      {/* FOLDERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders?.map(folder => {
          const isOpen = openFolderId === folder._id;
          const displayedImages = isOpen
            ? folder.images
            : folder.images.slice(0, 4);

          return (
            <div
              key={folder._id}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* FOLDER HEADER */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaFolder className="text-blue-500 text-lg mb-1" />
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {folder.name}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => showUpdateFolderModal(folder)}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <FaPen className="text-sm" />
                  </button>
                  <button
                    onClick={() => showDeleteAFolderModal(folder)}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>

              {/* IMAGES */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {displayedImages.map((imgPath, idx) => (
                    <div className="relative aspect-square group" key={idx}>
                      <Image
                        src={getCleanImageUrl(imgPath)}
                        alt={`Image ${idx + 1}`}
                        fill
                        className="object-cover rounded-md"
                        unoptimized
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            showDeleteImageModal(imgPath, folder._id)
                          }
                          className="bg-white p-1 rounded shadow-sm hover:bg-gray-100"
                        >
                          <FaTrash className="text-red-500 text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Show more button */}
                  {folder.images.length > 4 && (
                    <button
                      onClick={() =>
                        setOpenFolderId(isOpen ? null : folder._id)
                      }
                      className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium w-full text-center py-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      {isOpen
                        ? 'Show Less'
                        : `+${folder.images.length - 4} More`}
                    </button>
                  )}

                  {/* Add image */}
                  <div
                    className="relative aspect-square border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    onClick={() =>
                      handleOpenFreshModalForAddingImagesToAFolder(folder._id)
                    }
                  >
                    <div className="flex flex-col items-center text-gray-500">
                      <FaPlus className="text-xl mb-1" />
                      <span className="text-xs">Add Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* ADD NEW FOLDER CARD */}
        <div
          onClick={showModalForCreateNewFolder}
          className="h-full min-h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group"
        >
          <div className="flex flex-col justify-center items-center text-gray-500 group-hover:text-blue-500">
            <div className="bg-blue-100 p-3 rounded-full mb-3 group-hover:bg-blue-200">
              <FaPlus className="h-6 w-6 text-blue-500" />
            </div>
            <p className="font-medium">Add new Folder</p>
          </div>
        </div>
      </div>

      {/* ---------------- MODALS ---------------- */}
      <AddFolderModal
        isModalOpenForCreateNewFolder={isModalOpenForCreateNewFolder}
        handleCancelForCreateNewFolder={hideModalForCreateNewFolder}
        form={form}
        handleCreateNewFolder={handleCreateNewFolder}
        fileListForCreateNewFolder={fileListForCreateNewFolder}
        removeImageForCreateNewFolder={removeImageForCreateNewFolder}
        handleBeforeUploadForCreateNewFolder={
          handleBeforeUploadForCreateNewFolder
        }
        isLoading={isLoading}
      />

      <UpdateAFolderModal
        isEditFolderModalOpen={isEditFolderModalOpen}
        setIsEditFolderModalOpen={setIsEditFolderModalOpen}
        editForm={editForm}
        handleUpdateAFolder={handleUpdateAFolder}
        selectedFolder={selectedFolderForAllTask}
        isLoading={isLoading}
      />

      <AddImagesInsideAFolderModal
        isAddImagesInsideAFolder={isAddImagesInsideAFolder}
        setIsAddImagesInsideAFolder={setIsAddImagesInsideAFolder}
        setSelectedFolderIdForImages={setSelectedFolderIdForImages}
        imagesFilesForExistingFolder={imagesFilesForExistingFolder}
        setImagesFilesForExistingFolder={setImagesFilesForExistingFolder}
        handleAddImagesInsideAFolder={handleAddImagesInsideAFolder}
        isLoading={isLoading}
        selectImagesForAddingImagesInsideAFolder={
          selectImagesForAddingImagesInsideAFolder
        }
        removeASelectedImageForAddingImagesInsideAFolder={
          removeASelectedImageForAddingImagesInsideAFolder
        }
      />

      <DeleteImageFromAFolderConfirmationModal
        isDeleteImageModalOpen={isDeleteImageModalOpen}
        setIsDeleteImageModalOpen={setIsDeleteImageModalOpen}
        isLoading={isLoading}
        handleDeleteImage={handleRemoveImageFromAFolder}
      />

      <DeleteAFolderConfirmationModal
        isDeleteAFolderModalOpen={isDeleteAFolderModalOpen}
        setIsDeleteAFolderModalOpen={setIsDeleteAFolderModalOpen}
        isLoading={isLoading}
        handleDeleteAFolder={handleDeleteAFolder}
        selectedFolder={selectedFolderForAllTask}
      />
    </div>
  );
};

export default PortfolioComponent;
