import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
  name: string;
  url?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ name, url, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
  };

  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (url) {
    return (
      <Image 
        source={{ uri: url }} 
        className={`${sizes[size]} rounded-full ${className}`} 
      />
    );
  }

  return (
    <View className={`${sizes[size]} rounded-full bg-primary-100 items-center justify-center ${className}`}>
      <Text className={`font-bold text-primary-900 ${textSizes[size]}`}>
        {initials}
      </Text>
    </View>
  );
}
