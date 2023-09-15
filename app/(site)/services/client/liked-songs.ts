import uniqid from 'uniqid';
import { SupabaseClient } from '@supabase/auth-helpers-react';
import { type IResponse } from '@/shared/types';
import { type ILikedSong } from '../../types';

export async function getLikedSong(
  userId: string,
  songId: string,
  client: SupabaseClient<any, 'public', any>
): Promise<IResponse<ILikedSong | null>> {
  try {
    const { data, error } = await client
      .from('liked_songs')
      .select('*')
      .eq('user_id', userId)
      .eq('song_id', songId)
      .single();
    if (error)
      return {
        data: null,
        message: null,
        errorMessage: error.message
      };
    return {
      data,
      message: 'Song successfully loaded',
      errorMessage: null
    };
  } catch (error) {
    return {
      data: null,
      message: null,
      errorMessage: 'Something went wrong!'
    };
  }
}

export async function setLikedSong(
  userId: string,
  songId: string,
  client: SupabaseClient<any, 'public', any>
): Promise<IResponse<null>> {
  try {
    const { error } = await client.from('liked_songs').insert({ song_id: songId, user_id: userId });
    if (error)
      return {
        data: null,
        message: null,
        errorMessage: error.message
      };
    return {
      data: null,
      message: 'Liked song added',
      errorMessage: null
    };
  } catch (error) {
    return {
      data: null,
      message: null,
      errorMessage: 'Something went wrong!'
    };
  }
}

export async function removeLikedSong(
  userId: string,
  songId: string,
  client: SupabaseClient<any, 'public', any>
): Promise<IResponse<null>> {
  try {
    const { error } = await client
      .from('liked_songs')
      .delete()
      .eq('user_id', userId)
      .eq('song_id', songId);
    if (error)
      return {
        data: null,
        message: null,
        errorMessage: error.message
      };
    return {
      data: null,
      message: 'Liked song removed',
      errorMessage: null
    };
  } catch (error) {
    return {
      data: null,
      message: null,
      errorMessage: 'Something went wrong!'
    };
  }
}
