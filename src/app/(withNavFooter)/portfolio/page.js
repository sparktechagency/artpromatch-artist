"use client";

import { AllImages } from "@/assets/images/AllImages";
import { useAddFolderApiMutation } from "@/redux/api/features/portfolioApi/portfolioApi";
import { Form, Modal, Upload, Input, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaImage, FaPen, FaPlus, FaTrash } from "react-icons/fa6";

const PortfolioPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForAddPortfolio, setIsModalOpenForAddPortfolio] =
    useState(false);
  const [fileList, setFileList] = useState([]);
  console.log("filelist:", fileList);

  const [form] = Form.useForm();

  const [PortfolioApi] = useAddFolderApiMutation();

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const showModalForAddPortfolio = () => setIsModalOpenForAddPortfolio(true);
  const handleOkForAddPortfolio = () => setIsModalOpenForAddPortfolio(false);
  const handleCancelForAddPortfolio = () =>
    setIsModalOpenForAddPortfolio(false);

  const handleBeforeUpload = (file) => {
    setFileList((prevList) => [...prevList, file]);
    return false; // prevent automatic upload
  };

  const removeImage = (fileToRemove) => {
    setFileList((prevList) =>
      prevList.filter((file) => file.uid !== fileToRemove.uid)
    );
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (value) => {
  const data = {
    name: value.folderName,
    for: "portfolio",
  };
  console.log(data);

  const formData = new FormData();
  formData.append("files", fileList);
  formData.append("data", JSON.stringify(data));

  try {
    const res = await PortfolioApi(formData).unwrap(); 
    console.log(res);
    message.success(res?.message );
  } catch (error) {
    console.error(error);
    message.error(error?.data?.message );
  }
};


  return (
    <div className="container mx-auto md:my-20">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">Showcase Your Talent!</h1>
        <p className="text-textSecondary mb-8">
          Upload your best work to let clients see your unique style and
          expertise.
        </p>
        <div className="flex justify-center items-center gap-5">
          <button className="border py-3 px-6 rounded-lg">Reorganize</button>
        </div>
      </div>

      <div className="md:my-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          AllImages.image1,
          AllImages.image2,
          AllImages.image3,
          AllImages.image5,
          AllImages.image6,
        ].map((img, idx) => (
          <div className="relative" key={idx}>
            <Image
              src={img}
              alt={`Portfolio ${idx + 1}`}
              width={500}
              height={500}
            />
            <div className="flex justify-center items-center gap-3 absolute top-2 right-2">
              <FaPen
                onClick={showModal}
                className="h-8 w-8 bg-neutral-100 p-1 cursor-pointer"
              />
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
        width={900}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <Form
            form={form}
            name="addFolder"
            layout="vertical"
            className="w-full"
            onFinish={onFinish}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-5">
              <Form.Item name="folderName" className="w-full md:w-[80%]">
                <Input placeholder="Folder Name" />
              </Form.Item>
              <button className="border rounded-xl py-2 px-4 text-red-500 self-start">
                Delete Folder
              </button>
            </div>

            <Form.Item
              name="folderImages"
              label={<p className="text-md">Add Images</p>}
              required
            >
              <div className="border border-dashed border-secondary p-3">
                <div className="flex gap-3 flex-wrap">
                  {fileList.map((file) => (
                    <div
                      key={file.uid}
                      className="relative w-24 h-24 border rounded overflow-hidden"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                        height={100}
                        width={100}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(file)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 text-xs"
                      >
                        <FaTimes className="text-red-600" />
                      </button>
                    </div>
                  ))}

                  <Upload
                    multiple
                    showUploadList={false}
                    beforeUpload={handleBeforeUpload}
                  >
                    <div className="w-24 h-24 border border-dashed flex items-center justify-center rounded cursor-pointer hover:bg-gray-100">
                      <FaPlus className="text-xl text-gray-500" />
                    </div>
                  </Upload>
                </div>
              </div>
            </Form.Item>
            <Form.Item className="mt-5 ">
              <button className="bg-primary text-white py-3 w-full rounded-md ">
                Create Folder
              </button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-3xl font-bold">Edit Portfolio</h1>
          <p className="text-textSecondary mb-8 text-center">
            Upload your best work to let clients see your unique style and
            expertise.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PortfolioPage;
