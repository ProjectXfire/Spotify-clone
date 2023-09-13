import uniqid from 'uniqid';
import { SupabaseClient } from '@supabase/auth-helpers-react';
import { type ICreateSongDto } from '../dtos';
import { type IResponse } from '@/shared/types';

export async function addNewSong(
  values: ICreateSongDto,
  userId: string,
  client: SupabaseClient<any, 'public', any>
): Promise<IResponse<any>> {
  const { title, author, image, song } = values;
  try {
    if (!song || !image)
      return {
        data: null,
        message: null,
        errorMessage: 'Invalid data'
      };
    const uniqueId = uniqid();
    const { data: songData, error: songError } = await client.storage
      .from('songs')
      .upload(`song-${values.title}-${uniqueId}`, song, {
        cacheControl: '3600',
        upsert: false
      });
    if (songError)
      return {
        data: null,
        message: null,
        errorMessage: 'Failed song uploaded'
      };
    const { data: imageData, error: imageError } = await client.storage
      .from('images')
      .upload(`image-${values.title}-${uniqueId}`, image, {
        cacheControl: '3600',
        upsert: false
      });
    if (imageError)
      return {
        data: null,
        message: null,
        errorMessage: 'Failed image uploaded'
      };
    const { error } = await client.from('songs').insert({
      user_id: userId,
      title,
      author,
      image_path: imageData.path,
      song_path: songData.path
    });
    if (error)
      return {
        data: null,
        message: null,
        errorMessage: 'Failed create song'
      };
    return {
      data: null,
      message: 'Song successfully created',
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
