import Bookings from '@/components/WithNavFooterComponents/Services/Bookings';
import { getSingleArtistBookings } from '@/services/Booking';

const BookingsPage = async () => {
  const { data: bookings } = await getSingleArtistBookings();

  return (
    <div>
      <Bookings bookings={bookings?.data} />
    </div>
  );
};

export default BookingsPage;
