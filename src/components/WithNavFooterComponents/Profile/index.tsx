'use client';

import { AllImages } from '@/assets/images/AllImages';
import Image, { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuPenLine } from 'react-icons/lu';
import { ConfigProvider, Form, Input, Modal } from 'antd';
import ArtistProfileHeader from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/ArtistProfileComponents/ArtistProfileHeader';
import ArtistProfileSideBar from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/ArtistProfileComponents/ArtistProfileSideBar';
import { useUser } from '@/context/UserContext';
import { getOwnArtistData } from '@/services/Auth';
import { IArtist, IFolder, IService } from '@/types';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

interface FormValues {
  aboutYou: string;
}

const Profile = ({ folders = [] }: { folders: IFolder[] }) => {
  const { user } = useUser();
  const [artistData, setArtistData] = useState<IArtist | null>(null);
  const [artistServices, setArtistServices] = useState<IService[] | []>([]);

  useEffect(() => {
    const setArtistFunc = async () => {
      const artist = await getOwnArtistData();

      setArtistData(artist?.data?.artist);
      setArtistServices(artist?.data?.services);
    };

    setArtistFunc();
  }, []);

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
          <ArtistProfileHeader user={user} />
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row my-10">
        <div className="w-[20%] ">
          <ArtistProfileSideBar
            user={user}
            artist={artistData}
            services={artistServices}
          />
        </div>

        <div className="w-[80%] px-5">
          <div>
            <h1 className="text-2xl font-bold flex gap-2 items-center">
              {user?.fullName}
              <LuPenLine
                onClick={showModal}
                className="bg-primary text-white h-7 w-7 p-1 rounded-full cursor-pointer"
              />
            </h1>
            <p>{artistData?.description}</p>
          </div>

          <div>
            <h1 className="text-2xl font-bold">Portfolio</h1>
            <div className="grid grid-cols-1 gap-10">
              {folders?.map(folder => (
                <motion.div
                  key={folder._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative group bg-gray-300 rounded-xl shadow-md overflow-hidden"
                >
                  {/* Folder Header */}
                  <div className="p-3 border-b bg-gray-300">
                    <h3 className="font-semibold text-lg text-gray-800 capitalize">
                      {folder.name}
                    </h3>
                    {/* <p className="text-sm text-gray-500">{folder.for}</p> */}
                  </div>

                  {/* Images Grid */}
                  <div className="grid grid-cols-2 gap-5 p-3">
                    {folder?.images?.map((img, index) => (
                      <motion.div
                        key={index}
                        className="relative aspect-[4/3] overflow-hidden rounded-md hover:scale-[1.03] transition-all ease-in-out"
                      >
                        <Image
                          src={getCleanImageUrl(img)}
                          alt={`${folder.name}-${index}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
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

export default Profile;
