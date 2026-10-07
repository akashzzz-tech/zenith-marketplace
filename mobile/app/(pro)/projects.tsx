import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { ProjectCard } from '../../src/components/project/ProjectCard';

export default function ProProjectsScreen() {
  const dummyProjects = [
    {
      id: '1',
      title: 'Senior UX Designer',
      company: 'Acme Corp',
      category: 'Design',
      budgetMinCents: 1000000,
      budgetMaxCents: 1500000,
      minYearsExperience: 5,
      isHourly: false,
      deadline: '2026-12-01',
    },
    {
      id: '2',
      title: 'Fractional CTO',
      company: 'Startup Inc',
      category: 'Engineering',
      budgetMinCents: 20000,
      budgetMaxCents: 20000,
      minYearsExperience: 8,
      isHourly: true,
      deadline: null,
    },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12">
      <View className="px-4 pb-4">
        <Text className="text-2xl font-bold text-primary-900 mb-4">Discover Projects</Text>
        <TextInput 
          className="bg-white px-4 py-3 rounded-lg border border-gray-200 mb-4"
          placeholder="Search by keywords or skills..."
        />
        <View className="flex-row space-x-2">
          {/* Add Filter Chips here */}
        </View>
      </View>

      <FlatList
        data={dummyProjects}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ProjectCard {...item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
