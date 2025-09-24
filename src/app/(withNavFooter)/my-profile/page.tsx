import MyProfile from '@/components/WithNavFooterComponents/MyProfile';
import { getAllFolders } from '@/services/Folder';

const MyProfilePage = async () => {
  const { data: folders } = await getAllFolders();
  return (
    <div>
      <MyProfile folders={folders} />
    </div>
  );
};

export default MyProfilePage;
