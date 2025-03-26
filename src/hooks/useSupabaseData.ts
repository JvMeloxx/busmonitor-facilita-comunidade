
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define the valid table names as a literal type to avoid recursion issues
type TableNames = 'favorite_routes' | 'route_stops' | 'routes' | 'schedules' | 'stops';

export function useSupabaseData() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  const useData = <T>(table: TableNames, id?: string | number, match?: Record<string, any>) => {
    return useQuery<T[]>({
      queryKey: [table, id, match],
      queryFn: () => fetch<T>(table, id, match),
    });
  };

  const performDatabaseAction = async (
    table: TableNames,
    action: 'insert' | 'update' | 'delete',
    id?: string | number,
    data?: Record<string, any>,
    match?: Record<string, any>
  ): Promise<any> => {
    try {
      switch (action) {
        case 'insert': {
          const result = await supabase.from(table).insert([data]).select();
          if (result.error) throw result.error;
          return result.data;
        }
        case 'update': {
          let query = supabase.from(table);
          if (id) {
            query = query.eq('id', id.toString());
          } else if (match) {
            Object.keys(match).forEach(key => {
              query = query.eq(key, match[key]);
            });
          } else {
            throw new Error('ID or match criteria is required for update.');
          }
          const result = await query.update(data).select();
          if (result.error) throw result.error;
          return result.data;
        }
        case 'delete': {
          let query = supabase.from(table);
          if (id) {
            query = query.eq('id', id.toString());
          } else if (match) {
            Object.keys(match).forEach(key => {
              query = query.eq(key, match[key]);
            });
          } else {
            throw new Error('ID or match criteria is required for delete.');
          }
          const result = await query.delete().select();
          if (result.error) throw result.error;
          return result.data;
        }
        default:
          throw new Error(`Invalid action: ${action}`);
      }
    } catch (error: any) {
      console.error(`Error performing ${action} on ${table}:`, error);
      throw error;
    }
  };

  const mutation = <T>(
    table: TableNames,
    action: 'insert' | 'update' | 'delete',
    options?: {
      id?: string | number;
      data?: Record<string, any>;
      match?: Record<string, any>;
    }
  ) => {
    return useMutation({
      mutationFn: async (): Promise<any> => {
        const { data, error } = await performDatabaseAction(
          table,
          action,
          options?.id,
          options?.data,
          options?.match
        );
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso!",
          description: `Ação de ${action} em ${table} realizada com sucesso.`,
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Falha ao realizar ${action} em ${table}: ${error.message}`,
        });
      }
    });
  };

  const insert = <T>(table: TableNames, data: Record<string, any>) => {
    return mutation<T>(table, 'insert', { data });
  };

  const update = <T>(table: TableNames, id: string | number, data: Record<string, any>) => {
    return mutation<T>(table, 'update', { id, data });
  };

  const remove = <T>(table: TableNames, id: string | number) => {
    return mutation<T>(table, 'delete', { id });
  };

  const updateByMatch = <T>(table: TableNames, match: Record<string, any>, data: Record<string, any>) => {
    return mutation<T>(table, 'update', { match, data });
  };

  const removeByMatch = <T>(table: TableNames, match: Record<string, any>) => {
    return mutation<T>(table, 'delete', { match });
  };

  return {
    useData,
    insert,
    update,
    remove,
    updateByMatch,
    removeByMatch,
  };
}
