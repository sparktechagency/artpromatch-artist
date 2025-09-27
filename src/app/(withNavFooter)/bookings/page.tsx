import Pagination from '@/components/Shared/Pagination';
import Bookings from '@/components/WithNavFooterComponents/Services/Bookings';
import { getSingleArtistBookings } from '@/services/Booking';

const BookingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;
  const { data: bookings, meta } = await getSingleArtistBookings(
    query.page,
    '50',
    query
  );

  return (
    <div>
      <Bookings bookings={bookings} />
      <Pagination meta={meta} />
    </div>
  );
};

export default BookingsPage;
