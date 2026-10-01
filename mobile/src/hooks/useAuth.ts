import { useEffect, useCallback } from 'react';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import { deleteToken } from '../lib/secureStorage';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types/index';

export function useAuth() {
  const { user, session, role, isLoading, isAuthenticated, setSession, setRole, setLoading, clearSession } =
    useAuthStore();

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
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();

      if (data) {
        setRole(data.role as UserRole);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    await deleteToken('auth_token');
    clearSession();
    router.replace('/(auth)/login');
  }, []);

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
