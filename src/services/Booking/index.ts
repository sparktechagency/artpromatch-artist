'use server';

import { getValidAccessTokenForServerBasedGet } from '@/lib/getValidAccessToken';

// getSingleArtistBookings
export const getSingleArtistBookings = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerBasedGet();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/list`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['BOOKINGS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
