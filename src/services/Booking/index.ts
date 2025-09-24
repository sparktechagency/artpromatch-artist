'use server';

import {
  getValidAccessTokenForServerAction,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// getSingleArtistBookings
export const getSingleArtistBookings = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

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

// createSession
export const createSession = async (
  bookingId: string,
  payload: FieldValues
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerAction();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/add-session/${bookingId}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    revalidateTag('BOOKINGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// confirmBookingByArtist
export const confirmBookingByArtist = async (
  bookingId: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerAction();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/confirm/${bookingId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('BOOKINGS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
