'use client';

import { ConfigProvider, Form, Input } from 'antd';

const ChangePassword = () => {
  interface ChangePasswordFormValues {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const onFinish = (values: ChangePasswordFormValues) => {
    console.log(values);
  };

  return (
    <div className="max-w-md mx-auto p-5">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              borderRadius: 0,
            },
            Input: {
              borderRadius: 5,
            },
          },
        }}
      >
        <Form name="changePassword" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Your Email" className="p-2" />
          </Form.Item>

          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { required: true, message: 'Please input your old password!' },
            ]}
          >
            <Input type="password" placeholder="Old Password" className="p-2" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your new password!' },
            ]}
          >
            <Input type="password" placeholder="New Password" className="p-2" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input
              type="password"
              placeholder="Confirm Password"
              className="p-2"
            />
          </Form.Item>

          <Form.Item className="text-end">
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-xl font-bold"
            >
              Update
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ChangePassword;
