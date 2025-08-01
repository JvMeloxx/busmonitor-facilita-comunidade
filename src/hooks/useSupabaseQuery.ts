
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { TableNames } from "./useSupabaseTypes";
import { Database } from "../integrations/supabase/types";

// Define a type that maps table names to their respective row types
type TableTypes = {
  advertisements: Database['public']['Tables']['advertisements']['Row'];
  favorite_routes: Database['public']['Tables']['favorite_routes']['Row'];
  route_stops: Database['public']['Tables']['route_stops']['Row'];
  routes: Database['public']['Tables']['routes']['Row'];
  schedules: Database['public']['Tables']['schedules']['Row'];
  stops: Database['public']['Tables']['stops']['Row'];
};

/**
 * This function fetches data from a Supabase table
 */
const fetch = async <T extends TableNames>(
  table: T,
  id?: string,
  match?: Record<string, any>
) => {
  let query = supabase.from(table).select('*');

  // Só filtra por id se `id` for fornecido (todas as tabelas possuem coluna "id" do tipo string)
  if (id !== undefined) {
    query = query.eq('id', id); // Use plain string, not as any or keyof
  }

  if (match) {
    Object.keys(match).forEach(key => {
      query = query.eq(key as string, match[key]);
    });
  }

  const { data, error } = await query;

  if (error) {
    console.error(`Error fetching data from ${table}:`, error);
    throw error;
  }

  // Return the data with the correct type
  return data as unknown as TableTypes[T][];
};

/**
 * Custom hook that uses React Query to fetch and cache data from Supabase
 */
export function useSupabaseQuery<T extends TableNames>(
  table: T,
  id?: string,
  match?: Record<string, any>
) {
  return useQuery({
    queryKey: [table, id, match],
    queryFn: () => fetch(table, id, match),
  });
}

