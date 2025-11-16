'use client';

import { useState } from 'react';
import 'antd/dist/reset.css';
import { Button, Drawer, Dropdown, Modal } from 'antd';
import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import Image from 'next/image';
import { AllImages } from '@/assets/images/AllImages';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import NotificationModal from '@/components/WithNavFooterComponents/HomeComponents/NotificationModal';
import { usePathname, useRouter } from 'next/navigation';
// import { CiHeart } from 'react-icons/ci';
import { useUser } from '@/context/UserContext';
import { logOut } from '@/services/Auth';
import { protectedRoutes } from '@/constants';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { RiArrowDropDownLine } from 'react-icons/ri';

const NavBar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, setIsLoading } = useUser();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsMobile(window.innerWidth < 1024);
  //     const handleResize = () => setIsMobile(window.innerWidth < 1024);
  //     window.addEventListener('resize', handleResize);
  //     return () => window.removeEventListener('resize', handleResize);
  //   }
  // }, []);

  const beforeLoginLabels = [
    {
      name: 'Discover',
      link: '/discover',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    // { name: 'Guest Spots', link: '/guest-spots' },
    {
      name: 'Help',
      link: '/help',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
  ];

  const afterLoginLabels = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Discover',
      link: '/discover',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Services',
      link: '/services',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Bookings',
      link: '/bookings',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Guest Spots',
      link: '/guest-spots',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Portfolio',
      link: '/portfolio',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
    {
      name: 'Join As',
      isDropdown: true,
      dropdownItems: [
        {
          key: '1',
          label: (
            <Link href="https://client-artpromatch-4cq2vqx1n-rabeyaakter78s-projects.vercel.app/">
              Client
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link href="https://artist-artpromatch-ckakmcc6u-rabeyaakter78s-projects.vercel.app/">
              Artist
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link href="https://artpromatch-business-nh3gxj7po-rabeyaakter78s-projects.vercel.app/">
              Business Owner
            </Link>
          ),
        },
      ],
      icon: <RiArrowDropDownLine className="text-black text-4xl" />,
    },
    {
      name: 'Help',
      link: '/help',
      icon: '',
      isDropdown: false,
      dropdownItems: [],
    },
  ];

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setIsLoading(true);

    if (protectedRoutes.some(route => pathname.match(route))) {
      router.push('/sign-in');
    }
  };

  const handleNotificationClick = () => setNotificationModalVisible(true);
  const handleNotificationClose = () => setNotificationModalVisible(false);
  const handleNotificationOk = () => setNotificationModalVisible(false);

  return (
    <div>
      <nav className="w-full my-6">
        <div className="container mx-auto flex items-center justify-between py-4 px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex justify-center items-center space-x-2">
            <Image
              src={AllImages.logo}
              height={500}
              width={500}
              alt="logo"
              className="lg:h-11 h-16 w-auto rounded-full"
            />
            <div className="mb-0 text-2xl lg:text-3xl font-bold">
              Steady Hands
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-grow justify-center space-x-6">
            {(user ? afterLoginLabels : beforeLoginLabels).map((item, index) =>
              item?.isDropdown ? (
                <Dropdown
                  key={index}
                  menu={{ items: item?.dropdownItems }}
                  placement="bottom"
                >
                  <button className="text-lg font-medium hover:text-blue-600 transition flex items-center">
                    {item.name} {item?.icon}
                  </button>
                </Dropdown>
              ) : (
                <Link
                  href={item.link || '/'}
                  key={index}
                  className={`text-lg font-medium hover:text-blue-600 transition flex items-center ${
                    pathname === item.link
                      ? 'border-b-2 border-primary p-1 text-blue-600'
                      : ''
                  }`}
                >
                  {item.name} {item?.icon && item?.icon}
                </Link>
              )
            )}
          </div>

          {/* Desktop Right Section */}
          {user ? (
            <div className="hidden lg:flex items-center space-x-4">
              {/* <Link href="/favourites">
                <CiHeart className="h-5 w-5 cursor-pointer" />
              </Link> */}
              <IoIosNotificationsOutline
                onClick={handleNotificationClick}
                className="h-5 w-5 cursor-pointer"
              />
              <Link href="/message">
                <AiOutlineMessage className="h-5 w-5" />
              </Link>
              <Link href="/profile/update">
                <Image
                  src={getCleanImageUrl(user?.image)}
                  alt="user"
                  height={40}
                  width={40}
                  className="h-10 w-10 rounded-full"
                />
              </Link>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/sign-in"
                className="border border-primary bg-primary text-white px-10 py-3 rounded-md shadow-lg"
              >
                Log In
              </Link>
              <Link href="/sign-up">
                <div className="border border-primary text-primary px-10 py-3 rounded-md shadow-lg">
                  Sign Up
                </div>
              </Link>
            </div>
          )}

          {/* Mobile Drawer Button */}
          <div className="lg:hidden">
            <Button
              icon={<RxHamburgerMenu className="text-black text-2xl" />}
              onClick={() => setDrawerVisible(true)}
            />
          </div>
        </div>

        {/* Mobile Drawer */}
        <Drawer
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          <div className="flex flex-col items-center space-y-4">
            {(user ? afterLoginLabels : beforeLoginLabels).map(
              (item, index) => (
                <Link
                  href={item.link || '/'}
                  key={index}
                  className="text-lg font-medium hover:text-blue-600 transition"
                  onClick={() => setDrawerVisible(false)}
                >
                  {item.name}
                </Link>
              )
            )}
            {user ? (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="bg-primary text-white px-10 py-3 rounded-md shadow-lg"
                >
                  Log In
                </Link>
                <Link href="/sign-up">
                  <button className="border border-primary text-primary px-10 py-3 rounded-md shadow-lg">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </Drawer>
      </nav>

      {/* Notification Modal */}
      <Modal
        open={notificationModalVisible}
        onOk={handleNotificationOk}
        onCancel={handleNotificationClose}
      >
        <NotificationModal />
      </Modal>
    </div>
  );
};

export default NavBar;
