"use client";

import { AllImages } from "@/assets/images/AllImages";
import { Form, Input, Steps, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
const PreferedLocation = () => {
  const router = useRouter();

  const onFinish = (values) => {
    // console.log("Success:", values);
    localStorage.setItem("city", JSON.stringify(values.city));
    localStorage.setItem("stdioName", JSON.stringify(values.stdioName));
    router.push("/verify-profile");
  };
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  const data = {
    coordinates: [77.1025, 28.7041],
  };

  localStorage.setItem("location", JSON.stringify(data));

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
      <div className="pt-32 pb-16">
        <div className="">
          <div className="w-[450px]">
            <Form
              name="select-user-type"
              initialValues={{ remember: true }}
              layout="vertical"
              className=""
              onFinish={onFinish}
            >
              <div className="mb-4 flex flex-col justify-center items-center text-center">
                <Image
                  src={AllImages.logo}
                  width={50}
                  height={50}
                  alt="logo"
                ></Image>
                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                  Where do you want to find artists or studios?
                </h2>
                <Typography.Text className=" text-center text-base ">
                  We’ll prioritize results in these areas.
                </Typography.Text>
              </div>
              <div>
                <Form.Item
                  name="stdioName"
                  style={{}}
                  label={<p className=" text-md">Studio/Business Name</p>}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Studio/Business Name"
                  />
                </Form.Item>
                <Form.Item
                  name="address"
                  style={{}}
                  label={<p className=" text-md">Address</p>}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Enter your address"
                  />
                </Form.Item>

                <Form.Item name="location">
                  <button className="flex justify-center items-center gap-2 text-primary border border-primary w-full py-2 rounded-xl">
                    <FaLocationArrow />
                    <p className="text-sm">Use my current location</p>
                  </button>
                </Form.Item>

                <Form.Item
                  name="city"
                  style={{}}
                  label={<p className=" text-md">City</p>}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Enter your city"
                  />
                </Form.Item>
                <Form.Item className="text-center">
                  {/* <Link href="/verify-profile"> */}
                  <button
                    className="bg-primary w-full px-6 py-2 rounded-md text-white"
                    htmlType="submit"
                  >
                    Continue
                  </button>
                  {/* </Link> */}
                </Form.Item>
              </div>
            </Form>
            <div className="mt-5">
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
      </div>
    </div>
  );
};

export default PreferedLocation;
