
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { TableNames } from "./useSupabaseTypes";

/**
 * This function fetches data from a Supabase table
 */
const fetch = async <T extends Record<string, any>>(
  table: TableNames,
  id?: string | number,
  match?: Record<string, any>
): Promise<T[]> => {
  let query = supabase.from(table).select('*');

  if (id) {
    query = query.eq('id', id.toString());
  }

  if (match) {
    Object.keys(match).forEach(key => {
      query = query.eq(key, match[key]);
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching data from ${table}:`, error);
    throw error;
  }

  return data as T[];
};

/**
 * Custom hook that uses React Query to fetch and cache data from Supabase
 */
export function useSupabaseQuery<T extends Record<string, any>>(
  table: TableNames,
  id?: string | number,
  match?: Record<string, any>
) {
  return useQuery({
    queryKey: [table, id, match],
    queryFn: () => fetch<T>(table, id, match),
  });
}
