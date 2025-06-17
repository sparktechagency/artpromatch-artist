"use client";

import { AllImages } from "@/assets/images/AllImages";
import { Form, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserWelcomePage = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(base64Payload));
        const email = decodedPayload.email;
        setUserName(email);
        // console.log("Decoded Email:", email);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.warn("No token found in localStorage.");
    }
  }, []);
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
            >
              <div className="mb-4 flex flex-col justify-center items-center text-center">
                <Image
                  src={AllImages.logo}
                  width={50}
                  height={50}
                  alt="logo"
                ></Image>
                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                  Welcome to Steady Hands,
                </h2>
                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary font-">
                  {userName}
                </h2>
                <Typography.Text className=" text-center text-base ">
                  Let’s set up your profile to help you showcase your art and
                  connect with clients.
                </Typography.Text>
              </div>
              <Link href="/artist-type">
                <button className="w-full bg-primary text-white py-3 rounded-lg mt-5">
                  Get Started
                </button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWelcomePage;
