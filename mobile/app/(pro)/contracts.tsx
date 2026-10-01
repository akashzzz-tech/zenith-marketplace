import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';

export default function ProContractsScreen() {
  const dummyContracts = [
    { id: '1', title: 'Interim CFO', company: 'Tech Startup', amount: '$150/hr', status: 'active' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-6">My Contracts</Text>
      <FlatList
        data={dummyContracts}
        renderItem={({ item }) => (
          <Card className="mb-4 p-4">
            <View className="flex-row justify-between mb-2">
              <Text className="font-bold text-lg">{item.title}</Text>
              <Badge variant="success">{item.status}</Badge>
            </View>
            <Text className="text-gray-500 mb-2">{item.company}</Text>
            <Text className="font-semibold text-primary">{item.amount}</Text>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
