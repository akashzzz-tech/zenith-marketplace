import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const dummyMessages = [
    { id: '1', text: 'Looking forward to starting.', sender: 'client', time: '10:30 AM' },
    { id: '2', text: 'Great! Let me know if you need anything else.', sender: 'me', time: '10:32 AM' },
  ].reverse();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center p-4 bg-white border-b border-gray-200">
        <Text className="flex-1 text-lg font-bold text-center">John Doe</Text>
      </View>
      <FlatList
        data={dummyMessages}
        inverted
        renderItem={({ item }) => (
          <View className={`p-3 m-2 rounded-lg max-w-[80%] ${item.sender === 'me' ? 'bg-secondary self-end' : 'bg-white self-start'}`}>
            <Text className={`${item.sender === 'me' ? 'text-white' : 'text-gray-900'}`}>{item.text}</Text>
            <Text className={`text-xs mt-1 ${item.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>{item.time}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View className="flex-row items-center p-4 bg-white border-t border-gray-200">
        <TouchableOpacity className="mr-2">
          <Ionicons name="attach" size={24} color="#64748B" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2"
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity className="ml-2 bg-secondary rounded-full p-2" onPress={() => setMessage('')}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
