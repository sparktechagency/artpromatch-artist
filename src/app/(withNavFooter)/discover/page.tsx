import Pagination from '@/components/Shared/Pagination';
import ArtistAfterLoginHeader from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/AfterLoginHeader/AfterLoginHeader';
import FilteredTatto from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/AfterLoginHeader/FilteredTatto/FilteredTatto';
import { getAllArtists } from '@/services/Artists';

const DiscoverPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const query = await searchParams;
  const { data: artists, meta } = await getAllArtists(query.page, '12', query);

  return (
    <div>
      <ArtistAfterLoginHeader artists={artists} />
      <FilteredTatto artists={artists} />
      <Pagination meta={meta} />
    </div>
  );
};

export default DiscoverPage;
