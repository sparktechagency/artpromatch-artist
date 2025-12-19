'use server';

import { getValidAccessTokenForServerActions } from '@/lib/getValidAccessToken';
// import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// artistGetAllRequests
export const artistGetAllRequests = async (
  page: string = '1',
  limit: string = '20'
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },

        next: {
          tags: ['REQUESTS'],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// acceptRequestByArtist
export const artistAcceptRequest = async (requestId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/accept/${requestId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('REQUESTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// artistRejectRequest
export const artistRejectRequest = async (requestId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/requests/reject/${requestId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('REQUESTS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
