'use client';

import { AllImages } from '@/assets/images/AllImages';
import Maps from '@/components/WithNavFooterComponents/Maps/Maps';
import { Form, Input, Steps, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
const PreferedLocation = () => {
  const [location, setLocation] = useState<{ lng: number; lat: number } | null>(
    null
  );

  const [radius, setRadius] = useState(8);
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  console.log('Location from map', location);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude } = pos.coords;
          const data = {
            type: 'Point',
            coordinates: [longitude, latitude],
          };
          setLocation({
            lng: longitude,
            lat: latitude,
          });
          localStorage.setItem('location', JSON.stringify(data));
          localStorage.setItem('radius', radius.toString());
        },
        err => {
          console.error('Geolocation error:', err.message);
          alert('Failed to get your location. Please allow location access.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  interface FormValues {
    studioName: string;
    address?: string;
    location?: { lng: number; lat: number } | null;
    city: string;
  }

  const onFinish = (values: FormValues) => {
    const studioName: string = values.studioName;
    const city: string = values.city;

    localStorage.setItem('city', JSON.stringify(city));
    localStorage.setItem('studioName', JSON.stringify(studioName));
    // localStorage.setItem("location", JSON.stringify(location));
    router.push('/verify-profile');
  };

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  // const data = {
  //   coordinates: [77.1025, 28.7041],
  // };

  // localStorage.setItem("location", JSON.stringify(data));

  return (
    <div className="py-16 md:py-0 h-[100vh] w-full flex items-center justify-center ">
      <div className="pt-32 pb-16">
        <div className="w-[450px]">
          <Form
            name="select-user-type"
            initialValues={{ remember: true }}
            layout="vertical"
            className=""
            onFinish={onFinish}
          >
            <div className="mb-4 flex flex-col justify-center items-center text-center">
              <Image src={AllImages.logo} width={50} height={50} alt="logo" />
              <h2 className="text-center text-2xl font-bold mt-6 mb-2 text-primary">
                Where do you want to find artists or studios?
              </h2>
              <Typography.Text className=" text-center text-base ">
                We&apos;ll prioritize results in these areas.
              </Typography.Text>
            </div>
            <div>
              <Form.Item
                name="studioName"
                style={{}}
                label={<p className=" text-md">Studio/Business Name</p>}
              >
                <Input
                  required
                  style={{ padding: '6px' }}
                  className=" text-md"
                  placeholder="Studio/Business Name"
                />
              </Form.Item>
              <Form.Item
                name="address"
                style={{}}
                label={<p className=" text-md">Address</p>}
              >
                <Input
                  required
                  style={{ padding: '6px' }}
                  className=" text-md"
                  placeholder="Enter your address"
                />
              </Form.Item>

              <Form.Item name="location">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="flex justify-center items-center gap-2 text-primary border border-primary w-full py-2 rounded-xl"
                >
                  <FaLocationArrow />
                  {location ? (
                    <p className=" text-sm">
                      {location.lat},{location.lng}
                    </p>
                  ) : (
                    <p className="text-sm">Use my current location</p>
                  )}
                  {location && <Maps location={location}></Maps>}
                </button>
              </Form.Item>

              <Form.Item
                name="city"
                style={{}}
                label={<p className=" text-md">City</p>}
              >
                <Input
                  required
                  style={{ padding: '6px' }}
                  className=" text-md"
                  placeholder="Enter your city"
                />
              </Form.Item>
              <Form.Item className="text-center">
                {/* <Link href="/verify-profile"> */}
                <button
                  className="bg-primary w-full px-6 py-2 rounded-md text-white"
                  type="submit"
                >
                  Continue
                </button>
                {/* </Link> */}
              </Form.Item>
            </div>
          </Form>
          <div className="mt-5">
            <Steps
              current={current}
              onChange={onChange}
              direction="horizontal"
              size="small"
              items={[
                {
                  title: '',
                  status: 'finish',
                },
                {
                  title: '',
                  status: current >= 1 ? 'finish' : 'wait',
                },
                {
                  title: '',
                  status: current >= 2 ? 'finish' : 'wait',
                },
                {
                  title: '',
                  status: current >= 3 ? 'finish' : 'wait',
                },
              ]}
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferedLocation;
