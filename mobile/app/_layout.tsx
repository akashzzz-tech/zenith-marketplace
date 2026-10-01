import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseProvider } from '../src/providers/SupabaseProvider';
import { setupNotificationHandlers } from '../src/lib/notifications';
import { useEffect } from 'react';
import '../global.css';

const queryClient = new QueryClient();

export default function RootLayout() {
  useEffect(() => {
    setupNotificationHandlers();
  }, []);

  return (
    <SafeAreaProvider>
      <SupabaseProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(pro)" options={{ headerShown: false }} />
            <Stack.Screen name="(client)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </SupabaseProvider>
    </SafeAreaProvider>
  );
}
