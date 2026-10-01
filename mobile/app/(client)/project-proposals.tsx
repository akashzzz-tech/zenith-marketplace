import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';

export default function ProjectProposalsScreen() {
  const dummyProposals = [
    { id: '1', name: 'Jane Smith', rate: '$150/hr', match: '95%' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-6">Proposals</Text>
      <FlatList
        data={dummyProposals}
        renderItem={({ item }) => (
          <Card className="mb-4 p-4">
            <View className="flex-row justify-between mb-2">
              <Text className="font-bold text-lg">{item.name}</Text>
              <Text className="text-secondary font-bold">{item.match} Match</Text>
            </View>
            <Text className="text-gray-500 mb-4">{item.rate}</Text>
            <View className="flex-row space-x-2">
              <Button title="Shortlist" variant="outline" className="flex-1 mr-2" onPress={() => {}} />
              <Button title="Hire" className="flex-1 ml-2" onPress={() => {}} />
            </View>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
