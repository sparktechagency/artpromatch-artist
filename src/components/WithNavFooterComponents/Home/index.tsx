'use client';

import ArtistAfterLogin from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin';
import BeforeLogin from '@/components/WithNavFooterComponents/HomeComponents/BeforeLogin';
import { useUser } from '@/context/UserContext';
import { IBooking } from '@/types';

const HomeContent = ({ bookings = [] }: { bookings: IBooking[] }) => {
  const { user } = useUser();

  const renderContent = () => {
    if (!user) return <BeforeLogin bookings={bookings} />;

    switch (user.role) {
      // case 'CLIENT':
      //   return <ClientAfterLogin />;

      case 'ARTIST':
        return <ArtistAfterLogin />;

      // case 'BUSINESS':
      //   return <ClientAfterLogin />;

      default:
        return <BeforeLogin bookings={bookings} />;
    }
  };

  return <div>{renderContent()}</div>;
};

export default HomeContent;
