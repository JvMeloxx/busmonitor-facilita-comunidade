
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TableNames } from "./useSupabaseTypes";

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

export function useSupabaseMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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

  return {
    insert,
    update,
    remove
  };
}
