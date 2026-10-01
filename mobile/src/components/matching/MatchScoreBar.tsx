import React from 'react';
import { View, Text } from 'react-native';
import type { MatchScoreBreakdown } from '../../types/index';

interface MatchScoreBarProps {
  breakdown: MatchScoreBreakdown;
  compact?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-amber-400';
  return 'bg-gray-300';
}

function getScoreTextColor(score: number): string {
  if (score >= 80) return 'text-green-700';
  if (score >= 60) return 'text-amber-700';
  return 'text-gray-500';
}

export default function MatchScoreBar({ breakdown, compact = false }: MatchScoreBarProps) {
  const { total, reasons } = breakdown;

  return (
    <View className="bg-blue-50 rounded-lg p-3">
      {/* Score Header */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-sm font-semibold text-gray-700">Match Score</Text>
        <Text className={`text-lg font-bold ${getScoreTextColor(total)}`}>{total}%</Text>
      </View>

      {/* Progress Bar */}
      <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
        <View
          className={`h-full rounded-full ${getScoreColor(total)}`}
          style={{ width: `${total}%` }}
        />
      </View>

      {/* Reasons */}
      {!compact && reasons.length > 0 && (
        <View className="gap-1">
          {reasons.map((reason, index) => (
            <View key={index} className="flex-row items-center gap-1.5">
              <Text className="text-green-600 text-xs">✓</Text>
              <Text className="text-xs text-gray-600">{reason}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
