'use server';

import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { revalidateTag } from 'next/cache';

// getSingleArtistServices
export const getSingleArtistServices = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/services`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: {
          tags: ['SERVICES'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// createService
export const createService = async (data: FormData): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/service/create`,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('SERVICES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateAService
export const updateAService = async (
  serviceId: string,
  data: FormData
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/service/update/${serviceId}`,
      {
        method: 'PATCH',
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('SERVICES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// deleteAService
export const deleteAService = async (serviceId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/service/delete/${serviceId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('SERVICES');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// getLocationName
export const getLocationName = async (location: number[]) => {
  const [lat, lon] = location;
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.display_name || 'Unknown location';

    // const address = data.address || {};
    // // priority: city > town > village
    // const city =
    //   address.city || address.town || address.village || address.county;
    // const country = address.country;

    // if (city && country) {
    //   return `${city}, ${country}`;
    // } else if (country) {
    //   return country;
    // } else {
    //   return data.display_name || 'Unknown location';
    // }
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Unable to get location';
  }
};
