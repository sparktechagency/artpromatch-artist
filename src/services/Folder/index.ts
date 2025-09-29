'use server';

import {
  getValidAccessTokenForServerActions,
  getValidAccessTokenForServerHandlerGet,
} from '@/lib/getValidAccessToken';
import { revalidateTag } from 'next/cache';

// getAllFolders
export const getAllFolders = async (): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerHandlerGet();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/folders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        tags: ['FOLDERS'],
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// createFolder
export const createFolder = async (data: FormData): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/folders`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    revalidateTag('FOLDERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// updateFolderName
export const updateFolder = async (
  folderId: string,
  updateData: { name: string; for: 'portfolio' | 'flash' }
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/folders/${folderId}`,
      {
        method: 'PATCH',
        body: JSON.stringify(updateData),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    revalidateTag('FOLDERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// addImagesToFolder
export const addImagesToFolder = async (
  folderId: string,
  images: FormData
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/folders/add/${folderId}`,
      {
        method: 'POST',
        body: images,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('FOLDERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// removeImageFromAFolder
export const removeAnImageFromAFolder = async (
  image: string,
  folderId: string
): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/folders/remove-image/${folderId}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ image }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    revalidateTag('FOLDERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// removeFolder
export const removeAFolder = async (folderId: string): Promise<any> => {
  const accessToken = await getValidAccessTokenForServerActions();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/folders/remove-folder/${folderId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidateTag('FOLDERS');

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
