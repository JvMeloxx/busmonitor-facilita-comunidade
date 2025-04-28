
import { useSupabaseMutations } from './useSupabaseMutations';
import { useSupabaseQuery } from './useSupabaseQuery';
import type { TableNames } from './useSupabaseTypes';

// This hook provides a unified API for all Supabase data operations
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
