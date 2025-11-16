import Pagination from '@/components/Shared/Pagination';
import Bookings from '@/components/WithNavFooterComponents/Services/Bookings';
import { fetchProfileData } from '@/services/Auth';
import { getSingleArtistBookings } from '@/services/Booking';

const BookingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  const [{ data: bookings, meta }, { data: profile }] = await Promise.all([
    getSingleArtistBookings(query.page, '50', query),
    fetchProfileData(),
  ]);

  return (
    <div>
      <Bookings bookings={bookings} profile={profile} />
      <Pagination meta={meta} />
    </div>
  );
};

export default BookingsPage;
