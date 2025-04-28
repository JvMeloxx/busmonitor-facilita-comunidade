
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { TableNames } from "./useSupabaseTypes";

const fetch = async <T>(table: TableNames, id?: string | number, match?: Record<string, any>): Promise<T[]> => {
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

export function useSupabaseQuery<T>(table: TableNames, id?: string | number, match?: Record<string, any>) {
  return useQuery({
    queryKey: [table, id, match],
    queryFn: () => fetch<T>(table, id, match),
  });
}
