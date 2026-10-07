import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { VerificationBanner } from '../../src/components/verification/VerificationBanner';
import { Card } from '../../src/components/ui/Card';

export default function ProDashboardScreen() {
  const isVerified = false;

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="mt-8 mb-6">
        <Text className="text-2xl font-bold text-primary-900">Dashboard</Text>
      </View>

      {!isVerified && <VerificationBanner status="unverified" />}

      <View className="flex-row justify-between mb-6">
        <Card className="flex-1 mr-2 p-4 items-center">
          <Text className="text-3xl font-bold text-primary-900">3</Text>
          <Text className="text-gray-500 text-xs">Active Contracts</Text>
        </Card>
        <Card className="flex-1 mx-1 p-4 items-center">
          <Text className="text-3xl font-bold text-primary-900">5</Text>
          <Text className="text-gray-500 text-xs">Proposals</Text>
        </Card>
        <Card className="flex-1 ml-2 p-4 items-center">
          <Text className="text-xl font-bold text-primary-900">$12k</Text>
          <Text className="text-gray-500 text-xs">Earnings</Text>
        </Card>
      </View>

      <Text className="text-lg font-bold mb-4">Recommended Projects</Text>
      <FlatList
        data={[1, 2]}
        scrollEnabled={false}
        renderItem={({item}) => (
          <Card className="mb-4 p-4">
            <Text className="font-bold text-lg mb-1">Interim CFO</Text>
            <Text className="text-gray-500 mb-2">Tech Startup • $150-200/hr</Text>
            <Text className="text-sm text-gray-700">Looking for an experienced CFO to help with our upcoming Series B funding round...</Text>
          </Card>
        )}
        keyExtractor={item => item.toString()}
      />
    </ScrollView>
  );
}
