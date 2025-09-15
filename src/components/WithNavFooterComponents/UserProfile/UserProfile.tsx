'use client';

// import { useUpdatePersonalInfoMutation } from '@/redux/api/features/profileApi/profileApi';
import { ConfigProvider, Form, Input, Select } from 'antd';
import { toast } from 'sonner';

interface UserProfileFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
}

const UserProfile = () => {
  // const [updatePersonalInfo] = useUpdatePersonalInfoMutation();
  const { Option } = Select;

  const onFinish = async (values: UserProfileFormValues) => {
    console.log('Received values of form:', values);

    try {
      const res = await updatePersonalInfo(values).unwrap();
      console.log(res);
      toast.success(res?.message);
    } catch (error: any) {
      // Make sure 'error' is properly typed
      toast.error(error?.message || 'Something went wrong');
    }
  };

  return (
    <div className="px-2 md:px-0">
      {/* <div className=" flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
                <div className="flex items-center gap-2">
                    <Image className="rounded-full" src={AllImages.user} height={100} width={100} alt="user" />
                    <div className="">
                        <h1 className="text-xl font-bold">Alex Rivera</h1>
                        <p className="text-neutral-400">Update your profile information</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2  mb-5 md:mb-0">
                    <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary">
                        <FaUpload /> Uplaod
                    </button>
                    <button className="flex items-center gap-2 px-10 py-2 rounded-xl border hover:border-primary hover:text-primary">
                        <FaTrash /> Remove
                    </button>
                </div>
            </div> */}
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
        <Form
          name="perosonalInfo"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
          className="my-5"
        >
          <Form.Item
            name="fullName"
            label={<p className=" text-md">Full Name</p>}
            style={{}}
          >
            <Input
              required
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={<p className=" text-md">Email</p>}
            style={{}}
          >
            <Input
              required
              style={{ padding: '6px' }}
              className=" text-md"
              placeholder="Your Email"
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label={<p className=" text-md">Conatct Number</p>}
          >
            <Input
              required
              style={{ padding: '6px' }}
              className=" text-md"
              type="Conatct "
              placeholder="Conatct Number"
            />
          </Form.Item>
          <Form.Item name="country" label={<p className=" text-md">Country</p>}>
            <Select placeholder="Select Country">
              <Option value="UAE">UAE </Option>
              <Option value="UK">UK </Option>
              <Option value="USA">USA </Option>
            </Select>
          </Form.Item>

          <Form.Item className="text-end">
            <button
              className="px-5 py-2 bg-primary text-white rounded-xl font-bold "
              type="submit"
            >
              Save Changes
            </button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default UserProfile;
