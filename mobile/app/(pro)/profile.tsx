import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Avatar } from '../../src/components/ui/Avatar';
import { Badge } from '../../src/components/ui/Badge';
import { Button } from '../../src/components/ui/Button';

export default function ProProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center pt-12 pb-6 border-b border-gray-100">
        <Avatar name="Jane Smith" size="xl" className="mb-4" />
        <Text className="text-2xl font-bold text-primary-900 mb-1">Jane Smith</Text>
        <Text className="text-gray-500 mb-2">Fractional CFO</Text>
        <Badge variant="success">Verified Expert</Badge>
        <Button title="Edit Profile" variant="outline" className="mt-4" onPress={() => {}} />
      </View>
      <View className="p-6">
        <Text className="text-lg font-bold mb-4">Overview</Text>
        <Text className="text-gray-700 leading-relaxed">
          Experienced financial executive with over 15 years in SaaS and fintech. 
          Proven track record of scaling startups from Series A to IPO.
        </Text>
      </View>
    </ScrollView>
  );
}
