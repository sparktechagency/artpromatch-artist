'use client';

import { useState } from 'react';
import { Modal, Table, Tag } from 'antd';
import CardEditModal from './CardEditModal';
import { ColumnsType } from 'antd/es/table';
import { IPayment } from '@/types';

const PaymentHistory = ({
  payments = [],
  profile,
}: {
  payments: IPayment[];
  profile: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // deterministic date formatter to avoid SSR/CSR hydration mismatch
  const formatDate = (value?: string | number | Date) => {
    if (!value) return '';

    const d = new Date(value);

    if (Number.isNaN(d.getTime())) return '';

    return d.toISOString().slice(0, 10);
  };

  const columns: ColumnsType<IPayment> = [
    {
      title: 'Client',
      key: 'client',
      render: (_value, record) => record.clientInfo.fullName,
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Billing date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      defaultSortOrder: 'descend',
      sorter: (a: IPayment, b: IPayment) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (value: IPayment['createdAt']) => formatDate(value),
    },
    {
      title: 'Total Amount',
      dataIndex: 'price',
      key: 'price',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Your Earning',
      dataIndex: 'artistEarning',
      key: 'artistEarning',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: IPayment['paymentStatus']) => {
        const normalized = status?.toLowerCase();
        const color =
          normalized === 'captured'
            ? 'green'
            : normalized === 'pending'
            ? 'orange'
            : normalized === 'failed'
            ? 'red'
            : 'blue';

        return (
          <Tag className="capitalize" color={color}>
            {status}
          </Tag>
        );
      },
    },
  ];

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Check if Stripe is connected and ready
  const isStripeConnected = profile?.stripeAccountId && profile?.isStripeReady;

  return (
    <div>
      {/* Stripe Connection Status */}
      <div className="mb-6">
        {isStripeConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">
                  Stripe Connected
                </h3>
                <p className="text-green-600 text-sm">
                  Your account is ready to accept payments
                </p>
              </div>
            </div>
            <Tag color="green">Active</Tag>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-800 font-semibold">
                  Stripe Not Connected
                </h3>
                <p className="text-yellow-600 text-sm">
                  Connect your Stripe account to accept payments
                </p>
              </div>
            </div>
            <Tag color="orange">Setup Required</Tag>
          </div>
        )}
      </div>

      {/* Payment Method Section */}
      {/* <div className="mt-5 mb-4 border rounded-xl p-4 flex justify-between items-center ">
        <div className="flex items-center gap-3">
          <Image src={AllImages.visa} alt="visa" height={50} width={50} />
          <div className="text-secondary">
            <h3>Visa ending in 1234</h3>
            <h4>Expiry 06/2024</h4>
          </div>
        </div>
        <button onClick={showModal} className="px-4 py-2 rounded-xl border">
          Edit
        </button>
      </div> */}

      <div>
        <Table
          columns={columns}
          dataSource={payments}
          bordered
          pagination={false}
          rowKey="_id"
        />
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CardEditModal handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default PaymentHistory;
