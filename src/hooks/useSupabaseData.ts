
import { useSupabaseMutations } from './useSupabaseMutations';
import { useSupabaseQuery } from './useSupabaseQuery';
import type { TableNames } from './useSupabaseTypes';

export function useSupabaseData() {
  const { insert, update, remove } = useSupabaseMutations();
  
  return {
    useData: useSupabaseQuery,
    insert,
    update,
    remove,
  };
}

export type { TableNames };
