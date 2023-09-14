import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { type IResponse } from '@/shared/types';
import { type ISong } from '../../types';

export async function getSongs(): Promise<IResponse<ISong[]>> {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
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

export async function getSongsBySessionId(): Promise<IResponse<ISong[]>> {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError)
      return {
        data: [],
        message: null,
        errorMessage: 'No session found'
      };
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('user_id', sessionData.session?.user.id)
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

export async function getSongsByTitle(title: string): Promise<IResponse<ISong[]>> {
  try {
    const supabase = createServerComponentClient({ cookies });
    if (!title) {
      const { data, message, errorMessage } = await getSongs();
      return {
        data,
        message,
        errorMessage
      };
    }
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .ilike('title', `%${title}%`)
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
