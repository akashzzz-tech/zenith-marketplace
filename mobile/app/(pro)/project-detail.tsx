import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '../../src/components/ui/Button';

export default function ProProjectDetailScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6 pt-12">
        <Text className="text-3xl font-bold text-primary-900 mb-2">Senior UX Designer</Text>
        <Text className="text-lg text-gray-500 mb-6">Acme Corp • Design</Text>
        
        <View className="flex-row mb-6">
          <View className="flex-1">
            <Text className="text-sm text-gray-500">Budget</Text>
            <Text className="font-bold text-lg">$10k - $15k</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-gray-500">Duration</Text>
            <Text className="font-bold text-lg">3 Months</Text>
          </View>
        </View>

        <Text className="text-xl font-bold mb-4">Description</Text>
        <Text className="text-gray-700 leading-relaxed mb-6">
          We are seeking an experienced UX Designer to lead the redesign of our core product platform...
        </Text>

        <Button title="Apply for Project" onPress={() => {}} className="mt-4" />
      </View>
    </ScrollView>
  );
}
