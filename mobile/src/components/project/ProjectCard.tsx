import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ProjectCardProps {
  id: string;
  title: string;
  company: string;
  category: string;
  budgetMinCents: number;
  budgetMaxCents: number;
  currency?: string;
  minYearsExperience: number;
  deadline: string | null;
  isHourly: boolean;
  onPress?: () => void;
}

function formatCents(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Math.floor(cents) / 100);
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Flexible';
  return new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ProjectCard({
  title,
  company,
  category,
  budgetMinCents,
  budgetMaxCents,
  currency = 'USD',
  minYearsExperience,
  deadline,
  isHourly,
  onPress,
}: ProjectCardProps) {
  const budgetLabel = isHourly
    ? `${formatCents(budgetMinCents, currency)}–${formatCents(budgetMaxCents, currency)}/hr`
    : `${formatCents(budgetMinCents, currency)}–${formatCents(budgetMaxCents, currency)}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
    >
      {/* Category Badge */}
      <View className="flex-row mb-2">
        <View className="bg-blue-50 px-2 py-0.5 rounded-full">
          <Text className="text-xs font-medium text-blue-700">{category}</Text>
        </View>
      </View>

      {/* Title */}
      <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={2}>
        {title}
      </Text>

      {/* Company */}
      <Text className="text-sm text-gray-500 mb-3">{company}</Text>

      {/* Footer Row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          {/* Budget */}
          <View className="flex-row items-center">
            <Text className="text-sm font-semibold text-green-700">{budgetLabel}</Text>
          </View>

          {/* Experience required */}
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-500">{minYearsExperience}+ yrs</Text>
          </View>
        </View>

        {/* Deadline */}
        <Text className="text-xs text-gray-400">Due {formatDeadline(deadline)}</Text>
      </View>
    </TouchableOpacity>
  );
}
