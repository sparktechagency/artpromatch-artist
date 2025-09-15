'use client';

import { ConfigProvider, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { FiPhone } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { LuMessageCircleMore, LuPenLine } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';

const ArtistProfileSideBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenForContact, setIsModalOpenForContact] = useState(false);

  // Service modal handlers
  const showServiceModal = () => setIsModalOpen(true);
  const handleServiceOk = () => setIsModalOpen(false);
  const handleServiceCancel = () => setIsModalOpen(false);

  const onFinishService = (values: any) => console.log('Service Form:', values);

  // Contact modal handlers
  const showContactModal = () => setIsModalOpenForContact(true);
  const handleContactOk = () => setIsModalOpenForContact(false);
  const handleContactCancel = () => setIsModalOpenForContact(false);

  const onFinishContact = (values: any) => console.log('Contact Form:', values);

  return (
    <div className="container mx-auto">
      {/* Availability & Guest Spots */}
      <div className="border p-3 rounded-lg mb-5">
        <h1 className="text-xl font-bold flex justify-between">
          Availability & Guest Spots
          <LuPenLine className="bg-primary text-white h-7 w-7 p-1 rounded-full" />
        </h1>
        <p className="text-sm font-bold">
          Dec 1-5: <span className="font-normal">Open for bookings.</span>
        </p>
        <p className="text-sm font-bold">
          Dec 10-15: <span className="font-normal">Guest Spot in Brooklyn</span>
        </p>
        <p className="text-sm font-bold">
          Dec 20-30: <span className="font-normal">Open for bookings.</span>
        </p>
      </div>

      {/* Services */}
      <div className="border p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold flex justify-between">
          Service
          <LuPenLine
            onClick={showServiceModal}
            className="bg-primary text-white h-7 w-7 p-1 rounded-full cursor-pointer"
          />
        </h1>
        {[
          { name: 'Nostril', price: 100 },
          { name: 'Navel', price: 1000 },
          { name: 'Earlobe', price: 50 },
          { name: 'Helix', price: 50 },
          { name: 'Industrial', price: 50 },
          { name: 'Tragus', price: 50 },
          { name: 'Septum', price: 50 },
          { name: 'High Nostrils', price: 50 },
        ].map(service => (
          <p
            key={service.name}
            className="text-sm font-bold flex justify-between"
          >
            {service.name} <span className="font-normal">${service.price}</span>
          </p>
        ))}
      </div>

      {/* Skills */}
      <div className="border p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold flex justify-between">
          Skills
          <LuPenLine className="bg-primary text-white h-7 w-7 p-1 rounded-full" />
        </h1>
        <div className="flex flex-wrap gap-2">
          {[
            'Realism',
            'Blackwork',
            'Tribal',
            'Watercolor',
            'Minimalist',
            'Japanese Traditional',
            'Abstract',
            'Neo-Traditional',
            'Portraits',
          ].map(skill => (
            <button key={skill} className="px-4 py-2 rounded-3xl border mb-2">
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="border p-3 rounded-lg mb-2">
        <h1 className="text-xl font-bold flex justify-between">
          Contact Alex Rivera
          <LuPenLine
            onClick={showContactModal}
            className="bg-primary text-white h-7 w-7 p-1 rounded-full cursor-pointer"
          />
        </h1>

        <div className="flex gap-2 text-sm mb-2">
          <LuMessageCircleMore className="h-6 w-6 text-primary" />
          <div>
            <p className="font-bold">Direct Message</p>
            <p>Usually replies in a few minutes</p>
          </div>
        </div>

        <div className="flex gap-2 text-sm mb-2">
          <IoLocationOutline className="h-6 w-6 text-primary" />
          <div>
            <p className="font-bold">Location</p>
            <p>Based in Brooklyn, NY</p>
          </div>
        </div>

        <p className="text-sm font-bold flex gap-2">
          <FiPhone className="h-6 w-6 text-primary" /> Phone{' '}
          <span className="font-normal">555-123-4567</span>
        </p>

        <p className="text-sm font-bold flex gap-2">
          <MdOutlineEmail className="h-6 w-6 text-primary" /> Email{' '}
          <span className="font-normal">alexrivera@tattoos.com</span>
        </p>
      </div>

      {/* ConfigProvider and Modals */}
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBorderColor: 'rgb(47,84,235)',
              defaultHoverColor: 'rgb(47,84,235)',
              defaultBorderColor: 'rgb(47,84,235)',
            },
          },
        }}
      >
        {/* Service Modal */}
        <Modal
          open={isModalOpen}
          onOk={handleServiceOk}
          onCancel={handleServiceCancel}
          footer={false}
        >
          <Form onFinish={onFinishService} layout="vertical" name="Services">
            <h1 className="text-2xl font-bold mb-4">Services</h1>
            <Form.Item label="Hourly Rate" name="hourlyRate">
              <Input placeholder="$50" />
            </Form.Item>
            <Form.Item label="Day Rate" name="dayRate">
              <Input placeholder="$50" />
            </Form.Item>
            <Form.Item label="Consultation Fee" name="consultationFee">
              <Input placeholder="$50" />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="bg-primary text-white w-full py-2 rounded-xl"
              >
                Save
              </button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Contact Modal */}
        <Modal
          open={isModalOpenForContact}
          onOk={handleContactOk}
          onCancel={handleContactCancel}
          footer={false}
        >
          <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
          <Form
            onFinish={onFinishContact}
            layout="vertical"
            name="ContactDetails"
            initialValues={{ email: '', phone: '', address: '' }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input placeholder="555-123-4567" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="123 Main Street, Brooklyn, NY" />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="bg-primary text-white w-full py-2 rounded-xl"
              >
                Save
              </button>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ArtistProfileSideBar;
