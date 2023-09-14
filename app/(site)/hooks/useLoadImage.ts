import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function useLoadImage(imagePath: string) {
  const supabaseClient = useSupabaseClient();

  const { data } = supabaseClient.storage.from('images').getPublicUrl(imagePath);

  return data.publicUrl;
}
