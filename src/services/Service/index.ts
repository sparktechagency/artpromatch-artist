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

// getArtistProfileByHisId
export const getArtistProfileByHisId = async (id: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/artists/profile/${id}`,
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

// getLocationName
export const getLocationName = async (location: number[]) => {
  const [lat, lon] = location;
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return 'Unknown location';
  }

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
    lat
  )}&lon=${encodeURIComponent(lon)}&accept-language=en`;

  const fetchWithTimeout = async (timeoutMs: number, signal?: AbortSignal) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        // Nominatim requires a valid and identifiable User-Agent
        headers: {
          'User-Agent':
            'ArtProMatchClient/1.0 (contact: support@artpromatch.example)',
          'Accept-Language': 'en',
        },
        signal: signal ?? controller.signal,
      } as RequestInit);
      return res;
    } finally {
      clearTimeout(timeout);
    }
  };

  // Retry once for transient network errors like ETIMEDOUT
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetchWithTimeout(7000);
      if (!response.ok) {
        // Non-200 responses
        return 'Unable to get location';
      }
      const data = await response.json();
      return data.display_name || 'Unknown location';
    } catch (error: any) {
      // Only retry on first failure and for timeout/abort/socket errors
      const code = error?.code || error?.cause?.code;
      const isTimeout = code === 'ETIMEDOUT' || error?.name === 'AbortError';
      if (attempt === 2 || !isTimeout) {
        console.error('Error fetching location:', error);
        return 'Unable to get location';
      }
      // small backoff before retry
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return 'Unable to get location';
};
