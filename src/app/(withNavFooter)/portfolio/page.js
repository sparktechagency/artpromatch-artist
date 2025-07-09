"use client";

import { AllImages } from "@/assets/images/AllImages";
import { useAddFolderApiMutation } from "@/redux/api/features/portfolioApi/portfolioApi";
import { Form, Modal, Upload, Input } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaImage, FaPen, FaPlus, FaTrash } from "react-icons/fa6";

const PortfolioPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForAddPortfolio, setIsModalOpenForAddPortfolio] =
    useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [banner, setbanner] = useState(null);
  const [form] = Form.useForm();

  const handleBeforeUpload = (file) => {
    form.setFieldsValue({ class_banner: [file] });
    setbanner(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const [PortfolioApi] = useAddFolderApiMutation();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const showModalForAddPortfolio = () => setIsModalOpenForAddPortfolio(true);
  const handleOkForAddPortfolio = () => setIsModalOpenForAddPortfolio(false);
  const handleCancelForAddPortfolio = () => setIsModalOpenForAddPortfolio(false);

  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">Showcase Your Talent!</h1>
        <p className="text-textSecondary mb-8">
          Upload your best work to let clients see your unique style and expertise.
        </p>
        <div className="flex justify-center items-center gap-5">
          <button className="border py-3 px-6 rounded-lg">Reorganize</button>
        </div>
      </div>

      <div className="md:my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[AllImages.image1, AllImages.image2, AllImages.image3, AllImages.image5, AllImages.image6].map((img, idx) => (
          <div className="relative" key={idx}>
            <Image src={img} alt={`Portfolio ${idx + 1}`} width={500} height={500} />
            <div className="flex justify-center items-center gap-3 absolute top-2 right-2">
              <FaPen onClick={showModal} className="h-8 w-8 bg-neutral-100 p-1 cursor-pointer" />
              <FaTrash className="h-8 w-8 bg-neutral-100 p-1 cursor-pointer" />
            </div>
          </div>
        ))}

        <div
          onClick={showModalForAddPortfolio}
          className="h-auto border-2 border-dashed flex justify-center items-center rounded-lg cursor-pointer"
        >
          <div className="flex flex-col justify-center items-center">
            <FaPlus className="h-8 w-8 text-primary" />
            <p className="text-primary">Add new portfolio</p>
          </div>
        </div>
      </div>

      {/* Add Portfolio Modal */}
      <Modal
        open={isModalOpenForAddPortfolio}
        onOk={handleOkForAddPortfolio}
        onCancel={handleCancelForAddPortfolio}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <Form form={form} name="addFolder" layout="vertical" className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-5">
              <Form.Item name="folderName" className="w-full md:w-1/2">
                <Input placeholder="Folder Name" />
              </Form.Item>
              <div className="flex flex-col gap-3 w-full md:w-1/2">
                <button className="border rounded-xl py-2 px-4 text-red-500 self-start">
                  Delete Folder
                </button>
                <div className="border border-dashed border-secondary p-5 flex justify-center items-center h-40 w-full">
                  <Upload
                    showUploadList={false}
                    maxCount={1}
                    beforeUpload={handleBeforeUpload}
                  >
                    {!previewImage ? (
                      <div className="text-center">
                        <FaImage className="text-secondary h-10 w-10 mx-auto" />
                        <p className="text-secondary">Upload Image</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          width={100}
                          height={100}
                          className="object-contain mx-auto"
                        />
                        <p className="text-secondary">{banner?.name}</p>
                      </div>
                    )}
                  </Upload>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl font-bold">Edit Portfolio</h1>
          <p className="text-textSecondary mb-8 text-center">
            Upload your best work to let clients see your unique style and expertise.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PortfolioPage;
