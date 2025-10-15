import HomeContent from '@/components/WithNavFooterComponents/Home';
import { getBookingsWithReviewThatHaveReviewForClientHomePage } from '@/services/Booking';

const Homepage = async () => {
  const { data: bookings } =
    await getBookingsWithReviewThatHaveReviewForClientHomePage();

  return (
    <div>
      <HomeContent bookings={bookings} />
    </div>
  );
};

export default Homepage;
