import Profile from '@/components/WithNavFooterComponents/Profile';
import { getAllFolders } from '@/services/Folder';

const MyProfilePage = async () => {
  const { data: folders } = await getAllFolders();
  return (
    <div>
      <Profile folders={folders} />
    </div>
  );
};

export default MyProfilePage;
