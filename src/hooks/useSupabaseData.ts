
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type TableNames = 'favorite_routes' | 'route_stops' | 'routes' | 'schedules' | 'stops' | 'advertisements';

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
    return useQuery({
      queryKey: [table, id, match],
      queryFn: () => fetch<T>(table, id, match),
    });
  };

  // Perform database action with proper typing
  const performDatabaseAction = async <T>(
    table: TableNames,
    action: 'insert' | 'update' | 'delete',
    data?: Record<string, any>,
    id?: string | number,
    match?: Record<string, any>
  ): Promise<any> => {
    try {
      let query;
      
      switch (action) {
        case 'insert': {
          const { data: result, error } = await supabase.from(table).insert([data]).select();
          if (error) throw error;
          return result;
        }
        case 'update': {
          query = supabase.from(table);
          
          if (id) {
            query = query.update(data).eq('id', id.toString());
          } else if (match) {
            query = query.update(data);
            Object.keys(match).forEach(key => {
              query = query.eq(key, match[key]);
            });
          } else {
            throw new Error('ID or match criteria is required for update.');
          }
          
          const { data: result, error } = await query.select();
          if (error) throw error;
          return result;
        }
        case 'delete': {
          query = supabase.from(table);
          
          if (id) {
            query = query.delete().eq('id', id.toString());
          } else if (match) {
            query = query.delete();
            Object.keys(match).forEach(key => {
              query = query.eq(key, match[key]);
            });
          } else {
            throw new Error('ID or match criteria is required for delete.');
          }
          
          const { data: result, error } = await query.select();
          if (error) throw error;
          return result;
        }
        default:
          throw new Error(`Invalid action: ${action}`);
      }
    } catch (error: any) {
      console.error(`Error performing ${action} on ${table}:`, error);
      throw error;
    }
  };

  // Fixed insert mutation hook
  const insert = (table: TableNames) => {
    return useMutation({
      mutationFn: (data: Record<string, any>) => performDatabaseAction(table, 'insert', data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso!",
          description: `Ação de inserção em ${table} realizada com sucesso.`,
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Falha ao inserir em ${table}: ${error.message}`,
        });
      }
    });
  };

  // Fixed update mutation hook
  const update = (table: TableNames) => {
    return useMutation({
      mutationFn: (params: { id: string; [key: string]: any }) => {
        const { id, ...data } = params;
        return performDatabaseAction(table, 'update', data, id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso!",
          description: `Atualização em ${table} realizada com sucesso.`,
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Falha ao atualizar ${table}: ${error.message}`,
        });
      }
    });
  };

  // Fixed remove mutation hook
  const remove = (table: TableNames) => {
    return useMutation({
      mutationFn: (id: string) => performDatabaseAction(table, 'delete', undefined, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso!",
          description: `Remoção de ${table} realizada com sucesso.`,
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Falha ao remover ${table}: ${error.message}`,
        });
      }
    });
  };

  // Fixed updateByMatch mutation hook
  const updateByMatch = (table: TableNames) => {
    return useMutation({
      mutationFn: ({ match, data }: { match: Record<string, any>, data: Record<string, any> }) => 
        performDatabaseAction(table, 'update', data, undefined, match),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso!",
          description: `Atualização em ${table} realizada com sucesso.`,
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Falha ao atualizar ${table}: ${error.message}`,
        });
      }
    });
  };

  // Fixed removeByMatch mutation hook
  const removeByMatch = (table: TableNames) => {
    return useMutation({
      mutationFn: (match: Record<string, any>) => 
        performDatabaseAction(table, 'delete', undefined, undefined, match),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast({
          title: "Sucesso!",
          description: `Remoção de ${table} realizada com sucesso.`,
        });
      },
      onError: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erro!",
          description: `Falha ao remover ${table}: ${error.message}`,
        });
      }
    });
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
