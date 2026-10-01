import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from '../../src/components/ui/Card';

export default function ProEarningsScreen() {
  const dummyHistory = [
    { id: '1', date: 'Oct 15, 2026', amount: '$5,000', project: 'Interim CFO - Tech Startup' }
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-6">Earnings</Text>
      <View className="bg-primary-900 p-6 rounded-xl mb-6">
        <Text className="text-white/80 text-sm mb-2">Total Earned</Text>
        <Text className="text-4xl font-bold text-white">$12,450.00</Text>
      </View>
      <Text className="text-lg font-bold mb-4">Payout History</Text>
      <FlatList
        data={dummyHistory}
        renderItem={({ item }) => (
          <Card className="mb-4 p-4 flex-row justify-between items-center">
            <View>
              <Text className="font-bold">{item.project}</Text>
              <Text className="text-gray-500 text-sm">{item.date}</Text>
            </View>
            <Text className="font-bold text-secondary text-lg">{item.amount}</Text>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
