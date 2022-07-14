import { supabase } from '../supabase';

export const getImageUrl = (fileName: string) => {
  const { publicURL, error } = supabase.storage
    .from('bookstore')
    .getPublicUrl(fileName);

  if (error) {
    console.error(error);
  }
  return publicURL;
};
