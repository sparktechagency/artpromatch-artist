'use server';

import { getValidAccessTokenForServerHandlerGet } from '@/lib/getValidAccessToken';

// getAllArtists
export const getAllArtists = async (
  page: string = '1',
  limit: string = '12',
  query: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  const normalize = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

  // Extract values safely
  const artistType = normalize(query.artistType);
  const tattooCategory = normalize(query.tattooCategory);
  const searchTerm = normalize(query.searchTerm);

  // Build query string
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);

  // Apply filters
  if (artistType && artistType !== 'All') {
    params.set('artistType', artistType);
  }

  if (tattooCategory && tattooCategory !== 'All') {
    params.set('tattooCategory', tattooCategory);
  }

  if (searchTerm && searchTerm !== 'All') {
    params.set('searchTerm', searchTerm);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['ARTISTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getDashboardData
export const getDashboardData = async (clientCall?: boolean): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet(clientCall);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/dashboard`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// artistCreateHisOnboardingAccount
export const artistCreateHisOnboardingAccount = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/create-onboarding-account`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// export const getLocationName = async (location: number[]) => {
//   const [lon, lat] = location;
//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     //   return data.display_name || 'Unknown location';

//     const address = data.address || {};
//     // priority: city > town > village
//     const city =
//       address.city || address.town || address.village || address.county;
//     const country = address.country;

//     if (city && country) {
//       return `${city}, ${country}`;
//     } else if (country) {
//       return country;
//     } else {
//       return data.display_name || 'Unknown location';
//     }
//   } catch (error) {
//     console.error('Error fetching location:', error);
//     return 'Unable to get location';
//   }
// };
