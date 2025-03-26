
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SupabaseContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  session: null,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {}
});

export const useSupabase = () => useContext(SupabaseContext);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success('Login realizado com sucesso!');
        } else if (event === 'SIGNED_OUT') {
          toast.info('Você saiu da sua conta');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error(`Erro ao fazer login: ${(error as Error).message}`);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) throw error;
      
      toast.success('Cadastro realizado! Verifique seu email para confirmar.');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error(`Erro ao criar conta: ${(error as Error).message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(`Erro ao sair: ${(error as Error).message}`);
      throw error;
    }
  };

  return (
    <SupabaseContext.Provider value={{ 
      user, 
      session, 
      isLoading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </SupabaseContext.Provider>
  );
};
