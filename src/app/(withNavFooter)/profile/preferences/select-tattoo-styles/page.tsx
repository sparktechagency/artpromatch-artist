import SelectTattooStyles from '@/components/WithNavFooterComponents/SelectTattooStyles';
import { fetchProfileData } from '@/services/Auth';

const SelectTattooStylesPage = async () => {
  const { data: profileData } = await fetchProfileData();

  return (
    <div>
      <SelectTattooStyles profileData={profileData} />
    </div>
  );
};

export default SelectTattooStylesPage;
