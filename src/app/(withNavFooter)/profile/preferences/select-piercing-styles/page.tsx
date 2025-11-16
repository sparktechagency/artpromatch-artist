import SelectPiercingStyles from '@/components/WithNavFooterComponents/SelectPiercingStyles';
import { fetchProfileData } from '@/services/Auth';

const SelectPiercingStylesPage = async () => {
  const { data: profileData } = await fetchProfileData();

  return (
    <div>
      <SelectPiercingStyles profileData={profileData} />
    </div>
  );
};

export default SelectPiercingStylesPage;
