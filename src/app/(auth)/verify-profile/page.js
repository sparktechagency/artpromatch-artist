'use client';

import { AllImages } from '@/assets/images/AllImages';
import { Form, Radio, Steps, Typography, Upload } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

const VerifyProfile = () => {
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
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
                                <Image src={AllImages.logo} width={50} height={50} alt='logo'></Image>
                                <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                                    Verify Your Profile
                                </h2>
                                <Typography.Text className=" text-center text-base ">
                                    Upload documentation to confirm your identity and experience.
                                </Typography.Text>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Radio >
                                    <div className='border hover:border-primary rounded-lg p-6 md:w-96'>
                                        <h1 className='text-xl font-bold'>Upload the Front Side of Your ID</h1>
                                        <p className=''>Take a clear photo or upload the front side of your identity card. Make sure all details are visible.</p>
                                        <div className='border border-primary rounded-xl  w-full py-2 flex justify-center items-center gap-3 my-3'>
                                            <div>
                                                <FaPlus className='h-5 w-5 text-primary flex'></FaPlus>
                                            </div>
                                            <div>
                                                <Upload className='text-primary  '>
                                                    <p> Upload front side</p>
                                                </Upload>
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                                <Radio >
                                    <div className='border hover:border-primary rounded-lg p-6 md:w-96'>
                                        <h1 className='text-xl font-bold'>Upload the Back Side of Your ID</h1>
                                        <p className=''>Now, upload a clear photo of the back side of your identity card.</p>
                                        <div className='border border-primary rounded-xl  w-full py-2 flex justify-center items-center gap-3 my-3'>
                                            <div>
                                                <FaPlus className='h-5 w-5 text-primary flex'></FaPlus>
                                            </div>
                                            <div>
                                                <Upload className='text-primary  '>
                                                    <p> Upload back side</p>
                                                </Upload>
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                                <Radio >
                                    <div className='border hover:border-primary rounded-lg p-6 md:w-96'>
                                        <h1 className='text-xl font-bold'>Upload a Selfie with Your ID</h1>
                                        <p className=''>Take a selfie while holding your identity card next to your face. Ensure everything clearly visible.</p>
                                        <div className='border border-primary rounded-xl  w-full py-2 flex justify-center items-center gap-3 my-3'>
                                            <div>
                                                <FaPlus className='h-5 w-5 text-primary flex'></FaPlus>
                                            </div>
                                            <div>
                                                <Upload className='text-primary  '>
                                                    <p> Upload a selfe with ID</p>
                                                </Upload>
                                            </div>
                                        </div>
                                    </div>
                                </Radio>


                            </div>
                            <Link href="/all-set ">
                                <button className='w-full bg-primary text-white py-3 rounded-lg mt-5'>Continue</button>
                            </Link>
                            <button className='w-full mt-5'>Skip</button>
                        </Form>
                    </div>
                    <Steps
                        current={current}
                        onChange={onChange}
                        direction="horizontal"
                        size="small"
                        items={[
                            {
                                title: '',
                                status: 'finish',
                            },
                            {
                                title: '',
                                status: current >= 1 ? 'finish' : 'wait',
                            },
                            {
                                title: '',
                                status: current >= 2 ? 'finish' : 'wait',
                            },
                            {
                                title: '',
                                status: current >= 3 ? 'finish' : 'wait',
                            },
                        ]}
                        style={{
                            width: '100%',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default VerifyProfile;