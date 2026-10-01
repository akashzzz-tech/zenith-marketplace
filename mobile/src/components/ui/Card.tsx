import React from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  onPress?: () => void;
}

export function Card({ children, className = '', onPress, ...props }: CardProps) {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component 
      className={`bg-white rounded-xl shadow-sm shadow-gray-200 border border-gray-100 ${className}`}
      onPress={onPress}
      {...props as any}
    >
      {children}
    </Component>
  );
}
