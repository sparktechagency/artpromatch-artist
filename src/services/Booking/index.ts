'use server';

import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { FieldValues } from '@/types';
import { revalidateTag } from 'next/cache';

// getSingleArtistBookings
export const getSingleArtistBookings = async (
  page: string = '1',
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/list?limit=${limit}&page=${page}&${params}`,
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
  const accessToken = await getValidAccessTokenForServerActions();

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
  const accessToken = await getValidAccessTokenForServerActions();

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

// cancelBookingByArtist
export const cancelBookingByArtist = async (
  bookingId: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/cancel/${bookingId}`,
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

// sendOtpToClientByArtist
export const sendOtpToClientByArtist = async (
  bookingId: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/mark-as-completed/${bookingId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// completeBookingByArtist
export const completeBookingByArtist = async (
  bookingId: string,
  otp: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/bookings/complete/${bookingId}`,
      {
        method: 'POST',
        body: JSON.stringify({ otp }),
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

// getBookingsWithReviewThatHaveReviewForClientHomePage
export const getBookingsWithReviewThatHaveReviewForClientHomePage =
  async (): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/bookings/bookings-with-review`,
        {
          method: 'GET',
        }
      );

      const result = await res.json();
      return result;
    } catch (error: any) {
      return Error(error);
    }
  };
