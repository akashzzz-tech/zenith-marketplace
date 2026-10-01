import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface VerificationBannerProps {
  status: 'unverified' | 'pending' | 'under_review' | 'more_info_required' | 'verified' | 'rejected' | 'suspended';
  onPress?: () => void;
}

export default function VerificationBanner({ status, onPress }: VerificationBannerProps) {
  if (status === 'verified') return null;

  const getBannerDetails = () => {
    switch (status) {
      case 'unverified':
        return {
          bgColor: 'bg-amber-50 border-amber-200',
          textColor: 'text-amber-800',
          title: 'Verification Required',
          description: 'Complete eligibility verification (Retired or 5+ YOE) to become visible to clients.',
          actionText: 'Start Verification',
        };
      case 'pending':
      case 'under_review':
        return {
          bgColor: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-800',
          title: 'Verification In Progress',
          description: 'Our review team is evaluating your career credentials. Average turnaround: 24-48 hours.',
          actionText: 'View Status',
        };
      case 'more_info_required':
        return {
          bgColor: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-800',
          title: 'Action Needed: Additional Info',
          description: 'Our review team requested more details on your past roles or certificates.',
          actionText: 'Update Submission',
        };
      case 'rejected':
        return {
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-800',
          title: 'Verification Declined',
          description: 'Credentials did not meet the 5+ years or retired professional requirement.',
          actionText: 'Appeal / Inquire',
        };
      case 'suspended':
        return {
          bgColor: 'bg-gray-100 border-gray-300',
          textColor: 'text-gray-800',
          title: 'Account Under Review',
          description: 'Your profile has been temporarily paused. Please contact support.',
          actionText: 'Contact Support',
        };
      default:
        return null;
    }
  };

  const details = getBannerDetails();
  if (!details) return null;

  return (
    <View className={`border rounded-xl p-4 mb-4 ${details.bgColor}`}>
      <Text className={`font-bold text-sm ${details.textColor}`}>{details.title}</Text>
      <Text className={`text-xs mt-1 text-gray-600`}>{details.description}</Text>
      <TouchableOpacity
        onPress={onPress || (() => router.push('/(pro)/profile'))}
        className="mt-2.5 self-start bg-primary px-3 py-1.5 rounded-lg"
      >
        <Text className="text-white text-xs font-semibold">{details.actionText}</Text>
      </TouchableOpacity>
    </View>
  );
}
