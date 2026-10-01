import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { ProjectCard } from '../../src/components/project/ProjectCard';

export default function MyProjectsScreen() {
  const dummyProjects = [
    { id: '1', title: 'Senior UX Designer', company: 'Acme Corp', category: 'Design', budget: '$10k-$15k', deadline: 'Open' },
  ];

  return (
    <View className="flex-1 bg-gray-50 pt-12 px-4">
      <Text className="text-2xl font-bold text-primary-900 mb-6">My Projects</Text>
      <FlatList
        data={dummyProjects}
        renderItem={({ item }) => (
          <ProjectCard {...item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
