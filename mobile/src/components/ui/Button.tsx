import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ title, variant = 'primary', size = 'md', loading, className = '', ...props }: ButtonProps) {
  const baseClasses = 'flex-row items-center justify-center rounded-lg';
  
  const variants = {
    primary: 'bg-primary-900',
    secondary: 'bg-secondary',
    outline: 'border-2 border-primary-900 bg-transparent',
    ghost: 'bg-transparent',
  };
  
  const textVariants = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary-900',
    ghost: 'text-primary-900',
  };

  const sizes = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${props.disabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#0F172A' : '#FFFFFF'} />
      ) : (
        <Text className={`font-semibold ${textVariants[variant]} ${size === 'lg' ? 'text-lg' : 'text-base'}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
