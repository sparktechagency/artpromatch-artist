import Services from '@/components/WithNavFooterComponents/Services';
import { getSingleArtistServices } from '@/services/Service';

const ServicesPage = async () => {
  const { data: services } = await getSingleArtistServices();

  return (
    <div>
      <Services services={services} />
    </div>
  );
};

export default ServicesPage;
