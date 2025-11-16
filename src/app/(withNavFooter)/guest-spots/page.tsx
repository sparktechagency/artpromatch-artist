import GuestSpots from '@/components/WithNavFooterComponents/GuestSpots';
import { getMyGuestSpots } from '@/services/GuestSpot';

const GuestSpotsPage = async () => {
  const { data: guestSpots } = await getMyGuestSpots();

  return (
    <div>
      <GuestSpots guestSpots={guestSpots} />
    </div>
  );
};

export default GuestSpotsPage;
