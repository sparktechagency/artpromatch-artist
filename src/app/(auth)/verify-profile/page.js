"use client";

import { AllImages } from "@/assets/images/AllImages";
import { useCreateArtistMutation } from "@/redux/api/features/auth/authApi";
import { Form, message, Steps, Typography, Upload } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const VerifyProfile = () => {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const [createArtist] = useCreateArtistMutation();
  const onFinish = (values) => {
    const frontFile = values.frontId?.[0]?.originFileObj;
    const backFile = values.backId?.[0]?.originFileObj;
    const selfieFile = values.selfie?.[0]?.originFileObj;
    const role = localStorage.getItem("role");
    const artistType = localStorage.getItem("artistType");
    const expertise = JSON.parse(localStorage.getItem("selectedExpertise"));
    const studioName = localStorage.getItem("studioName");
    const location = JSON.parse(localStorage.getItem("location"));

    console.log("frontFile", frontFile);
    console.log("backFile", backFile);
    console.log("selfieFile", selfieFile);

    const locationPayload = {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    };

    const city = localStorage.getItem("city");
    //
    const data = {
      role: role,
      artistType: artistType,
      expertise: expertise,
      studioName: studioName,
      location: locationPayload,
      city: city,
    };
    // console.log("data", data);

    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    formdata.append("idFrontPart", frontFile);
    formdata.append("idBackPart", backFile);
    formdata.append("selfieWithId", selfieFile);

    try {
      createArtist(formdata)
        .unwrap()
        .then((res) => {
          localStorage.setItem("token", res?.data?.token);
          message.success(res.message);
          router.push("/all-set");
        })
        .catch((error) => {
        //   console.log("error", error);
          message.error(error?.data?.message);
        });
    } catch (error) {
      console.log("error", error);
      message.error(error?.data?.message);
    }
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
      <div className="pt-32 pb-16">
        <div className="">
          <div className="w-[90%] mx-auto">
            <Form name="verify-profile" layout="vertical" onFinish={onFinish}>
              <div className="mb-4 flex flex-col justify-center items-center text-center">
                <Image src={AllImages.logo} width={50} height={50} alt="logo" />
                <h2 className="text-2xl font-bold mt-6 mb-2 text-primary">
                  Verify Your Profile
                </h2>
                <Typography.Text className="text-base text-center">
                  Upload documentation to confirm your identity and experience.
                </Typography.Text>
              </div>

              <Form.Item
                name="frontId"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  {
                    required: true,
                    message: "Please upload the front side of your ID!",
                  },
                ]}
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false} // Prevent auto upload
                  className="w-full"
                >
                  <div className="border hover:border-primary rounded-lg p-6">
                    <h1 className="text-xl font-bold">
                      Upload the Front Side of Your ID
                    </h1>
                    <p>
                      Take a clear photo of the front side of your identity
                      card.
                    </p>
                    <div className="border border-primary rounded-xl py-2 flex justify-center items-center gap-3 my-3">
                      <FaPlus className="h-5 w-5 text-primary" />
                      <p className="text-primary"> Upload front side</p>
                    </div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                name="backId"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  {
                    required: true,
                    message: "Please upload the back side of your ID!",
                  },
                ]}
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  className="w-full"
                >
                  <div className="border hover:border-primary rounded-lg p-6">
                    <h1 className="text-xl font-bold">
                      Upload the Back Side of Your ID
                    </h1>
                    <p>
                      Upload a clear photo of the back side of your identity
                      card.
                    </p>
                    <div className="border border-primary rounded-xl py-2 flex justify-center items-center gap-3 my-3">
                      <FaPlus className="h-5 w-5 text-primary" />
                      <p className="text-primary"> Upload back side</p>
                    </div>
                  </div>
                </Upload>
              </Form.Item>

              <Form.Item
                name="selfie"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  {
                    required: true,
                    message: "Please upload a selfie with your ID!",
                  },
                ]}
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  className="w-full"
                >
                  <div className="border hover:border-primary rounded-lg p-6">
                    <h1 className="text-xl font-bold">
                      Upload a Selfie with Your ID
                    </h1>
                    <p>
                      Take a selfie holding your identity card next to your
                      face.
                    </p>
                    <div className="border border-primary rounded-xl py-2 flex justify-center items-center gap-3 my-3">
                      <FaPlus className="h-5 w-5 text-primary" />
                      <p className="text-primary"> Upload selfie</p>
                    </div>
                  </div>
                </Upload>
              </Form.Item>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg my-5"
              >
                Continue
              </button>
            </Form>
          </div>
          <Steps
            current={current}
            onChange={onChange}
            direction="horizontal"
            size="small"
            items={[
              {
                title: "",
                status: "finish",
              },
              {
                title: "",
                status: current >= 1 ? "finish" : "wait",
              },
              {
                title: "",
                status: current >= 2 ? "finish" : "wait",
              },
              {
                title: "",
                status: current >= 3 ? "finish" : "wait",
              },
            ]}
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyProfile;
