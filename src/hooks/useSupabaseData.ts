
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useSupabase } from '@/context/SupabaseContext';

export function useSupabaseData() {
  const queryClient = useQueryClient();
  const { user } = useSupabase();

  // Generic function to fetch data from Supabase
  const fetchData = async <T,>(
    table: 'routes' | 'stops' | 'route_stops' | 'schedules' | 'favorite_routes',
    options: {
      columns?: string;
      filter?: Record<string, any>;
      eq?: [string, any];
      order?: { column: string; ascending?: boolean };
    } = {}
  ): Promise<T[]> => {
    try {
      let query = supabase.from(table).select(options.columns || '*');
      
      // Apply filters if provided
      if (options.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          query = query.filter(key, 'eq', value);
        });
      }
      
      // Apply single equals condition if provided
      if (options.eq) {
        query = query.eq(options.eq[0], options.eq[1]);
      }
      
      // Apply ordering if provided
      if (options.order) {
        query = query.order(options.order.column, { 
          ascending: options.order.ascending ?? true 
        });
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      return data as T[];
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      toast.error(`Erro ao buscar dados: ${(error as Error).message}`);
      throw error;
    }
  };

  // Generic query hook for Supabase tables
  const useTableData = <T,>(
    table: 'routes' | 'stops' | 'route_stops' | 'schedules' | 'favorite_routes',
    options: {
      columns?: string;
      filter?: Record<string, any>;
      eq?: [string, any];
      order?: { column: string; ascending?: boolean };
      enabled?: boolean;
      queryKey?: any[];
    } = {}
  ) => {
    return useQuery({
      queryKey: options.queryKey || [table, options],
      queryFn: () => fetchData<T>(table, options),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: options.enabled !== false,
    });
  };

  // Specifically fetch user's favorite routes
  const useFavoriteRoutes = () => {
    return useQuery({
      queryKey: ['favorite_routes', user?.id],
      queryFn: async () => {
        if (!user) return [];
        
        const { data, error } = await supabase
          .from('favorite_routes')
          .select('*, routes(*)')
          .eq('user_id', user.id);
        
        if (error) throw error;
        return data;
      },
      enabled: !!user,
    });
  };

  // Generic mutation for inserting data
  const useInsertData = <T,>(table: 'routes' | 'stops' | 'route_stops' | 'schedules' | 'favorite_routes') => {
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

  // Toggle a route as favorite
  const useToggleFavorite = () => {
    return useMutation({
      mutationFn: async ({ routeId }: { routeId: string }) => {
        if (!user) throw new Error('User must be logged in to favorite routes');
        
        // Check if already favorite
        const { data: existing } = await supabase
          .from('favorite_routes')
          .select('id')
          .eq('user_id', user.id)
          .eq('route_id', routeId)
          .single();
        
        if (existing) {
          // Remove from favorites
          const { error } = await supabase
            .from('favorite_routes')
            .delete()
            .eq('id', existing.id);
          
          if (error) throw error;
          return { added: false, routeId };
        } else {
          // Add to favorites
          const { error } = await supabase
            .from('favorite_routes')
            .insert({
              user_id: user.id,
              route_id: routeId
            });
          
          if (error) throw error;
          return { added: true, routeId };
        }
      },
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ['favorite_routes'] });
        if (result.added) {
          toast.success('Rota adicionada aos favoritos');
        } else {
          toast.info('Rota removida dos favoritos');
        }
      },
      onError: (error: Error) => {
        toast.error(`Erro ao atualizar favoritos: ${error.message}`);
      }
    });
  };

  return {
    useTableData,
    useInsertData,
    useFavoriteRoutes,
    useToggleFavorite
  };
}
