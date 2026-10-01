import React from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { ProjectCard } from '../../src/components/project/ProjectCard';

export default function ProProjectsScreen() {
  const dummyProjects = [
    { id: '1', title: 'Senior UX Designer', company: 'Acme Corp', category: 'Design', budget: '$10k-$15k', deadline: '2 weeks' },
    { id: '2', title: 'Fractional CTO', company: 'Startup Inc', category: 'Engineering', budget: '$200/hr', deadline: 'Ongoing' },
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
          {/* Add Filter Chips here later */}
        </View>
      </View>

      <FlatList
        data={dummyProjects}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <ProjectCard 
            title={item.title} 
            company={item.company} 
            category={item.category}
            budget={item.budget}
            deadline={item.deadline}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
