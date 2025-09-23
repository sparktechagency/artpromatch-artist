'use client';

import ArtistHomePage from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/ArtistHomePage';
import BeforeLogin from '../../../components/WithNavFooterComponents/HomeComponents/BeforeLogin';
import { useUser } from '@/context/UserContext';

const DashboardPage = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto p-6">
      {user ? <ArtistHomePage /> : <BeforeLogin />}
    </div>
  );
};

export default DashboardPage;
