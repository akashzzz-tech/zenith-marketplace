import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';

export default function ClientContractsScreen() {
  const dummyContracts = [
    { id: '1', title: 'Interim CFO', professional: 'Jane Smith', amount: '$5,000 pending', status: 'active' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-6">Contracts</Text>
      <FlatList
        data={dummyContracts}
        renderItem={({ item }) => (
          <Card className="mb-4 p-4">
            <View className="flex-row justify-between mb-2">
              <Text className="font-bold text-lg">{item.title}</Text>
              <Badge variant="success">{item.status}</Badge>
            </View>
            <Text className="text-gray-500 mb-2">{item.professional}</Text>
            <View className="flex-row justify-between items-center mt-2">
              <Text className="font-semibold text-primary">{item.amount}</Text>
              <Button title="Review Milestone" size="sm" onPress={() => {}} />
            </View>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
