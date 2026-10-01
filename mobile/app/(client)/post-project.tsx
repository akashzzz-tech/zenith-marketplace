import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';

export default function PostProjectScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    router.replace('/(client)/my-projects');
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="mt-12 mb-8">
        <Text className="text-2xl font-bold text-primary-900">Post a Project</Text>
        <Text className="text-gray-500">Step {step} of 4</Text>
      </View>

      {step === 1 && (
        <View className="space-y-4">
          <Input label="Project Title" placeholder="e.g. Senior UX Designer" />
          <Input label="Description" placeholder="Describe the project..." multiline numberOfLines={4} />
          <Input label="Category" placeholder="e.g. Design" />
        </View>
      )}

      {step === 4 && (
        <View className="space-y-4">
          <Text className="font-bold text-lg">Review and Submit</Text>
          <Text className="text-gray-600">Please review your project details before submitting.</Text>
        </View>
      )}

      <View className="mt-8 flex-row justify-between">
        {step > 1 ? (
          <Button title="Back" variant="outline" onPress={() => setStep(step - 1)} className="flex-1 mr-2" />
        ) : <View className="flex-1 mr-2" />}
        
        <Button 
          title={step === 4 ? "Submit Project" : "Next"} 
          onPress={() => step < 4 ? setStep(step + 1) : handleSubmit()} 
          className="flex-1 ml-2" 
        />
      </View>
    </ScrollView>
  );
}
