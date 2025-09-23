'use client';

import ArtistAfterLogin from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin';
import BeforeLogin from '@/components/WithNavFooterComponents/HomeComponents/BeforeLogin';
import { useUser } from '@/context/UserContext';

const Homepage = () => {
  const { user } = useUser();

  const renderContent = () => {
    if (!user) return <BeforeLogin />;

    switch (user.role) {
      // case 'CLIENT':
      //   return <ClientAfterLogin />;

      case 'ARTIST':
        return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <ClientAfterLogin />;

      default:
        return <BeforeLogin />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default Homepage;
