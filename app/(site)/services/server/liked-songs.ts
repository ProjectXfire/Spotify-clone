import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { type IResponse } from '@/shared/types';
import { type ILikedSong } from '../../types';

export async function getLikedSongs(): Promise<IResponse<ILikedSong[]>> {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from('liked_songs')
      .select('*, songs(*)')
      .eq('user_id', session?.user.id)
      .order('created_at', { ascending: false });
    if (error)
      return {
        data: [],
        message: null,
        errorMessage: error.message
      };

    return {
      data,
      message: 'Songs successfully loaded',
      errorMessage: null
    };
  } catch (error) {
    return {
      data: [],
      message: null,
      errorMessage: 'Something went wrong!'
    };
  }
}
