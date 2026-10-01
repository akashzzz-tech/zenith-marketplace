import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';

export default function RegisterProfessionalScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    eligibility: '',
    firstName: '',
    lastName: '',
    country: '',
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    // Implement actual registration logic
    router.replace('/(pro)');
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="mt-12 mb-8">
        <Text className="text-2xl font-bold text-primary-900">Professional Registration</Text>
        <Text className="text-gray-500">Step {step} of 3</Text>
      </View>

      {step === 1 && (
        <View className="space-y-4">
          <Input 
            label="Email" 
            placeholder="Email address"
            value={formData.email}
            onChangeText={(v) => updateForm('email', v)}
          />
          <Input 
            label="Password" 
            placeholder="Create a password" 
            secureTextEntry
            value={formData.password}
            onChangeText={(v) => updateForm('password', v)}
          />
        </View>
      )}

      {step === 2 && (
        <View className="space-y-4">
          <Text className="font-semibold text-lg mb-2">Eligibility Status</Text>
          <Button 
            title="Retired Executive" 
            variant={formData.eligibility === 'retired' ? 'primary' : 'outline'}
            onPress={() => updateForm('eligibility', 'retired')}
          />
          <Button 
            title="5+ Years Experience" 
            variant={formData.eligibility === 'experienced' ? 'primary' : 'outline'}
            onPress={() => updateForm('eligibility', 'experienced')}
          />
        </View>
      )}

      {step === 3 && (
        <View className="space-y-4">
          <Input 
            label="First Name" 
            value={formData.firstName}
            onChangeText={(v) => updateForm('firstName', v)}
          />
          <Input 
            label="Last Name" 
            value={formData.lastName}
            onChangeText={(v) => updateForm('lastName', v)}
          />
          <Input 
            label="Country" 
            value={formData.country}
            onChangeText={(v) => updateForm('country', v)}
          />
        </View>
      )}

      <View className="mt-8 flex-row justify-between">
        {step > 1 ? (
          <Button title="Back" variant="outline" onPress={() => setStep(step - 1)} className="flex-1 mr-2" />
        ) : <View className="flex-1 mr-2" />}
        <Button 
          title={step === 3 ? "Complete" : "Next"} 
          onPress={handleNext} 
          className="flex-1 ml-2" 
        />
      </View>
    </ScrollView>
  );
}
