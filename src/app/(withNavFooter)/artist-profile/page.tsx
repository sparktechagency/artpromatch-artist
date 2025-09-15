'use client';

import { AllImages } from '@/assets/images/AllImages';
import Image, { StaticImageData } from 'next/image';
import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LuPenLine } from 'react-icons/lu';
import { ConfigProvider, Form, Input, Modal } from 'antd';
import ArtistProfileHeader from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/ArtistProfileComponents/ArtistProfileHeader';
import ArtistProfileSideBar from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/ArtistProfileComponents/ArtistProfileSideBar';

// types
interface ArtistProfilePageProps {
  children?: ReactNode;
}

interface PortfolioItem {
  name: string;
  date: string;
  image: StaticImageData;
}

interface FormValues {
  aboutYou: string;
}

const ArtistProfilePage: React.FC<ArtistProfilePageProps> = () => {
  const data: PortfolioItem[] = [
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image1 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image2 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image3 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image4 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image5 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image6 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image7 },
    { name: 'Alex Rivera', date: '2 days ago', image: AllImages.image8 },
  ];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const onFinish = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div>
      <div>
        <div className="bg-[#f3f1f1]">
          <Image
            src={AllImages.profileBg}
            alt="logo"
            height={300}
            width={300}
            className="h-40 md:h-auto w-full"
          />
        </div>
        <div className="container mx-auto ">
          <ArtistProfileHeader />
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row my-10">
        <div className="w-[20%] ">
          <ArtistProfileSideBar />
        </div>

        <div className="w-[80%] px-5">
          <div>
            <h1 className="text-2xl font-bold flex gap-2 items-center">
              About Alex Rivera{' '}
              <LuPenLine
                onClick={showModal}
                className="bg-primary text-white h-7 w-7 p-1 rounded-full cursor-pointer"
              />
            </h1>
            <p>
              I&apos;m a professional tattoo artist with over 10 years of
              experience specializing in realism and black & grey designs. My
              focus is on creating lifelike portraits and intricate custom
              designs for clients who want their tattoos to tell a story.
            </p>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.map((item, index) => (
                <div key={index} className="relative group overflow-hidden">
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <Image
                      src={item.image}
                      alt="portfolio image"
                      height={500}
                      width={500}
                      className="rounded-sm"
                    />

                    <button
                      onClick={showModal}
                      className="cursor-pointer bg-white text-black px-4 py-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                    >
                      Book Now
                    </button>
                  </motion.div>
                </div>
              ))}
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    defaultHoverBorderColor: 'rgb(47,84,235)',
                    defaultHoverColor: 'rgb(47,84,235)',
                    defaultBorderColor: 'rgb(47,84,235)',
                  },
                },
              }}
            >
              {/* modal for about you */}
              <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
              >
                <Form<FormValues> onFinish={onFinish} name="about-you">
                  <h1 className="text-2xl font-bold">About You</h1>
                  <div>
                    <Form.Item<FormValues>
                      name="aboutYou"
                      style={{ width: '100%' }}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Write about yourself..."
                      />
                    </Form.Item>
                    <Form.Item>
                      <button
                        type="submit"
                        className="bg-primary text-white w-full py-2 rounded-xl"
                      >
                        Save
                      </button>
                    </Form.Item>
                  </div>
                </Form>
              </Modal>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfilePage;
