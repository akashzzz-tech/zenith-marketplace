import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Avatar } from '../../src/components/ui/Avatar';

export default function ClientMessagesScreen() {
  const router = useRouter();
  const dummyConversations = [
    { id: '1', name: 'Jane Smith', lastMessage: 'Here is the deliverable.', time: '2:30 PM', unread: 1 },
  ];

  return (
    <View className="flex-1 bg-white pt-12">
      <View className="px-4 mb-4">
        <Text className="text-2xl font-bold text-primary-900">Messages</Text>
      </View>
      <FlatList
        data={dummyConversations}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="flex-row p-4 border-b border-gray-100 items-center"
            // We can reuse the chat screen from pro or create a shared one
            onPress={() => router.push('/(pro)/chat' as any)}
          >
            <Avatar name={item.name} size="md" className="mr-4" />
            <View className="flex-1">
              <View className="flex-row justify-between mb-1">
                <Text className="font-bold text-primary-900">{item.name}</Text>
                <Text className="text-xs text-gray-500">{item.time}</Text>
              </View>
              <Text className="text-sm text-gray-600" numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            {item.unread > 0 && (
              <View className="bg-secondary rounded-full w-6 h-6 items-center justify-center ml-2">
                <Text className="text-white text-xs font-bold">{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
