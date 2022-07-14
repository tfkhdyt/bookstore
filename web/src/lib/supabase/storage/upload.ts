import { supabase } from '../supabase';

export const uploadImage = async (image: File, fileName: string) => {
  const { data, error } = await supabase.storage
    .from('bookstore')
    .upload(fileName, image, {
      cacheControl: '3600',
      upsert: false,
    });

  return new Promise((resolve, reject) => {
    if (error) reject(error);
    resolve(data);
  });
};
