
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useSupabaseData() {
  const queryClient = useQueryClient();

  // Example query function to fetch data from Supabase
  const fetchData = async (table: string) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*');
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      toast.error(`Erro ao buscar dados: ${(error as Error).message}`);
      throw error;
    }
  };

  // Generic query hook for Supabase tables
  const useTableData = (table: string) => {
    return useQuery({
      queryKey: [table],
      queryFn: () => fetchData(table),
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Generic mutation for inserting data
  const useInsertData = (table: string) => {
    return useMutation({
      mutationFn: async (newData: any) => {
        const { data, error } = await supabase
          .from(table)
          .insert(newData)
          .select();
        
        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [table] });
        toast.success('Dados salvos com sucesso!');
      },
      onError: (error: Error) => {
        console.error(`Error inserting into ${table}:`, error);
        toast.error(`Erro ao salvar dados: ${error.message}`);
      }
    });
  };

  return {
    useTableData,
    useInsertData,
    // You can add more Supabase utility functions here
  };
}
