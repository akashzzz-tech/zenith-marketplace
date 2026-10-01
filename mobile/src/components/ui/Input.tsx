import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <View className={`w-full ${className}`}>
      {label && <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>}
      <TextInput 
        className={`bg-white px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} text-gray-900`}
        placeholderTextColor="#94A3B8"
        {...props}
      />
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
