import { supabase } from '../supabase';

export const deleteImage = async (fileName: string) => {
  const { data, error } = await supabase.storage
    .from('bookstore')
    .remove([fileName]);

  return new Promise((resolve, reject) => {
    if (error) reject(error);
    resolve(data);
  });
};
