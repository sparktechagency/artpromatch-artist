import PortfolioComponent from '@/components/WithNavFooterComponents/Portfolio/index.';
import { getAllFolders } from '@/services/Folder';

const PortfolioPage = async () => {
  const { data: folders } = await getAllFolders();

  return (
    <div>
      <PortfolioComponent folders={folders} />
    </div>
  );
};

export default PortfolioPage;
