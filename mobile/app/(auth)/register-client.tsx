import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';

export default function RegisterClientScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    industry: '',
    country: '',
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Implement actual registration logic
    router.replace('/(client)');
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="mt-12 mb-8">
        <Text className="text-2xl font-bold text-primary-900">Client Registration</Text>
        <Text className="text-gray-500">Create your company account</Text>
      </View>

      <View className="space-y-4">
        <Input 
          label="Email" 
          value={formData.email}
          onChangeText={(v) => updateForm('email', v)}
        />
        <Input 
          label="Password" 
          secureTextEntry
          value={formData.password}
          onChangeText={(v) => updateForm('password', v)}
        />
        <Input 
          label="Company Name" 
          value={formData.companyName}
          onChangeText={(v) => updateForm('companyName', v)}
        />
        <Input 
          label="Industry" 
          value={formData.industry}
          onChangeText={(v) => updateForm('industry', v)}
        />
        <Input 
          label="Country" 
          value={formData.country}
          onChangeText={(v) => updateForm('country', v)}
        />
      </View>

      <View className="mt-8 flex-row justify-between">
         <Button title="Back" variant="outline" onPress={() => router.back()} className="flex-1 mr-2" />
         <Button title="Register" onPress={handleSubmit} className="flex-1 ml-2" />
      </View>
    </ScrollView>
  );
}
