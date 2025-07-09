"use client";

import { AllImages } from "@/assets/images/AllImages";
import {
  useAddFolderApiMutation,
  useFetchFOldersQuery,
} from "@/redux/api/features/portfolioApi/portfolioApi";
import { BASE_URL } from "@/utils/baseUrl";
import { Form, Modal, Upload, Input, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";

const PortfolioPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForAddPortfolio, setIsModalOpenForAddPortfolio] =
    useState(false);
  const [fileList, setFileList] = useState([]);
  console.log("filelist:", fileList);

  const { data: folderData } = useFetchFOldersQuery();
  console.log("folderData:", folderData?.data?.portfolio);
  const folderImages = folderData?.data?.portfolio;
  const [openFolderId, setOpenFolderId] = useState(null);

  const getCleanImageUrl = (imgPath) =>
    `http://10.0.60.41:3003/${imgPath
      .replace(/\\/g, "/")
      .replace(/^public\//, "")}`;

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

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("data", JSON.stringify(data));

    try {
      const res = await PortfolioApi(formData).unwrap();
      console.log(res);
      message.success(res?.message);
      form.resetFields();
      setFileList([]);
      setIsModalOpenForAddPortfolio(false);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || "Failed to create folder");
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
        {/* {[
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
        ))} */}

        {folderData?.data?.portfolio.map((item, folderIdx) => {
          const folder = item.folder;
          const isOpen = openFolderId === folder._id;

          return (
            <div key={folder._id} className="mb-6 border p-3 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{folder.name}</h2>

              {/* Folder preview (only first image or all if opened) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(isOpen ? folder.images : [folder.images[0]])?.map(
                  (imgPath, imgIdx) => (
                    <div className="relative" key={imgIdx}>
                      {/* <Image
                        src={`${BASE_URL}/${imgPath.replace(/\\/g, "/")}`}
                        alt={`Image ${imgIdx + 1}`}
                        width={500}
                        height={500}
                        className="rounded"
                      /> */}
                      <Image
                        src={getCleanImageUrl(imgPath)}
                        alt={`Image ${imgIdx + 1}`}
                        width={500}
                        height={500}
                        unoptimized // ⬅ disables Next.js optimization
                      />

                      <div className="flex justify-center items-center gap-3 absolute top-2 right-2">
                        <FaPen
                          onClick={showModal}
                          className="h-8 w-8 bg-neutral-100 p-1 cursor-pointer"
                        />
                        <FaTrash className="h-8 w-8 bg-neutral-100 p-1 cursor-pointer" />
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Toggle Button */}
              {folder.images.length > 1 && (
                <button
                  onClick={() => setOpenFolderId(isOpen ? null : folder._id)}
                  className="mt-3 text-sm text-blue-600 hover:underline"
                >
                  {isOpen ? "Hide Images" : "Show All Images"}
                </button>
              )}
            </div>
          );
        })}

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
            <Form.Item className="mt-5">
              <button
                type="submit"
                className="bg-primary text-white py-3 w-full rounded-md"
              >
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
