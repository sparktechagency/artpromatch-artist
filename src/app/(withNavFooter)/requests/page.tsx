import AllRequests from '@/components/WithNavFooterComponents/AllRequests';
import { artistGetAllRequests } from '@/services/Request';

const AllRequestsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) => {
  const query = await searchParams;
  const { data: requests, meta } = await artistGetAllRequests(
    query.page,
    query.limit
  );

  return (
    <div className="container mx-auto p-6">
      <AllRequests requests={requests} meta={meta} />
    </div>
  );
};

export default AllRequestsPage;
