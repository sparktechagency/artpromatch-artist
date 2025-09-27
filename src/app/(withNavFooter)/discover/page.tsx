import Pagination from '@/components/Shared/Pagination';
import { getAllArtists } from '@/services/Artists';
import ArtistAfterLoginHeader from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/AfterLoginHeader/AfterLoginHeader';
import Artists from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/AfterLoginHeader/Artists';

const DiscoverPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;

  const { data: artists, meta } = await getAllArtists(query.page, '20', query);

  return (
    <div>
      <ArtistAfterLoginHeader />
      <Artists artists={artists} />
      <Pagination meta={meta} />
    </div>
  );
};

export default DiscoverPage;
