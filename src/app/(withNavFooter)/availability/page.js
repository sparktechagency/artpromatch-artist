'use client';
import { CiClock2 } from "react-icons/ci";
import { Card, Button, Checkbox, List, Space, message, Modal, Image } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { FaClock } from "react-icons/fa6";
import { useState } from "react";
import { AllImages } from "@/assets/images/AllImages";

const weeklySchedule = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
];

const guestSpots = [
    { date: "Dec 10-15, 2024", location: "Manhattan, NY (Rivera Ink Studio)", booked: 4, total: 10 },
    { date: "Dec 10-15, 2024", location: "Manhattan, NY (Rivera Ink Studio)", booked: 4, total: 10 },
    { date: "Dec 10-15, 2024", location: "Manhattan, NY (Rivera Ink Studio)", booked: 4, total: 10 },
];

const bookedHours = [
    { date: "Dec 20-25, 2024", reason: "Holiday" },
    { date: "Feb 1-4, 2025", reason: "Personal Time" },
];

const AvailablityPage = () => {
const [OpenMoal, setOpenModal] = useState(false);
const showModal = () => {
    setOpenModal(true);
}
const handleOk = () => {
    setOpenModal(false);
}
const handleCancel = () => {
    setOpenModal(false);
}

const handleDelete = () => {
   message.success("Deleted Successfully");
}

    return (
        <div className='container mx-auto md:my-20'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>Manage Your Availability and Tour Dates</h1>
                <p className='text-textSecondary'>Keep your calendar up-to-date so clients can easily book with you.</p>
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Set Your Weekly Schedule" extra={<Link href="/availability/set-specific-availability" className="text-primary hover:text-primary font-bold">Set Specific Availability</Link>} className="shadow-md">

                    {weeklySchedule.map(({ day }) => (
                        <div key={day} className="flex justify-between items-center py-2">
                            <span className="font-medium">{day}</span>
                            <div className="flex gap-2">
                                <div className="flex gap-2 px-4 py-1   border rounded">
                                    <CiClock2 className="text-primary h-5 w-5" />
                                    <p>09:00 - 10:00</p>
                                </div>
                                <div className="flex gap-2 px-4 py-1   border rounded">
                                    <CiClock2 className="text-primary h-5 w-5" />
                                    <p>09:00 - 10:00</p>
                                </div>


                            </div>
                        </div>
                    ))}
                </Card>

                <Card title="Manage Your Guest Spots" extra={<Link href="/add-guest-spots" className="text-primary hover:text-primary font-bold">Add Guest Spots</Link>} className="shadow-md" >
                    <List
                        dataSource={guestSpots}
                        renderItem={(item) => (
                            <List.Item className="border p-3 rounded-lg shadow-sm mb-2">
                                <div className="flex-1  p-5">
                                    <p className="font-semibold">{item.date}</p>
                                    <p className="text-sm text-gray-600">{item.location}</p>
                                    <p className="text-sm text-gray-500">Slots Booked: {item.booked} of {item.total} Available</p>
                                </div>
                                <Space className="p-2">
                                    <Button onclick={showModal} icon={<EditOutlined />}/>
                                    <Button onclick={handleDelete} icon={<DeleteOutlined />} danger />
                                </Space>
                            </List.Item>
                        )}
                    />
                </Card>

                <Card title="Set Time Off / Manually Booked Hours" extra={<Link href="/block-new-date" className="text-primary hover:text-primary font-bold">Block New Date</Link>} className="shadow-md" >
                    <List
                        dataSource={bookedHours}
                        renderItem={(item) => (
                            <List.Item className="border rounded-md shadow-sm mb-2">
                                <p className="font-medium px-2">{item.date} <span className="text-gray-500">({item.reason})</span></p>
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
            <Modal open={OpenMoal} onOk={handleOk} onCancel={handleCancel}>
                <div className="flex justify-between items-center mb-4  border-0 border-b">
                    <div className="flex items-center gap-3">
                        <Image
                            src={AllImages.user}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">Alex Rivera</h3>
                            <p className="text-gray-500 text-sm">Brooklyn, NY</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4  border-0 border-b">
                    <div className="flex items-center gap-3">
                        <Image
                            src={AllImages.user}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-lg font-semibold">Alex Rivera</h3>
                            <p className="text-gray-500 text-sm">Brooklyn, NY</p>
                        </div>
                    </div>
                </div>
                </Modal>
           
        </div>
    );
};

export default AvailablityPage;
