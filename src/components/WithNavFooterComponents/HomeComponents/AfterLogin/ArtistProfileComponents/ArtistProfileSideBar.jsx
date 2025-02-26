'use client'

import { ConfigProvider, Form, Input, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import { FiPhone } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { LuMessageCircleMore, LuPenLine } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';

const ArtistProfileSideBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenForContact, setIsModalOpenForContact] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log(values)
    }
    // contact modal
    const showModalForContact = () => {
        setIsModalOpenForContact(true);
    };

    const handleOkForContact = () => {
        setIsModalOpenForContact(false);
    };

    const handleCancelForContact = () => {
        setIsModalOpenForContact(false);
    };

    const onFinishForContact = (values) => {
        console.log(values)
    }




    return (
        <div>
            <div className='container mx-auto'>
                <div className='border p-3 rounded-lg mb-5'>
                    <h1 className='text-xl font-bold flex justify-between'>Availability & Guest Spots<LuPenLine className='bg-primary text-white h-7 w-7 p-1 rounded-full' /></h1>
                    <p className='text-sm font-bold'> Dec 1–5:<span className='font-normal'> Open for bookings.</span></p>
                    <p className='text-sm font-bold'> Dec 10–15:<span className='font-normal'>  Guest Spot in Brooklyn</span></p>
                    <p className='text-sm font-bold'> Dec 20–30:<span className='font-normal'> Open for bookings .</span></p>
                </div>
                <div className='border p-3 rounded-lg mb-2'>
                    <h1 className='text-xl font-bold flex justify-between'>Service<LuPenLine onClick={showModal} className='bg-primary text-white h-7 w-7 p-1 rounded-full' /></h1>
                    <p className='text-sm font-bold flex justify-between'>Nostril<span className='font-normal'>$100</span></p>
                    <p className='text-sm font-bold flex justify-between'>Navel<span className='font-normal'>  $1000</span></p>
                    <p className='text-sm font-bold flex justify-between'>Earlobe<span className='font-normal'> $50</span></p>
                    <p className='text-sm font-bold flex justify-between'>Helix<span className='font-normal'> $50</span></p>
                    <p className='text-sm font-bold flex justify-between'>Industrial<span className='font-normal'> $50</span></p>
                    <p className='text-sm font-bold flex justify-between'>Tragus<span className='font-normal'> $50</span></p>
                    <p className='text-sm font-bold flex justify-between'>Septum<span className='font-normal'> $50</span></p>
                    <p className='text-sm font-bold flex justify-between'>High Nostrils<span className='font-normal'> $50</span></p>
                </div>
                <div className='border p-3 rounded-lg mb-2'>
                    <h1 className='text-xl font-bold flex justify-between'>Skills <LuPenLine className='bg-primary text-white h-7 w-7 p-1 rounded-full' /></h1>
                    <div className=''>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Realism</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2 '>Blackwork</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Tribal</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Watercolor</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Minimalist</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Japanese Traditional</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Abstract</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Neo-Traditional</button>
                        <button className='px-4 py-2 rounded-3xl border mb-2'>Portraits</button>
                    </div>
                </div>
                <div className="border p-3 rounded-lg mb-2">
                    <h1 className="text-xl font-bold flex justify-between">Contact Alex Rivera <LuPenLine onClick={showModalForContact} className='bg-primary text-white h-7 w-7 p-1 rounded-full' /></h1>

                    <div className="flex gap-2 text-sm">
                        <LuMessageCircleMore className="h-6 w-6 text-primary" />
                        <div className="font-normal">
                            <p className="font-bold">Direct Message</p>
                            <p>Usually replies in a few minutes</p>
                        </div>
                    </div>

                    <div className="flex gap-2 text-sm">
                        <IoLocationOutline className="h-6 w-6 text-primary" />
                        <div className="font-normal">
                            <p className="font-bold">Location</p>
                            <p>Based in Brooklyn, NY</p>
                        </div>
                    </div>

                    <p className="text-sm font-bold flex gap-2">
                        <FiPhone className="h-6 w-6 text-primary" />Phone
                        <span className="font-normal">555-123-4567</span>
                    </p>

                    <p className="text-sm font-bold flex gap-2">
                        <MdOutlineEmail className="h-6 w-6 text-primary" />Email
                        <span className="font-normal">alexrivera@tattoos.com</span>
                    </p>
                </div>

            </div>
            <ConfigProvider
                theme={{
                    components: {
                        "Button": {
                            "defaultHoverBorderColor": "rgb(47,84,235)",
                            "defaultHoverColor": "rgb(47,84,235)",
                            "defaultBorderColor": "rgb(47,84,235)"
                        }
                    }
                }}
            >
                {/* modal for services */}
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
                    <Form
                        onFinish={onFinish}
                        name='Services'>
                        <h1 className='text-2xl font-bold'>Services</h1>
                        <div className=''>
                            <Form.Item name='hourly-rate' >
                                <div className='flex justify-between items-center'>
                                    <h1>Hourly Rate</h1>
                                    <Input name='hourly-rate'
                                        placeholder='$50' style={{ width: "50%" }}></Input>
                                </div>
                            </Form.Item>
                            <Form.Item name='Day Rate' >
                                <div className='flex justify-between items-center'>
                                    <h1>Hourly Rate</h1>
                                    <Input name='Day Rate'
                                        placeholder='$50' style={{ width: "50%" }}></Input>
                                </div>
                            </Form.Item>
                            <Form.Item name='Consultation fee' >
                                <div className='flex justify-between items-center'>
                                    <h1>Hourly Rate</h1>
                                    <Input name='Consultation fee'
                                        placeholder='$50' style={{ width: "50%" }}></Input>
                                </div>
                            </Form.Item>
                            <Form.Item name='about-you' style={{ width: "100%" }}>
                                <button onClick={handleOk} className='bg-primary text-white w-full py-2 rounded-xl'>save</button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
                {/* modal for contact details*/}
                <Modal open={isModalOpenForContact} onOk={handleOkForContact} onCancel={handleCancelForContact} footer={false} >
                    <h1 className='text-2xl font-bold'>Contact Details</h1>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ maxWidth: 550 }}
                        onFinish={onFinish}
                        layout="vertical"

                    >
                        <Form.Item
                            name="email"
                            label={<p className=" text-md">Email</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="Your Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label={<p className=" text-md">Phone Number</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="555-123-4567"
                            />
                        </Form.Item>

                        <Form.Item name="address" label={<p className=" text-md">Address</p>}>
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                type="address"
                                placeholder="123 Main Street, Brooklyn, NY"
                            />
                        </Form.Item>
                        <Form.Item name="address" label={<p className=" text-md">Address</p>}>
                            <button onClick={handleOkForContact} className='bg-primary text-white w-full py-2 rounded-xl'>Save</button>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        </div>
    );
};

export default ArtistProfileSideBar;