import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../../src/components/ui/Card';

export default function RegisterRoleScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="mt-12 mb-8">
        <Text className="text-3xl font-bold text-primary-900 mb-2">Join ZENITH</Text>
        <Text className="text-gray-600">Choose how you want to use the platform.</Text>
      </View>

      <Card 
        className="mb-6 p-6 border border-gray-200"
        onPress={() => router.push('/(auth)/register-professional')}
      >
        <Text className="text-xl font-bold text-primary-900 mb-2">I am a Professional</Text>
        <Text className="text-gray-600">
          Find top-tier projects, apply for roles, and manage your contracts and earnings.
        </Text>
      </Card>

      <Card 
        className="mb-6 p-6 border border-gray-200"
        onPress={() => router.push('/(auth)/register-client')}
      >
        <Text className="text-xl font-bold text-primary-900 mb-2">I am a Client</Text>
        <Text className="text-gray-600">
          Post projects, review proposals, and hire vetted professionals for your business.
        </Text>
      </Card>

      <View className="mt-8 items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-secondary font-semibold">Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
