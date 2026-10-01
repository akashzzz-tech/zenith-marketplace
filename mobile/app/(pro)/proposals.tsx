import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';

export default function ProProposalsScreen() {
  const dummyProposals = [
    { id: '1', projectTitle: 'Fractional CTO', status: 'shortlisted', date: '2 days ago' },
    { id: '2', projectTitle: 'Senior UX Designer', status: 'submitted', date: '5 days ago' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-6">My Proposals</Text>
      
      <FlatList
        data={dummyProposals}
        renderItem={({ item }) => (
          <Card className="mb-4 p-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="font-bold text-lg flex-1">{item.projectTitle}</Text>
              <Badge variant={item.status as any}>{item.status}</Badge>
            </View>
            <Text className="text-sm text-gray-500">Submitted {item.date}</Text>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
