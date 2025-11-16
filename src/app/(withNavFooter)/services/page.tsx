import Services from '@/components/WithNavFooterComponents/Services';
import { fetchProfileData } from '@/services/Auth';
import { getSingleArtistServices } from '@/services/Service';

const ServicesPage = async () => {
  const [{ data: services }, { data: profileData }] = await Promise.all([
    getSingleArtistServices(),
    fetchProfileData(),
  ]);

  return (
    <div>
      <Services services={services} profile={profileData} />
    </div>
  );
};

export default ServicesPage;
