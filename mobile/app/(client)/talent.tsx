import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { ProfessionalCard } from '../../src/components/professional/ProfessionalCard';

export default function TalentSearchScreen() {
  const dummyTalent = [
    { id: '1', name: 'Jane Smith', title: 'Fractional CFO', verified: true, rate: '$150/hr', country: 'USA', topSkills: ['Finance', 'SaaS', 'M&A'] },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-4">Find Talent</Text>
      <TextInput 
        className="bg-white px-4 py-3 rounded-lg border border-gray-200 mb-6"
        placeholder="Search skills, titles, industries..."
      />
      <FlatList
        data={dummyTalent}
        renderItem={({ item }) => (
          <ProfessionalCard {...item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
