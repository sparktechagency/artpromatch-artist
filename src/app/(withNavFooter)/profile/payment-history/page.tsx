import Pagination from '@/components/Shared/Pagination';
import PaymentHistory from '@/components/WithNavFooterComponents/UserProfile/PaymentHistory';
import { fetchProfileData } from '@/services/Auth';
import { getAllPaymentsForClientAndArtist } from '@/services/Payment';

const PaymentPage = async () => {
  const [{ data: payments, meta: paymentMeta }, { data: profileData }] =
    await Promise.all([getAllPaymentsForClientAndArtist(), fetchProfileData()]);

  return (
    <div>
      <PaymentHistory payments={payments} profile={profileData} />
      <Pagination meta={paymentMeta} />
    </div>
  );
};

export default PaymentPage;
