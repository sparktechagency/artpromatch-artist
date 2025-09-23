'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Dropdown, MenuProps, Space } from 'antd';
import Link from 'next/link';
import { FaCalendar } from 'react-icons/fa6';

const EarningBarChart = () => {
  const data = [
    { name: 'Jan', income: 2000, expense: 1200 },
    { name: 'Feb', income: 2500, expense: 1500 },
    { name: 'Mar', income: 1800, expense: 900 },
    { name: 'Apr', income: 3000, expense: 2000 },
    { name: 'May', income: 3200, expense: 1800 },
    { name: 'Jun', income: 2800, expense: 1600 },
    { name: 'Jul', income: 3500, expense: 2000 },
    { name: 'Aug', income: 4000, expense: 2200 },
    { name: 'Sep', income: 3200, expense: 1800 },
    { name: 'Oct', income: 3700, expense: 2100 },
    { name: 'Nov', income: 3900, expense: 2300 },
    { name: 'Dec', income: 4200, expense: 2500 },
  ];

  const dropdownItems: MenuProps['items'] = [
    { label: <a>Last 7 Days</a>, key: '0' },
    { label: <a>Last 30 Days</a>, key: '1' },
    { type: 'divider' },
    { label: <a>Last 90 Days</a>, key: '2' },
  ];

  return (
    <div className="bg-secondary text-primary p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-primary font-bold text-xl">
            Monthly Income & Expenses
          </h3>
          <p className="text-primary text-sm">Last 30 days</p>
        </div>
        <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
          <Link
            href="#"
            onClick={e => e.preventDefault()}
            className="text-primary"
          >
            <Space>
              <FaCalendar />
              Last 30 days
            </Space>
          </Link>
        </Dropdown>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
          <XAxis dataKey="name" stroke="#816a6b" />
          <YAxis stroke="#816a6b" />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: 'none' }}
            itemStyle={{ color: '#816a6b' }}
            labelStyle={{ color: '#816a6b' }}
          />
          <Bar dataKey="income" fill="#4ade80" name="Income" barSize={12} />
          <Bar dataKey="expense" fill="#f87171" name="Expenses" barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningBarChart;
