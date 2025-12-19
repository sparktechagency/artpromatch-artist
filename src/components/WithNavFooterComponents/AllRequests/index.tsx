'use client';

import { Table, Tag, Avatar, Space, Button, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { IMeta, IRequest } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { artistAcceptRequest, artistRejectRequest } from '@/services/Request';

interface AllRequestsProps {
  requests: IRequest[];
  meta: IMeta;
}

const AllRequests: React.FC<AllRequestsProps> = ({ requests, meta }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // onPaginationChange
  const onPaginationChange = (page: number, pageSize: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set('page', page.toString());
    currentParams.set('limit', pageSize.toString());

    router.push(`${pathname}?${currentParams.toString()}`);
  };

  const columns: ColumnsType<IRequest> = [
    {
      title: 'Business Info',
      dataIndex: 'businessName',
      key: 'businessName',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={getCleanImageUrl(record.image)}
            icon={<UserOutlined />}
            size="large"
            className="border border-gray-200"
          />
          <div className="flex flex-col">
            <Link
              href={`/message?receiverId=${record.businessAuthId}`}
              className="hover:underline!"
            >
              <span className="font-semibold text-gray-800 hover:text-blue-500">
                {record.businessName}
              </span>
            </Link>
            <span className="text-xs text-gray-500">{record.email}</span>
          </div>
        </div>
      ),
    },

    {
      title: 'Location',
      dataIndex: 'stringLocation',
      key: 'stringLocation',
      render: location => (
        <div className="flex items-center text-gray-600 gap-1">
          <EnvironmentOutlined />
          <span className="truncate max-w-[150px]" title={location}>
            {location}
          </span>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: phone => (
        <div className="flex items-center text-gray-600 gap-1">
          <PhoneOutlined />
          <span title={phone}>{phone}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        // color logic with status
        let color = 'default';
        let icon = <ClockCircleOutlined />;

        if (status === 'approved' || status === 'completed') {
          color = 'success';
          icon = <CheckCircleOutlined />;
        } else if (status === 'pending') {
          color = 'warning';
          icon = <ClockCircleOutlined />;
        } else if (status === 'rejected') {
          color = 'error';
        }

        return (
          <Tag
            icon={icon}
            color={color}
            className="uppercase text-xs font-bold py-0.5"
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: date => (
        <span className="text-gray-500 text-sm">
          {dayjs(date).format('DD MMM, YYYY')}
        </span>
      ),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.status === 'pending' ? (
          <Space size="middle">
            <Tooltip title="Accept Request">
              <Button
                type="primary"
                shape="circle"
                icon={<CheckCircleOutlined />}
                onClick={() => handleAcceptRequestByArtist(record._id)}
                className="bg-green-500! hover:bg-green-600! border-none"
              />
            </Tooltip>
            <Tooltip title="Cancel Request">
              <Button
                type="primary"
                shape="circle"
                icon={<CloseCircleOutlined />}
                onClick={() => handleRejectRequestByArtist(record._id)}
                className="bg-red-500! hover:bg-red-600! border-none"
              />
            </Tooltip>
            {/* <Tooltip title="View Details">
            <Button
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => console.log('View', record._id)}
              className="bg-blue-500 hover:bg-blue-600 border-none"
            />
          </Tooltip> */}
          </Space>
        ) : null,
    },
  ];

  // handleAcceptRequestByArtist
  const handleAcceptRequestByArtist = async (requestId: string) => {
    const res = await artistAcceptRequest(requestId);

    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message || 'Failed to accept request');
    }
  };

  // handleRejectRequestByArtist
  const handleRejectRequestByArtist = async (requestId: string) => {
    const res = await artistRejectRequest(requestId);

    if (res?.success) {
      toast.success(res?.message);
    } else {
      toast.error(res?.message || 'Failed to reject request');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 m-0">
              All Requests
            </h2>
            <p className="text-gray-500 mt-1 m-0">
              Manage and track all your requests
            </p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-semibold">
            Total: {meta?.total || 0}
          </div>
        </div>

        {/* Table Section */}
        <Table
          columns={columns}
          dataSource={requests}
          rowKey="_id"
          pagination={{
            current: meta.page,
            pageSize: meta.limit,
            total: meta.total,
            onChange: onPaginationChange,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          className="ant-table-custom"
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default AllRequests;
