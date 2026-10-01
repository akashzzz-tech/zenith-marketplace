import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Ionicons } from '@expo/vector-icons';

interface ProfessionalCardProps {
  name: string;
  title: string;
  verified: boolean;
  rate: string;
  country: string;
  topSkills: string[];
}

export function ProfessionalCard({ name, title, verified, rate, country, topSkills }: ProfessionalCardProps) {
  return (
    <Card className="mb-4 p-4">
      <View className="flex-row mb-4">
        <Avatar name={name} size="lg" className="mr-4" />
        <View className="flex-1 justify-center">
          <View className="flex-row items-center mb-1">
            <Text className="font-bold text-lg text-primary-900 mr-2">{name}</Text>
            {verified && <Ionicons name="checkmark-circle" size={16} color="#10B981" />}
          </View>
          <Text className="text-gray-600 font-medium">{title}</Text>
          <Text className="text-gray-500 text-sm mt-1">{country} • {rate}</Text>
        </View>
      </View>
      <View className="flex-row flex-wrap gap-2 mt-2">
        {topSkills.map((skill, index) => (
          <Badge key={index} variant="default">{skill}</Badge>
        ))}
      </View>
    </Card>
  );
}
