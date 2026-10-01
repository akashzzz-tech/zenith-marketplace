import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';

export default function ClientDashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="mt-8 mb-6">
        <Text className="text-2xl font-bold text-primary-900">Client Dashboard</Text>
      </View>
      
      <Button 
        title="Post a New Project" 
        size="lg" 
        onPress={() => router.push('/(client)/post-project')} 
        className="mb-8"
      />

      <Text className="text-lg font-bold mb-4">Active Projects</Text>
      <Card className="mb-4 p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="font-bold text-lg">Senior UX Designer</Text>
          <Text className="text-secondary font-bold">5 Proposals</Text>
        </View>
        <Text className="text-gray-500">Posted 2 days ago</Text>
      </Card>
    </ScrollView>
  );
}
