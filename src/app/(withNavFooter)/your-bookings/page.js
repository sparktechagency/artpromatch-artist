"use client";
import React, { useState } from "react";
import { Table, Tabs, Avatar, ConfigProvider } from "antd";
import { AllImages } from "@/assets/images/AllImages";
import { color } from "framer-motion";

const ArtistBookings = () => {
    const { TabPane } = Tabs;
    const [activeTabKey, setActiveTabKey] = useState("upcoming");
    const data = [
        {
            key: "1",
            avatar: AllImages.user,
            client: "Paityn Franci",
            service: "Realism Tattoo",
            type: "Hourly",
            scheduledTime: "Dec 15, 2024, 1:00 PM",
            deposit: "$50 (Secured)",
            notes: "Forearm tattoo of a lion in black & grey.",
        },
        {
            key: "2",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            client: "Rayna Mango",
            service: "Realism Tattoo",
            type: "Hourly",
            scheduledTime: "Dec 15, 2024, 1:00 PM",
            deposit: "$50 (Secured)",
            notes: "Forearm tattoo of a lion in black & grey.",
        },

    ];
    const data1 = [
        {
            key: "1",
            avatar: AllImages.user,
            client: "Paityn Franci",
            service: "Realism Tattoo",
            type: "Hourly",
            scheduledTime: "Dec 15, 2024, 1:00 PM",
            deposit: "$50 (Secured)",
            notes: "Forearm tattoo of a lion in black & grey.",
        },


    ];
    const data2 = [
        {
            key: "1",
            avatar: AllImages.user,
            client: "Paityn Franci",
            service: "Realism Tattoo",
            type: "Hourly",
            scheduledTime: "Dec 15, 2024, 1:00 PM",
            deposit: "$50 (Secured)",
            notes: "Forearm tattoo of a lion in black & grey.",
        },
        {
            key: "2",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            client: "Rayna Mango",
            service: "Realism Tattoo",
            type: "Hourly",
            scheduledTime: "Dec 15, 2024, 1:00 PM",
            deposit: "$50 (Secured)",
            notes: "Forearm tattoo of a lion in black & grey.",
        },
        {
            key: "2",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
            client: "Rayna Mango",
            service: "Realism Tattoo",
            type: "Hourly",
            scheduledTime: "Dec 15, 2024, 1:00 PM",
            deposit: "$50 (Secured)",
            notes: "Forearm tattoo of a lion in black & grey.",
        },

    ];
    const columns = [
        {
            title: "Client",
            dataIndex: "client",
            key: "client",
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={record.avatar} style={{ marginRight: 8 }} />
                    {text}
                </div>
            ),
        },
        {
            title: "Service",
            dataIndex: "service",
            key: "service",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Scheduled Date & Time",
            dataIndex: "scheduledTime",
            key: "scheduledTime",
        },
        {
            title: "Deposit Paid",
            dataIndex: "deposit",
            key: "deposit",
        },
        {
            title: "Special Notes",
            dataIndex: "notes",
            key: "notes",
        },
    ];


    return (
        <div className='container mx-auto md:my-20'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>Your Bookings</h1>
                <p className='text-textSecondary'>View and manage your confirmed appointments.</p>
            </div>
            <div className='my-5'>
                <ConfigProvider
                    theme={{
                        components: {
                            Tabs: {
                                itemColor: "#816a6b",
                                itemHoverColor: "#6a5454",
                                itemActiveColor: "#6a5454",
                                inkBarColor: "#6a5454",
                            },
                            TabPane: {
                                inkBarColor: "#6a5454",
                            }
                        }
                    }}

                >
                    <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} className="text-primary hover:text-primary">
                        <TabPane tab="Upcoming Appointments" key="upcoming">
                            <Table columns={columns} dataSource={data} pagination={false} />
                        </TabPane>
                        <TabPane tab="Past Appointments" key="past">
                            <Table columns={columns} dataSource={data1} pagination={false} />
                        </TabPane>
                        <TabPane tab="Cancelled or No-Show Appointments" key="cancelled">
                            <Table columns={columns} dataSource={data2} pagination={false} />
                        </TabPane>
                    </Tabs>
                </ConfigProvider>
            </div>
        </div >
    );
};

export default ArtistBookings;