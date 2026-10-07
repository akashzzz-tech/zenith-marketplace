import { useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import { deleteToken } from '../lib/secureStorage';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types/index';

export function useAuth() {
  const { user, session, role, isLoading, isAuthenticated, setSession, setRole, setLoading, clearSession } =
    useAuthStore();

  const fetchUserRole = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && 'role' in data) {
        setRole((data as { role: UserRole }).role);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  }, [setRole, setLoading]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setRole(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRole, setSession, setRole, setLoading]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  }, [setLoading]);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  }, [setLoading]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    await deleteToken('auth_token');
    clearSession();
    router.replace('/(auth)/login');
  }, [clearSession]);

  return {
    user,
    session,
    role,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };
}
