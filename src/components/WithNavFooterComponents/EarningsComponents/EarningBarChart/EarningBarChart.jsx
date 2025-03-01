'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import { FaCalendar } from 'react-icons/fa6';

const EarningBarChart = () => {
    const data = [
        { name: 'Jan', profileClick: 20, profileView: 30 },
        { name: 'Feb', profileClick: 35, profileView: 50 },
        { name: 'Mar', profileClick: 25, profileView: 40 },
        { name: 'Apr', profileClick: 50, profileView: 70 },
        { name: 'May', profileClick: 60, profileView: 90 },
        { name: 'Jun', profileClick: 40, profileView: 60 },
        { name: 'Jul', profileClick: 55, profileView: 80 },
        { name: 'Aug', profileClick: 75, profileView: 100 },
        { name: 'Sep', profileClick: 50, profileView: 75 },
        { name: 'Oct', profileClick: 65, profileView: 85 },
        { name: 'Nov', profileClick: 70, profileView: 95 },
        { name: 'Dec', profileClick: 80, profileView: 100 },
    ];

    const items = [
        {
            label: <a>1st menu item</a>,
            key: '0',
        },
        {
            label: <a >2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];

    return (
        <div  className="bg-secondary text-primary  rounded-lg">
            <div className='flex justify-between items-center'>
                <div>
                    <h3 className="text-primary font-bold text-xl">Monthly Income And Expences</h3>
                    <p className="text-primary">Last 30 days</p>
                </div>
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['click']}
                >
                    <Link href="#" onClick={(e) => e.preventDefault()} className="text-primary">
                        <Space>
                            <FaCalendar />
                            Last 30 days
                        </Space>
                    </Link>
                </Dropdown>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#816a6b" />
                    <YAxis stroke="#816a6b" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                        }}
                        itemStyle={{
                            color: '#816a6b',
                        }}
                        labelStyle={{
                            color: '#816a6b',
                        }}
                    />
                    {/* Two Bars */}
                    <Bar dataKey="profileClick" fill="#e5e7eb" name="Profile Clicks" barSize={8} />
                    <Bar dataKey="profileView" fill="#816a6b" name="Profile Views" barSize={8} />
                </BarChart>

            </ResponsiveContainer>
        </div>
    );
};

export default EarningBarChart;
