import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '../../src/components/ui/Button';

export default function ProContractDetailScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-12">
        <Text className="text-2xl font-bold text-primary-900 mb-2">Interim CFO</Text>
        <Text className="text-gray-500 mb-6">Tech Startup</Text>
        
        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-lg font-bold mb-2">Milestones</Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text>Month 1 Deliverables</Text>
            <Text className="font-bold">$5,000</Text>
          </View>
          <Button title="Submit Deliverable" onPress={() => {}} className="mt-2" />
        </View>

        <Text className="text-lg font-bold mb-4">Earnings Summary</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Total Earned</Text>
          <Text className="font-bold">$5,000</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Pending</Text>
          <Text className="font-bold">$5,000</Text>
        </View>
      </View>
    </ScrollView>
  );
}
