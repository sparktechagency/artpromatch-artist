'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Dropdown, Space, MenuProps } from 'antd';
import Link from 'next/link';
import { FaCalendar } from 'react-icons/fa6';

type ChartDataItem = {
  name: string;
  profileClick: number;
  profileView: number;
};

const BarChartComponents = () => {
  // Default data for Last 30 days
  const last30DaysData: ChartDataItem[] = [
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

  const last7DaysData: ChartDataItem[] = [
    { name: 'Day 1', profileClick: 5, profileView: 10 },
    { name: 'Day 2', profileClick: 10, profileView: 15 },
    { name: 'Day 3', profileClick: 15, profileView: 20 },
    { name: 'Day 4', profileClick: 20, profileView: 25 },
    { name: 'Day 5', profileClick: 25, profileView: 30 },
    { name: 'Day 6', profileClick: 30, profileView: 35 },
    { name: 'Day 7', profileClick: 35, profileView: 40 },
  ];

  const last90DaysData: ChartDataItem[] = [
    { name: 'Month 1', profileClick: 50, profileView: 80 },
    { name: 'Month 2', profileClick: 60, profileView: 90 },
    { name: 'Month 3', profileClick: 70, profileView: 100 },
  ];

  const [chartData, setChartData] = useState<ChartDataItem[]>(last30DaysData);
  const [selectedRange, setSelectedRange] = useState('Last 30 days');

  const handleMenuClick: MenuProps['onClick'] = e => {
    switch (e.key) {
      case '7':
        setChartData(last7DaysData);
        setSelectedRange('Last 7 days');
        break;
      case '30':
        setChartData(last30DaysData);
        setSelectedRange('Last 30 days');
        break;
      case '90':
        setChartData(last90DaysData);
        setSelectedRange('Last 90 days');
        break;
    }
  };

  const menuItems: MenuProps['items'] = [
    { label: 'Last 7 days', key: '7' },
    { label: 'Last 30 days', key: '30' },
    { label: 'Last 90 days', key: '90' },
  ];

  return (
    <div
      className="bg-secondary text-primary p-4 rounded-lg w-full"
      style={{ height: 400 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-primary font-bold text-xl">Profile Insights</h3>
          <p className="text-primary">Total Views in {selectedRange}</p>
        </div>
        <Dropdown
          menu={{ items: menuItems, onClick: handleMenuClick }}
          trigger={['click']}
        >
          <Link
            href="#"
            onClick={e => e.preventDefault()}
            className="text-primary"
          >
            <Space>
              <FaCalendar />
              {selectedRange}
            </Space>
          </Link>
        </Dropdown>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#816a6b" />
          <YAxis stroke="#816a6b" />
          <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', border: 'none' }}
            itemStyle={{ color: '#816a6b' }}
            labelStyle={{ color: '#816a6b' }}
          />
          <Bar
            dataKey="profileClick"
            fill="#c4c4c4"
            name="Profile Clicks"
            barSize={8}
          />
          <Bar
            dataKey="profileView"
            fill="#816a6b"
            name="Profile Views"
            barSize={8}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponents;
